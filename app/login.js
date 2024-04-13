import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { React, useState } from "react";
import Input from "../components/input";
import Btn from "../components/btn";
import { router } from "expo-router";
import Colors from "../constants/Colors";
import googleIcon from "../assets/googleIcon.png";
import facebookIcon from "../assets/facebookIcon.png";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleDontHaveAcc = () => {
    router.navigate("register");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Veloce</Text>
        <Text style={styles.subHeading}>Login</Text>
        <Input
          placeHolder="Username"
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
        <Btn text="Login" style={styles.loginBtn} />
        <Text style={styles.loginWithText}>Or Sign in with</Text>
        <View style={styles.rowView}>
          <TouchableOpacity style={styles.loginGoogleButton}>
            <Image source={googleIcon} style={styles.loginWithIcon} />
            <Text style={styles.loginGoogleText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginFacebookButton}>
            <Image source={facebookIcon} style={styles.loginWithIcon} />
            <Text style={styles.loginFacebookText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lowerSection}>
          <Btn
            type="Link"
            text="Forgot Password?"
            style={styles.forgetPassword}
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
  Input: {
    borderRadius: 100,
    marginTop: 20,
    maxHeight: 60,
    marginVertical: 10,
    fontSize: 18,
    backgroundColor: Colors.light.backgroundcolor,
  },
  loginBtn: {
    marginTop: 10,
    marginBottom: 20,
    maxHeight: 60,
    backgroundColor: Colors.main.backgroundcolor,
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
    marginTop: 10,
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
