import React from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CImage } from '@coreui/react'
import image from 'src/assets/images/react.jpg'
import Slider from 'src/views/dashboard/Slider/Slider'
import { AppContent, AppSidebar, AppHeader } from 'src/components/index'
import {useAuth} from 'src/config/firebase'

const Dashboard = () => {
  const currentUser = useAuth();

  return (
    <>
    <h2> Hello {currentUser?.email}</h2>
    <Slider/>
    <th>    
      <CCard style={{marginTop:'20px', width:'20.5rem'}} className="mb-4">
        <CImage style={{ margin:'13px'}} fluid src={image} width={300}/>
        <CCardBody>
          <CCardTitle>Big Data Analysis</CCardTitle>
          <CCardText>
            SIUUU
          </CCardText>
          {/* <CButton href="#"> Enroll </CButton> */}
        </CCardBody>
      </CCard>
    </th>
    <th>    
      <CCard style={{ marginLeft:'18px', marginTop:'20px', width:'20.5rem'}} className="mb-4">
        <CImage style={{ margin:'13px'}} fluid src={image} width={300}/>
        <CCardBody>
          <CCardTitle>Sumorning</CCardTitle>
          <CCardText>
            SIUUU
          </CCardText>
          {/* <CButton href="#"> Enroll </CButton> */}
        </CCardBody>
      </CCard>
    </th>
    <th>    
      <CCard style={{ marginLeft:'18px', marginTop:'20px', width:'20.5rem'}} className="mb-4">
        <CImage style={{ margin:'13px'}} fluid src={image} width={300}/>
        <CCardBody>
          <CCardTitle>Sumorning</CCardTitle>
          <CCardText>
            SIUUU
          </CCardText>
          {/* <CButton href="#"> Enroll </CButton> */}
        </CCardBody>
      </CCard>
    </th>
    
      {/* <CButton>
      <CImage style={{ margin:'13px'}} fluid src={image} width={270}/>
      <CCardTitle>Big Data Analysis</CCardTitle>
      </CButton> */}
    </>
  )
}

export default Dashboard
