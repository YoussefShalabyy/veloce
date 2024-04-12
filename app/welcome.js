import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function App() {
 

  return (
    <View style={styles.container}>
      <Image source={require("../assets/bmw3.png")} style={styles.logo} />
      <Text style={styles.heading}>Welcome to Veloce</Text>
      <Text style={styles.subheading}>Find Your Dream Car Here</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("register")}
      >
        <Text style={styles.buttonText}>Explore Cars</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('home')}
      >
        <Text style={styles.buttonText}>Home Page</Text>
      </TouchableOpacity> */}
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
