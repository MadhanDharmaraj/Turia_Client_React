// ** React Imports
import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Card, CardBody, Button, Badge, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Home, File } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusColors = [
  '',
  'light-primary',
  'light-warning'
]

const statusArr = [
  '',
  "Active",
  "In Active"

]
const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedClient }) => {
  // ** State
  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Basic Details</h4>
          <div className='info-container'>
            {selectedClient !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Name:</span>
                  <span className='col-6 text-end'>{selectedClient.contactpersonname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Business Name:</span>
                  <span className='col-6 text-end'>{selectedClient.name}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Email:</span>
                  <span className='col-6 text-end'>{selectedClient.email}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Contact:</span>
                  <span className='col-6 text-end'>{selectedClient.contactnumber}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Business Entity:</span>
                  <span className='col-6 text-end'>{selectedClient.businessentitiesname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Status:</span>
                  <span className='col-6 text-end'>
                    <Badge className='text-capitalize' color={statusColors[selectedClient.status]}>
                      {statusArr[selectedClient.status]}
                    </Badge>
                  </span>
                </li>

              </ul>
            ) : null}
          </div>

          <Nav pills className='mb-2'>
            <NavItem>
              <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                <File className='font-medium-3 me-50' />
                <span className='fw-bold'>Tax Information</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                <Home className='font-medium-3 me-50' />
                <span className='fw-bold'>Billing Address</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={active}>
            <TabPane tabId='1'>
              <ul className='list-unstyled'>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Currency:</span>
                  <span className='col-6 text-end'>{selectedClient.name}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Place of Supply:</span>
                  <span className='col-6 text-end'>{selectedClient.placeofsupplyname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>GSTIN Register Type:</span>
                  <span className='col-6 text-end'>{selectedClient.gstregistrationtypesname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>GSTIN:</span>
                  <span className='col-6 text-end'>{selectedClient.gstin}</span>
                </li> 
              </ul>
            </TabPane>
            <TabPane tabId='2'>
              <ul className='list-unstyled'>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Address Line 1:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddressline1}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Address Line 2:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddressline2}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>City:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddresscity}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>State:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddressstatesname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Country:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddresscountriesname}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Zip Code:</span>
                  <span className='col-6 text-end'>{selectedClient.billingaddresszip}</span>
                </li>
              </ul>
            </TabPane>
          </TabContent>

          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' tag={Link} to={`/client/edit/${selectedClient.id}`}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline  tag={Link} to={`/client/list`}>
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
