import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, addDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Colors from "../../constants/Colors";

export default function Add() {
  const [brandList, setBrandList] = useState([]);
  const getBrandList = async () => {
    const querySnapshot = await getDocs(collection(db, "Brand"));
    setBrandList([]);
    querySnapshot.forEach((doc) => {
      setBrandList((brandList) => [...brandList, doc.data()]);
    });
  };
  useEffect(() => {
    getBrandList();
  }, []);

  // بنجيب صوره مالجهاز
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const storage = getStorage();

  const handleOnSubmit = async (value) => {
    try {
      // uri to blob
      const resp = await fetch(image);
      const blob = await resp.blob(); // Assuming image is already a Blob object
      const storage = getStorage();
      const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
      // Upload image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, blob);
      // Get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);

      console.log("Uploaded image to Firebase Storage");
      console.log("Download URL:", downloadUrl);

      // Set the download URL in the value object
      value.image = downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    const docRef = await addDoc(collection(db, "cars"), value);
    if (docRef.id) {
      console.log("added....!!!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text
          style={{ fontWeight: "bold", fontSize: 25, marginHorizontal: 23 }}
        >
          Add New Car
        </Text>
        <ScrollView>
        <Formik
          initialValues={{
            name: "",
            color: "",
            description: "",
            brand: "",
            price: "",
            image: "",
            year: "",
            warranty: "",
            transmissionName: "",
            transmission: "",
            torque: "",
            topSpeed: "",
            mileage: "",
            location: "",
            liter: "",
            horsePower: "",
            fuelType: "",
            fuelEfficiency: "",
            displacement: "",
            condition: "",
            brand: "",
            bodyType: "",
            acceleration: "",
          }}
          onSubmit={(value) => {
            handleOnSubmit(value);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              alert("title must be there");

              errors.name = "Must add name";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View style={styles.cont}>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Image
                    style={styles.image}
                    source={require("../../assets/placeholder.png")}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={values?.name}
                onChangeText={handleChange("name")}
              />
              <TextInput
                style={[styles.input, { minHeight: 100, paddingTop: 8 }]}
                placeholder="Description"
                multiline={true}
                numberOfLines={5}
                value={values?.description}
                onChangeText={handleChange("description")}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="number-pad"
                value={values?.price}
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Color"
                value={values?.color}
                onChangeText={handleChange("color")}
              />
              <TextInput
                style={styles.input}
                placeholder="Year"
                value={values?.year}
                onChangeText={handleChange("year")}
              />
              <TextInput
                style={styles.input}
                placeholder="Warranty"
                value={values?.warranty}
                onChangeText={handleChange("warranty")}
              />
              <TextInput
                style={styles.input}
                placeholder="Transmission Name"
                value={values?.transmissionName}
                onChangeText={handleChange("transmissionName")}
              />
              <TextInput
                style={styles.input}
                placeholder="Transmission"
                value={values?.transmission}
                onChangeText={handleChange("transmission")}
              />
              <TextInput
                style={styles.input}
                placeholder="Torque"
                value={values?.torque}
                onChangeText={handleChange("torque")}
              />
              <TextInput
                style={styles.input}
                placeholder="Top Speed"
                value={values?.topSpeed}
                onChangeText={handleChange("topSpeed")}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Mileage"
                value={values?.mileage}
                onChangeText={handleChange("mileage")}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={values?.location}
                onChangeText={handleChange("location")}
              />
              <TextInput
                style={styles.input}
                placeholder="Liter"
                value={values?.liter}
                onChangeText={handleChange("liter")}
              />
              <TextInput
                style={styles.input}
                placeholder="Horse Power"
                value={values?.horsePower}
                onChangeText={handleChange("horsePower")}
              />
              <TextInput
                style={styles.input}
                placeholder="Fuel Type"
                value={values?.fuelType}
                onChangeText={handleChange("fuelType")}
              />
              <TextInput
                style={styles.input}
                placeholder="Fuel Efficiency"
                value={values?.fuelEfficiency}
                onChangeText={handleChange("fuelEfficiency")}
              />
              <TextInput
                style={styles.input}
                placeholder="Displacement"
                value={values?.displacement}
                onChangeText={handleChange("displacement")}
              />
              <TextInput
                style={styles.input}
                placeholder="Condition"
                value={values?.condition}
                onChangeText={handleChange("condition")}
              />
              <TextInput
                style={styles.input}
                placeholder="Brand"
                value={values?.brand}
                onChangeText={handleChange("brand")}
              />
              <TextInput
                style={styles.input}
                placeholder="Body Type"
                value={values?.bodyType}
                onChangeText={handleChange("bodyType")}
              />
              <TextInput
                style={styles.input}
                placeholder="Acceleration"
                value={values?.acceleration}
                onChangeText={handleChange("acceleration")}
              />

              <Picker
                selectedValue={values?.brand}
                onValueChange={(itemValue) => setFieldValue("brand", itemValue)}
              >
                {brandList &&
                  brandList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.2 : 1,
                  },
                  styles.pressable,
                ]}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
              </Pressable>
            </View>
          )}
        </Formik>
        </ScrollView>
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
  input: {
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 17,
    borderRadius: 10,
    fontSize: 19,
    marginHorizontal: 20,
    marginTop: 10,
  },
  pressable: {
    padding: 15,
    backgroundColor: "#008080",
    width: "70%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: "15%",
  },
  image: {
    width: 300,
    height: 200,
    marginLeft: 25,
    marginTop: 5,
    borderRadius: 10,
  },
});
