// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { Home } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>General</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Bank Accounts</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>GST Setting</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Tax Rate</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Exemption Reason</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
