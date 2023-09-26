// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjQp5XUdBX0sdlZW7meegp_SZHPRe3hJQ",
  authDomain: "blogging-c1681.firebaseapp.com",
  projectId: "blogging-c1681",
  storageBucket: "blogging-c1681.appspot.com",
  messagingSenderId: "881426310992",
  appId: "1:881426310992:web:6c2a2ae327a0031bcaae55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);