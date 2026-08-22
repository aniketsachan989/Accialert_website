import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpTXSfcquNxI4fo9vikIyL_ZS4bb1rhuY",
  authDomain: "accialertapp-9f6c9.firebaseapp.com",
  databaseURL: "https://accialertapp-9f6c9-default-rtdb.firebaseio.com",
  projectId: "accialertapp-9f6c9",
  storageBucket: "accialertapp-9f6c9.firebasestorage.app",
  messagingSenderId: "166409494050",
  appId: "1:166409494050:web:a8d608131c7522d6ca747b",
  measurementId: "G-E3PWFSS0KB"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
