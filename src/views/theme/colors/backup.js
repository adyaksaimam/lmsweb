/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CForm,
  CCard,
  CFormTextarea,
  CCardBody,
  CFormInput,
  CFormLabel,
  CCardHeader,
} from '@coreui/react'
import { Form, Alert, InputGroup, Button, Container, Row, Col } from 'react-bootstrap'
import CourseList from './CourseList'
import CourseDataService from '../services/course.service'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, db } from 'src/config/firebase'

const Course = (id, setCourseId) => {
  const [coursetitle, setcoursetitle] = useState('')
  const [course_format, setcourse_format] = useState('')
  const [body, setbody] = useState('')
  const [certification, setcertification] = useState('')
  const [message, setMessage] = useState({ error: false, msg: '' })
  const [setFormData] = useState({
    title: '',
    Description: '',
    image: '',
    tanggal: Timestamp.now().toDate(),
  })

  const handleImageChange = (e) => {
    setFormData({ ...newCourse, image: e.target.files[0] })
  }
  //For Course List
  const [courseId] = useState('')
  const getCourseIdHandler = (id) => {
    console.log('The ID of document to be edited', id)
    setCourseId(id)
  }
  const [progress, setProgress] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (coursetitle === '' || body === '') {
      setMessage({
        error: true,
        msg: 'Title and Body are mandatory!',
      })
      return
    }
    const storageRef = ref(storage, `/images/${Date.now()}${newCourse.image.name}`)
    const uploadImage = uploadBytesResumable(storageRef, newCourse.image)
    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progressPercent)
      },
      (err) => {
        console.log(err)
      },
      () => {
        newCourse({
          coursetitle: '',
          course_format: '',
          image: '',
          body: ' ',
        })

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const jobRef = collection(db, 'course')
          addDoc(jobRef, {
            coursetitle: newCourse.coursetitle,
            course_format: newCourse.course_format,
            body: newCourse.body,
            imageUrl: url,
            tanggal: Timestamp.now().toDate(),
          })
        })
      },
    )
    console.log(newCourse)

    try {
      await CourseDataService.addCourse(newCourse)
      setMessage({ error: false, msg: 'new Course added successfully' })
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }

    setcoursetitle('')
    setcourse_format('')
    setbody('')
    setcertification('')
  }

  //Edit Course List
  // const editHandler = async () => {
  //   setMessage('')
  //   try {
  //     const docSnap = await CourseDataService.getCourse(id)
  //     console.log('the record is :', docSnap.data())
  //     settitle(docSnap.data().title)
  //     setcourse_type(docSnap.data().course_type)
  //     setcourse_format(docSnap.data().course_format)
  //     setcourse_overview(docSnap.data().course_overview)
  //     setparticipant(docSnap.data().participant)
  //     setbody(docSnap.data().body)
  //     setcovered_course(docSnap.data().covered_course)
  //     setcertification(docSnap.data().certification)
  //   } catch (err) {
  //     setMessage({ error: true, msg: err.message })
  //   }
  // }

  // useEffect(() => {
  //   if (id !== undefined && id !== '') {
  //     editHandler()
  //   }
  // }, [id])

  return (
    <>
      <CCard className="mb-4">
        <div
          className="course"
          style={{
            justifyContent: 'center',
          }}
        >
          {message?.msg && (
            <Alert
              variant={message?.error ? 'danger' : 'success'}
              dismissible
              onClose={() => setMessage('')}
            >
              {' '}
              {message?.msg}
            </Alert>
          )}
          <CForm
            id={courseId}
            setCourseId={setCourseId}
            onSubmit={handleSubmit}
            style={{
              justifyContent: 'center',
              paddingLeft: '15px',
              marginTop: '0.8rem',
              paddingRight: '15px',
            }}
          >
            <Form.Group className="mb-3" controlId="formCourseTitle">
              <CFormLabel htmlFor="basic-url">Add Course</CFormLabel>
              <InputGroup>
                <InputGroup.Text id="formCourseTitle">Course Title</InputGroup.Text>
                <CFormTextarea
                  value={coursetitle}
                  onChange={(e) => setcoursetitle(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourse Format">
              <InputGroup>
                <InputGroup.Text id="formCourse Format">Course Format</InputGroup.Text>
                <Form.Select
                  aria-label="Default Select example"
                  value={course_format}
                  onChange={(e) => setcourse_format(e.target.value)}
                >
                  <option value="Theory">Theory</option>
                  <option value="Video">Video</option>
                  <option value="Theory and Video">Theory and Video</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBody">
              <InputGroup>
                <InputGroup.Text id="formBody">Body</InputGroup.Text>
                <CFormTextarea
                  as="textarea"
                  value={body}
                  onChange={(e) => setbody(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <CFormLabel htmlFor="basic-url">Add Image or Video</CFormLabel>
              <label htmlFor="">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCertification">
              <InputGroup>
                <InputGroup.Text id="formCertification">Certification</InputGroup.Text>
                <CFormTextarea
                  type="text"
                  value={certification}
                  onChange={(e) => setcertification(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
            <div className="d-grid gap-2" style={{ justifyContent: 'center' }}>
              <Button variant="primary" type="Submit" style={{ width: '400px', height: '50px' }}>
                Add / Update
              </Button>
            </div>
          </CForm>
          <CCardBody></CCardBody>
        </div>
      </CCard>
      <CCard>
        <CCardHeader className="d-grid gap-2" component="h5" style={{ justifyContent: 'center' }}>
          COURSE LIST
        </CCardHeader>
        <Container>
          <Row>
            <Col>
              <CourseList getCourseId={getCourseIdHandler} />
            </Col>
          </Row>
        </Container>
      </CCard>
    </>
  )
}

export default Course
