/* eslint-disable prettier/prettier */
import { db } from "../../../../firebase.config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const courseCollectionRef = collection(db, "course");
class CourseDataService {
        addCourse = (newCourse) => {
        return addDoc(courseCollectionRef, newCourse);
    };

    updateCourse = (id, updateCourse) => {
        const courseDoc = doc(db, "course", id);
        return updateDoc(courseDoc, updateCourse);
    };

    deleteCourse = (id) => {
        const courseDoc = doc(db, "course", id);
        return deleteDoc(courseDoc);
    }

    getAllCourse = () =>{
        return getDocs(courseCollectionRef);
    }

    getCourse = (id) => {
        const courseDoc = doc(db, "course", id);
        return getDoc(courseDoc);
    }
}
export default new CourseDataService();