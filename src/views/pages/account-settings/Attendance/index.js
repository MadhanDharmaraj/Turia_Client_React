// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Card, CardHeader } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import AttendanceScore from './AttendanceScore'
import BusinessHours from './BusinessHours'
import Holidays from './Holidays'
import LeaveSetting from './LeaveSetting'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('attendancescore')
  const [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  useEffect(() => {
    axios.get('/account-setting/data').then(response => setData(response.data))
  }, [])

  return (
    <Card>
      <CardHeader>
        <Fragment>
          {data !== null ? (
            <Row>
              <Col xs={12}>
                <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

                <TabContent activeTab={activeTab}>
                  <TabPane tabId='attendancescore'>
                    <AttendanceScore data={activeTab} />
                  </TabPane>

                  <TabPane tabId='businesshours'>
                    <BusinessHours data={activeTab} />
                  </TabPane>
                  
                  <TabPane tabId='holidays'>
                    <Holidays data={activeTab} />
                  </TabPane>

                  <TabPane tabId='leavesetting'>
                    <LeaveSetting data={activeTab} />
                  </TabPane>

                </TabContent>

              </Col>
            </Row>
          ) : null}
        </Fragment>
      </CardHeader>
    </Card>
  )
}

export default AccountSettings
