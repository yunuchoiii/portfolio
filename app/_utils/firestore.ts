import { addDoc, collection } from "firebase/firestore";
import fireStore from "../_commons/libraries/firestore";

export const addDataToFirestore = async (collectionName:string, dataArray: any[]) => {
  const collectionRef = collection(fireStore, collectionName);
  const promises = dataArray?.map(i => addDoc(collectionRef, i));
  try {
    await Promise.all(promises);
    console.log('All skills have been added to Firestore successfully.');
  } catch (error) {
    console.error('Error adding skills to Firestore:', error);
  }
}