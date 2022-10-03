// ** React Imports
import { Fragment } from 'react'

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

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Vars
const rolesArr = [
  'Client',
  'Service',
  'Sales',
  'Task',
  'Team',
  'Digital Signature',
  'Setting',
  'Attendance',
  'Leave'
]

const RoleCards = () => {

  // ** Hooks
  const { 
    setError,
    handleSubmit
  } = useForm({ defaultValues: { roleName: '' } })

  const onSubmit = data => {
    if (data.roleName.length) {
      setShow(false)
    } else {
      setError('roleName', {
        type: 'manual'
      })
    }
  }

  return (    
    <Fragment>  
      <Card>
        <CardBody className='p-3'>
          <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
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
