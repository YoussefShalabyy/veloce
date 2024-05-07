import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

// write a method that returns the current user data from firebase
export default function getProfile() {
  const [userDocId, setUserDocId] = useState("");
  const userId = auth.currentUser.uid;

  const getUser = async () => {
    if (!userDocId) return;

    try {
      const docRef = doc(db, "users", userDocId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
