// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR4a9n16AJkv2KGlhfsmD4hdeyNVKhlYo",
  authDomain: "admin-web-80097.firebaseapp.com",
  projectId: "admin-web-80097",
  storageBucket: "admin-web-80097.appspot.com",
  messagingSenderId: "393733931376",
  appId: "1:393733931376:web:a094efa110a3e20cd88fb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//const DefaultLayout = React.lazy(() => import('src/layout/DefaultLayout'))

export function signup(email, password){
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password){
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