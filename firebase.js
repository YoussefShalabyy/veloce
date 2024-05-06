import { app } from "./firebaseConfig";

// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const auth = getAuth(app); // Get the authentication object
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage }; // Export the authentication object
