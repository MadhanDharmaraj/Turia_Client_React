// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, PopoverHeader, PopoverBody, Popover } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X, Clock } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [setShow] = useState(false)

  // ** Hook
  const {
    formState: {  }
  } = useForm({
    defaultValues: {
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(' ')[1],
      firstName: selectedUser.fullName.split(' ')[0]
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (

        <Avatar
          initials
          color={selectedUser.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.fullName}
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
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: 'User has been suspended.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Suspension :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='d-lg-flex'>
            <div>
              <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                Sent to Review
              </Badge>
            </div>
            <div className='ms-auto'>
              <Fragment >
                <Button color='primary' outline id='controlledPopover' size='sm'>
                  Review Task
                </Button>
                <Popover placement='bottom'
                  target='controlledPopover'
                  isOpen={popoverOpen}
                  toggle={() => setPopoverOpen(!popoverOpen)}>
                  <PopoverHeader>Review Task</PopoverHeader>
                  <PopoverBody>
                    Macaroon chocolate candy. I love carrot cake gingerbread cake lemon
                    drops. Muffin sugar plum marzipan pie.
                  </PopoverBody>
                </Popover>
              </Fragment>
            </div>
          </div>

          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? selectedUser.fullName : 'Eleanor Aguilar'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      Trueminds pvt ltd.
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='border-bottom mb-1 pb-50 align-items-center d-lg-flex'>
            <span className='fw-bolder pb-50'>Details</span>
            <Button className='ms-auto' color='success' size='sm'>
              <Clock size={16} className='me-25'></Clock>Start Timer</Button>
          </div>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Task ID:</span>
                  <span>{selectedUser.username}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Service Name:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Category:</span>
                  <span>Category</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Priority:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.status]}>
                    Medium
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Start Date:</span>
                  <span>Tax-{selectedUser.contact.substr(selectedUser.contact.length - 4)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>End Date:</span>
                  <span>{selectedUser.contact}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Cancel
            </Button>
          </div>
        </CardBody> 
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
