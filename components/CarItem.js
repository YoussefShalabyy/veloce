import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CarItem = ({ car }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleDelete = async () => {
    try {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "rents", userId);
      await deleteDoc(doc(docRef, "cars", car.id));
      console.log("Deleted");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete car. Please try again later.");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this car?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handleDelete, style: "destructive" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: car.item.images[0] }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{car.item.name}</Text>
        <Text style={styles.text}>
          Rent Days: <Text style={{ fontWeight: 600 }}>{car.numberOfDays}</Text>
        </Text>
        <Text style={styles.text}>
          Start Date:{" "}
          <Text style={{ fontWeight: 600 }}>{formatDate(car.startDate)}</Text>{" "}
        </Text>
        <Text style={styles.text}>
          End Date:{" "}
          <Text style={{ fontWeight: 600 }}>{formatDate(car.endDate)}</Text>
        </Text>
        <Text style={styles.text}>
          Price: <Text style={{ fontWeight: 600 }}>${car.totalPrice}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={confirmDelete}>
        <Feather name="trash-2" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 17,
    marginBottom: 2,
  },
});

export default CarItem;
