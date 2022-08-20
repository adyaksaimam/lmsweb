/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { db } from "../../../config/firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";


export default function CourseList(){
    const [CourseList, setcourselist] = useState ([])
    useEffect (() => {
        const courseCollectionRef = collection(db, "course")
        const q = query(courseCollectionRef,orderBy('tanggal', 'desc'))
        onSnapshot (q, (snapshot) => {
        const CourseList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }))
            setcourselist(CourseList)
            console.log(CourseList)
        })
    }, [])
    
  return (
    <>
      {<pre>{JSON.stringify(CourseList, undefined, 2)}</pre>}
    </>
  )
}
