// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { Home } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === 'roles'} onClick={() => toggleTab('roles')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Roles</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'designation'} onClick={() => toggleTab('designation')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Designation</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'department'} onClick={() => toggleTab('department')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Department</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
