import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router"; // Make sure you have imported the router correctly
import Colors from "../constants/Colors";
import { login } from "../firebase"; // Assuming you have a working login function
import { auth, db } from "../firebase";
import {
  getDocs,
  query,
  collection,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@rememberUser");
        console.log("Stored user:", storedUser);
        if (storedUser) {
          const { email, password } = JSON.parse(storedUser);
          setEmail(email);
          setPassword(password);
          login(email, password)
            .then(async (userCredential) => {
              await getCurrentUserDocId();
              console.log("Logged in successfully");
            })
            .catch((error) => {
              const errorMessage = error.message;
              alert(errorMessage);
            });
        }
        else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        AsyncStorage.removeItem("@rememberUser");
      }
    };
    checkLoggedIn();
  }, []);

  const handleDontHaveAcc = () => {
    router.navigate("register");
  };

  const getCurrentUserDocId = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("userID", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No documents found for userID:", auth.currentUser.uid);
        return;
      }
      querySnapshot.forEach((doc) => {
        console.log("Document found with ID:", doc.id);
        getUser(doc.id);
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const getUser = async (userDocId) => {
    try {
      const docRef = doc(db, "users", userDocId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        console.log("User data:", userData);
        if (userData.isAdmin) {
          router.navigate("homePage"); // Replace with the correct screen name
          console.log("User is admin");
        } else {
          router.navigate("homePage"); // Replace with the correct screen name
          console.log("User is not admin");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handelForgetPassword = () => {
    router.navigate("forgetPassword");
  };

  const handleLogin = () => {
    login(email, password)
      .then(async (userCredential) => {
        await getCurrentUserDocId();
        console.log("Logged in successfully");
        await AsyncStorage.setItem(
          "@rememberUser",
          JSON.stringify({ email, password })
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.light.backgroundcolor}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Veloce</Text>
        <Text style={styles.subHeading}>Login</Text>
        <Input
          placeHolder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.Input}
        />
        <Input
          placeHolder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          style={styles.Input}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        {/* <Text style={styles.loginWithText}>Or Sign in with</Text>
        <View style={styles.rowView}>
          <TouchableOpacity style={styles.loginGoogleButton}>
            <Image source={googleIcon} style={styles.loginWithIcon} />
            <Text style={styles.loginGoogleText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginFacebookButton}>
            <Image source={facebookIcon} style={styles.loginWithIcon} />
            <Text style={styles.loginFacebookText}>Facebook</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.lowerSection}>
          <Btn
            type="Link"
            text="Forgot Password?"
            style={styles.forgetPassword}
            onPress={handelForgetPassword}
          />
          <Btn
            text="Don't Have An Account? Register"
            style={styles.linkBtn}
            onPress={handleDontHaveAcc}
          />
        </View>
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
    paddingBottom: 20,
    minWidth: "100%",
    flex: 1,
    backgroundColor: Colors.main.backgroundcolor,
    alignItems: "center",
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  heading: {
    color: Colors.light.backgroundcolor,
    fontSize: 60,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 18,
    marginVertical: 20,
    color: Colors.light.backgroundcolor,
  },
  Input: {
    borderRadius: 100,
    marginTop: 20,
    maxHeight: 60,
    marginVertical: 10,
    fontSize: 18,
    backgroundColor: Colors.light.backgroundcolor,
  },
  loginBtn: {
    backgroundColor: Colors.light.backgroundcolor,
    minWidth: "100%",
    maxWidth: "100%",
    borderRadius: 100,
    height: 60,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 18,
  },
  loginWithText: {
    color: Colors.light.backgroundcolor,
    fontSize: 18,
    alignSelf: "flex-start",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "100%",
    marginVertical: 10,
  },
  loginGoogleButton: {
    backgroundColor: Colors.light.backgroundcolor,
    minWidth: "48%",
    maxWidth: "48%",
    borderRadius: 100,
    height: 40,
    alignContent: "space-between",
    justifyContent: "center",
  },
  loginGoogleText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 16,
    textAlign: "center",
  },
  loginFacebookButton: {
    backgroundColor: Colors.light.backgroundcolor,
    minWidth: "48%",
    maxWidth: "48%",
    padding: 10,
    borderRadius: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  loginFacebookText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 16,
    textAlign: "center",
  },
  loginWithIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    borderRadius: 100,
  },
  lowerSection: {
    position: "absolute",
    bottom: 0,
    minWidth: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  forgetPassword: {
    backgroundColor: Colors.light.backgroundcolor,
    fontSize: 16,
    minWidth: "100%",
    marginTop: 1,
    maxHeight: 40,
    minHeight: 40,
    padding: -5,
  },
  linkBtn: {
    backgroundColor: Colors.light.backgroundcolor,
    fontSize: 16,
    minWidth: "300",
    maxWidth: "300",
    marginTop: 10,
    maxHeight: 40,
    minHeight: 40,
    padding: -5,
  },
});
