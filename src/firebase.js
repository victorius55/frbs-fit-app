// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
// Import the necessary Firebase functions
import { getFunctions } from "firebase/functions";


// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQhkDqYMHNXP2mNn44cJQa8LU-HetzUks",
  authDomain: "vic-test-frbs.firebaseapp.com",
  projectId: "vic-test-frbs",
  storageBucket: "vic-test-frbs.firebasestorage.app",
  messagingSenderId: "107151912809",
  appId: "1:107151912809:web:043f5354c0c89b45d897f8"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

const storage = getStorage(firebaseApp)
const db = getFirestore(firebaseApp)
const functions = getFunctions(firebaseApp);

export { firebaseApp, auth, provider, storage, db, functions}

