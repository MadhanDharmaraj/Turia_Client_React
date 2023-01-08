// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** User Components
import Conversation from './Conversation'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>List</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'dscnotes'} onClick={() => toggleTab('dscnotes')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Notes</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
        </TabPane>
        <TabPane tabId='dscnotes'>
          <Conversation tabId={active}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
