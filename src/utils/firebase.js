// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOshSEYYveguv4ZqehSHexVrIVRd1oXdI",
    authDomain: "jkflix-567bb.firebaseapp.com",
    projectId: "jkflix-567bb",
    storageBucket: "jkflix-567bb.appspot.com",
    messagingSenderId: "856598186127",
    appId: "1:856598186127:web:1ec69c6af033b708d688fa",
    measurementId: "G-MHMVY0L82Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();