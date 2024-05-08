import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AdminCarDisplayer from "../../components/adminCarDisplayer";
import AdminNavBar from "../../components/AdminNavBar";

export default function adminPage() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const fetchedCars = [];
    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      const carWithId = { id: doc.id, ...carData }; // Include document ID with data
      fetchedCars.push(carWithId);
    });
    setCars(fetchedCars);
  };
  return (
    <View style={{ flex: 1 }}>
      {cars.length !== 0 && <AdminCarDisplayer cars={cars} />}
    <AdminNavBar/>
    </View>
  );
}
