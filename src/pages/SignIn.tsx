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
                    Login to Your Account
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
                      />
                    </div>
                    <p className="mt-4">
                      <a
                        href="/reset"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </p>

                    <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                      Log in
                    </button>
                  </form>

                  <hr className="my-8" />

                  <div className="flex items-center justify-center gap-4">
                    {/* <button className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500">
                      <svg
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      Github
                    </button> */}
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
                  <a className="block mt-4 text-sm text-cyan-800" href = "/signup">Don't have an account? Sign Up! </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default SignIn;
