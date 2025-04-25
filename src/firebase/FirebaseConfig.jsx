import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3rsksCZqIJTSnx5AusJnOqkp-k2yMzsQ",
    authDomain: "e-commerce-f63e5.firebaseapp.com",
    projectId: "e-commerce-f63e5",
    storageBucket: "e-commerce-f63e5.firebasestorage.app",
    messagingSenderId: "79228785588",
    appId: "1:79228785588:web:bf13a00dcd437ff0d398e1",
    measurementId: "G-23N7ENX2ME"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;