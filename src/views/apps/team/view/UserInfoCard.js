// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, Button, Badge } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Check, Briefcase, X } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusArr = [
  '',
  'Active',
  'InActive'
]

const statusColors = [
  '',
  'light-success',
  'light-warning'
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {

  // ** render user img
  const renderUserImg = () => {

    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={selectedUser.name}
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
                  <h4>{selectedUser !== null ? selectedUser.name : 'Eleanor Aguilar'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={statusColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>1.23k</h4>
                <small>Tasks Done</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>568</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser.contact || ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.status]}>
                    {statusArr[selectedUser.status]}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Role:</span>
                  <span className='text-capitalize'>{selectedUser.rolename}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Department:</span>
                  <span>{selectedUser.departmentname}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Designation:</span>
                  <span>{selectedUser.designationname}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline tag={Link} to={`/team/list`}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
