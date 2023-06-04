import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyBb1lVhOY6vVeJM_KRUWGxSmteJxDaAhHo",
  authDomain: "gourmet-11562.firebaseapp.com",
  projectId: "gourmet-11562",
  storageBucket: "gourmet-11562.appspot.com",
  messagingSenderId: "701392206599",
  appId: "1:701392206599:web:2c551a40e83db73775a3a2",
  measurementId: "G-KZ3FYR17GP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create the authentication instance
export const auth = firebase.auth();

// Google Sign-In Provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = () => {
  return auth.signInWithPopup(googleProvider);
};

// Function to create a new user with email and password
export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export default firebase;
