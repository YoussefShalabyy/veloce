import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import CarDisplayer from "../../components/CarsDisplayer";

export default function rentPage() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
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
    console.log(fetchedCars);
  };
  return (
    <View style={{alignItems:"center",justifyContent:"center"}}>
      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <View>
            <Text>{item.numberOfDays} days</Text>
            <Text>{item.totalPrice}$</Text>
          </View>
        )}
      />
    </View>
  );
}
