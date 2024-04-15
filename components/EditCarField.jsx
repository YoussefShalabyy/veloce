import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Colors from "../constants/Colors";

const EditCarField = ({
    oldCarData,
    newCarDataController,
    attributeName,
    placeHolder,
    flexDirection,
    multiline,
    choices }) => {
    
    const {newCarData, setNewCarData} = newCarDataController;
    const [changeBrand, setChangeBrand] = useState(false);

    return (
        <View style={[styles.field, {flexDirection: flexDirection, alignItems: (attributeName === 'brand' ? '' : 'center')}]}>
            <Text style={styles.label}>{placeHolder}:</Text>
            { multiline ?
            <TextInput
                style={[styles.input, { width: '90%'}]}
                placeHolder={`${placeHolder}`}
                defaultValue={oldCarData != null ? oldCarData[attributeName] : ''}
                onChangeText={attr => {
                    setNewCarData({...newCarData, [attributeName]: attr});
                    console.log(newCarData);
                }}
                multiline
            />
            :
            choices !== undefined && choices.length > 0 ?
                <Picker style={styles.selectBox}
                    selectedValue={changeBrand ? newCarData.brand : oldCarData?.brand}
                    onValueChange={(itemValue) => {
                        setNewCarData({...newCarData, brand: itemValue});
                        setChangeBrand(true);
                    }}
                >
                    {choices.map((choice, index) => (
                        <Picker.Item key={index} label={choice} value={choice} />
                    ))}
                </Picker>
            :
            <TextInput
                style={styles.input}
                placeHolder={`Enter the ${attributeName}`}
                defaultValue={oldCarData != null ? oldCarData[attributeName] : ''}
                onChangeText={attr => {
                    setNewCarData({...newCarData, [attributeName]: attr});
                    console.log(newCarData);
                }}
            />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    field: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },

    label: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
    },

    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
        borderRadius: 10,
        color: "black",
        fontSize: 20,
        flex: 2.5,
    },


    selectBox: {
        marginBottom: 10,
        padding: 10,
        fontSize: 30,
        backgroundColor: '#fff',
    }
});

export default EditCarField;