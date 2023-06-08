import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjAcQHRhPWjsUBB9XNaxny2lapo2f9Ez8",
  authDomain: "vixelectronics2.firebaseapp.com",
  projectId: "vixelectronics2",
  storageBucket: "vixelectronics2.appspot.com",
  messagingSenderId: "452767649183",
  appId: "1:452767649183:web:47a246acdeb6b72e2581aa",
  measurementId: "G-9L5WBMJNLR"
};
// Initialize Firebase
// initialize firebase app
firebase.initializeApp(firebaseConfig);
 
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
