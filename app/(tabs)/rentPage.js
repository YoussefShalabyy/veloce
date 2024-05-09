import { View, Text, FlatList ,StyleSheet,Image,TextInput,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import CarDisplayer from "../../components/CarsDisplayer";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';




export default function rentPage() {
  const [cars, setRentedCars] = useState([]);
  const [userId, setUserId] = useState(null); // State to store user id

    useEffect(() => {
      fetchUserId(); // Fetch userId once component mounts
    }, []);

  // useEffect(()=>{
  //   fetchData()},[]);

 useEffect(() => {
      if (userId) {
        fetchData(); // Fetch data only if userId is available
      }
    }, [userId]); // Execute only when userId changes
      // Function to fetch user id
    const fetchUserId = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid); // Set userId state
      }
    };


  const fetchData = async () => {
    try {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "rents", userId);
      const querySnapshot = await getDocs(collection(docRef, "cars"));
      const fetchedRentedCars = [];
      querySnapshot.forEach((doc) => {
        const carData = doc.data();
        const carWithId = { id: doc.id, ...carData };
        fetchedRentedCars.push(carWithId);
      });
      setRentedCars(fetchedRentedCars);
      console.log(fetchedRentedCars);
    } catch (error) {
      console.error("Error fetching rented cars:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date.seconds * 1000).toLocaleDateString();
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => {
            router.back();
          }}
        >
          {/* <Text style={styles.goBackText}>{"<="}</Text> */}
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
     <FlatList
      data={cars}
      renderItem={({ item }) => (
       <View style={styles.detailsContainer}>
          <View style={styles.imageView}>
            <Image source={{ uri: item.item.images[0] }} style={styles.image} />
          </View>
          <View style={styles.infoView}>
              <View>
                <Text style={styles.detailText}>name : {item.item.name}</Text>
                <Text style={styles.detailText}>Brand: {item.item.brand}</Text>
                <View style={styles.detailText}>color: <View style={[styles.colorView, { backgroundColor: item.item.color }]} /> </View>
              </View>
              <View>
                <Text style={styles.detailText}>The Start Date : {formatDate(item.startDate)}</Text>
                <Text style={styles.detailText}>The End Date : {formatDate(item.endDate)}</Text>
                <Text style={styles.detailText}> The Number Of Days :  {item.numberOfDays} days</Text>
                <Text style={styles.detailText}>Total Price : {item.totalPrice}$</Text> 
              </View>
              <View>
                <Text style={styles.detailText}> {item.item.description}</Text>
              </View>
          </View>
        </View>
      )}
    /> 
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  detailsContainer: {
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,

  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  colorView: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  goBackBtn: {
    backgroundColor: Colors.main.orange,
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
});
