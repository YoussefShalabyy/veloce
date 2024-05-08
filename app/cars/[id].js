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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { set } from "lodash";

export default function OneCar() {
  const item = Route.params.item;
  console.log(item);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const InfoItemDisplay = ({ title, value }) => (
    <View style={styles.InfoItem}>
      <Text style={styles.InfoItemTitle}>{title}</Text>
      <Text style={styles.InfoItemValue}>{value}</Text>
    </View>
  );

  const InfoHeading = ({ title }) => (
    <View style={styles.subheadView}>
      <Text style={styles.InfoItemTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopNavView}>
        <Text style={styles.CarName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.goBackText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
          </View>
          <View style={styles.carInfo}>
            <InfoItemDisplay title="Brand" value={item.brand} />
            <InfoItemDisplay title="Name" value={item.name} />
            <InfoItemDisplay title="Year" value={item.year} />
            {/* <InfoItemDisplay title="Color" value={item.color} /> */}
            <InfoItemDisplay title="Body Type" value={item.bodyType} />
            {/* <InfoItemDisplay title="Condition" value={item.condition} /> */}
            <InfoItemDisplay title="Gears" value={item.transmission} />
            <InfoItemDisplay
              title="Transmission
        Type"
              value={item.transmissionName}
            />
            <InfoItemDisplay title="Fuel Type" value={item.fuelType} />
            <InfoHeading title="Engine" />
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
            <InfoHeading title="Car Details" />
            <InfoItemDisplay title="Mileage" value={item.mileage} />
            <InfoItemDisplay title="Location" value={item.location} />
            {/* <InfoItemDisplay title="Warranty" value={item.warranty} /> */}
            <InfoHeading title="About Car" />
            <InfoItemDisplay title="" value={item.description} />
            <InfoHeading title="Price" />
            <InfoItemDisplay title="Price/Day" value={item.price + "$"} />
          </View>
          <DateTimePicker
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || startDate;
              setStartDate(currentDate);
            }}
          />
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              router.navigate("booking", { item: item });
            }}
          >
            <Text style={styles.bookButtonText}>Release The Beast</Text>
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
    paddingHorizontal: 20,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  TopNavView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  CarName: {
    fontSize: 30,
    fontWeight: "bold",
    maxWidth: "75%",
    flex: 1,
  },
  goBackBtn: {
    backgroundColor: Colors.dark.backgroundcolor,
    borderRadius: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  goBackText: {
    color: Colors.light.whiteBackground,
    fontSize: 30,
    fontWeight: "bold",
  },
  imageView: {
    backgroundColor: Colors.main.orange,
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
  carInfo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  InfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",

    marginBottom: 10,
  },
  InfoItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subheadView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.main.orange,
    borderRadius: 10,
    minWidth: "90%",
    margin: 10,
  },
  InfoItemValue: {
    fontSize: 18,
    fontWeight: "600",
    padding: 3,
  },
  bookButton: {
    backgroundColor: Colors.dark.backgroundcolor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    minWidth: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: Colors.light.whiteBackground,
    fontSize: 16,
    fontWeight: "bold",
  },
});
