import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import BottomNavBar from "../../components/BottomNavBar";
import Colors from "../../constants/Colors";
import logo from "../../assets/logo.png";
import { router } from "expo-router";
import { Route } from "expo-router/build/Route";
import CarDisplayer from "../../components/CarsDisplayer";
import { where, query, getDoc, doc } from "firebase/firestore";
import { set } from "lodash";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [userDocId, setUserDocId] = useState("");
  const userId = auth.currentUser.uid;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getCurrentUserDocId = async () => {
      try {
        console.log("Running query for userID:", userId);
        const q = query(collection(db, "users"), where("userID", "==", userId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No documents found for userID:", userId);
          return; // Optionally handle this case
        }
        querySnapshot.forEach((doc) => {
          console.log("Document found with ID:", doc.id);
          setUserDocId(doc.id);
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    if (userId) {
      getCurrentUserDocId();
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      if (!userDocId) return;
      try {
        const docRef = doc(db, "users", userDocId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          console.log("Document data:", docSnapshot.data());
          setUser(docSnapshot.data());
          setUserName(docSnapshot.data().name.split(" ")[0]);
          console.log(userName);
        } else {
          console.log("No such document!");
          setUser([]);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setUser([]);
      }
    };

    if (userDocId) {
      getUser();
    }
  }, [userId, userDocId]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const fetchedCars = [];
    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      carData.docId = doc.id;
      fetchedCars.push(carData);
    });
    setCars(fetchedCars);
  };

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

  useEffect(() => {
    const checkDataLoaded = async () => {
      if (brands.length != [] && cars.length != [] && userName != "") {
        setLoading(false);
      }
    };
    checkDataLoaded();
  }, [brands, cars, userName]);

  if (loading) {
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
        <View name="HeaderRowView" style={styles.HeaderView}>
          <View>
            <Text style={styles.WelcomeText}>Welcome</Text>
            <Text style={styles.UserName} numberOfLines={1} overflow="hidden">
              {userName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("rentPage")}
            style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}
          >
            <FontAwesome5 name="car-alt" size={40} color="black" />
          </TouchableOpacity>
          <View style={styles.ProfileView}>
            <Image source={logo} style={styles.ProfileIcon} />
          </View>
        </View>
        <View name="Categories" style={styles.CategoriesView}>
          <View>
            <Text style={styles.CategoryText}>Categories</Text>
          </View>
          <View style={styles.LowerView}>
            <FlatList
              horizontal
              data={brands}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.CategoryItem}
                  onPress={() => {
                    router.push("../category/" + item.name);
                    Route.params = {
                      item: item,
                    };
                  }}
                >
                  <View style={styles.OneItemContainer}>
                    <Image
                      source={{ uri: item.logo }}
                      style={[
                        styles.categoryImage,
                        { width: item.name === "Porsche" ? 200 : 50 },
                        { height: item.name === "Porsche" ? 55 : 50 },
                      ]}
                    />
                    <View
                      style={[styles.itemName, { backgroundColor: item.color }]}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: "400",
                          color: Colors.dark.backgroundcolor,
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()} // Added keyExtractor
            />
          </View>
        </View>
        {cars.length !== 0 && <CarDisplayer cars={cars} />}
        <BottomNavBar CurrentScreen={"homePage"} />
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
    minHeight: 140,
    maxHeight: 140,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  CategoryItem: {
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: "column",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  OneItemContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: 90,
    maxHeight: 90,
    marginBottom: 10,
  },
  categoryImage: {
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
    color: Colors.dark.backgroundcolor,
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
  LowerView: {
    width: "100%",
  },
  list: {
    width: "100%",
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
