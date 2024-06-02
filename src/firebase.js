// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVxdXci2NpoQyw3p2cQYIxOj0rWmwfv38",
  authDomain: "diplom-86c49.firebaseapp.com",
  projectId: "diplom-86c49",
  storageBucket: "diplom-86c49.appspot.com",
  messagingSenderId: "952544376347",
  appId: "1:952544376347:web:65c7dec7b398bfda012abe",
  measurementId: "G-95LRQJKTCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, collection, addDoc };
