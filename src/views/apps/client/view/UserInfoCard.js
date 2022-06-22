// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Button, Badge, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import { Home, File } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [setShow] = useState(false)

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Suspended!',
          text: 'User has been suspended.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Suspension :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Basic Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Name:</span>
                  <span className='col-6 text-end'>{selectedUser.name}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Business Name:</span>
                  <span className='col-6 text-end'>{selectedUser.businessName}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Email:</span>
                  <span className='col-6 text-end'>{selectedUser.email}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Contact:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Status:</span>
                  <span className='col-6 text-end'>
                    <Badge className='text-capitalize' color={statusColors[selectedUser.status]}>
                      {selectedUser.status}
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
                  <span className='col-6 text-end'>{selectedUser.name}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Place of Supply:</span>
                  <span className='col-6 text-end'>{selectedUser.businessName}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>GSTIN Registeer Type:</span>
                  <span className='col-6 text-end'>{selectedUser.email}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>GSTIN:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li> 
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Taxsable:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li>

              </ul>
            </TabPane>
            <TabPane tabId='2'>
              <ul className='list-unstyled'>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Address Line 1:</span>
                  <span className='col-6 text-end'>{selectedUser.name}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Address Line 2:</span>
                  <span className='col-6 text-end'>{selectedUser.businessName}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>City:</span>
                  <span className='col-6 text-end'>{selectedUser.email}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>State:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Country:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li>
                <li className='mb-75 row'>
                  <span className='fw-bolder col-6'>Zip Code:</span>
                  <span className='col-6 text-end'>{selectedUser.contactNo}</span>
                </li>
              </ul>
            </TabPane>
          </TabContent>

          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard
