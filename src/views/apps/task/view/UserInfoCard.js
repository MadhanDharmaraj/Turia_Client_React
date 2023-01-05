// ** React Imports
import { useState, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Badge, PopoverHeader, PopoverBody, Popover, Input, Label } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Clock, X } from 'react-feather'
import { useForm } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'
import { updateStatus, addTaskConversation } from '../store/index'
// ** Styles
import { useDispatch } from 'react-redux'
import '@styles/react/libs/react-select/_react-select.scss'
import moment from 'moment'
import { orgUserId, activeOrganizationid } from '@src/helper/sassHelper'
const userId = orgUserId()
const activeOrgId = activeOrganizationid()
const statusColors = [
  'light-success',
  'light-warning',
  'light-secondary'
]

const statusArr = ["", "To Do", "In Progress", "Completed", "On Hold", "Cancelled", "Sent To Review", "Request Changes"]

const priorityColors = [
  '',
  'light-success',
  'light-warning',
  'light-danger'
]

const priorityArr = [
  '',
  'Low',
  'Medium',
  'High'
]


const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedTask }) => {
  // ** State
  const { id } = useParams()
  const dispatch = useDispatch()
  const [setShow] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewOption, setReviewOption] = useState('')

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

  const taskStatusUpdate = async (sts) => {
    const data = {
      status: sts || reviewOption,
      updatedBy: userId,
      id
    }
    await dispatch(updateStatus(data))

    if (reviewText !== '') {
      const conversation = {
        taskId: id,
        organizationId: activeOrgId,
        attachmentIds: [],
        comment: reviewText,
        createdBy: userId
      }
      await dispatch(addTaskConversation(conversation))
    }
    setPopoverOpen(false)
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='d-flex'>
            <div>
              <Badge color={statusColors[selectedTask.taskstatus]} className='text-capitalize'>
                {statusArr[selectedTask.taskstatus]}
              </Badge>
            </div>
            <div className='ms-auto'>
              <Fragment >
                {selectedTask.taskstatus !== '3' &&
                  <Button color='primary' outline id='controlledPopover' size='sm' disabled={selectedTask.taskstatus === '3'}>
                    Review Task
                  </Button>
                }
                {selectedTask.taskstatus === '3' &&
                  <Button color='primary' outline id='controlledPopover' size='sm' className='ms-1' >
                    Re Open
                  </Button>
                }

                <Popover placement='bottom'
                  target='controlledPopover'
                  isOpen={popoverOpen}
                  toggle={() => setPopoverOpen(!popoverOpen)}
                  style={{ width: '500px', background: '#ffffff' }}>
                  <PopoverHeader>
                    <div className='d-flex justify-content-between'>
                      Review Task
                      <X onClick={() => setPopoverOpen(false)} className='cursor-pointer' />
                    </div>
                  </PopoverHeader>

                  <PopoverBody >
                    <Row className='px-1'>
                      <Input type='textarea' rows={6} cols={50} onInput={(e) => setReviewText(e.target.value)} />
                    </Row>
                    {(selectedTask.taskstatus === '1' || selectedTask.taskstatus === '2' || selectedTask.taskstatus === '7') &&
                      <Button color='primary' size='sm' className='mt-1' onClick={() => { taskStatusUpdate(6) }}> Send To Review</Button>
                    }
                    {(selectedTask.taskstatus === '3' || selectedTask.taskstatus === '4' || selectedTask.taskstatus === '5') &&
                      <Button color='primary' size='sm' className='mt-1' onClick={() => { taskStatusUpdate(2) }}> Re Open</Button>
                    }
                    {
                      selectedTask.taskstatus === '6' &&
                      <div>
                        <Row className='my-1'>
                          <Col>
                            <Input type='radio' id="status_1" value={3} name="status" onChange={() => { setReviewOption(3) }} />
                            <Label for="status_1" className='ms-1'>Approved</Label>
                          </Col>
                          <Label>Submit feedback and Mark as Complete.</Label>
                        </Row>
                        <Row className='mb-1'>
                          <Col>
                            <Input id="status_2" type='radio' value={7} name="status" onChange={() => { setReviewOption(7) }} />
                            <Label for="status_2" className='ms-1'>Request Changes</Label>
                          </Col>
                          <Label>Submit feedback that must be addressed before Approval.</Label>
                        </Row>
                        <Button color='primary' size='sm' onClick={() => { taskStatusUpdate() }}> Submit Review</Button>
                      </div>
                    }
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
                  <Badge className='text-capitalize' color={priorityColors[selectedTask.priority]}>
                    {priorityArr[selectedTask.priority]}
                  </Badge>
                </li>

              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline tag={Link} to={`/task/list`}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
