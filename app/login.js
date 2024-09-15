import React, { useState, useCallback, memo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Colors from "../constants/Colors";
import handleLogin from "../controllers/handleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActivityIndicator from "../components/CustomActivityInicator";
import loggedInBefore from "../controllers/loggedInBefore";

// Memoized Input Component to Prevent Unnecessary Re-renders
const Input = memo(({ label, value, onChangeText, secureTextEntry }) => (
  <View style={styles.InputContainer}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput
      style={styles.TextInput}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
));

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginBtn = useCallback(() => {
    handleLogin(username, password, setError, setLoading);
  }, [username, password]);

  const handleRegisterRouting = useCallback(() => {
    router.navigate("register");
  }, []);

  const handleSkipLogin = () => {
    AsyncStorage.setItem("skippedLogin", "true");
    router.navigate("home");
  };


  useEffect(() => {
    const checkLoggedInBefore = async () => {
      const skippedLogin = await loggedInBefore();
      console.log(skippedLogin);
      if (skippedLogin) {
        router.navigate("home");
      } else {
        router.navigate("login");
      }
    };
    checkLoggedInBefore();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.SkipLogin} onPress={handleSkipLogin}>
            <Text style={styles.SkipLoginText}>تخطي</Text>
          </TouchableOpacity>
          <View style={styles.heading}>
            <Text style={styles.headingText}>ثروة</Text>
          </View>
          <View style={styles.LoginInputContainer}>
            <Input
              label="إسم المستخدم"
              value={username}
              onChangeText={setUsername}
              secureTextEntry={false}
            />
            <Input
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleLoginBtn} style={styles.loginBtn}>
              <Text style={styles.LoginBtnText}>
                {loading ? (
                  <CustomActivityIndicator
                    size="small"
                    color={Colors.light.whiteBackground}
                  />
                ) : (
                  "تسجيل الدخول"
                )}
              </Text>
            </TouchableOpacity>
            <Text style={styles.error}>{error}</Text>
          </View>
          <View style={styles.RegisterView}>
            <TouchableOpacity
              onPress={handleRegisterRouting}
              style={styles.registerButton}
            >
              <Text style={styles.RegisterText}>تسجيل جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  SkipLogin: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 10,
    width: 90,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.dark.backgroundcolor,
  },
  SkipLoginText: {
    color: Colors.light.whiteBackground,
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  headingText: {
    color: Colors.light.orange,
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  LoginInputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 25,
  },
  heading: {
    marginTop: 100,
    color: Colors.light.backgroundcolor,
    fontSize: 60,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  InputContainer: {
    marginVertical: 10,
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
  LoginBtnText: {
    color: Colors.light.whiteBackground,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  RegisterView: {
    marginBottom: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  registerButton: {
    borderRadius: 100,
    backgroundColor: Colors.main.orange,
    padding: 15,
    margin: 10,
    width: 200,
  },
  RegisterText: {
    color: Colors.light.whiteBackground,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginPage;
