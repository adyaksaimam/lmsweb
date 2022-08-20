import React from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { DocsLink } from 'src/components'
import Addjob from './Addjob'
import Joblist from './Joblist'

const Typography = () => {
  return (
    <>
      <div className="container">
        <div className="collumn">
          <div className="mb-4">
            <Addjob />
          </div>
          <div className="mb-4">
            <Joblist />
          </div>
        </div>
      </div>
    </>
  )
}

export default Typography
