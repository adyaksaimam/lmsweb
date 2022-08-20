/* eslint-disable prettier/prettier */
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from 'src/config/firebase'
import DeleteJob from './DeleteJob'

export default function joblist() {
  const [joblist, setJoblist] = useState([])
  useEffect(() => {
    const jobRef = collection(db, 'Job')
    const q = query(jobRef, orderBy('tanggal', 'desc'))
    onSnapshot(q, (snapshot) => {
      const joblist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setJoblist(joblist)
      console.log(joblist)
    })
  }, [])

  return (
    <div>
      {joblist.length === 0 ? (
        <p>No job found!</p>
      ) : (
        joblist.map(({ id, title, Description, imageUrl, tanggal }) => (
          <div className="border mt-3 p-3 bg-light" key={id}>
            <div className="row">
              <div className="col-3">
                <img src={imageUrl} alt="title" style={{ height: 180, width: 190 }} />
              </div>
              <div className="col-9 ps-5">
                <h2>{title}</h2>
                <p>{tanggal.toDate().toDateString()}</p>
                <h5>{Description}</h5>
                <DeleteJob id={id} imageUrl={imageUrl} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
