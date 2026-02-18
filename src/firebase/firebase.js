import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 👈 add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8E5Kxn7rG23FTT4r_xZsjMZCiuSOPgD4",
  authDomain: "smartwaste-auth.firebaseapp.com",
  projectId: "smartwaste-auth",
  storageBucket: "smartwaste-auth.appspot.com",  // ✅ fixed
  messagingSenderId: "1026275629240",
  appId: "1:1026275629240:web:d8821e0e31796e0395bc4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase Auth, Firestore, and Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 now ReportIssue.jsx will work




