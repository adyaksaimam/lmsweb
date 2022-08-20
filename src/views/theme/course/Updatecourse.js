/* eslint-disable prettier/prettier */
import { updateDoc, doc, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from 'src/config/firebase'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'


// eslint-disable-next-line react/prop-types
export default function UpdateCourse({ id, imageUrl }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [progress, setProgress] = useState(0);

  const [updata, setUpdata] = useState({});
  const [singleDoc, setSingleDoc] = useState([]);

  const [value, setvalue] = useState({
    course_title: '',
    course_format: '',
    body: '',
    certification: '',
    image: '',
    tanggal: Timestamp.now().toDate()
  })

  const handleChange = (e) => {
    e.preventDefault()
    setvalue({ ...value, [e.target.name]: e.target.value })
  }

  const { course_title, course_format, body, certification } = value

  const handleImageChange = (e) => {
    setvalue({ ...value, image: e.target.files[0] });
  }

  const updateDoc = () => {

  }
  const handlePublish = (e) => {
    if (!value.course_title || !value.body || !value.image) {
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(storage, `/images/${Date.now()}${value.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, value.image)

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
        setvalue({
          course_title: "",
          course_format: "",
          body: "",
          certification: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const courseRef = doc(db, "course", id);
          updateDoc(courseRef, {
            course_title: course_title,
            course_format: course_format,
            body: body,
            certification: certification,
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
    <>
      <Button variant="primary" style={{ backgroundColor: 'green', width: '100%' }} onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateDoc} daata={updata}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                value={course_title}
                onChange={(e) => { handleChange('course_title') }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course Format</Form.Label>
              <Form.Control
                type="text"
                value={course_format}
                onChange={(e) => { handleChange('course_format') }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                value={body}
                onChange={(e) => { handleChange('body') }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Certification</Form.Label>
              <Form.Control
                type="text"
                placeholder="this course have certification"
                value={certification}
                onChange={(e) => { handleChange('certification') }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name='image'
                accept='image/*'
                className='form-control'
                onChange={(e) => handleImageChange(e)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePublish}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
