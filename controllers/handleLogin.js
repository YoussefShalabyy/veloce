import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "../constants/endpoints";

export default async function handleLogin(
  username,
  password,
  setError,
  setLoading
) {
  setLoading(true);
  
  try {
    const response = await fetch(endpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.access) {
      await AsyncStorage.setItem("accessToken", data.access);
      await AsyncStorage.setItem("refreshToken", data.refresh);
      // Handle successful login (e.g., redirect to a different screen)
    } else {
      setError("المعلومات التي أدخلتها غير صحيحة");
    }
  } catch (error) {
    setError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
}