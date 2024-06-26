import { ScrollView, SafeAreaView, StatusBar, StyleSheet, View, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import EditCarField from "../../components/EditCarField";
import GlobalStyles from "../../style/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Brand from "../../controllers/Brand";
import Car from "../../controllers/Car";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const EditCar = () => {
    const { width, height } = useWindowDimensions();

    const { id } = useLocalSearchParams();
    const car = new Car(id);

    const [isLoading, setIsLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [carData, setCarData] = useState(null);
    const [updatedCarData, setUpdatedCarData] = useState(null);

    console.log(carData);

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

    const getCar = async () => {
        try {
            const carData = await car.get();
            setCarData(carData); 
            await AsyncStorage.setItem('car', JSON.stringify({ id: id, name: carData.name, images: carData.images }));
        } catch (error) {
            console.log(error);
        }
    }

    const getBrands = async () => {
        try {
            const brands = await Brand.getBrands();
            setBrands(brands);
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            setIsLoading(true);
            await getCar();
            await getBrands();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateCar = async () => {
        try {
            if (updatedCarData != null) {
                setIsLoading(true);
                const carId = await car.update(updatedCarData);
                console.log(`Car with id ${carId} is updated!`);
            }
    
            await AsyncStorage.removeItem('car');
            console.log("The car was romoved from AasyncStorage!");
                    
            router.replace(`/`);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCar = async () => {
        try {
            setIsLoading(true);
            const carId = await car.delete();
            console.log(carId, 'deleted!');
            router.replace('/');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fields = attributeNames.map(item =>
        <EditCarField
            attributeName={item.name}
            placeHolder={item.placeHolder}
            carData={carData}
            updatedCarDataController={{updatedCarData, setUpdatedCarData}}
            flexDirection={item.name === 'brand' ? 'column' : 'row'}
            multiline={item.name === 'description' ? true : false}
            choices={item.name === 'brand' ? brands : []}
            key={item.name + 'Attr'}
        />
    );

    useEffect(() => {
        getData();
    }, []);

    if (isLoading)
        return <Loading />

    return (
        <SafeAreaView style={[GlobalStyles.container, {width: width, backgroundColor: Colors.light.whiteBackground, }]}>
             <TouchableOpacity
            onPress={() => router.back()}
            style={{width:"100%"}}
          >
            <AntDesign style={{marginLeft:"5%"}} name="back" size={44} color="black" />
          </TouchableOpacity>
            <ScrollView style={{ flex: 1, width: width, paddingHorizontal: 10 }} >
                {fields}
            </ScrollView>

            <View style={styles.buttons}>
                <Btn style={styles.button} text='Update' onPress={updateCar} />
                <Btn style={styles.button} text='Delete' onPress={deleteCar} color={'rgb(255, 50, 70)'} />
            </View>

            <StatusBar hidden />
        </SafeAreaView>
    )
}

export default EditCar;

const styles = StyleSheet.create({
    buttons: {
        flex: .1,
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