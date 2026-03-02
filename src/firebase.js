// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUqhZlHggd2pB7z8Z6xJIM7CfFYYdtqiY",
  authDomain: "my-notes-app-8fc0a.firebaseapp.com",
  projectId: "my-notes-app-8fc0a",
  storageBucket: "my-notes-app-8fc0a.firebasestorage.app",
  messagingSenderId: "201901628288",
  appId: "1:201901628288:web:d3c8492c27942494bf7f65",
  measurementId: "G-3Z4M82FRKG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
