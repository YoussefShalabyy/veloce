import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Welcome from "./welcome";
import Add from "./(tabs)/addItem";
import HomePage from "./(tabs)/homePage";
import Login from "./login";

export default function index() {
  return <Login />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
