import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { Tabs , router } from "expo-router";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";


const EditCarImages = () => {
    const { width, height } = useWindowDimensions();
    
    const [params, setParams] = useState(null);

    const [ selectedImage, setSelectedImage ] = useState(-1);
    const [deletedImages, setDeletedImages] = useState([]);
    console.log('params', params);
    console.log('deleted images', deletedImages);
    console.log('current images', params?.images);
    
    useEffect(() => {
        AsyncStorage.getItem('car')
        .then(value => {
            const data = JSON.parse(value);
            setParams(data);
        });
    }, []);

    const deleteImage = (image) => {
        filteredImages = params?.images.filter(img => {
            if (img === image)
                setDeletedImages([...deletedImages, img]);
            else
                return img;
        });

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

    const applyChanges = () => {
        deletedImages.forEach(img => {
            const path = img.substring(img.indexOf('o/'), img.indexOf('?alt')).substring(2).replaceAll('%2F', '/');
            const imgRef = ref(storage, path);
            deleteObject(imgRef)
            .then(() => {
                console.log('The image was deleted!');
                    const carsRef = doc(db, 'cars', params?.id);
                    updateDoc(carsRef, {
                        images: arrayRemove(img),
                    })
                    .then(() => {
                        console.log('The car images in doc is updated!');
                        setDeletedImages([]);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        });

        router.back();
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
            <FlatList
                data={ params?.images }
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
            </View>

            <View style={[styles.buttons, { flex: 2 }]}>
                {selectedImage === -1 ?
                <>
                    <Btn style={styles.button} text='Add new images' onPress={() => console.log('Add new images')} />
                    <Btn style={styles.button} text='Delete all' onPress={deleteAllImages} color={'rgb(255, 50, 70)'} />
                </>
                :
                <>
                    <Btn style={styles.button} text='Replace' onPress={() => console.log('Replace')} />
                    <Btn style={styles.button} text='Delete' onPress={() => deleteImage(selectedImage)} color={'rgb(255, 50, 70)'} />
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