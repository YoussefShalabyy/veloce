import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import BottomNavBar from "../../components/BottomNavBar";
import Colors from "../../constants/Colors";
import { Route } from "expo-router/build/Route";
import CarsDisplayer from "../../components/CarsDisplayer";
import Btn from "../../components/btn";

export default function Category({ route }) {
  const [cars, setCars] = useState([]);
  const [FilteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bodyTypes, setBodyTypes] = useState([]);
  const Brand = Route.params.item;
  const ColorTheme = Brand.color || Colors.main.backgroundcolor;
  const BrandName = Brand.name || "Brand";
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const getData = async () => {
    const q = query(collection(db, "cars"), where("brand", "==", BrandName));
    const querySnapshot = await getDocs(q);
    const fetchedCars = querySnapshot.docs.map((doc) => doc.data());
    setCars(fetchedCars);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const FilterCarsByBodyType = () => {
      if (selectedBodyType) {
        const filteredCars = cars.filter(
          (car) => car.bodyType === selectedBodyType
        );
        setFilteredCars(filteredCars);
      } else {
        setFilteredCars(cars);
      }
    };
    FilterCarsByBodyType();
  }, [selectedBodyType, cars]);

  useEffect(() => {
    const bodyTypes = cars.map((car) => car.bodyType);
    setBodyTypes([...new Set(bodyTypes)]);
  }, [cars]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" color={Colors.main.backgroundcolor} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.HeaderView, { backgroundColor: ColorTheme }]}>
          <View style={[styles.LogoView, { backgroundColor: ColorTheme }]}>
            <Image source={{ uri: Brand.logo }} style={styles.BrandLogo} />
          </View>
          <View style={styles.BrandData}>
            <Text style={styles.BrandName}>{BrandName}</Text>
          </View>
        </View>
        <View style={styles.bodyTypesView}>
          <FlatList
            horizontal
            data={bodyTypes}
            style={styles.BrandsList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.bodyTypeItem,
                  selectedBodyType === item && { backgroundColor: ColorTheme },
                ]}
                onPress={() =>
                  selectedBodyType === item
                    ? setSelectedBodyType(null)
                    : setSelectedBodyType(item)
                }
              >
                <Text style={styles.bodyTypeText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>

        <CarsDisplayer cars={FilteredCars} style={styles.CarsList} />
        <BottomNavBar ColorTheme={ColorTheme} />
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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 5,
  },
  LogoView: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 100,
    minHeight: 100,
    maxWidth: 140,
    minWidth: 140,
    borderRadius: 100,
  },
  BrandLogo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  BrandData: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  BrandName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyTypesView: {
    marginTop: -10,
    paddingTop: 10,
    zIndex: -1,
    minHeight: 70,
    maxHeight: 70,
    paddingHorizontal: 24,
    minWidth: "100%",
  },
  BrandsList: {
    marginTop: -10,
    backgroundColor: Colors.dark.backgroundcolor,
    maxHeight: 60,
    minHeight: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bodyTypeItem: {
    backgroundColor: Colors.light.backgroundcolor,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBodyTypeItem: {
    backgroundColor: Colors.main.backgroundcolor,
  },
  bodyTypeText: {
    fontSize: 20,
    fontWeight: "400",
  },
});
