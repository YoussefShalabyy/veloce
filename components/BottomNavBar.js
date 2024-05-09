import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Search from "../assets/Search.png";
import Profile from "../assets/Profile.png";
import SelectedProfile from "../assets/SelectedProfile.png";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import Home from "../assets/Home.png";

const BottomNavBar = ({ CurrentScreen, ColorTheme }) => {
  const CurrentColor = ColorTheme || Colors.dark.backgroundcolor;
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, { borderColor: CurrentColor }]}>
        <TouchableOpacity
          onPress={() => {
            router.navigate("homePage");
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
            router.navigate("(tabs)/search");
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
              d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
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
            router.navigate("rentPage");
          }}
          style={[
            styles.iconWrapper,
            CurrentScreen === "rent" && [
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
              d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
              fill={
                CurrentScreen === "rent"
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
    paddingHorizontal: 20,
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
    width: "25%",
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

export default BottomNavBar;
