import { ActivityIndicator } from "react-native";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function CustomActivityIndicator({ color, size }) {
  return (
    <ActivityIndicator color={color} size={size} style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
