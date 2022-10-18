// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, Button, Badge } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const UserInfoCard = ({ selectedService }) => {

  // ** render user img
  const renderUserImg = () => {
    if (selectedService !== null && selectedService.avatar.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedService.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedService.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedService.name}
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
  }

  
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedService !== null ? selectedService.name : 'Eleanor Aguilar'}</h4>
                </div>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedService !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Category:</span>
                  <span>{selectedService.category}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Description:</span>
                  <span>{selectedService.description}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedService.status]}>
                    {selectedService.status}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>SAC Code:</span>
                  <span className='text-capitalize'>{selectedService.sacCode}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Fee:</span>
                  <span>{selectedService.fee}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax Rate:</span>
                  <span>{selectedService.taxRate}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Exemption Reason:</span>
                  <span>{selectedService.exemptionReason}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary'>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline tag={Link} to={`/service/list`}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
      
    </Fragment>
  )
}

export default UserInfoCard
