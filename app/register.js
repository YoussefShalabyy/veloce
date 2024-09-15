import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { router } from "expo-router";

const Input = ({ label, value, onChangeText, secureTextEntry }) => (
  <View style={styles.InputContainer}>
    <View style={styles.labelContaier}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput
      style={styles.TextInput}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

export default function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleHaveAccountBtn = () => {
    router.navigate("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.heading}>تسجيل مستخدم جديد</Text>
            <Input
              label="الاسم الاول"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              label="الاسم الاخير"
              value={lastName}
              onChangeText={setLastName}
            />
            <Input
              label="اسم المستخدم"
              value={username}
              onChangeText={setUsername}
            />
            <Input label="العنوان" value={address} onChangeText={setAddress} />
            <Input
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Input
              label="تأكيد كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.registerBtn}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkBtn}
              onPress={handleHaveAccountBtn}
            >
              <Text style={styles.linkText}>Already have an account?</Text>
            </TouchableOpacity>

            <View style={styles.lowerSection}>
              <Text style={styles.error}>{error}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: "100%",
    flex: 1,
    backgroundColor: Colors.light.backgroundcolor,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  InputContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
  labelContaier: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
  },
  TextInput: {
    borderRadius: 100,
    backgroundColor: Colors.light.whiteBackground,
    padding: 15,
    margin: 10,
  },
  loginBtn: {
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: Colors.main.orange,
    padding: 15,
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});
