// ** React Imports
import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Badge, PopoverHeader, PopoverBody, Popover } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Clock } from 'react-feather'
import { useForm } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import moment from 'moment'

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedTask }) => {
  // ** State
  const [setShow] = useState(false)

  // ** Hook
  const {
    formState: { }
  } = useForm({
    defaultValues: {
      username: selectedTask.servicename
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedTask !== null) {

      return (

        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedTask.servicename.charAt(0) || 'T'}
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
  const dateFormat = (value) => {
    return moment.unix(value).format("MMM DD, YYYY")
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='d-flex'>
            <div>
              <Badge color='success' className='text-capitalize'>
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
                  <h4>{selectedTask !== null ? selectedTask.servicename : 'Eleanor Aguilar'}</h4>
                  {selectedTask !== null ? (

                    <span>{selectedTask.clientname}</span>

                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='border-bottom mb-1 mt-1 pb-50 align-items-center d-flex'>
            <span className='fw-bolder pb-50'>Details</span>
            <Button className='ms-auto' color='success' size='sm'>
              <Clock size={16} className='me-25'></Clock>Start Timer</Button>
          </div>
          <div className='info-container'>
            {selectedTask !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Task ID:</span>
                  <span>{selectedTask.uniqueidentity}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Service Name:</span>
                  <span>{selectedTask.servicename}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Start Date:</span>
                  <span>{dateFormat(selectedTask.startdate)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>End Date:</span>
                  <span>{dateFormat(selectedTask.enddate)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Priority:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedTask.status]}>
                    Medium
                  </Badge>
                </li>

              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline tag={Link} to={`/recurring-task/list`}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
