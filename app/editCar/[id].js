import { FlatList, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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
            placeHolder: 'TransmissionName',
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
            placeHolder: 'HorsePower',
        },
        {
            name: 'fuelType',
            placeHolder: 'FuelType',
        },
        {
            name: 'fuelEfficiency',
            placeHolder: 'FuelEfficiency',
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

    useEffect(() => {
        getCar();
        getBrands();
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.container, {width: width, height: height}]}>
            <Text style={styles.label}>Edit {oldCarData?.name}</Text>
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

            <Btn text='Update' onPress={updateCar} />
        </ScrollView>
    )
}

export default EditCar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundcolor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1
    },
});