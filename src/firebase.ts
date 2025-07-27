import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Демо конфигурация Firebase (замените на свою)
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "n8n-checklist-demo.firebaseapp.com",
  projectId: "n8n-checklist-demo",
  storageBucket: "n8n-checklist-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 