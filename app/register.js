import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");


  const handleAlreadyHasAcc = () => {
    router.navigate("login");
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Doneeeeeeeeeeeee!");
        const user = userCredential.user;
        router.navigate('homePage');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (email.length === 0 && password.length === 0) {
          setError("Please Enter Username And Password");
        } else {
          setError(errorCode);
        }
      });
  };
  return (
    <View style={styles.container}>
      <Input
        placeHolder="Enter Your Name"
        onChangeText={setName}
        value={name}
      />

      <Input placeHolder="Username" onChangeText={setEmail} value={email} />
      <Input
        placeHolder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
       
      />
      <Btn text="Register" style={styles.btn1} onPress={handleRegister} />
      <Btn
        text="Already Has An Account? Login"
        type="Link"
        style={styles.btn2}
        fontSize={29}
        textColor="#0077B6"
        onPress={handleAlreadyHasAcc}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn1: {
    marginTop: 20,
  },
  btn2: {
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
  },
});
