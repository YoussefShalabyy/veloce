import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, View, useWindowDimensions } from "react-native";
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

    const updateCar = () => {
        if (updatedCarData != null) {
            car.update(updatedCarData)
            .then(carId => console.log(`Car with id ${carId} is updated!`))
            .catch(error => console.log(error));
        }

        AsyncStorage.removeItem('car')
                .then(() => console.log("The car was romoved from AasyncStorage!"))
                .catch(error => console.log(error));
                
        router.replace(`/`);
    }

    const deleteCar = () => {
        car.delete()
        .then(carId => {
            console.log(carId, 'deleted!');
            router.replace('/');
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getCar()
        .then(getBrands)
        .then(() => setIsLoading(false))
        .catch(error => console.log(error));
    }, []);

    if (isLoading)
        return <Loading />

    return (
        <SafeAreaView style={[GlobalStyles.container, {width: width, height: height - 50, backgroundColor: Colors.light.whiteBackground, }]}>
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