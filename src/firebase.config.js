/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2dIXCV2oUFRQVscc-_SHeSaYKpxkXCaY",
  authDomain: "sumorning-12fc5.firebaseapp.com",
  projectId: "sumorning-12fc5",
  storageBucket: "sumorning-12fc5.appspot.com",
  messagingSenderId: "814833688179",
  appId: "1:814833688179:web:b8248adead576e95a35406",
  measurementId: "G-EN5W1F8PHL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);