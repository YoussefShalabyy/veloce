import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import BottomNavBar from "../../components/BottomNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";

export default function profile() {
  const [user, setUser] = useState([]);
  const [userDocId, setUserDocId] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = auth.currentUser.uid;

  const handleLogout = () => {
    AsyncStorage.removeItem("@rememberUser");
    router.navigate("login");
  };

  useEffect(() => {
    const getCurrentUserDocId = async () => {
      try {
        console.log("Running query for userID:", userId);
        const q = query(collection(db, "users"), where("userID", "==", userId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No documents found for userID:", userId);
          return; // Optionally handle this case
        }
        querySnapshot.forEach((doc) => {
          console.log("Document found with ID:", doc.id);
          setUserDocId(doc.id);
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    if (userId) {
      getCurrentUserDocId();
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      if (!userDocId) return;
      try {
        const docRef = doc(db, "users", userDocId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setUser(docSnapshot.data());
        } else {
          console.log("No such document!");
          setUser([]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setUser([]);
      }
    };

    if (userDocId) {
      getUser();
    }
  }, [userId, userDocId]);

  useEffect(() => {
    const checkDataLoaded = () => {
      if (user != [] && userDocId != "") {
        setLoading(false);
      }
    };
    checkDataLoaded();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>{user.email}</Text>
          <Text>{user.name}</Text>
          <Text>{user.phoneNumber}</Text>
          <Text>{user.street}</Text>
          <Text>{user.region}</Text>
          <Text>Logout</Text>
        </TouchableOpacity>
        <BottomNavBar CurrentScreen={"profile"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    paddingTop: 40,
    minWidth: "100%",
    flex: 1,
    backgroundColor: Colors.light.whiteBackground,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
