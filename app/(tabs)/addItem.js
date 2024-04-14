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
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Colors from "../../constants/Colors";

export default function Add() {
  const [brandList, setBrandList] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading]=useState(false);

  const getBrandList = async () => {
    const querySnapshot = await getDocs(collection(db, "Brand"));
    const brands = [];
    querySnapshot.forEach((doc) => {
      brands.push(doc.data().name);
    });
    setBrandList(brands);
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Enable multiple selection
    });
  
    if (!result.cancelled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  const handleOnSubmit = async (values) => {
    
    if (!values.name) {
      alert("Must Add Name");
      return;
    }
    setLoading(true);
  
    try {
      const storage = getStorage();
      const downloadUrls = [];
  
      for (const image of images) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        downloadUrls.push(downloadUrl);
      }
  
      values.images = downloadUrls;
  
      try {
        const docRef = await addDoc(collection(db, "cars"), values);
        if (docRef.id) {
          alert("added....!!")
          setLoading(false);
          setImages([]);
        }
      } catch (error) {
        console.error("Error adding car:", error);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      return;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Add New Car</Text>
        <ScrollView>
          <Formik
            initialValues={{
              name: "",
              color: "",
              description: "",
              brand: "Porsche",
              price: "",
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
              bodyType: "",
              acceleration: "",
            }}
            onSubmit={handleOnSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <View style={styles.formContainer}>
                {images.length > 0 ? (
                  <FlatList
                    data={images}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={pickImage}>
                        <Image source={{ uri: item }} style={styles.image} />
                      </TouchableOpacity>
                    )}
                    horizontal
                  />
                ) : (
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      style={styles.image}
                      source={require("../../assets/placeholder.png")}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={pickImage}>
                  <Text style={styles.addMoreImagesText}>Add Images</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={values?.name}
                  onChangeText={handleChange("name")}
                />
                <TextInput
                  style={[styles.input, { paddingTop: 10 }]}
                  placeholder="Description"
                  multiline={true}
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

                {/* Add more text inputs for other fields */}
                <Picker
                  selectedValue={values?.brand}
                  onValueChange={(itemValue) =>
                    setFieldValue("brand", itemValue)
                  }
                >
                  {brandList.map((brand, index) => (
                    <Picker.Item key={index} label={brand} value={brand} />
                  ))}
                </Picker>
                <Pressable
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                    styles.submitButton,
                  ]}
                >
                  {loading?(<ActivityIndicator color='#fff'/>):( <Text style={styles.submitButtonText}>Submit</Text>)}
                 
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
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  addMoreImagesText: {
    color: "blue",
    marginTop: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#008080",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
