import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import LoginPage from "./login";
import Colors from "../constants/Colors";
export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LoginPage />
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
    width: "100%",
    flex: 1,
    backgroundColor: Colors.light.backgroundcolor,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
