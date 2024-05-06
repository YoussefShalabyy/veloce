import { View, Text, StyleSheet , SafeAreaView, Alert} from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Colors from "../constants/Colors";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have the Firebase Firestore instance initialized in firebase.js

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [image, setimage] = useState([]);
  const [phone, setphone] = useState([]);

  const handleAlreadyHasAcc = () => {
    router.navigate("login");
  };

  const handleRegister = () => {
    if (!name) {
      setError("Please enter Username");
      return;
    }
    if (!email) {
      setError("Please enter Email");
      return;
    }
    if (!phone) {
      setError("Please enter Phone");
      return;
    }
    if (!password) {
      setError("Please enter Password");
      return;
    }
    if (!confirmPassword) {
      setError("Please enter Confirm Password");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          name: name,
          email: email,
          phone : phone ,
          // Add other user data fields here as needed
        };
        
        // Add user data to Firestore "users" collection
        try {
          const docRef = await addDoc(collection(db, "users"), userData);
          console.log("Document written with ID: ", docRef.id);
          Alert.alert("Successful");
          router.navigate('login');
        } catch (error) {
          console.error("Error adding document: ", error);
          setError("Error creating account");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          placeHolder="Username"
          onChangeText={setName}
          value={name}
          style={styles.Input}
        />
        <Input
          placeHolder="Email"
          onChangeText={setEmail}
          value={email}
          style={styles.Input}
        />
        <Input
          placeHolder="Phone"
          onChangeText={setphone}
          value={phone}
          style={styles.Input}
        />
        <Input
          placeHolder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          style={styles.Input}
        />
        <Input
          placeHolder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
          style={styles.Input}
        />
        <Btn text="Register" style={styles.registerBtn} onPress={handleRegister} />
        <Btn
          text="Already Has An Account? Login"
          type="Link"
          style={styles.linkBtn}
          onPress={handleAlreadyHasAcc}
        />
        <Text style={styles.error}>{error}</Text>
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
    backgroundColor: Colors.dark.backgroundcolor,
    alignItems: "center",
  },
  innerContainer:{
    padding: 20,
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btn2: {
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
  },
  Input: {
    borderRadius: 100,
    marginTop: 20,
    maxHeight: 60,
    marginVertical: 10,
    fontSize: 18,
    backgroundColor: Colors.light.backgroundcolor,
  },
  registerBtn: {
    marginTop: 10,
    marginBottom: 20,
    maxHeight: 60,
    backgroundColor: Colors.main.backgroundcolor,
    fontSize: 18,
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
