import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import Colors from "../constants/Colors";
import FerrariSF90 from "../assets/FerrariSF90.png";
import { Platform } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.heading}>to Veloce</Text>
        <Text style={styles.subheading}>Ready for your next ride!</Text>
        <Image source={FerrariSF90} style={styles.logo} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("register")}
        >
          <Text style={styles.buttonText}>Explore Cars</Text>
        </TouchableOpacity>
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
  },
  logo: {
    resizeMode: "contain",
    position: "absolute",
    top: "30%",
    flex: 1,
    maxHeight: 400,
  },
  heading: {
    color: Colors.light.backgroundcolor,
    fontSize: 40,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginVertical: 20,
    color: Colors.light.backgroundcolor,
  },
  button: {
    backgroundColor: Colors.main.backgroundcolor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    maxHeight: 50,
    flex: 1,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 0,
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 16,
    fontWeight: "bold",
  },
});
