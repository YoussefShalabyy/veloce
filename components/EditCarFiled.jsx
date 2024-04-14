import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const EditCarFiled = ({
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
        <View style={[styles.field, { flexDirection: flexDirection }]}>
            <Text style={styles.label}>{placeHolder}:</Text>
            { multiline ?
            <TextInput
                style={styles.input}
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },

    label: {
        fontSize: 30,
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
        fontSize: 30,
        flex: 5,
    },


    selectBox: {
        marginBottom: 10,
        padding: 10,
        fontSize: 30,
    }
});

export default EditCarFiled;