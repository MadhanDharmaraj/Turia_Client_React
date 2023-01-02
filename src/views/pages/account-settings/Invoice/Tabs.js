// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { Home } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === 'general'} onClick={() => toggleTab('general')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>General</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'invoiceaccount'} onClick={() => toggleTab('invoiceaccount')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Bank Accounts</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'taxrate'} onClick={() => toggleTab('taxrate')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Tax Rate</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === 'exemptionreason'} onClick={() => toggleTab('exemptionreason')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Exemption Reason</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
