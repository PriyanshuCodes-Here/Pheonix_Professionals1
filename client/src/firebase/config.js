// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0JagaaKh98L76jjQtEE6Qsckesnv7SVg",
  authDomain: "phoenixprofessionals.firebaseapp.com",
  projectId: "phoenixprofessionals",
  storageBucket: "phoenixprofessionals.firebasestorage.app",
  messagingSenderId: "1004932455765",
  appId: "1:1004932455765:web:7ed51b11878ff551e7a3dc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;