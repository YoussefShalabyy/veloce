import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { Tabs , router } from "expo-router";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagesPicker from "../../controllers/ImagesPicker";
import Car from "../../controllers/Car";
import StorageImage from "../../controllers/StorageImage";

const EditCarImages = () => {
    const { width, height } = useWindowDimensions();
    
    const [params, setParams] = useState(null);

    const [ selectedImage, setSelectedImage ] = useState(-1);
    const [deletedImages, setDeletedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    console.log('params', params);
    console.log('deleted images', deletedImages);
    console.log('current images', params?.images);
    console.log('new images', newImages.length);
    
    useEffect(() => {
        AsyncStorage.getItem('car')
        .then(value => {
            const data = JSON.parse(value);
            setParams(data);
        });
    }, []);

    const deleteImage = () => {
        const filteredImages = params?.images.filter(img => {
            if (img === selectedImage)
                setDeletedImages([...deletedImages, img]);
            else
                return img;
        });

        setNewImages(newImages.filter(img => img !== selectedImage));

        AsyncStorage.setItem('car', JSON.stringify({...params, images: filteredImages}))
        .then(() => {
            console.log('The image was deleted!');
            setParams({...params, images: filteredImages});
        })
        .catch(error => console.log(error));
    }

    const deleteAllImages = () => {
        AsyncStorage.getItem('car')
        .then(value => {
            let data = JSON.parse(value);
            setDeletedImages(data.images);
            data.images = [];
            AsyncStorage.setItem('car', JSON.stringify(data))
            .then(() => {
                console.log('All images were deleted!');
                setParams(data);
            })
            .catch(error => console.log(error));
        })
    }

    const addOneImage = async () => {
        let result = await ImagesPicker.pickOneImage();
        setNewImages([...newImages, result.assets[0].uri]);
    }

    const addNewImages = async () => {
        let result = await ImagesPicker.pickImages();
        const pickedImages = result.assets.map((asset) => asset.uri);
        setNewImages([...newImages, ...pickedImages]);
    };

    const replaceImage = async () => {
        deleteImage();
        await addOneImage();
    }

    const applyDeleteImages = async () => {
        try {
            if (deletedImages.length > 0) {
                deletedImages.forEach(async img => {
                    const car = new Car(params?.id);
                    const image = new StorageImage( StorageImage.getImagePathInStorage(img) );
                    await image.delete();
                    console.log('The image was deleted!');
                    await car.removeImage(img);
                    console.log(`${img} was deleted!`);
                    setDeletedImages([]);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const applyAddImages = async () => {
        try {
            if (newImages.length > 0) {
                newImages.map(async img => {
                    const car = new Car(params?.id);
                    const image = new StorageImage("communityPost/" + Date.now() + ".jpg");
                    const url = await image.upload(img);
                    console.log(`The images was uploaded`);
                    await car.addImage(url);
                    console.log(`${url} was added`);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const applyChanges = async () => {
        try {
            await applyDeleteImages();
            await applyAddImages();
            router.replace('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView
        style={[
            GlobalStyles.container,
            { padding: 10, justifyContent: 'space-between', width: width, height: height - 50 }
        ]}
        >
            <Tabs.Screen
                options={{
                    title: `${params?.name} images`,
                }}
            />

            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 7, width: width}}>
            { params?.images.length > 0 || newImages.length > 0 ?
            <FlatList
            data={ [...newImages, ...params?.images] }
            renderItem={({ item }) => {
                return (
                    <Pressable
                    onPress={() => setSelectedImage(selectedImage === item ? -1 : item )}
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
                {selectedImage === -1 ?
                <>
                    <Btn
                        style={styles.button}
                        text='Add new images'
                        onPress={addNewImages}
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