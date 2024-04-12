import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';


export default function _layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="homePage"
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="addItem"
        options={{
          tabBarIcon: () => <FontAwesome name="camera" size={24} color="black" />,
          tabBarLabel: "AddItem",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <FontAwesome name="user-circle-o" size={24} color="black" />,
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
