import { initializeApp } from "firebase/app";
import {firebaseConfig} from './firebaseConfig'
import { getStorage } from "firebase/storage";


// Initialize Firebase
const app =initializeApp(firebaseConfig);


export default getStorage(app);