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
import EngineIcon from "../../assets/EngineIcon.png";
import GasStationIcon from "../../assets/GasStationIcon.png";

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
  const [brands, setBrands] = useState([]);
  const getBrands = async () => {
    const querySnapshot = await getDocs(collection(db, "Brand"));
    setBrands([]);
    querySnapshot.forEach((doc) => {
      setBrands((brands) => [...brands, doc.data()]);
    });
  };

  useEffect(() => {
    getData();
    getBrands();
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
              data={brands}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.CategoryItem}>
                  <Image
                    source={{ uri: item.logo }}
                    style={styles.categoryImage}
                  />
                  <View
                    style={[styles.itemName, { backgroundColor: item.color }]}
                  >
                    <Text
                      style={{ fontSize: 25, fontWeight: "400" }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
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

              {item.images && item.images.length > 0 && (
                <Image
                  source={{ uri: item.images[0] }} // Display the first image from the array
                  style={styles.image}
                />
              )}

              {/* <Image source={{ uri: item.image }} style={styles.image} /> */}

              <View style={styles.CarInfo}>
                <View style={styles.CarInfoLeftSection}>
                  <View style={styles.LeftCarInfoItemView}>
                    <Image source={GasStationIcon} style={styles.CarItemIcon} />
                    <Text style={styles.CarItemInfoText}>
                      {item.fuelEfficiency}
                    </Text>
                  </View>
                  <View style={styles.LeftCarInfoItemView}>
                    <Image source={EngineIcon} style={styles.CarItemIcon} />
                    <Text style={styles.CarItemInfoText}>
                      {item.horsePower} HP
                    </Text>
                  </View>
                </View>
                <View style={styles.CarInfoRightSection}>
                  <Text style={styles.ItemPrice}>${item.price}</Text>
                </View>
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
    maxHeight: 90,
    marginLeft: 12,
  },
  CategoryItem: {
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
    minWidth: 100,
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    zIndex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 35,
  },
  CategoryText: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  itemName: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.backgroundcolor,
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 25,
    borderRadius: 10,
    minWidth: 100,
    maxWidth: 100,
  },

  list: {
    width: "100%",
    marginTop: 50,
    marginBottom: 35,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDEDED",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  image: {
    width: 330,
    height: 160,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  CarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  carName: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  CarInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  CarInfoLeftSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  CarInfoRightSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  LeftCarInfoItemView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.whiteBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  CarItemIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  CarItemInfoText: {
    fontSize: 18,
    fontWeight: "600",
  },
  ItemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark.backgroundcolor,
  },
  desc: {
    fontSize: 16,
    marginBottom: 5,
  },
});
