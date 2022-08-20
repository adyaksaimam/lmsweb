/* eslint-disable prettier/prettier */
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, {useState} from 'react'
import { storage, db } from 'src/config/firebase';
import { Button } from 'react-bootstrap'
import { CCard, CCardHeader } from '@coreui/react';
import { toast } from 'react-toastify'

export default function addjob() {
  const[formData, setFormData] = useState({
    title: '',
    Description: '',
    image: '',
    tanggal: Timestamp.now().toDate(),
  });

  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [progress, setProgress] = useState(0);

  const handleImageChange=(e)=>{
    setFormData({ ...formData, image:e.target.files[0] });
  }

  const handlePublish=(e)=>{
    if (!formData.title || !formData.Description || !formData.image) {
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
          title: "",
          Description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const jobRef = collection(db, "Job");
          addDoc(jobRef, {
            title: formData.title,
            Description: formData.Description,
            imageUrl: url,
            tanggal: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Job added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding Job", { type: "error" });
            });
        });
      }
    );
  }
  return (
    <CCard className="mb-4" style={{justifyContent: 'center', padding: 10}}>
      <CCardHeader className="d-grid gap-2" component="h5">Add Job</CCardHeader>
      <label htmlFor=''>Title</label>
      <input 
      type='text' 
      name='title' 
      className='form-control'
      value={formData.title}
      onChange={(e)=>handleChange(e)}
      />

      <label htmlFor=''>Description</label>
      <textarea 
      name='Description' 
      className='form-control' 
      value={formData.Description}
      onChange={(e)=>handleChange(e)}
      />

      <label htmlFor=''>Image</label>
      <input
      type='file'
      name='image'
      accept='image/*'
      className='form-control'
      onChange={(e)=>handleImageChange(e)}
      />
      
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
      <Button className='form-control btn-primary mt-2' onClick={handlePublish}>
        Publish Cou
      </Button>


    </CCard>
  )
}
