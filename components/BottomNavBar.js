import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Button = ({ title, onPress, currentScreen }) => {
  const isActive = currentScreen === title;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        isActive
          ? { backgroundColor: "#d2d2d2", padding: 10, borderRadius: 100 }
          : { padding: 10, justifyContent: "center", alignItems: "center" },
      ]}
      disabled={isActive}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function BottomNavBar({ currentScreen }) {
  return (
    <View style={styles.container}>
      <Button
        currentScreen={currentScreen}
        title="الملف الشخصي"
        onPress={() => router.navigate("profile")}
      />
      <Button
        currentScreen={currentScreen}
        title="المفضلة"
        onPress={() => router.navigate("favorites")}
      />
      <Button
        currentScreen={currentScreen}
        title="الصفحة الرئيسية"
        onPress={() => router.navigate("home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 70,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  touchableButton: {},
});
