// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, CheckSquare, Edit2 } from 'react-feather'

// ** User Components
import Attendance from './Attendance'
import JobInfo from './JobInfo'
import TimeSheet from './TimeSheet'
import Leave from './Leave'
import Permissions from './Permissions' 

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === 'jobinfo'} onClick={() => toggleTab('jobinfo')}>
            <CheckSquare className='font-medium-3 me-50' />
            <span className='fw-bold'>Job Info</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'mypermissions'} onClick={() => toggleTab('mypermissions')}>
            <Edit2 className='font-medium-3 me-50' />
            <span className='fw-bold'>My Permissions</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'attendance'} onClick={() => toggleTab('attendance')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Attendance</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'timesheet'} onClick={() => toggleTab('timesheet')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Time Sheet</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'leaves'} onClick={() => toggleTab('leaves')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Leave</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='jobinfo'>
          <JobInfo tabId={active}/>
        </TabPane>
        <TabPane tabId='mypermissions'>
          <Permissions tabId={active}/>
        </TabPane>
        <TabPane tabId='attendance'>
          <Attendance tabId={active}/>
        </TabPane>
        <TabPane tabId='timesheet'>
          <TimeSheet tabId={active}/>
        </TabPane>
        <TabPane tabId='leaves'>
          <Leave tabId={active}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
