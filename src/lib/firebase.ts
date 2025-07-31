
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "labtrack-ckpvl",
  appId: "1:264231788271:web:72ced018e71a5619a3851a",
  storageBucket: "labtrack-ckpvl.firebasestorage.app",
  apiKey: "AIzaSyB5xyxQ5twmeTqv0fblWIIogNRryyNdLkQ",
  authDomain: "labtrack-ckpvl.firebaseapp.com",
  messagingSenderId: "264231788271",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);

export { app, auth };
