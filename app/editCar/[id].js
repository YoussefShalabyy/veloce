import { FlatList, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import EditCarFiled from "../../components/EditCarFiled";
import Colors from "../../constants/Colors";

const EditCar = () => {
    const { id } = useLocalSearchParams();
    const [brands, setBrands] = useState([]);
    const [oldCarData, setOldCarData] = useState(null);
    const [newCarData, setNewCarData] = useState(null);
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
            setOldCarData(doc.data());
        })
        .catch(error => console.log(error));
    }

    const updateCar = () => {
        if (newCarData != null) {
            const carRef = doc(db, 'cars', id);
            updateDoc(carRef, newCarData)
            .then(() => {console.log('Updated', newCarData)})
            .catch(error => console.error(error));
        }
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
        <View style={[styles.container, {width: width, height: height - 80}]}>
            <View style={{ flex: .25 }}>
                <Text style={styles.label}>Edit {oldCarData?.name}</Text>
            </View>
            <View style={{display: 'flex', flex: 5, justifyContent: 'center', alignContent: 'center'}}>
            <FlatList
                data={attributeNames}
                renderItem={({ item }) => (
                    <EditCarFiled
                        attributeName={item.name}
                        placeHolder={item.placeHolder}
                        oldCarData={oldCarData}
                        newCarDataController={{newCarData, setNewCarData}}
                        flexDirection={item.name === 'description' || item.name === 'brand' ? 'column' : 'row'}
                        multiline={item.name === 'description' ? true : false}
                        choices={item.name === 'brand' ? brands : []}
                    />
                )}
                />
                </View>

            <View style={styles.buttons}>
                <Btn style={styles.button} text='Update' onPress={updateCar} />
                <Btn style={styles.button} text='Delete' onPress={deleteCar} color={'rgb(255, 50, 70)'} />
            </View>
        </View>
    )
}

export default EditCar;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.light.backgroundcolor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    buttons: {
        flex: 1,
    },

    button: {
        marginVertical: 5
    }
});