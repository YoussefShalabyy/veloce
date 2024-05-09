import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import CarItem from "../../components/CarItem";
import { router } from "expo-router";

const RentPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cars]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cars.forEach((car) => {
      totalPrice += parseFloat(car.totalPrice);
    });
    setTotalPrice(totalPrice.toFixed(2));
  };

  const getData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "rents", userId);
      const querySnapshot = await getDocs(collection(docRef, "cars"));
      const fetchedCars = [];
      querySnapshot.forEach((doc) => {
        const carData = doc.data();
        const carWithId = { id: doc.id, ...carData };
        fetchedCars.push(carWithId);
      });
      setCars(fetchedCars);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await deleteDoc(doc(db, "cars", carId));
      const updatedCars = cars.filter((car) => car.id !== carId);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (cars.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          You haven't rented any cars yet...
        </Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Search for your favorite car</Text>
          <TouchableOpacity onPress={() => router.push("search")}>
            <FontAwesome name="search" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="back" size={44} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Rents</Text>
      </View>
      <Text style={{ fontSize: 30,marginBottom:10, fontWeight: 600 }}>
        Total Price: ${totalPrice}
      </Text>
      <FlatList
        style={{ width: "100%" }}
        data={cars}
        renderItem={({ item }) => (
          <CarItem car={item} onDelete={() => handleDeleteCar(item.id)} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
  emptyContainer: {
    marginLeft: "10%",
    alignItems: "flex-start",
    marginTop: 100,
    width: "100%",
    justifyContent: "flex-start",
  },
  emptyText: {
    fontSize: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  searchText: {
    fontSize: 25,
    marginRight: 10,
  },
});

export default RentPage;
