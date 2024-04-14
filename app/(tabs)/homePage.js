import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import BottomNavBar from "../../components/BottomNavBar";
import Colors from "../../constants/Colors";
import Profile from "../../assets/Profile.png";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View name="HeaderRowView" style={styles.HeaderView}>
          <View>
            <Text style={styles.WelcomeText}>Welcome</Text>
            <Text style={styles.UserName}>Abdelrahman</Text>
          </View>
          <View style={styles.ProfileView}>
            <Image source={Profile} style={styles.ProfileIcon} />
          </View>
        </View>
        <View name="Categories" style={styles.CategoriesView}>
          <View>
            <Text style={styles.CategoryText}>Categories</Text>
          </View>
          <View>
            <FlatList
              horizontal
              data={cars}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.CategoryItem}>
                  <Text>{item.brand}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()} // Added keyExtractor
            />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={cars}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.CarHeader}>
                <Text style={styles.carName}>{item.name}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.price}>${item.price}k</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()} // Added keyExtractor
        />
        <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    paddingTop: 40,
    paddingBottom: 20,
    minWidth: "100%",
    flex: 1,
    backgroundColor: Colors.light.whiteBackground,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  HeaderView: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  ProfileView: {
    backgroundColor: Colors.dark.backgroundcolor,
    padding: 10,
    height: 70,
    width: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: Colors.main.backgroundcolor,
  },
  ProfileIcon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  WelcomeText: {
    color: Colors.dark.backgroundcolor,
    fontSize: 25,
  },
  UserName: {
    fontSize: 30,
    color: Colors.dark.backgroundcolor,
    fontWeight: "bold",
  },
  CategoriesView: {
    marginTop: 20,
    maxHeight: 80,
    marginLeft: 12,
  },
  CategoryText: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  CategoryItem: {
    backgroundColor: Colors.light.backgroundcolor,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    marginTop: 20,
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
