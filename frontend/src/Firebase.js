import React, { createContext, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdqWFpv4RlyByR4FiJESy_spUlQgb4ZPs",
  authDomain: "gourmet-express-7b5e1.firebaseapp.com",
  projectId: "gourmet-express-7b5e1",
  storageBucket: "gourmet-express-7b5e1.appspot.com",
  messagingSenderId: "405318752008",
  appId: "1:405318752008:web:6328b0b28192cdd98dbebd",
  measurementId: "G-X7B027WQL1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>
);

export const useFirebase = () => useContext(FirebaseContext);

export default firebase;
