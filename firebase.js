// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW8_DvM4z4dc3a7I_eQMhtBBsLLyzxm88",
  authDomain: "quiz-trix.firebaseapp.com",
  projectId: "quiz-trix",
  storageBucket: "quiz-trix.appspot.com",
  messagingSenderId: "847455341286",
  appId: "1:847455341286:web:8b276dc7f2ece1d0914927",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
