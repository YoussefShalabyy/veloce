import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Route } from "expo-router/build/Route";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { set } from "lodash";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
const formatDate = (rowDate) => {
  let date = new Date(rowDate);

  let year = date.getFullYear();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  let day = date.getDate();
  return `${day} ${month} ${year}`;
};

export default function OneCar() {
  const item = Route.params.item;
  const todayDate = new Date();
  console.log(item);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateString, setStartDateString] = useState(formatDate(todayDate)); // Set startDateString to today's date
  const [endDateString, setEndDateString] = useState(formatDate(todayDate));
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const NoOfDays = () => {
    const Ms = endDate.getTime() - startDate.getTime();
    let Days = Math.abs(Ms) / (1000 * 60 * 60 * 24);
    if (Days - Math.floor(Days) >= 0.5) {
      Days = Math.ceil(Days);
    } else {
      Days = Math.floor(Days);
    }
    setNumberOfDays(Days);
  };
  useEffect(() => {
    NoOfDays();
  }, [startDate, endDate]);

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
  const handleAddToRentList = async () => {
    try {
      if (numberOfDays == 0) {
        Alert.alert("Please Enter The number of days");
        return;
      }
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "rents", userId);
      const carRef = collection(docRef, "cars");
      const newDoc = await addDoc(carRef, {
        totalPrice: numberOfDays * item.price,
        startDate,
        endDate,
        numberOfDays,
        item,
      });
      console.log("item.id", item.id);
      console.log("new Car id", newDoc.id);
      setStartDate(new Date());
      setEndDate(new Date());
      setStartDateString(formatDate(new Date()));
      setEndDateString(formatDate(new Date()));
      setToggled(!toggled);
      Alert.alert("Added..!");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createUserIfNotExist();
  }, []);
  const createUserIfNotExist = async () => {
    const userId = auth.currentUser.uid;
    try {
      await setDoc(doc(db, "rents", userId), {
        userId,
      });
      console.log("added A User With Id:", userId);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleDatePicker1 = () => {
    setShowPicker1(!showPicker1);
  };
  const onChange1 = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setStartDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker1();
        setStartDateString(formatDate(currentDate));
      }
      console.log("StartDate", currentDate, startDate);
    } else {
      toggleDatePicker1();
    }
  };
  const toggleDatePicker2 = () => {
    setShowPicker2(!showPicker2);
  };
  const onChange2 = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setEndDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker2();
        setEndDateString(formatDate(currentDate));
      }
    } else {
      toggleDatePicker2();
    }
  };

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
          {toggled ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                alignItems: "center",
              }}
            >
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    if (selectedDate < new Date() || selectedDate > endDate) {
                      if (event.type === "set") {
                        alert("Invalid date");
                        setStartDate(new Date());
                      }
                      return;
                    } else {
                      const currentDate = selectedDate;
                      setStartDate(currentDate);
                    }
                  }}
                />
              ) : (
                <TouchableOpacity onPress={toggleDatePicker1}>
                  <TextInput //--------
                    style={styles.input}
                    value={startDateString}
                    onChangeText={setStartDateString}
                    placeholder="11 May 2024"
                    placeholderTextColor="black"
                    editable={false}
                  />
                </TouchableOpacity>
              )}
              {showPicker1 && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={onChange1}
                  minimumDate={new Date()}
                  maximumDate={endDate}
                />
              )}

              <Text style={styles.To}>To</Text>

              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate;
                    if (currentDate < new Date() || currentDate < startDate) {
                      if (event.type === "set") {
                        alert("Invalid date");
                        setEndDate(startDate);
                      }
                      return;
                    } else {
                      setEndDate(currentDate);
                    }
                  }}
                />
              ) : (
                <TouchableOpacity onPress={toggleDatePicker2}>
                  <TextInput //------
                    style={styles.input}
                    value={endDateString}
                    onChangeText={setEndDateString}
                    placeholder="11 May 2024"
                    placeholderTextColor="black"
                    editable={false}
                  />
                </TouchableOpacity>
              )}
              {showPicker2 && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={onChange2}
                  minimumDate={startDate}
                />
              )}
            </View>
          ) : (
            <View></View>
          )}
          {toggled && (
            <View style={{ marginTop: 10 }}>
              <InfoItemDisplay
                title="Number of Days"
                value={numberOfDays.toString()}
              />
              <View>
                <Text>
                  Total Price:{" "}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {numberOfDays * item.price}$
                  </Text>{" "}
                </Text>
              </View>
            </View>
          )}

          {toggled ? (
            <View>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleAddToRentList}
              >
                <Text style={styles.bookButtonText}>Add To Rent List</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => {
                  setToggled(!toggled);
                }}
              >
                <Text style={styles.bookButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            //----------------------------------------------------------------
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                setToggled(!toggled);
              }}
            >
              <Text style={styles.bookButtonText}>Release The Beast</Text>
            </TouchableOpacity>
          )}
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
  To: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    minWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    color: "#333333",
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#e3ded8",
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
