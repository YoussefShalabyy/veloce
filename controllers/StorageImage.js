import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default class StorageImage {
    constructor(path) {
        this.path = path;
        this.imageRef = ref(storage, path);
    }
    
    static getImagePathInStorage = (downloadURL) =>
        downloadURL.substring(downloadURL.indexOf('o/'), downloadURL.indexOf('?alt')).substring(2).replaceAll('%2F', '/');

    upload = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadBytes(this.imageRef, blob);
        const url = await getDownloadURL(this.imageRef);
        return url;
    }

    delete = async () => await deleteObject(this.imageRef);    
}