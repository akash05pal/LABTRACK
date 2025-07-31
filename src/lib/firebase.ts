
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5xyxQ5twmeTqv0fblWIIogNRryyNdLkQ",
  authDomain: "labtrack-ckpvl.firebaseapp.com",
  projectId: "labtrack-ckpvl",
  storageBucket: "labtrack-ckpvl.firebasestorage.app",
  messagingSenderId: "264231788271",
  appId: "1:264231788271:web:72ced018e71a5619a3851a",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
