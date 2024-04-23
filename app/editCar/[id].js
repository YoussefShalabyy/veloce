import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Link, router, useLocalSearchParams } from 'expo-router';
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import EditCarField from "../../components/EditCarField";
import GlobalStyles from "../../style/global";
import MyLink from "../../components/MyLink";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditCar = () => {
    const { id } = useLocalSearchParams();
    const [brands, setBrands] = useState([]);
    const [carData, setCarData] = useState(null);
    const [updatedCarData, setUpdatedCarData] = useState(null);
    const { width, height } = useWindowDimensions();

    const attributeNames = [
        {
            name: 'name',
            placeHolder: 'Name',
        },
        {
            name: 'description',
            placeHolder: 'Description',
        },
        {
            name: 'price',
            placeHolder: 'Price',
        },
        {
            name: 'color',
            placeHolder: 'Color',
        },
        {
            name: 'year',
            placeHolder: 'Year',
        },
        {
            name: 'warranty',
            placeHolder: 'Warranty',
        },
        {
            name: 'transmissionName',
            placeHolder: 'Transmission name',
        },
        {
            name: 'transmission',
            placeHolder: 'Transmission',
        },
        {
            name: 'torque',
            placeHolder: 'Torque',
        },
        {
            name: 'topSpeed',
            placeHolder: 'Top speed',
        },
        {
            name: 'mileage',
            placeHolder: 'Mileage',
        },
        {
            name: 'location',
            placeHolder: 'Location',
        },
        {
            name: 'liter',
            placeHolder: 'Liter',
        },
        {
            name: 'horsePower',
            placeHolder: 'Horse power',
        },
        {
            name: 'fuelType',
            placeHolder: 'Fuel type',
        },
        {
            name: 'fuelEfficiency',
            placeHolder: 'Fuel efficiency',
        },
        {
            name: 'displacement',
            placeHolder: 'Displacement',
        },
        {
            name: 'condition',
            placeHolder: 'Condition',
        },
        {
            name: 'bodyType',
            placeHolder: 'Body Type',
        },
        {
            name: 'acceleration',
            placeHolder: 'Acceleration',
        },
        {
            name: 'brand',
            placeHolder: 'Brand',
        },
    ]

    const getBrands = async () => {
        const querySnapshot = await getDocs(collection(db, "Brand"));
        let fetchedBrands = [];
        querySnapshot.forEach((doc) => {
          fetchedBrands.push(doc.data().name);
        });
        setBrands(fetchedBrands);
      };
    

    const getCar = () => {
        const carRef = doc(db, 'cars', id);
        getDoc(carRef)
        .then(doc => {
            console.log(doc.id + ' => ' , doc.data());
            setCarData(doc.data());
            AsyncStorage.setItem('car', JSON.stringify({ id: id, name: doc.data().name, images: doc.data().images }));
        })
        .catch(error => console.log(error));
    }

    const updateCar = () => {
        if (updatedCarData != null) {
            const carRef = doc(db, 'cars', id);
            updateDoc(carRef, updatedCarData)
            .then(() => {
                console.log('Updated', updatedCarData);
            })
            .catch(error => console.error(error));
        }

        AsyncStorage.removeItem('car')
                .then(() => console.log("The car was romoved from AasyncStorage!"))
                .catch(error => console.log(error));
                
        router.replace(`/`);
    }

    const deleteCar = () => {
        deleteDoc(doc(db, 'cars', id))
        .then(() => {
            console.log(id, 'deleted!');
            router.replace('/');
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getCar();
        getBrands();
    }, []);

    return (
        <SafeAreaView style={[GlobalStyles.container, {width: width, height: height - 50 }]}>
            <FlatList
                data={attributeNames}
                renderItem={({ item }) => (
                    <EditCarField
                        attributeName={item.name}
                        placeHolder={item.placeHolder}
                        carData={carData}
                        updatedCarDataController={{updatedCarData, setUpdatedCarData}}
                        flexDirection={item.name === 'description' || item.name === 'brand' ? 'column' : 'row'}
                        multiline={item.name === 'description' ? true : false}
                        choices={item.name === 'brand' ? brands : []}
                    />
                )}
                style={{ flex: 1, width: width, paddingHorizontal: 10 }}
            />

            <View style={styles.buttons}>
                <Btn style={styles.button} text='Update' onPress={updateCar} />
                <Btn style={styles.button} text='Delete' onPress={deleteCar} color={'rgb(255, 50, 70)'} />
                {/* <Btn style={styles.button} text='Edit Images' onPress={() => router.navigate('/editCar/editImages')} /> */}
            </View>

            <StatusBar hidden />
        </SafeAreaView>
    )
}

export default EditCar;

const styles = StyleSheet.create({
    buttons: {
        flex: .1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    button: {
        marginHorizontal: 5,
        padding: 5,
        fontSize: 15,
        flex: 1,
    }
});