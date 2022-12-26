// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { Home } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === 'attendancescore'} onClick={() => toggleTab('attendancescore')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Attendance Score</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'businesshours'} onClick={() => toggleTab('businesshours')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Business Hours</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'holidays'} onClick={() => toggleTab('holidays')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Holidays</span>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={activeTab === 'leavesetting'} onClick={() => toggleTab('leavesetting')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Leave Settings</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
