/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import Deletecourse from './Deletecourse'
import UpdateCourse from './Updatecourse'
import { db } from "../../../config/firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { CCard, CContainer, CCardBody, CCardTitle, CCardText, CCardImage, CRow, CCol } from '@coreui/react';

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
      {/*<pre>{JSON.stringify(CourseList, undefined, 2)}</pre>*/}
      <div>
      {CourseList.length === 0 ? (
        <p>No Course Found!</p>
      ) : (
        CourseList.map(({ id, course_title, body, certification, course_format, imageUrl, tanggal }) => (
          <CCard fluid className="mb-4" key={id}>
            <CContainer style={{margin:10}}>
              <CRow xs={{cols:3, gutterX: 2}}>
                <CCol className="col-3 ps-2">
                  <CCardImage src={imageUrl} alt="img" style={{ height: 180, width: 190}} />                
                </CCol>
                <CCol className='col-5' style={{width:859}}>
                  <CCardTitle>{course_title}</CCardTitle>
                  <p>{tanggal.toDate().toDateString()}</p>
                  <CCardText>{course_format}</CCardText>
                  <CCardText>{body}</CCardText>
                  <CCardText>{certification}</CCardText>
                </CCol>
                <CCol style={{width:90, paddingTop: 5}}>
                  <Deletecourse id={id} imageUrl={imageUrl} />
                  <UpdateCourse id={id} imageUrl={imageUrl} />
                </CCol>
              </CRow>
            </CContainer>
          </CCard>
        ))
      )}
    </div>
    </>
  )
}
