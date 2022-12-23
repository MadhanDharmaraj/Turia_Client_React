// ** React Imports
import { Fragment, useState } from 'react'


// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Card, CardHeader, CardBody } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Designation from './Designation'
import Department from './Department'
import Role from './Roles'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('roles')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Card>
      <CardBody>
        <Fragment>

          <Row>
            <Col xs={12}>
              <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

              <TabContent activeTab={activeTab}>
                <TabPane tabId='roles'>
                  <Role data={activeTab} />
                </TabPane>

                <TabPane tabId='designation'>
                  <Designation data={activeTab} />
                </TabPane>

                <TabPane tabId='department'>
                  <Department data={activeTab} />
                </TabPane>

              </TabContent>

            </Col>
          </Row>

        </Fragment>
      </CardBody>
    </Card>
  )
}

export default AccountSettings
