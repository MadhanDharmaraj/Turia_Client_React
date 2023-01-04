// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  CardBody,
  FormFeedback
} from 'reactstrap'

import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
//import { addExemption, updateExemption } from './store/holidays'
import { businesshours } from './businesshoursArray.js'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
// ** Third Party Components
import moment from 'moment'

const InvoiceAccounts = () => {

  const [weeklyHours, setWeeklyHours] = useState(0)
  const [monthlyHours, setMonthlylyHours] = useState(0)

  //  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    businessHours: yup.array().default(businesshours).of(
      yup.object().shape({
        name: yup.string(),
        status: yup.boolean().default(true),
        start: yup.string().when("status", { is: (status) => status, then: yup.string().required("Please Enter Start Time") }),
        end: yup.string().when("status", { is: (status) => status, then: yup.string().required("Please Enter End Time.") })
      })
    ),
    updatedBy: yup.string().default(userId),
    createdBy: yup.string().default(userId)
  })

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const { fields, update } = useFieldArray({ name: 'businessHours', control })

  const weeklyHoursfn = () => {
    let minutes = 0

    control._formValues.businessHours.forEach((obj, i) => {
      if (!obj.status) {
        const data = {
          day: obj.day,
          status: obj.status,
          start: '',
          end: ''
        }
        update(i, data)
      }
    })

    control._formValues.businessHours.forEach((obj) => {
      if (obj.status && (obj.start !== '' || obj.start !== '')) {
        const startTime = moment(`${obj.start} am`, 'HH:mm a')
        const endTime = moment(`${obj.end} pm`, 'HH:mm a')

        const minDiff = endTime.diff(startTime, 'minutes')
        minutes = minutes + minDiff
      }
    })
    const hours_temp = Math.floor(minutes / 60)
    const minutes_temp = minutes % 60
    setWeeklyHours(`${String(hours_temp)} : ${String(minutes_temp)}`)
  }
  const monthlyHoursfn = () => {
    let minutes = 0
    control._formValues.businessHours.forEach((obj) => {
      if (obj.status) {
        const startTime = moment(`${obj.start} am`, 'HH:mm a')
        const endTime = moment(`${obj.end} pm`, 'HH:mm a')

        const minDiff = endTime.diff(startTime, 'minutes')
        minutes = minutes + minDiff
      }
    })
    const hours_temp = Math.floor(minutes / 60)
    const minutes_temp = minutes % 60

    const hur = parseInt(minutes_temp * 4 / 60)
    const bal_minutes = (minutes_temp % 60)
    setMonthlylyHours(`${(4 * hours_temp) + hur} : ${bal_minutes}`)
  }


  const onSubmit = async data => {
    console.log(data)
  }

  return (
    <Fragment>
      <Card>
        <CardBody className='py-25'>
          <Row className='gx-4'>
            <Col lg='6'>
              {
                Object.keys(errors).map((key) => {

                  return <FormFeedback key={key}>${errors[key]?.message}</FormFeedback>

                })
              }
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>

                {
                  fields.map((obj, i) => {
                    return (
                      <Row key={obj.id} className='mt-1'>
                        <Col>{obj.day}</Col>
                        <Col>
                          <Controller
                            name={`businessHours[${i}].status`}
                            control={control}
                            render={({ field }) => (
                              <div className='form-check form-switch'>
                                <Input {...field} type='switch' defaultChecked={obj.status} className='customSwitch' onInput={(val) => { field.onChange(val); monthlyHoursfn(); weeklyHoursfn() }} />
                              </div>
                            )}
                          />
                        </Col>
                        <Col>
                          <Controller
                            name={`businessHours[${i}].start`}
                            control={control}
                            render={({ field }) => (
                              <Input type='time' onChange={() => { weeklyHoursfn(); monthlyHoursfn() }} defaultValue={obj.start} {...field} />
                            )}
                          />
                        </Col>
                        <Col>
                          <Controller
                            name={`businessHours[${i}].end`}
                            control={control}
                            render={({ field }) => (
                              <Input type='time' onChange={() => { weeklyHoursfn(); monthlyHoursfn() }} defaultValue={obj.end} {...field} />
                            )}
                          />
                        </Col>
                      </Row>
                    )
                  })
                }

                <Row className='mt-1'>
                  <Col> Weekly Hours</Col>
                  <Col>{weeklyHours} </Col>
                </Row>
                <Row className='mt-1'>
                  <Col> Monthly Hours</Col>
                  <Col>{monthlyHours}</Col>
                </Row>
                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>

              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default InvoiceAccounts
