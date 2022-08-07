/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, createRef } from 'react'
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
import CourseDataService from './services/course.service'

const Course = (id, setCourseId) => {
  const [title, settitle] = useState('')
  const [course_format, setcourse_format] = useState('')
  const [course_overview, setcourse_overview] = useState('')
  const [body, setbody] = useState('')
  const [certification, setcertification] = useState('')
  const [message, setMessage] = useState({ error: false, msg: '' })

  //For Course List
  const [courseId] = useState('')
  const getCourseIdHandler = (id) => {
    console.log('The ID of document to be edited', id)
    setCourseId(id)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (title === '' || course_overview === '') {
      setMessage({
        error: true,
        msg: 'Title and Course Overview are mandatory!',
      })
      return
    }
    const newCourse = {
      title,
      course_format,
      course_overview,
      body,
      certification,
    }
    console.log(newCourse)

    try {
      await CourseDataService.addCourse(newCourse)
      setMessage({ error: false, msg: 'new Course added successfully' })
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }

    settitle('')
    setcourse_format('')
    setcourse_overview('')
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
  //     setcourse_format(docSnap.data().course_format)
  //     setcourse_overview(docSnap.data().course_overview)
  //     setbody(docSnap.data().body)
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
                <CFormTextarea value={title} onChange={(e) => settitle(e.target.value)} />
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

            <Form.Group className="mb-3" controlId="formCourse Overview">
              <InputGroup>
                <InputGroup.Text id="formCourse Overview">Course Overview</InputGroup.Text>
                <CFormTextarea
                  as="textarea"
                  value={course_overview}
                  onChange={(e) => setcourse_overview(e.target.value)}
                />
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
              <CFormLabel htmlFor="basic-url">Add Image</CFormLabel>
              <InputGroup>
                <CFormInput type="file" id="formFile" />
              </InputGroup>
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
