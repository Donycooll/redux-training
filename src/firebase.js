// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Jufe9MF1yY_MUkf-nfN_am8bF1b-DFE",
  authDomain: "todos-app-4ad56.firebaseapp.com",
  projectId: "todos-app-4ad56",
  storageBucket: "todos-app-4ad56.firebasestorage.app",
  messagingSenderId: "545404090832",
  appId: "1:545404090832:web:1bef7530f2b360408361d5",
  measurementId: "G-8E6JTVW301"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);