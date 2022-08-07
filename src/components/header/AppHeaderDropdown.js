import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
} from '@coreui/react'
import { cilAccountLogout, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/profile1.png'
import {signup, logout, auth, login, useAuth} from 'src/config/firebase'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  async function handleLogout(){
    try {
      await logout()
      .then(auth=>{navigate('/login')})
    } catch {
      alert("Error");
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} onClick={handleLogout}  className="me-2" />
          Logout
        </CDropdownItem> */}
        <CButton style={{marginTop:'5px', marginLeft:'30px'}} onClick={handleLogout} color="primary" className="px-4">
          Logout
        </CButton>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
