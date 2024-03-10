// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEVsDdO6l6-5bL6I2onk8SHnMfcPuL_Ig",
  authDomain: "portfolio-c9339.firebaseapp.com",
  projectId: "portfolio-c9339",
  storageBucket: "portfolio-c9339.appspot.com",
  messagingSenderId: "36968430916",
  appId: "1:36968430916:web:adbcf041decfbd0e06eb11",
  measurementId: "G-8F53Q9K7CC"
};

// Initialize Firebase
const firebaseDB = initializeApp(firebaseConfig);
export default firebaseDB