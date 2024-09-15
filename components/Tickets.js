import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import getTickets from "../controllers/getTickets";
import CustomActivityIndicator from "./CustomActivityInicator";

export default async function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickets().then((data) => {
      setTickets(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  if (loading) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text>Tickets</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
