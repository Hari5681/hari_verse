// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "hariverse-proposal",
  "appId": "1:883635821816:web:fd78e667b6fa78aa3daf0d",
  "storageBucket": "hariverse-proposal.firebasestorage.app",
  "apiKey": "AIzaSyD0YlKXfDvd7hWDTHQ1yD9EFgGWwJL-hBg",
  "authDomain": "hariverse-proposal.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "883635821816"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
