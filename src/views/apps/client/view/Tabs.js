// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, CheckSquare, Edit2 } from 'react-feather'

// ** User Components
import TaskList from './TaskList'
import SecurityTab from './SecurityTab'
import Connections from './Connections'
import BillingPlanTab from './BillingTab'
import UserTimeline from './UserTimeline'
import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <CheckSquare className='font-medium-3 me-50' />
            <span className='fw-bold'>Task</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Edit2 className='font-medium-3 me-50' />
            <span className='fw-bold'>Note</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Compliance</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Licenses</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <TaskList />
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='3'>
          <BillingPlanTab />
        </TabPane>
        <TabPane tabId='4'>
          <Notifications />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
