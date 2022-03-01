// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const config = {};

const myApp = firebase.initializeApp(config);

export const auth = myApp.auth();

export const db = myApp.firestore();
