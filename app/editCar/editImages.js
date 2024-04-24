import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { Tabs , router } from "expo-router";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

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

    const addOneImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled)
            setNewImages([...newImages, result.assets[0].uri]);
    }

    const addNewImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const pickedImages = result.assets.map((asset) => asset.uri);
            return pickedImages;
        }
    };

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

        newImages.map(image => {
            fetch(image)
            .then(response => {
                response.blob()
                .then(blob => {
                    const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");
                    uploadBytes(storageRef, blob)
                    .then(() => {
                        getDownloadURL(storageRef)
                        .then(url => {
                            const carsRef = doc(db, 'cars', params?.id);
                            updateDoc(carsRef, {
                                images: arrayUnion(url),
                            })
                            .then(() => {
                                console.log('The car images in doc is updated!');
                                setNewImages([]);
                            })
                        })
                    })
                })
            })
        })

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
                        onPress={() => addNewImages().then(value => setNewImages(value))}
                    />
                    
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