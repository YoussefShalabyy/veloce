// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-LehAYrlcTQcbhAFbctBBkRHYEJQ2uKk",
  authDomain: "stickersmash-7cbdb.firebaseapp.com",
  projectId: "stickersmash-7cbdb",
  storageBucket: "stickersmash-7cbdb.appspot.com",
  messagingSenderId: "264301268175",
  appId: "1:264301268175:web:0620601e11b68c61617bba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication object
const db = getFirestore(app);


export { auth,db }; // Export the authentication object
