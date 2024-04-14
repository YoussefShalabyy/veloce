import { FlatList, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import EditCarFiled from "../../components/EditCarFiled";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";

const EditCar = () => {
    const { id } = useLocalSearchParams();
    const [brands, setBrands] = useState([]);
    const [changeBrand, setChangeBrand] = useState(false);
    const [oldCarData, setOldCarData] = useState(null);
    const [newCarData, setNewCarData] = useState(null);
    const { width, height } = useWindowDimensions();
    const attributeNames = [
        'name', 'description', 'price', 'color', 'year',
        'warranty', 'transmissionName', 'transmission', 'torque', 'topSpeed',
        'mileage', 'location', 'liter', 'horsePower', 'fuelType',
        'fuelEfficiency', 'displacement', 'condition', 'bodyType', 'acceleration'
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
                        attributeName={item}
                        oldCarData={oldCarData}
                        newCarDataController={{newCarData, setNewCarData}}
                        flexDirection={item === 'description' ? 'column' : 'row'}
                        multiline={item === 'description' ? true : false}
                    />
                )}
            />

            { brands.length > 0 &&
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.label}>Brand: </Text>
                <Picker style={styles.selectBox}
                    selectedValue={changeBrand ? newCarData.brand : oldCarData?.brand}
                    onValueChange={(itemValue) => {
                        setNewCarData({...newCarData, brand: itemValue});
                        setChangeBrand(true);
                    }}
                >
                    {brands.map((brand, index) => (
                        <Picker.Item key={index} label={brand} value={brand} />
                    ))}
                </Picker>
            </View>
            }

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

    selectBox: {
        marginBottom: 10,
        padding: 10,
        fontSize: 30,
    }
});