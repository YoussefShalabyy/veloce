import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Colors from "../constants/Colors";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAlreadyHaveAcc = () => {
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
    if (!phoneNumber) {
      setError("Please enter Phone");
      return;
    }
    if (!password) {
      setError("Please enter Password");
      return;
    }
    if (!confirmpassword) {
      setError("Please enter Confirm Password");
      return;
    }
  
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("login");
        AddUserTOFirestore(user, phoneNumber, name);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  const AddUserTOFirestore = async (user, phoneNumber, name) => {
    try {
      await addDoc(collection(db, "users"), {
        userID: user.uid,
        email: user.email,
        name: name,
        phoneNumber: phoneNumber,
        isAdmin: false,
        street: street,
        region: region,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Veloce</Text>
          <Text style={styles.subHeading}>Register</Text>
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
            placeHolder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
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
            onChangeText={setconfirmPassword}
            value={confirmpassword}
            secureTextEntry={true}
            style={styles.Input}
          />
          <Input
            placeHolder="Street"
            onChangeText={setStreet}
            value={street}
            style={styles.Input}
          />
          <Input
            placeHolder="Region"
            onChangeText={setRegion}
            value={region}
            style={styles.Input}
          />

          <Btn
            text="Register"
            style={styles.registerBtn}
            onPress={() => {
              if (password === confirmpassword) {
                handleRegister();
              } else {
                Alert.alert("Password Does Not Match");
              }
            }}
          />
          <View style={styles.lowerSection}>
            <Btn
              text="Already Have An Account? Login"
              style={styles.linkBtn}
              onPress={handleAlreadyHaveAcc}
            />
          </View>

          <Text style={styles.error}>{error}</Text>
        </View>
      </ScrollView>
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
    backgroundColor: Colors.light.backgroundcolor,
    fontSize: 18,
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
  linkBtn: {
    backgroundColor: Colors.light.backgroundcolor,
    fontSize: 16,
    minWidth: "300",
    maxWidth: "300",
    maxHeight: 40,
    minHeight: 40,
    padding: -5,
  },
});
