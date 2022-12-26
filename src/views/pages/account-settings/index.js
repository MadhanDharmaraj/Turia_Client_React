// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import SecurityContetTab from './SecurityContetTab'
import InvoiceSettings from './InvoiceSettings'
import Attendance from './Attendance'
import AccountTabContent from './AccountTabContent'
import RolesandDesignationContent from './RolesandDesignationContent'
import NotificationsTabContent from './NotificationsTabContent'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')
  const [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    axios.get('/account-setting/data').then(response => setData(response.data))
  }, [])

  return (
    <Fragment>
      {/* <Breadcrumbs title='Account Settings' data={[{ title: 'Pages' }, { title: 'Account Settings' }]} /> */}
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTabContent data={data.general} />
              </TabPane>
              <TabPane tabId='2'>
                <SecurityContetTab />
              </TabPane>
              <TabPane tabId='3'>
                <InvoiceSettings />
              </TabPane>
              <TabPane tabId='4'>
                <Attendance />
              </TabPane>
              <TabPane tabId='5'>
                <RolesandDesignationContent />
              </TabPane>
              <TabPane tabId='6'>
                <NotificationsTabContent />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
