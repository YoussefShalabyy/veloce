import * as ImagePicker from 'expo-image-picker';

export default class ImagesPicker {
    static pickOneImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled)
            return result;
        
        return [];
    }

    static pickImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled)
            return result;

        return [];
    };
}