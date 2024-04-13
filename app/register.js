import { View, Text, StyleSheet , SafeAreaView} from "react-native";
import React, { useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Colors from "../constants/Colors";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
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
    <SafeAreaView style={styles.container}>
    <View style={styles.innerContainer}>
      <Input
        placeHolder="Username"
        onChangeText={setName}
        value={name}
        style={styles.Input}
      />

      <Input placeHolder="Email" onChangeText={setEmail} value={email}  style={styles.Input} />
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
      <Btn text="Register" style={styles.registerBtn} onPress={handleRegister} />
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
});
