import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "chat-ch2024.firebaseapp.com",
    projectId: "chat-ch2024",
    storageBucket: "chat-ch2024.appspot.com",
    messagingSenderId: "332259979091",
    appId: "1:332259979091:web:3f9e75bcd70396bd03bba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
