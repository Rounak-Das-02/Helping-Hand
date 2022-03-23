import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { db } from "../firebaseConfig";

function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup, signInWithGoogle } = useAuth();
  function handleSubmit(event: any) {
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    const username = data.get("firstName");
    signup(email, password, username)
      .then((response: any) => {
        setLoading(false);
        navigate("/");
        db.collection("users")
          .doc(response.user.uid)
          .set({
            "First Name": data.get("firstName"),
            "Last Name": data.get("lastName"),
          });
      })
      .catch((error: any) => {
        alert(error.message);
        setError(error.message);
        setLoading(false);
      });
  }

  function signInWithGoogleHandler(event: any) {
    event.preventDefault();

    signInWithGoogle()
      .then((response: any) => {
        // console.log("RESPONSE : ", response);
        setLoading(false);
        navigate("/");
        db.collection("users").doc(response.user.uid).set({
          "First Name": response.user.displayName,
          "Last Name": "",
        });
      })
      .catch((error: any) => {
        setError(error.message);
        setLoading(false);
      });
  }
  return (
    <>
      <body>
        <div className="flex items-center min-h-screen bg-gray-50">
          <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <img
                  className="object-cover w-full h-full"
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="img"
                />
              </div>
              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-20 h-20 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                    Sign Up!
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder=""
                        required
                      />
                    </div>
                    <div>
                      <label className="block mt-4 text-sm">Password</label>
                      <input
                        id="password"
                        name="password"
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder=""
                        type="password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mt-4 text-sm">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder=""
                        type="text"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mt-4 text-sm">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder=""
                        type="text"
                      />
                    </div>

                    <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                      Sign Up
                    </button>
                  </form>

                  <hr className="my-8" />
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={signInWithGoogleHandler}
                      className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 48 48"
                      >
                        <defs>
                          <path
                            id="a"
                            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                          />
                        </defs>
                        <clipPath id="b">
                          <use xlinkHref="#a" overflow="visible" />
                        </clipPath>
                        <path
                          clip-path="url(#b)"
                          fill="#FBBC05"
                          d="M0 37V11l17 13z"
                        />
                        <path
                          clip-path="url(#b)"
                          fill="#EA4335"
                          d="M0 11l17 13 7-6.1L48 14V0H0z"
                        />
                        <path
                          clip-path="url(#b)"
                          fill="#34A853"
                          d="M0 37l30-23 7.9 1L48 0v48H0z"
                        />
                        <path
                          clip-path="url(#b)"
                          fill="#4285F4"
                          d="M48 48L17 24l-4-3 35-10z"
                        />
                      </svg>
                      Google
                    </button>
                  </div>
                  <a
                    className="block mt-4 text-sm text-cyan-800"
                    href="/signin"
                  >
                    Already have an account? Sign In{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default SignUp;
