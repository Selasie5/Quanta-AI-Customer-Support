import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"


const apiKey = process.env.NEXT_PUBLIC_FIREBASE_KEY
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "quanta-34f6e.firebaseapp.com",
  projectId: "quanta-34f6e",
  storageBucket: "quanta-34f6e.appspot.com",
  messagingSenderId: "658220113242",
  appId: "1:658220113242:web:1e2f12ede9a8a63c3b6763",
  measurementId: "G-5EBPTYC1VM"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
