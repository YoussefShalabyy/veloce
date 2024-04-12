import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import {router}from 'expo-router'

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Doneee!");
        const user = userCredential.user;
        router.navigate('login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage);
        console.log(errorCode);
        if (email.length === 0 && password.length === 0) {
          setError("Please Enter username and password");
        } else {
          setError(errorCode);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />

      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.2 : 1,
          },
          ,
          styles.registerBtn,
        ]}
        onPress={handlePress}
        // onPress={handleRegis}
      >
        <Text style={styles.registerText}>Register</Text>
      </Pressable>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 10,
    width: 380,
    height: 70,
    color: "black",
    fontSize: 30,
    marginTop: 20,
  },
  registerBtn: {
    marginTop: 20,
    borderRadius: 10,
    width: 380,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008080",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
