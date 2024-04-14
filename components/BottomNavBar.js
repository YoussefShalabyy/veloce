import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import Search from "../assets/Search.png";
import Home from "../assets/Home.png";
import Profile from "../assets/Profile.png";
import NavBarIcon from "../assets/NavBarIcon.png";

const BottomNavBar = () => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={Home} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Search} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Profile} style={styles.ProfileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    maxHeight: 70,
    minHeight: 70,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.dark.backgroundcolor,
    maxHeight: 70,
    minHeight: 70,
    marginHorizontal: 20,
    borderWidth: 5,
    borderColor: Colors.main.backgroundcolor,
    borderRadius: 100,
    width: "100%",
  },
  icon: {
    width: 35,
    height: 35,
  },
  ProfileIcon: {
    width: 35,
    height: 42.61,
  },
  text: {
    color: Colors.light.backgroundcolor,
    fontSize: 12,
  },
});

export default BottomNavBar;
