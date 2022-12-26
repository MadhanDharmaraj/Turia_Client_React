// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell, Home, PenTool } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Organization Setting</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='me-50' />
          <span className='fw-bold'>Security</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <PenTool size={18} className='me-50' />
          <span className='fw-bold'>Invoice</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <PenTool size={18} className='me-50' />
          <span className='fw-bold'>Attendace & Leave</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <Bell size={18} className='me-50' />
          <span className='fw-bold'>Roles and Designation</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '6'} onClick={() => toggleTab('6')}>
          <Bookmark size={18} className='me-50' />
          <span className='fw-bold'>Billing & Plans</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
