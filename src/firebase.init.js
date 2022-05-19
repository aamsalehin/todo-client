// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVdb5Qq9oE7EmNKR1xgMw-RFT_J2qtDF8",
  authDomain: "todo-d6605.firebaseapp.com",
  projectId: "todo-d6605",
  storageBucket: "todo-d6605.appspot.com",
  messagingSenderId: "720992583041",
  appId: "1:720992583041:web:d5a2003900404c8ccd7c80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
