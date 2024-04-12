import { View, Text, StyleSheet } from "react-native";
import { React, useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import {router}from 'expo-router'

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleDontHaveAcc=()=>{
   router.navigate('register');
  }
  return (
    <View style={styles.container}>
      <Input placeHolder="Username" onChangeText={setEmail} value={email} />
      <Input
        placeHolder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <Btn text="Login" style={styles.loginBtn} />
      <Btn type="Link" text="Forgot Password?" textColor="black" />
      <Btn
        text="Don't Have An Account? Register"
        fontSize={28}
        style={styles.linkBtn}
        type="Link"
        textColor="#0077B6"
        onPress={handleDontHaveAcc}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    marginTop: 20,
  },
  linkBtn: {
    width: "100%",
  },
});
