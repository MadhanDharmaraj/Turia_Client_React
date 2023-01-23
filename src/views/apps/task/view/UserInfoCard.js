// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Badge, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'
// ** Third Party Components
import Conversation from './Conversation'
import UserTimeline from './UserTimeline'
import TimeSheet from './TimeSheet'
import Templates from './Templates'
import Swal from 'sweetalert2'
import { Bell, Briefcase, Calendar, Clock, Edit, Edit3, FileText, MessageCircle, Paperclip, User, X } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
// import Avatar from '@components/avatar'
// import { updateStatus, addTaskConversation, startTimer, endTimer } from '../store/index'
// ** Styles
//import { useDispatch } from 'react-redux'
import '@styles/react/libs/react-select/_react-select.scss'
import moment from 'moment'
import Select from 'react-select'
// import { orgUserId, activeOrganizationid } from '@src/helper/sassHelper'
// const userId = orgUserId()
// const activeOrgId = activeOrganizationid()

const statusOptions = [{ id: 1, name: 'To Do' }, { id: 2, name: 'Inprogress' }, { id: 3, name: 'Completed' }, { id: 4, name: 'On Hold' }, { id: 5, name: 'Cancelled' }, { id: 6, name: 'Sent to Review' }, { id: 7, name: 'Request to changes' }]

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

  const { id } = useParams()
  console.log(id)
  // ** State
  const [active, setActive] = useState('tasknotes')
  const [taskStatus, setTaskStatus] = useState(1)

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const dateFormat = (value) => {
    return moment.unix(value).format("MMM DD, YYYY")
  }

  useEffect(() => {
    if (selectedTask !== null) {
      setTaskStatus(selectedTask.taskstatus)
    }
  }, [selectedTask])


  return (
    <Fragment>
      <Row className='my-1'>
        <Col className='d-flex justify-content-between'>
          <div>
            <span>By {selectedTask.createdBy}</span>&nbsp;|&nbsp; <span>
              <Briefcase size={14} /> {selectedTask.servicename}
            </span> &nbsp;|&nbsp;
            <span> <MessageCircle size={14} /> 4 </span>
            &nbsp;|&nbsp;
            <span> <Paperclip size={14} /> 4 </span>
            &nbsp;|&nbsp;
            <span> <Clock size={14} /> </span>
          </div>
          <div>
            <Edit size={16} className='ms-1 cursor-pointer' tag={Link} to={`/task/edit/${id}`} />
            <X size={16} className='ms-1 cursor-pointer' tag={Link} to={`/task/list`} />
          </div>
        </Col>

      </Row>
      <Card>
        <CardBody>

          <Table responsive bordered>
            <thead>
              <tr >
                <th colSpan='4'>Task Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reviewer</td>
                <td >
                  <Badge color='light-primary' pill href='#'>
                    <User size={14} />
                    <span className='align-middle ms-50'>Madhan</span>
                  </Badge>
                </td>
                <td >
                  Assignee
                </td>
                <td>
                  <Badge color='light-primary' pill href='#'>
                    <User size={14} />
                    <span className='align-middle ms-50'>Kavin</span>
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td >
                  <Select
                    className={classnames('react-select')}
                    classNamePrefix='select'
                    options={statusOptions}
                    getOptionLabel={(option) => option.name}
                    onChange={(val) => { return val.id }}
                    value={statusOptions.find(c => { return c.id === taskStatus })}
                    getOptionValue={(option) => option.id}
                  />

                </td>
                <td >
                  Priority
                </td>
                <td> <Badge className='text-capitalize' color={priorityColors[selectedTask.priority]}>
                  {priorityArr[selectedTask.priority]}
                </Badge>.</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td >
                  <div className='d-flex justify-content-between' >
                    {dateFormat(selectedTask.startdate)}
                    <Calendar size={16} />
                  </div>
                </td>
                <td >
                  End Date
                </td>
                <td>
                  <div className='d-flex justify-content-between' >
                    {dateFormat(selectedTask.enddate)}
                    <Calendar size={16} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tag</td>
                <td >
                  <Badge color='primary' className='text-capitalize'>
                    Professional Tax
                  </Badge>
                </td>
                <td >
                  Complete Percentage
                </td>
                <td>
                  0
                </td>
              </tr>
            </tbody>
          </Table>

          <Row className='mt-1 ps-1'>
            <Fragment>
              <Nav pills className='mb-2'>
                <NavItem>
                  <NavLink active={active === 'tasknotes'} onClick={() => toggleTab('tasknotes')}>
                    <MessageCircle className='font-medium-3 me-50' />
                    <span className='fw-bold'>Comments</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <FileText className='font-medium-3 me-50' />
                    <span className='fw-bold'>Templates</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                    <Bell className='font-medium-3 me-50' />
                    <span className='fw-bold'>Checklist Trail</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <Clock className='font-medium-3 me-50' />
                    <span className='fw-bold'>Timesheet</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={active}>

                <TabPane tabId='tasknotes'>
                  <Conversation tabId={active} />
                </TabPane>
                <TabPane tabId='1'>
                  <Templates />
                </TabPane>
                <TabPane tabId='4'>
                  <UserTimeline />
                </TabPane>
                <TabPane tabId='3'>
                  <TimeSheet />
                </TabPane>
              </TabContent>
            </Fragment>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
