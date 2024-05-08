import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Route } from "expo-router/build/Route";

export default function OneCar() {
  const item = Route.params.item;
  console.log(item);

  const InfoItemDisplay = ({ title, value }) => (
    <View style={styles.InfoItem}>
      <Text style={styles.InfoItemTitle}>{title}</Text>
      <Text style={styles.InfoItemValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <TouchableOpacity style={styles.goBackBtn}>
            <Text>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goBackBtn}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          </View>
          <InfoItemDisplay title="Brand" value={item.brand} />
          <InfoItemDisplay title="Name" value={item.name} />
          <InfoItemDisplay title="Year" value={item.year} />
          <InfoItemDisplay title="Color" value={item.color} />
          <InfoItemDisplay title="Body Type" value={item.bodyType} />
          <InfoItemDisplay title="Condition" value={item.condition} />
          <InfoItemDisplay title="Transmission" value={item.transmission} />
          <InfoItemDisplay
            title="Transmission
        Name"
            value={item.transmissionName}
          />
          <InfoItemDisplay title="Fuel Type" value={item.fuelType} />
          <InfoItemDisplay title="Displacement" value={item.displacement} />
          <InfoItemDisplay title="Liter" value={item.liter} />
          <InfoItemDisplay title="Horse Power" value={item.horsePower} />
          <InfoItemDisplay title="Torque" value={item.torque} />
          <InfoItemDisplay title="Top Speed" value={item.topSpeed} />
          <InfoItemDisplay title="Acceleration" value={item.acceleration} />
          <InfoItemDisplay
            title="Fuel Efficiency"
            value={item.fuelEfficiency}
          />
          <InfoItemDisplay title="Mileage" value={item.mileage} />
          <InfoItemDisplay title="Location" value={item.location} />
          <InfoItemDisplay title="Price" value={item.price} />
          <InfoItemDisplay title="Warranty" value={item.warranty} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.navigate("booking", { item: item });
            }}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  goBackBtn: {
    backgroundColor: Colors.dark.backgroundcolor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageView: {
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  InfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  InfoItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
