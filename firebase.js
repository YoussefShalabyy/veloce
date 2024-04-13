import { app } from "./firebaseConfig";

// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app); // Get the authentication object
const db = getFirestore(app);


export { auth,db }; // Export the authentication object
