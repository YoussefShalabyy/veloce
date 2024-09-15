import AsyncStorage from "@react-native-async-storage/async-storage";
import getAccessToken from "./getAccessToken";

export default async function isAuthenticated() {
  const accessToken = await getAccessToken();
  return accessToken ? true : false;
}
