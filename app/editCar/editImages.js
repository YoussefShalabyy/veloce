import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";


const EditCarImages = () => {
    const { width, height } = useWindowDimensions();
    
    const { id, name, imgs } = useLocalSearchParams();
    const [images, setImages] = useState(JSON.parse(imgs));
    
    const [ selectedImage, setSelectedImage ] = useState(-1);
    const [newImages, setNewImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    console.log('deleted', deletedImages);
    console.log('current', images);

    const deleteImage = (path) => {
        filteredImages = images.filter(img => {
            if (img.path === path)
                setDeletedImages([...deletedImages, img]);
            else
                return img;
        });

        setImages(filteredImages);
    }

    const deleteAllImages = () => {
        setDeletedImages(images);
        setImages([]);
    }

    const applyChanges = () => {
        deletedImages.forEach(img => {
            const imgRef = ref(storage, img.path);
            deleteObject(imgRef)
            .then(() => {
                console.log('The images was deleted!');
                const carsRef = doc(db, 'cars', id);
                updateDoc(carsRef, {
                    images: images,
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
                
            <Text style={[GlobalStyles.label, { flex: .5 }]}>Edit {name} images</Text>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: .9, width: width}}>
            <FlatList
                data={images}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => setSelectedImage(selectedImage === item.path ? -1 : item.path )}
                            style={[selectedImage === item.path ? { backgroundColor: 'blue', borderRadius: 5 } : {},
                            { display: 'flex', justifyContent: 'center', alignItems: 'center' }]}
                        >
                            <Image source={{ uri: item.url.replace( item.path, item.path.replaceAll('/', '%2F') ) }} style={styles.image} />
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