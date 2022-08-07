/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import CourseDataService from './services/course.service'

// eslint-disable-next-line react/prop-types
const CourseList = ({ getCourseId }) => {
  const [course, setCourse] = useState([])
  useEffect(() => {
    getCourse()
  }, [])

  const getCourse = async () => {
    const data = await CourseDataService.getAllCourse()
    console.log(data.docs)
    setCourse(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const deleteHandler = async (id) => {
    await CourseDataService.deleteCourse(id)
    getCourse()
  }
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" style={{marginTop: '8px'}} onClick={getCourse}>
          Refresh List
        </Button>
      </div>

      {/*<pre>{JSON.stringify(course, undefined, 2)}</pre>*/}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Title</th>
            <th>Course Type</th>
            <th>Course Format</th>
            <th>Course Overview</th>
            <th>Body</th>
            <th>Image</th>
            <th>Participant</th>
            <th>Covered Course</th>
            <th>Certification</th>
          </tr>
        </thead>
        <tbody>
          {course.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.course_type}</td>
                <td>{doc.course_format}</td>
                <td>{doc.course_overview}</td>
                <td>{doc.body}</td>
                <td>{null}</td>
                <td>{doc.participant}</td>
                <td>{doc.covered_course}</td>
                <td>{doc.certification}</td>
                <td>
                  <Button 
                    variant="secondary" 
                    className="edit"
                    style={{paddingLeft:'21px', paddingRight:'21px'}}
                    onClick={(e) => getCourseId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default CourseList
