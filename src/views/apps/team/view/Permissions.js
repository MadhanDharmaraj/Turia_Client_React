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
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'

// ** Third Party Components
import { Copy, Info } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** FAQ Illustrations
//import illustration from '@src/assets/images/illustration/faq-illustrations.svg'

// ** Vars
const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RoleCards = () => {
  // ** States
  // const [show, setShow] = useState(false)
  // const [modalType, setModalType] = useState('Add New')

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
