import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const uneeqPackage = require("uneeq-js");
const axios = require("axios");
const sign = require("jwt-encode");

let userName = "";
function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <>
          <div className="w-full h-full overflow-clip">
            <DigitalHuman></DigitalHuman>
          </div>
          <div className="invisible">
            {(userName = currentUser.displayName)}
          </div>
        </>
      ) : (
        <>
          {navigate("/signin")}
          <a href="/signin">You are not Logged in, click here to log in</a>
        </>
      )}
    </>
  );
}

const GET_TOKEN_URL = "http://localhost:3000/token";
const UNEEQ_URL = "https://api.us.uneeq.io";
const UNEEQ_CONVERSATION_ID = "773cce0d-7259-41fb-9099-79422ff983fe"; // example conversation id only
var uneeqInstance: any;

const DigitalHuman = () => {
  const [visible, setVisible] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const msgDisplay = document.getElementById("msg");

  function addPTTKeyListeners() {
    // When the user presses down on space bar, tell the digital human to start recording (start listening)
    document.addEventListener("keydown", (e: any) => {
      if (e.code === "Space" && !e.repeat && e.target.type !== "text") {
        // Ask uneeq-js to startRecording the users voice (to speak to the digital human)
        uneeqInstance.startRecording();
      }
    });

    // When the user releases the space bar, tell the digital human to stop recording (stop listening)
    document.addEventListener("keyup", (e: any) => {
      if (e.code === "Space" && !e.repeat && e.target.type !== "text") {
        // Ask uneeq-js to stopRecording the users voice (to stop speaking to the digital human)
        uneeqInstance.stopRecording();
      }
    });
  }

  function endSession() {
    uneeqInstance.endSession();
    document.body.classList.remove("live");
    setVisible(true);
  }

  // let headers = { headers: { "content-type": "application/json" } };

  function messageHandler(msg: any) {
    let sessionId = { sessionId: uneeqInstance.session.id };

    switch (msg.uneeqMessageType) {
      // SessionLive: Everything has loaded and the digital human is ready for interaction

      case "Ready":
        setVisible(false);
        break;

      case "SessionLive":
        // Add key listeners on spacebar for start and stop recording
        addPTTKeyListeners();

        // Clear the onscreen prompts
        // msgDisplay.innerHTML = "";

        // Transition the UI from loading state to live state
        document.body.classList.remove("loading");
        setLoadingVisible(false);
        document.body.classList.add("live");
        break;

      // The digital human has received a question (utterance) from the user
      case "AvatarQuestionText":
        // Display the question spoken by the user on screen
        // document.getElementById("local-transcript").innerHTML =
        //   "User: " + msg.question;
        console.log(msg.question);
        // let ans = `<speak>
        // <uneeq:enquiring>
        // ${msg.question}? <break time="600ms"/> I'm glad you asked!
        // </uneeq:enquiring>
        // </speak>`;
        // axios
        //   .post(
        //     "https://api.us.uneeq.io" +
        //       "/api/v1/avatar/" +
        //       uneeqInstance.session.id +
        //       "/speak",
        //     {
        //       answer: ans,
        //       answerAvatar: "{}",
        //       sessionIdJwt: sign(
        //         sessionId,
        //         "AC3CC633-A580-CE16-4835-02A660AD9DAA"
        //       ),
        //     },
        //     {
        //       headers,
        //     }
        //   )
        //   .then(function (response: any) {
        //     console.log("RESPONSE : " + response);
        //   })
        //   .catch(function (error: any) {
        //     console.log("ERROR : ", error);
        //   });
        break;

      // The digital human has an answer to the question
      case "AvatarAnswer":
        // Add the new element onto the screen
        // document.getElementById("transcript").innerHTML =
        //   "Digital Human: " + msg.answerSpeech;
        console.log(msg.answerSpeech);
        break;

      default:
        // Additional messages sent by uneeq-js that can be handled.
        console.log(
          "uneeq-js: Unhandled message '" + msg.uneeqMessageType + "'",
          msg
        );
        break;
    }
  }

  function startDigitalHuman() {
    // Create an instance of Uneeq
    uneeqInstance = new uneeqPackage.Uneeq({
      url: UNEEQ_URL,
      conversationId: UNEEQ_CONVERSATION_ID,
      avatarVideoContainerElement: document.getElementById(
        "digital-human-video-container"
      ),
      localVideoContainerElement: document.getElementById(
        "local-video-container"
      ),
      messageHandler: (msg: any) => messageHandler(msg),
      sendLocalVideo: false,
    });

    // Once the user clicks to start a session, display loading message
    // msgDisplay.innerHTML = "Loading...";
    console.log("Loading ...");
    document.body.classList.add("loading");
    setLoadingVisible(true);

    // Get single use token from customers integration app
    fetch(GET_TOKEN_URL)
      .then((data) => data.json())
      .then((result) => {
        console.log(result.token);
        // Once a single use token has been obtained, initialise the uneeq library with it
        uneeqInstance.initWithToken(result.token);
        console.log(uneeqInstance);
      })
      .catch((err) => {
        console.error(
          "Could not get a token. Is your token service running?",
          err
        );
        console.log("ACCESS TOKEN NOT THERE !");
        // msgDisplay.innerHTML =
        // "Could not get an access token. Please check developer console for details.";
      });
  }

  const Nav = () => {
    return (
      <>
        <nav className="bg-gray-800">
          <div className="flex flex-row items-center justify-between h-16">
            <p className="  text-white px-3 py-2 rounded-md text-sm font-medium">
              Logged in As : {userName}
            </p>

            <a
              href="/signout"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign Out
            </a>
          </div>
        </nav>
      </>
    );
  };

  return (
    <div className="">
      <Nav />
      <div className="flex flex-col content-center items-center p-0 m-0 ">
        <div className="hidden" id="local-video-container"></div>
        <div className="" id="digital-human-video-container"></div>
        {/* 
    <!--
    We will use this element to display the text of what the digital human has spoke. HTML content returned
    from the NLP could also be displayed here.
  --> */}
        <div id="transcript"></div>

        {/* <!-- This element will be used to display the transcript of what the user has spoken. --> */}
        <div id="local-transcript"></div>
        {/* <!-- Button to begin. Get's a session token and starts a digital human session. --> */}
        <div>
          {visible ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-12 bg-center"
              id="start-btn"
              onClick={startDigitalHuman}
            >
              Start Digital Human
            </button>
          ) : (
            <>
              <a
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-12 z-100"
                id="end-btn"
                href="/signout"
              >
                End Session
              </a>
            </>
          )}
          {loadingVisible ? (
            <>
              <h1>LOADING ... </h1>
            </>
          ) : (
            <></>
          )}

          {/* <!-- Button to end session. --> */}

          {/* <!-- msg and prompt are used for onscreen prompts and are not specific to digital human functionality --> */}
          <div id="msg" className="msg-display try"></div>
          <div id="prompt" className="msg-display">
            Hold <b>space</b> to speak
          </div>
        </div>
        <div>
          {/* <!--
    local-video-container and digital-human-video-container are both passed into the Uneeq class via
    UneeqOptions. Using CSS these elements can be displayed, hidden, moved, resize, etc. However, they should
    not be removed and re-added onto the DOM.
    
    local-video-container: The div element where the user's local video stream will be added.
    digital-human-video-container: The div element where the digital human's video stream will be added
  --> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
