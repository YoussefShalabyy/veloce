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
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { set } from "lodash";
import AdminNavBar from "../../components/AdminNavBar";

export default function profile() {
  const [user, setUser] = useState([]);
  const [userDocId, setUserDocId] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser.uid;
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userStreet, setUserStreet] = useState("");
  const [userRegion, setUserRegion] = useState("");

  const handleLogout = () => {
    AsyncStorage.removeItem("@rememberUser");
    router.navigate("login");
  };

  const handleUpdateProfile = async () => {
    try {
      const docRef = doc(db, "users", userDocId);
      updateDoc(docRef, {
        email: userEmail,
        name: userName,
        phoneNumber: userPhoneNumber,
        street: userStreet,
        region: userRegion,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
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
          if (userEmail === "") {
            setUserEmail(docSnapshot.data().email);
            setUserName(docSnapshot.data().name);
            setUserPhoneNumber(docSnapshot.data().phoneNumber);
            setUserStreet(docSnapshot.data().street);
            setUserRegion(docSnapshot.data().region);
          }
        } else {
          console.log("No such document!");
          setUser([]);
        }
        setLoading(false);
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
        <View style={styles.HeaderView}>
          <View>
            <Text style={styles.WelcomeText}>Welcome</Text>
          </View>
          <View>
            <Text style={styles.UserName}>{userName.split(" ")[0]}</Text>
          </View>
        </View>
        <View style={styles.inputItemView}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.inputItemView}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userEmail}
            onChangeText={setUserEmail}
          />
        </View>
        <View style={styles.inputItemView}>
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
          />
        </View>
        <View style={styles.inputItemView}>
          <Text style={styles.title}>Street</Text>
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={userStreet}
            onChangeText={setUserStreet}
          />
        </View>
        <View style={styles.inputItemView}>
          <Text style={styles.title}>Region</Text>
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={userRegion}
            onChangeText={setUserRegion}
          />
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={handleUpdateProfile}
            style={styles.updateButton}
          >
            <Text style={styles.updateText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
         {user.isAdmin?( <AdminNavBar CurrentScreen={"profile"} />):( <BottomNavBar CurrentScreen={"profile"} />)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
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
    paddingBottom : Platform.OS === "ios" ? 0 : 20,
  },
  HeaderView: {
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  WelcomeText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 25,
  },
  UserName: {
    fontSize: 30,
    color: Colors.dark.backgroundcolor,
    fontWeight: "bold",
  },
  inputItem: {
    marginVertical: 10,
  },
  inputItemView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: Colors.light.whiteBackground,
    borderRadius: 100,
    padding: 10,
    height: 40,
    minWidth: "100%",
    borderColor: Colors.light.primary,
    borderWidth: 1,
  },
  inputItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: Colors.main.orange,
    borderRadius: 100,
    padding: 10,
    marginVertical: 10,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  updateText: {
    color: Colors.light.whiteBackground,
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: Colors.dark.backgroundcolor,
    borderRadius: 100,
    padding: 10,
    marginVertical: 10,
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: Colors.light.whiteBackground,
    fontSize: 18,
  },
});
