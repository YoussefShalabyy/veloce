import { app } from "./firebaseConfig";

// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export { auth, db, storage, login };
