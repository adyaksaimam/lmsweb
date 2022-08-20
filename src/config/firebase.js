/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from 'react-router-dom'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc-Ja20mVaXMm_hIuoVqWrtLirgvnf-Qs",
  authDomain: "web-admin-a96c1.firebaseapp.com",
  projectId: "web-admin-a96c1",
  storageBucket: "web-admin-a96c1.appspot.com",
  messagingSenderId: "670597990767",
  appId: "1:670597990767:web:700493253eb214ca51809a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const storage = getStorage(app);
export const db = getFirestore(app);
//const DefaultLayout = React.lazy(() => import('src/layout/DefaultLayout'))

export function signup(email, password){
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signin(email, password){
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
  return signOut(auth);
}

export function useAuth() {
  const [ currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export {auth};