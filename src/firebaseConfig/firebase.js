
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig'



const app = initializeApp(firebaseConfig);

export default getFirestore(app)