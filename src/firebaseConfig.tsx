// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL:
    "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const myApp = firebase.initializeApp(config);

export const auth = myApp.auth();

export const db = myApp.firestore();
