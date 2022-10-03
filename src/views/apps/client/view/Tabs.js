// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { Bell, CheckSquare, Edit2 } from 'react-feather'

// ** User Components
import TaskList from './TaskList'
import Conversation from './Conversation'
import Notifications from './Notifications'

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
          <NavLink active={active === '4'} onClick={() => toggleTab('3')}>
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
          <Conversation />
        </TabPane>
        <TabPane tabId='3'>
          <Notifications />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
