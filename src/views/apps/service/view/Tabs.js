// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** User Components
import Checklist from './CheckList'
import Templates from './Templates'
const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Checklist</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'servicetemplate'} onClick={() => toggleTab('servicetemplate')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Templates</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
        <Checklist />
        </TabPane>
        <TabPane tabId='servicetemplate'>
          <Templates tabId={active}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
