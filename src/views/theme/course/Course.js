/* eslint-disable prettier/prettier */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import React, {useState} from 'react'
import { storage, db } from 'src/config/firebase';
import { Button, Form } from 'react-bootstrap'
import { CCard, CCardHeader, CForm } from '@coreui/react';
import CourseList from './CourseList';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Course() {
  const[formData, setFormData] = useState({
    course_title: '',
    course_format: '',
    body: '',
    certification: '',
    image: '',
    tanggal: Timestamp.now().toDate(),
  });
  const navigate = useNavigate()

  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [progress, setProgress] = useState(0);

  const handleImageChange=(e)=>{
    setFormData({ ...formData, image:e.target.files[0] });
  }

  const handlePublish=(e)=>{
    if (!formData.course_title || !formData.body || !formData.image) {
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    
    const uploadImage = uploadBytesResumable(storageRef, formData.image)

    uploadImage.on("state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          course_title: "",
          course_format: "",
          body: "",
          certification: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const courseRef = collection(db, "course");
          addDoc(courseRef, {
            course_title: formData.course_title,
            course_format: formData.course_format,
            body: formData.body,
            certification: formData.certification,
            imageUrl: url,
            tanggal: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Course added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding Course", { type: "error" });
            });
        });
      }
    );
  }
  return (
    <><CCard className="mb-4" style={{ justifyContent: 'center', padding: 10 }}>
      <CForm>
        <CCardHeader className="d-grid gap-2" component="h5">Add Course</CCardHeader>
        <Form.Label>Course Title</Form.Label>
        <Form.Control
          type='text'
          name='course_title'
          className='form-control'
          value={formData.course_title}
          onChange={(e) => handleChange(e)} />
        
        <Form.Label>Course Format</Form.Label>
        <Form.Control
          name='course_format'
          className='form-control'
          value={formData.course_format}
          onChange={(e) => handleChange(e)} />

        <Form.Label>Course Description</Form.Label>
        <Form.Control
          as ='textarea'
          name='body'
          className='form-control'
          value={formData.body}
          onChange={(e) => handleChange(e)} />

        <Form.Label>Certification</Form.Label>
        <Form.Control
          name='certification'
          className='form-control'
          value={formData.certification}
          onChange={(e) => handleChange(e)} />

        <Form.Label>Image</Form.Label>
        <Form.Control
          type='file'
          name='image'
          accept='image/*'
          className='form-control'
          onChange={(e) => handleImageChange(e)} />

        {progress === 0 ? null : (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped mt-2"
              style={{ width: `${progress}%` }}
            >
              {`uploading image ${progress}%`}
            </div>
          </div>
        )}
      </CForm>
      <div className="d-grid gap-2" style={{ justifyContent: 'center', paddingTop: 10 }}>
      <Button variant="primary" type="Submit" onClick={handlePublish} style={{ width: '400px', height: '50px' }}>
          Add / Update
      </Button>
      </div>
    </CCard>
    <Button onClick={() => {
            navigate('/CourseApi')
          }}style={{backgroundColor:'grey', marginBottom: 20}}>courseApi</Button>
    <CourseList />
    </>
  )
}