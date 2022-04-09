import * as firebase from "firebase";

// import { YellowBox } from "react-native-web";
//Potential android warning supporession
// YellowBox.ignoreWarnings(["Setting a timer for a long period of time"]);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuE5BvZEN8DEEqfxMC19gpgLLUF3Lh5Yw",
  authDomain: "unisafteyapp.firebaseapp.com",
  projectId: "unisafteyapp",
  storageBucket: "unisafteyapp.appspot.com",
  messagingSenderId: "65780046573",
  appId: "1:65780046573:web:143776f7bc09190ea00ae4",
  measurementId: "G-69N2KZXZFT",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
