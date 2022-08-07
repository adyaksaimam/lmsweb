import {React, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Text from 'src/assets/images/text.png'
import {signup, logout, auth, login, useAuth} from 'src/config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup(){
    try {
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      alert("Error!");
    }
  }

  async function handleLogin(){
    try {
      await login(emailRef.current.value, passwordRef.current.value)
      .then(auth=>{navigate('/dashboard')})
    } catch {
      alert("Error!");
    }
  }

  async function handleLogout(){
    try {
      await logout();
    } catch {
      alert("Error");
    }
  }

  // const SignIn = ()=> {
  //   signInWithEmailAndPassword(auth, email, passwordRef)
  //   .then(auth=>{navigate('/register')})
  //   .catch(error=>console.error(error))
  // }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    {/* <div>{currentUser?.email}</div> */}
                    <p className="text-medium-emphasis">Login For Admin</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="email" 
                      autoComplete="username"
                      ref={emailRef} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        ref={passwordRef}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" className="px-4">
                          Login
                        </CButton>
                        {/* <CButton style={{marginTop:'20px'}} onClick={handleLogout} color="primary" className="px-4">
                          Logout
                        </CButton> */}
                      </CCol>
                      <CCol xs={6} className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                  <CImage fluid src={Text} align="center" width={180} />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
