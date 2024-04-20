import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


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

    const deleteImage = (path) => {
        filteredImages = params?.images.filter(img => {
            if (img.path === path)
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
            const imgRef = ref(storage, img.path);
            deleteObject(imgRef)
            .then(() => {
                console.log('The image was deleted!');
                    const carsRef = doc(db, 'cars', params?.id);
                    updateDoc(carsRef, {
                        images: params?.images,
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
                { padding: 10, justifyContent: 'space-between', width: width, height: height - 60 }
            ]}
        >
                
            <Text style={[GlobalStyles.label, { flex: .5 }]}>Edit {params?.name} images</Text>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: .9, width: width}}>
            <FlatList
                data={ params?.images }
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => setSelectedImage(selectedImage === item.path ? -1 : item.path )}
                            style={[selectedImage === item.path ? { backgroundColor: 'blue', borderRadius: 5 } : {},
                            { display: 'flex', justifyContent: 'center', alignItems: 'center' }]}
                        >
                            <Image source={{ uri: item.url }} style={styles.image} />
                        </Pressable>
                    );
                }}
                horizontal
                showsHorizontalScrollIndicator
            />
            </View>

            <View style={[styles.buttons, { flex: 3 }]}>
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
        width: 150,
        height: 150,
        marginHorizontal: 5,
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