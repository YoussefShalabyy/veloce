import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Search from "../assets/Search.png";
import Profile from "../assets/Profile.png";
import SelectedProfile from "../assets/SelectedProfile.png";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import Home from "../assets/Home.png";

const AdminNavBar = ({ CurrentScreen, ColorTheme }) => {
  const CurrentColor = ColorTheme || Colors.dark.backgroundcolor;
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { borderColor: CurrentColor }]}>
        <TouchableOpacity
          onPress={() => {
            router.navigate("(tabs)/addItem");
          }}
          style={[
            styles.iconWrapper,
            CurrentScreen === "search" && [
              styles.activeIcon,
              { backgroundColor: CurrentColor },
            ],
          ]}
        >
          <Svg
            width={35}
            height={35}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M13 2v9h9v2h-9v9h-2v-9h-9v-2h9v-9h2zm2-2h-6v9h-9v6h9v9h6v-9h9v-6h-9v-9z"
              fill={
                CurrentScreen === "search"
                  ? Colors.light.backgroundcolor
                  : CurrentColor
              }
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.navigate("admin/adminPage");
          }}
          style={[
            styles.iconWrapper,
            CurrentScreen === "homePage" && [
              styles.activeIcon,
              { backgroundColor: CurrentColor },
            ],
          ]}
        >
          <Svg
            width={35}
            height={35}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z"
              fill={
                CurrentScreen === "homePage"
                  ? Colors.light.backgroundcolor
                  : CurrentColor
              }
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.navigate("profile");
          }}
          style={[
            styles.iconWrapper,
            CurrentScreen === "profile" && [
              styles.activeIcon,
              { backgroundColor: CurrentColor },
            ],
          ]}
        >
          <Svg
            width={35}
            height={35}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
              fill={
                CurrentScreen === "profile"
                  ? Colors.light.backgroundcolor
                  : CurrentColor
              }
            />
          </Svg>
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
    backgroundColor: Colors.light.backgroundcolor,
    maxHeight: 70,
    minHeight: 70,
    marginHorizontal: 20,
    borderWidth: 5,
    borderRadius: 100,
    width: "100%",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
  },
  activeIcon: {
    backgroundColor: Colors.main.backgroundcolor,
    width: "30%",
    marginHorizontal: -30,
    height: 50,
  },
  icon: {
    width: 35,
    height: 35,
  },
  ProfileIcon: {
    width: 35,
    height: 42.61,
  },
});

export default AdminNavBar;
