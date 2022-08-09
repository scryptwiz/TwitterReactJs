import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcNsYVC95Pd7qcr0MHriur_dmus7yymXk",
  authDomain: "twitter-reactjs-f03ff.firebaseapp.com",
  projectId: "twitter-reactjs-f03ff",
  storageBucket: "twitter-reactjs-f03ff.appspot.com",
  messagingSenderId: "474939317249",
  appId: "1:474939317249:web:1722dda5b4aa2a2bed3400"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)