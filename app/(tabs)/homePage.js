import { View, Text, Button, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function HomePage() {
  const [cars, setCars] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const fetchedCars = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      fetchedCars.push(doc.data());
    });
    setCars(fetchedCars);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cars}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>${item.price}k333</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Added keyExtractor
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // Added background color
  },
  list: {
    width: "100%",
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDEDED", // Added background color
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3, // Added elevation for shadow effect
  },
  image: {
    width: 330,
    height: 200,
    borderRadius: 10, // Added border radius to match the item's border
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  desc: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    color: "blue",
    fontSize: 18,
  },
});
