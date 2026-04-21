// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuLjMLrfOIss_mV7LIZAHCagH5FAEobwE",
  authDomain: "study-sync-tasks.firebaseapp.com",
  projectId: "study-sync-tasks",
  storageBucket: "study-sync-tasks.firebasestorage.app",
  messagingSenderId: "686263282737",
  appId: "1:686263282737:web:ae433c12d5eeaed2837910",
  measurementId: "G-B231D4NG8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;









