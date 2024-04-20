import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Btn from "../../components/btn";
import GlobalStyles from "../../style/global";
import { StatusBar } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";


const EditCarImages = () => {
    const { width, height } = useWindowDimensions();
    
    const { id, name, imgs } = useLocalSearchParams();
    const images = JSON.parse(imgs);
    
    const [ selectedImage, setSelectedImage ] = useState(-1);
    const [newImages, setNewImages] = useState([]);

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
                renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => setSelectedImage(selectedImage === index ? -1 : index )}
                            style={[selectedImage === index ? { borderWidth: 2, borderColor: 'blue' } : {},
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
                    <Btn style={styles.button} text='Delete all' onPress={() => console.log('Delete all')} color={'rgb(255, 50, 70)'} />
                </>
                :
                <>
                    <Btn style={styles.button} text='Replace' onPress={() => console.log('Replace')} />
                    <Btn style={styles.button} text='Delete' onPress={() => console.log('Delete')} color={'rgb(255, 50, 70)'} />
                </>
                }
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