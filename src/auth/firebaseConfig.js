import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCfEYlYck79vCP0iqqh1dP_feLxNfxxyXs",
    authDomain: "jewelleryapp001.firebaseapp.com",
    projectId: "jewelleryapp001",
    storageBucket: "jewelleryapp001.firebasestorage.app",
    messagingSenderId: "504859206761",
    appId: "1:504859206761:web:5892897de5037fc95faef8",
    measurementId: "G-FKGF0Y36YC"
};

// Initialize Firebase (

firebase.initializeApp(firebaseConfig);
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
export { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_APP };