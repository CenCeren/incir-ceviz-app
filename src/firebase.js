// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase Config (senin verdiğin bilgiler)
const firebaseConfig = {
  apiKey: "AIzaSyAu7rtsZaqnfnruUug90t9C9U0fzrZnR6c",
  authDomain: "incir-ceviz-app.firebaseapp.com",
  projectId: "incir-ceviz-app",
  storageBucket: "incir-ceviz-app.firebasestorage.app",
  messagingSenderId: "1046747146627",
  appId: "1:1046747146627:web:42793c5da245f0c9536eb6",
  measurementId: "G-78W682XW3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// (Opsiyonel) Analytics
export const analytics = getAnalytics(app);
