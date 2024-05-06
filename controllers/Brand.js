import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default class Brand {
    static getBrands = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Brand"));
            let fetchedBrands = [];
            querySnapshot.forEach((doc) => {
                fetchedBrands.push(doc.data().name);
            });
            
            return fetchedBrands;
        } catch (error) {
            return error;
        }
    }
}