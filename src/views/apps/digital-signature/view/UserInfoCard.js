// ** React Imports
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, Button, Badge } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import moment from 'moment'
import { Fragment } from 'react'

const UserInfoCard = ({ selectedDigitalSignature }) => {
  // ** State
  const dateFormat = (value) => {

    return moment.unix(value).format("MMM DD, YYYY")

  }

  // ** render user img
  const renderUserImg = () => {

    return (
      <Avatar
        initials
        color={'light-primary' || 'light-primary'}
        className='rounded mt-3 mb-2'
        content={selectedDigitalSignature.name}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '110px',
          width: '110px'
        }}
      />
    )

  }

  const statusObj = [
    '',
    'light-primary',
    'light-warning'
  ]

  const statusArr = [
    '',
    "Active",
    "In Active"

  ]


  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedDigitalSignature !== null ? selectedDigitalSignature.client : 'Eleanor Aguilar'}</h4>
                </div>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedDigitalSignature !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>DSC ID:</span>
                  <span>{selectedDigitalSignature.id}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedDigitalSignature.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>12345 56789</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusObj[selectedDigitalSignature.status]}>
                    {statusArr[selectedDigitalSignature.status]}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Issued Date:</span>
                  <span>{dateFormat(selectedDigitalSignature.issueddate)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Expiry Date:</span>
                  <span>{dateFormat(selectedDigitalSignature.expirydate)}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' tag={Link} to={`/digital-signature/edit/${selectedDigitalSignature.id}`}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline tag={Link}
              to='/digital-signature/list'>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default UserInfoCard
