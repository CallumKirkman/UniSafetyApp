import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

// import {auth} from "firebase/auth";
//import {...} from "firebase/firestore";

// Initialize Firebase
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
const db = firebase.firestore();

export { auth, db };
