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
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <CheckSquare className='font-medium-3 me-50' />
            <span className='fw-bold'>Job Info</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Edit2 className='font-medium-3 me-50' />
            <span className='fw-bold'>My Permissions</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Attendance</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Time Sheet</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Leave</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <JobInfo />
        </TabPane>
        <TabPane tabId='2'>
          <Permissions />
        </TabPane>
        <TabPane tabId='3'>
          <Attendance />
        </TabPane>
        <TabPane tabId='4'>
          <TimeSheet />
        </TabPane>
        <TabPane tabId='5'>
          <Leave />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
