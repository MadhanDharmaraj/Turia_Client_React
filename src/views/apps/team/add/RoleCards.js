// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import axios from '@src/configs/axios/axiosConfig'
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

const RoleCards = () => {

  const [modules, setModules] = useState([])

  const getModules = () => {
    axios.post('/modules/list').
      then((res) => {
        setModules(res.data.modules)
      }).catch(() => { })
  }

  useEffect(() => {
    getModules()
  }, [])

  return (
    <Fragment>
      <Card>
        <CardBody className='p-0'>
          <Row >
            <Col xs={12}>
              <h4 className='mt-2 pt-50'>Role Permissions</h4>
              <Table className='table-flush-spacing' responsive>
                <tbody>
                  {modules.map((module, index) => {
                    return (

                      <tr key={index}>
                        <td className='text-nowrap fw-bolder'>{module.name}</td>
                        <td>
                          <div className='d-flex'>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`read-${module}`} />
                              <Label className='form-check-label' for={`read-${module}`}>
                                Read
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`write-${module}`} />
                              <Label className='form-check-label' for={`write-${module}`}>
                                Write
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`delete-${module}`} />
                              <Label className='form-check-label' for={`delete-${module}`}>
                                Delete
                              </Label>
                            </div>
                            <div className='form-check me-3 me-lg-5'>
                              <Input type='checkbox' id={`import-${module}`} />
                              <Label className='form-check-label' for={`import-${module}`}>
                                import
                              </Label>
                            </div>
                            <div className='form-check'>
                              <Input type='checkbox' id={`export-${module}`} />
                              <Label className='form-check-label' for={`export-${module}`}>
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
