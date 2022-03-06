import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signin, signInWithGoogle } = useAuth();

  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    signin(email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error: any) => {
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
      <button onClick={signInWithGoogleHandler}>Sign In With Google</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" />

        <button>Submit Form!</button>
      </form>
    </>
  );
}

export default SignIn;
