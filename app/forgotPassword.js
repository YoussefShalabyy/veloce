import {
  View,
  Text,
  Alert,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import Colors from "../constants/Colors";
import { auth } from "../firebase";
import { router } from "expo-router";
import Input from "../components/input";
import Btn from "../components/btn";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Veloce", "Email Reset Sent");
        setEmail("")
      })
      .catch((error) => {
        Alert.alert("Invalid Email");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.main.backgroundcolor,
        alignItems: "center",
      }}
    >
      <Input
        placeHolder="Enter Your Email"
        onChangeText={setEmail}
        value={email}
        style={styles.Input}
      />
      <Btn
        // type="Link"
        text="Send Verification Email"
        fontSize={25}
        color={Colors.main.orange}
        style={styles.forgetPassword}
        onPress={handleSend}
      />

      <Pressable onPress={() => router.back()}>
        <Text
          style={{ color: Colors.main.orange, fontSize: "35%", marginTop: 20 }}
        >
          Back To Login
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  Input: {
    borderRadius: 100,
    marginTop: 20,
    maxHeight: 60,
    marginVertical: 10,
    fontSize: 18,
    backgroundColor: Colors.light.backgroundcolor,
  },
});
