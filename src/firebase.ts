import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "n8n-checklist.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "n8n-checklist",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "n8n-checklist.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 