// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3ObzLAwKFvcLBzWxBjkvfWntufjHTU1M",
    authDomain: "lahsclubs-608a9.firebaseapp.com",
    projectId: "lahsclubs-608a9",
    storageBucket: "lahsclubs-608a9.appspot.com",
    messagingSenderId: "189767897229",
    appId: "1:189767897229:web:96e6759f487352fa27d2c4",
    measurementId: "G-168E49T06B",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
