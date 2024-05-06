import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default class Car {
    constructor(id) {
        this.id = id;
        this.carRef = doc(db, 'cars', id);
    }

    get = async () => {
        try {
            const carDoc = await getDoc(this.carRef);
            const carData = carDoc.data();
            console.log(carDoc.id + ' => ' , carData);
            return carData;
        } catch(error) {
            return error;
        }
    }

    update = async (updatedCarData) => {
        try {
            await updateDoc(this.carRef, updatedCarData);
            console.log('Updated', updatedCarData);
            return this.id;
        } catch (error) {
            return error;
        }
    }

    addImage = async (image) => {
        try {
            await updateDoc(this.carRef, {
                images: arrayUnion(image)
            });
        } catch (error) {
            console.log(error);
        }
    }

    removeImage = async (image) => {
        try {
            await updateDoc(this.carRef, {
                images : arrayRemove(image)
            });
        } catch (error) {
            console.log(error);
        }
    }

    delete = async () => {
        try {
            await deleteDoc(this.carRef);
            return this.id;
        } catch (error) {
            return error;
        }
    }
}