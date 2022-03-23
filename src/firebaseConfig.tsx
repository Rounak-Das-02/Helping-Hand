// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCqaoKJSNdJ5OyEYHiFnJnC8i9_e_qxfac",
  authDomain: "solution-2022.firebaseapp.com",
  databaseURL:
    "https://solution-2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "solution-2022",
  storageBucket: "solution-2022.appspot.com",
  messagingSenderId: "762959308956",
  appId: "1:762959308956:web:ec1cfc866a1410577e6559",
  measurementId: "G-2LSC5HY178",
};

const myApp = firebase.initializeApp(config);

export const auth = myApp.auth();

export const db = myApp.firestore();
