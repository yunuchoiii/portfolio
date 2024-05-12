import { getFirestore } from "firebase/firestore";
import firebaseDB from "./firebase";

const fireStore = getFirestore(firebaseDB)
export default fireStore