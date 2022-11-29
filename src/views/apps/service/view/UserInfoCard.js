// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, Button, Badge } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'


const statusColors = [
  '',
  'light-primary',
  'light-warning'
]

const statusArr = [
  '',
  "Active",
  "In Active"

]

const UserInfoCard = ({ selectedService }) => {

  // ** render user img
  const renderUserImg = () => {

    return (
      <Avatar
        initials
        color={statusColors[selectedService.status]}
        className='rounded mt-3 mb-2'
        content={selectedService.name.charAt(0).toUpperCase()}
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
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Category:</span>
                  <span className='col-6 text-end'>{selectedService.categoriesname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Description:</span>
                  <span className='col-6 text-end'>{selectedService.description}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>SAC Code:</span>
                  <span className='col-6 text-end'>{selectedService.saccode}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Fee:</span>
                  <span className='col-6 text-end'>{selectedService.sellingprice}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Tax Rate:</span>
                  <span className='col-6 text-end'>{selectedService.taxgroupsname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Status:</span>
                  <span className='col-6 text-end'>
                    <Badge className='text-capitalize' color={statusColors[selectedService.status]}>
                      {statusArr[selectedService.status]}
                    </Badge>
                  </span>
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
