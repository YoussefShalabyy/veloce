import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAccessToken() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    return accessToken;
    }
