/* eslint-disable prettier/prettier */
import React from 'react'
import { CCard, CCardBody, CCardText, CCardTitle, CImage } from '@coreui/react'
import Slider from 'src/views/dashboard/Slider/Slider'
import image from 'src/assets/images/react.jpg'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  // async function course1(){
  //   try {
  //     await login(emailRef.current.value, passwordRef.current.value)
  //     .then(auth=>{navigate('/dashboard')})
  //   } catch {
  //     alert("Error!");
  //   }
  // }

  return (
    <>
      <Slider />
      <th>
        <CCard
          onClick={() => {
            navigate('/course1')
          }}
          style={{ marginTop: '20px', width: '20rem' }}
          className="mb-4"
        >
          <CImage style={{ margin: '13px' }} fluid src={image} width={289} />
          <CCardBody>
            <CCardTitle>Big Data Analysis</CCardTitle>
            <CCardText>SIUUU</CCardText>
            {/* <CButton href="#"> Enroll </CButton> */}
          </CCardBody>
        </CCard>
      </th>

      <th>
        <CCard
          onClick={() => {
            navigate('/course1')
          }}
          style={{ marginTop: '20px', marginLeft: '20px', width: '20.5rem' }}
          className="mb-4"
        >
          <CImage style={{ margin: '13px' }} fluid src={image} width={300} />
          <CCardBody>
            <CCardTitle>Mobile Programming</CCardTitle>
            <CCardText>SIUUU</CCardText>
            {/* <CButton href="#"> Enroll </CButton> */}
          </CCardBody>
        </CCard>
      </th>
    </>
  )
}

export default Dashboard
