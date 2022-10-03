// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  CardBody
} from 'reactstrap'

// ** Vars
const rolesArr = [
  'Client',
  'Service',
  'Sales',
  'Task',
  'Team',
  'Setting',
  'Digital Signature',
  'Attendance',
  'Leave'
]

const RoleCards = () => {
  
  return (
    <Fragment>
      <Card>
        <CardBody className='p-0'>
          <Row >
            <Col xs={12}>
              <h4 className='mt-2 pt-50'>Role Permissions</h4>
              <Table className='table-flush-spacing' responsive>
                <tbody>
                  {rolesArr.map((role, index) => {
                    return (

                      <tr key={index}>
                        <td className='text-nowrap fw-bolder'>{role}</td>
                        <td>
                          <div className='d-flex'>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`read-${role}`} />
                              <Label className='form-check-label' for={`read-${role}`}>
                                Read
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`write-${role}`} />
                              <Label className='form-check-label' for={`write-${role}`}>
                                Write
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`delete-${role}`} />
                              <Label className='form-check-label' for={`delete-${role}`}>
                                Delete
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`import-${role}`} />
                              <Label className='form-check-label' for={`import-${role}`}>
                                import
                              </Label>
                            </div>
                            <div className='form-check'>
                              <Input type='checkbox' id={`export-${role}`} />
                              <Label className='form-check-label' for={`export-${role}`}>
                                Export
                              </Label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default RoleCards
