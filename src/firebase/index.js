// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALCR_C_uMSV7zUpbU2doCWxUAW86NjGm0",
    authDomain: "react-student-crud-fc1bf.firebaseapp.com",
    projectId: "react-student-crud-fc1bf",
    storageBucket: "react-student-crud-fc1bf.appspot.com",
    messagingSenderId: "1018122289791",
    appId: "1:1018122289791:web:a3f0e9ee41ddd42d3a354a",
    measurementId: "G-4GBJG5MTS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export {db};
export default app;
