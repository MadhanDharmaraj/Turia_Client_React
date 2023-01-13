// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Form, Button } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useForm, Controller } from "react-hook-form"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useParams } from 'react-router-dom'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()

const JobInfo = (props) => {

  const { data, selectedUser } = props
  console.log(data)
  const { id } = useParams()

  const schema = yup.object().shape({
    createdBy: yup.string().default(userId),
    id: yup.string().default(id),
    organizationId: yup.string().default(activeOrgId)
  })

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit())} >
          <dl>
            <Row>
              <Col sm='3'>
                <dt>Job Title</dt>
              </Col>
              <Col sm='9'>
                <dd> {selectedUser.rolename || ''}</dd>
              </Col>
            </Row>
          </dl>
          <dl>
            <Row>
              <Col sm='3'>
                <dt>Date of Hire</dt>
              </Col>
              <Col sm='9'>
                <Controller
                  control={control}
                  name={`invoiceDate`}
                  id='invoiceDate'
                  render={({ field }) => (
                    <Flatpickr
                      value={field.value}
                      onChange={(date, dateStr) => { field.onChange(dateStr) }}
                      options={{ altInput: true, altFormat: "M j, Y", dateFormat: "U" }}
                      className='form-control invoice-edit-input date-picker'
                    />
                  )}
                />
              </Col>
            </Row>
          </dl>
          <dl>
            <Row>
              <Col sm='3'>
                <dt>Salary</dt>
              </Col>
              <Col sm='9'>
                <Controller
                  control={control}
                  name={`invoiceDate`}
                  id='invoiceDate'
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      className='form-control invoice-edit-input date-picker'
                    />
                  )}
                />
              </Col>
            </Row>
          </dl>
          <dl>
            <Row>
              <Col sm='3'>
                <dt>Hourly Rate</dt>
              </Col>
              <Col sm='9'>
                <Controller
                  control={control}
                  name={`invoiceDate`}
                  id='invoiceDate'
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      className='form-control invoice-edit-input date-picker'
                    />
                  )}
                />
              </Col>
            </Row>
          </dl>
          <dl>
            <Col className='justify-content-end'>
              <Button type='submit' color='primary'>Save</Button>
            </Col>
          </dl>
        </Form>
      </CardBody>
    </Card>
  )
}
export default JobInfo
