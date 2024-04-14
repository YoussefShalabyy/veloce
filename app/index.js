import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Welcome from "./welcome";
import Add from "./(tabs)/addItem";
import HomePage from "./(tabs)/homePage";

export default function index() {
  return <HomePage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
