import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLs2yPZbmo8XpaHTqr8EbPv72W5v4VFrk",
  authDomain: "vixelectronics3.firebaseapp.com",
  projectId: "vixelectronics3",
  storageBucket: "vixelectronics3.appspot.com",
  messagingSenderId: "408072622542",
  appId: "1:408072622542:web:192f44c52136c159ec9b9f",
  measurementId: "G-T8HV72YQ3V"
};
// Initialize Firebase
// initialize firebase app
firebase.initializeApp(firebaseConfig);
 
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
