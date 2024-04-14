import { StyleSheet, Text, TextInput, View } from "react-native";

const EditCarFiled = ({
    oldCarData,
    newCarDataController,
    attributeName,
    flexDirection,
    multiline }) => {
    
    const {newCarData, setNewCarData} = newCarDataController;
    return (
        <View style={[styles.field, { flexDirection: flexDirection }]}>
            <Text style={styles.label}>
                {`${attributeName.at(0).toUpperCase()}${attributeName.substring(1)}: `}
            </Text>
            { multiline ?
            <TextInput
                style={styles.input}
                placeHolder={`Enter the ${attributeName}`}
                defaultValue={oldCarData != null ? oldCarData[attributeName] : ''}
                onChangeText={attr => {
                    setNewCarData({...newCarData, [attributeName]: attr});
                    console.log(newCarData);
                }}
                multiline
            />
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
        flex: 2,
        color: "black",
        fontSize: 30,
    },
});

export default EditCarFiled;