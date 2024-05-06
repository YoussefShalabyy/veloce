import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import EngineIcon from "../assets/EngineIcon.png";
import GasStationIcon from "../assets/GasStationIcon.png";

const CarDisplayer = ({ cars }) => (
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
              <Text style={styles.CarItemInfoText}>{item.fuelEfficiency}</Text>
            </View>
            <View style={styles.LeftCarInfoItemView}>
              <Image source={EngineIcon} style={styles.CarItemIcon} />
              <Text style={styles.CarItemInfoText}>{item.horsePower} HP</Text>
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
);

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginTop: 10,
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
    color: Colors.dark.backgroundcolor,
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
    backgroundColor: Colors.light.secondBackground,
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
    zIndex: 1,
  },
  CarItemInfoText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark.backgroundcolor,
  },
  ItemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark.backgroundcolor,
  },
});

export default CarDisplayer;
