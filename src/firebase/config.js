import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdk75gU4-0f2PZ2k7IXKXvhzrdXHehCyg",
  authDomain: "proyectofinalrivas.firebaseapp.com",
  projectId: "proyectofinalrivas",
  storageBucket: "proyectofinalrivas.firebasestorage.app",
  messagingSenderId: "612713761810",
  appId: "1:612713761810:web:8c13300d82f07b274e5ccb",
  measurementId: "G-259LD474YJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
