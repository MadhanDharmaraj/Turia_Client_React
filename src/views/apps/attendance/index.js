// ** User List Component
import Table from './list/Table'
import MonthlySummary from './monthlysummary/Table'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap'
import { useState } from 'react'

const TeamList = () => {

  const [active, setActive] = useState('todayattendance')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <div className='app-user-list'>

      <Nav tabs className='nav-left'>
        <NavItem>
          <NavLink
            active={active === 'todayattendance'}
            onClick={() => {
              toggle('todayattendance')
            }}
          >
            Today's Attendance
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === 'monthlysummary'}
            onClick={() => {
              toggle('monthlysummary')
            }}
          >
            Monthly Summary
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='todayattendance'>
          <Table />
        </TabPane>
        <TabPane tabId='monthlysummary'>
          <MonthlySummary />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default TeamList
