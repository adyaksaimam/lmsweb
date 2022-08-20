/* eslint-disable prettier/prettier */
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage' 
import { storage, db } from 'src/config/firebase'
import { Table, Button } from 'react-bootstrap'

// eslint-disable-next-line react/prop-types
export default function Deletecourse({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteDoc(doc(db, 'course', id))
        toast('Course deleted successfully', { type: 'success' })
        const storageRef = ref(storage, imageUrl)
        await deleteObject(storageRef)
      } catch (error) {
        toast('Error deleting Course', { type: 'error' })
        console.log(error)
      }
    }
  }
  return (
    <div>
      <Button variant="danger" onClick={handleDelete} style={{width: '100%'}}>
        Delete
      </Button>
    </div>
  )
}
