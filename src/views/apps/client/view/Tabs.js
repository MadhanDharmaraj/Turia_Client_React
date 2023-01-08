// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { Bell, CheckSquare, Edit2 } from 'react-feather'

// ** User Components
import TaskList from './TaskList'
import ConatctInfo from './ConatctInfo'
import Conversation from './Conversation'
import Notifications from './Notifications'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === 'contactInformation'} onClick={() => toggleTab('contactInformation')}>
            <CheckSquare className='font-medium-3 me-50' />
            <span className='fw-bold'>Conatct Information</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'clienttasklist'} onClick={() => toggleTab('clienttasklist')}>
            <CheckSquare className='font-medium-3 me-50' />
            <span className='fw-bold'>Task</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'clientnotes'} onClick={() => toggleTab('clientnotes')}>
            <Edit2 className='font-medium-3 me-50' />
            <span className='fw-bold'>Note</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'licences'} onClick={() => toggleTab('licences')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Licenses</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='contactInformation'>
          <ConatctInfo tabId={active}/>
        </TabPane>
        <TabPane tabId='clienttasklist'>
          <TaskList tabId={active}/>
        </TabPane>
        <TabPane tabId='clientnotes'>
          <Conversation tabId={active}/>
        </TabPane>
        <TabPane tabId='licences'>
          <Notifications tabId={active}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
