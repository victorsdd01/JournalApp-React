
import { FirebaseApp, initializeApp } from "firebase/app";
import {Auth, getAuth} from 'firebase/auth'
import { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore/lite";


interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCNbMj9jEBk72E2NXKgx0sJOiqobuuIu_o",
  authDomain: "react-journal-app-2f4fe.firebaseapp.com",
  projectId: "react-journal-app-2f4fe",
  storageBucket: "react-journal-app-2f4fe.appspot.com",
  messagingSenderId: "474751185310",
  appId: "1:474751185310:web:d4a6edd9f3d562c4eea68f"
};

export const FirebaseAppI: FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth: Auth = getAuth(FirebaseAppI)
export const FirebaseDb: Firestore = getFirestore(FirebaseAppI)