import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import GlobalStyles from "../style/global";

const EditCarField = ({
    carData,
    updatedCarDataController,
    attributeName,
    placeHolder,
    flexDirection,
    multiline,
    choices }) => {
    
    const {updatedCarData, setUpdatedCarData} = updatedCarDataController;
    const [changeBrand, setChangeBrand] = useState(false);

    return (
        <View style={[styles.field, {flexDirection: flexDirection, alignItems: (attributeName === 'brand' ? '' : 'center')}]}>
            <Text style={[GlobalStyles.label, { flex: 1 }]}>{placeHolder}:</Text>
            { multiline ?
            <TextInput
                style={[styles.input, { width: '90%'}]}
                placeHolder={`${placeHolder}`}
                defaultValue={carData != null ? carData[attributeName] : ''}
                onChangeText={attr => {
                    setUpdatedCarData({...updatedCarData, [attributeName]: attr});
                    console.log(updatedCarData);
                }}
                multiline
            />
            :
            choices !== undefined && choices.length > 0 ?
                <Picker style={styles.selectBox}
                    selectedValue={changeBrand ? updatedCarData.brand : carData?.brand}
                    onValueChange={(itemValue) => {
                        setUpdatedCarData({...updatedCarData, brand: itemValue});
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
                defaultValue={carData != null ? carData[attributeName] : ''}
                onChangeText={attr => {
                    setUpdatedCarData({...updatedCarData, [attributeName]: attr});
                    console.log(updatedCarData);
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