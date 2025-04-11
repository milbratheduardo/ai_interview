import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGaj-Mc6AbVVw_wEp8KIl3UebunxPTtKw",
  authDomain: "entrevistai-6cc32.firebaseapp.com",
  projectId: "entrevistai-6cc32",
  storageBucket: "entrevistai-6cc32.firebasestorage.app",
  messagingSenderId: "194770065430",
  appId: "1:194770065430:web:9b0559e3bd8b2f316bfd37",
  measurementId: "G-Z2NY09W0LB"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);