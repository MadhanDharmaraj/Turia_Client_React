// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { Bell, FileText, MessageCircle, Clock } from 'react-feather'

// ** User Components
import Conversation from './Conversation'
import UserTimeline from './UserTimeline'
import TimeSheet from './TimeSheet'
import Templates from './Templates'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <FileText className='font-medium-3 me-50' />
            <span className='fw-bold'>Templates</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'tasknotes'} onClick={() => toggleTab('tasknotes')}>
            <MessageCircle className='font-medium-3 me-50' />
            <span className='fw-bold'>Conversation</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Clock className='font-medium-3 me-50' />
            <span className='fw-bold'>Timesheet</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Checklist Trail</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <Templates />
        </TabPane>
        <TabPane tabId='tasknotes'>
          <Conversation tabId={active}/>
        </TabPane>
        <TabPane tabId='3'>
          <TimeSheet />
        </TabPane>
        <TabPane tabId='4'>
          <UserTimeline />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
