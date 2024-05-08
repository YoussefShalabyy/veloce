import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import CarDisplayer from "../../components/CarsDisplayer";
import BottomNavBar from "../../components/BottomNavBar";
import Colors from "../../constants/Colors";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(
      query(
        collection(db, "cars"),
        where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff")
      )
    );
    const fetchedCars = [];
    querySnapshot.forEach((doc) => {
      const carData = doc.data();
      carData.docId = doc.id;
      fetchedCars.push(carData);
    });
    setSearchResults(fetchedCars);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.searchBarView}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
            value={searchQuery}
            placeholder="Search for cars..."
            on
          />
          <TouchableOpacity onPress={search} style={styles.searchButton}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.checkContainer}>
            <ActivityIndicator size="large" color={Colors.main.orange} />
          </View>
        )}
        {
            !loading && searchResults.length == 0 && (
                <View style={styles.checkContainer}>
                    <Text>No results found</Text>
                </View>
            )
            
        }

        <CarDisplayer cars={searchResults} />
        <BottomNavBar CurrentScreen="search" />
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
  searchBarView: {
    minWidth: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    position: "absloute",
    top: 0,
  },
  searchBar: {
    backgroundColor: Colors.light.backgroundcolor,
    height: 60,
    borderWidth: 5,
    borderRadius: 100,
    padding: 10,
  },
  searchButton: {
    position: "absolute",
    right: 30,
    top: 10,
    backgroundColor: Colors.main.orange,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  checkContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "75%",
  },
});
