import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default async function loggedInBefore() {
  const checkLoggedInBefore = await AsyncStorage.getItem("skippedLogin");
  return checkLoggedInBefore == "true" ? true : false;
}
