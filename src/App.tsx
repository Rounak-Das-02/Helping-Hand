import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

// // pages
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<></>}>
                  <Profile />
                </React.Suspense>
              }
            />

            <Route
              path="/signin"
              element={
                <React.Suspense fallback={<></>}>
                  <SignIn />
                </React.Suspense>
              }
            />

            <Route
              path="/signout"
              element={
                <React.Suspense fallback={<></>}>
                  <SignOut></SignOut>
                </React.Suspense>
              }
            />

            <Route
              path="/signup"
              element={
                <React.Suspense fallback={<></>}>
                  <SignUp></SignUp>
                </React.Suspense>
              }
            />

            <Route
              path="/reset"
              element={
                <React.Suspense fallback={<></>}>
                  <ResetPassword />
                </React.Suspense>
              }
            />

            <Route
              path="*"
              element={
                <React.Suspense fallback={<></>}>
                  <Error />
                </React.Suspense>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
