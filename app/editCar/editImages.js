import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagesPicker from "../../controllers/ImagesPicker";
import Car from "../../controllers/Car";
import StorageImage from "../../controllers/StorageImage";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const EditCarImages = () => {
    const { width, height } = useWindowDimensions();

    const [isLoading, setIsLoading] = useState(false);
    
    const [id, setId] = useState('');
    const [carName, setCarName] = useState('');
    const [currentImages, setCurrentImages] = useState([]);

    const [selectedImage, setSelectedImage] = useState('');
    const [deletedImages, setDeletedImages] = useState([]);
    const [addedImages, setAddedImages] = useState([]);

    console.log('selectedImage=', selectedImage)
    console.log('deleted images=', deletedImages);
    console.log('current images=', currentImages);
    console.log('Added images=', addedImages);

    let unsub = null;

    useEffect(() => {
        AsyncStorage.getItem('car').then(value => {
            const data = JSON.parse(value);
            unsub = onSnapshot(doc(db, "cars", data.id), (doc) => {
                const carData = doc.data();
                setId(doc.id);
                setCarName(carData.name);
                setCurrentImages(carData.images);

                AsyncStorage.setItem('car', JSON.stringify({ id: doc.id, name: carData.name, images: carData.images }))
                .then(() => console.log("Car is up to date!\n"))
                .catch(() => console.log('updated failed!\n'))
                .finally(() => setIsLoading(false));
            });
        });
    }, []);

    const deleteImage = () => {
        
        if (addedImages.includes(selectedImage))
        setAddedImages(prevImages => prevImages.filter(img => img !== selectedImage));
        else {
            setDeletedImages(prevImages => [...prevImages, selectedImage]);
            const filteredImages = currentImages.filter(img => img !== selectedImage);
            setCurrentImages(filteredImages);
        }
        
        setSelectedImage('');
    }

    const deleteAllImages = () => {
        setDeletedImages(currentImages);
        setAddedImages([]);
        setCurrentImages([]);
    }

    const addOneImage = async () => {
        let result = await ImagesPicker.pickOneImage();
        setAddedImages(prevImages => [...prevImages, result.assets[0].uri]);
    }

    const addImages = async () => {
        let result = await ImagesPicker.pickImages();
        const pickedImages = result.assets.map((asset) => asset.uri);
        setAddedImages(prevImages => [...prevImages, ...pickedImages]);
    };

    const replaceImage = async () => {
        await addOneImage();
        deleteImage();
    }

    const deleteImageFromDB = async img => {
        const car = new Car(id);
        const image = new StorageImage( StorageImage.getImagePathInStorage(img) );
        await image.delete();
        console.log('The image was deleted!');
        await car.removeImage(img);
        console.log(`${img} was deleted!`);
    }

    const applyDeleteImages = async () => {
        try {
            if (deletedImages.length > 0)
                deletedImages.forEach(async img => await deleteImageFromDB(img));
        } catch (error) {
            console.log(error);
        }
    }
    
    const uploadImage = async (img, path) => {
        try {
            const car = new Car(id);
            const image = new StorageImage(path);
            const url = await image.upload(img);
            console.log(`The images was uploaded`);
            await car.addImage(url);
            console.log(`${url} was added`);
        } catch (error) {
            console.log(error);
        }
    }

    const applyAddImages = async () => {
        try {
            if (addedImages.length > 0) {
                let now = Date.now();
                addedImages.forEach(async img => {
                    await uploadImage(img, `communityPost/${now++}.jpg`);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const applyChanges = async () => {
        try {
            setIsLoading(true);
            
            await applyDeleteImages()
            setDeletedImages([]);

            await applyAddImages();
            setAddedImages([]);
        } catch (error) {
            console.log(error);
        }
    }
    
    if (isLoading)
     return <Loading />

    return (
        <SafeAreaView
        style={[
            GlobalStyles.container,
            { padding: 10, justifyContent: 'space-between', backgroundColor: Colors.light.whiteBackground, width: width, height: height - 50 }
        ]}
        >
            <Tabs.Screen
                options={{
                    title: `${carName} images`,
                }}
            />

            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 7, width: width}}>
            { currentImages.length > 0 || addedImages.length > 0 ?
            <FlatList
            data={ [...addedImages, ...currentImages] }
            renderItem={({ item }) => {
                return (
                    <Pressable
                    onPress={() => setSelectedImage(selectedImage === item ? '' : item )}
                    style={
                        [
                            (selectedImage === item ? { backgroundColor: 'blue', borderRadius: 5 } : {}),
                            { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
                        ]
                    }
                    >
                        <Image source={{ uri: item }} style={styles.image} />
                    </Pressable>
                );
            }}
            
            />
            :
            <Text style={ GlobalStyles.label }>No images</Text>
            }
            </View>

            <View style={[styles.buttons, { flex: 2 }]}>
                {selectedImage === '' ?
                <>
                    <Btn
                        style={styles.button}
                        text='Add new images'
                        onPress={addImages}
                    />
                    
                    <Btn style={styles.button} text='Delete all' onPress={deleteAllImages} color={'rgb(255, 50, 70)'} />
                </>
                :
                <>
                    <Btn style={styles.button} text='Replace' onPress={replaceImage} />
                    <Btn style={styles.button} text='Delete' onPress={deleteImage} color={'rgb(255, 50, 70)'} />
                </>
                }
                <Btn style={styles.button} text='Apply Changes' onPress={applyChanges} />
            </View>


            <StatusBar hidden />
        </SafeAreaView>
    )
}

export default EditCarImages;

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        marginVertical: 5,
        flex: 1,
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    button: {
        flex: 1,
        marginHorizontal: 5,
    }
});