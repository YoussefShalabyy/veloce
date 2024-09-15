import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import BottomNavBar from "../components/BottomNavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tickets from "../components/Tickets";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Tickets />
        <Text style={styles.heading}>Welcome to the App</Text>
      </View>
      <BottomNavBar currentScreen={"الصفحة الرئيسية"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    minHeight: "100%",
    minWidth: "100%",
    padding: 20,
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
