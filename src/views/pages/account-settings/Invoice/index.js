// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Card, CardHeader } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import GeneralSetting from './GeneralSetting'
import InvoiceAccounts from './InvoiceAccounts'
import GSTSetting from './GSTSetting'
import TaxRateSetting from './TaxRateSetting'
import ExemptionReasonSetting from './ExemptionReasonSetting'

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
    <Card>
      <CardHeader>
        <Fragment>
          {data !== null ? (
            <Row>
              <Col xs={12}>
                <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralSetting data={data.general} />
                  </TabPane>

                  <TabPane tabId='2'>
                    <InvoiceAccounts data={data.general} />
                  </TabPane>

                  <TabPane tabId='3'>
                    <GSTSetting data={data.general} />
                  </TabPane>

                  <TabPane tabId='4'>
                    <TaxRateSetting data={data.general} />
                  </TabPane>

                  <TabPane tabId='5'>
                    <ExemptionReasonSetting data={data.general} />
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
