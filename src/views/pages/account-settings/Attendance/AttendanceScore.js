// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  FormFeedback
} from 'reactstrap'
import { getData, addOrgPreference } from './store/index'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()

// ** Third Party Components
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

const AttendanceScore = (tabId) => {

  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    punchInGrace: yup.string().required('Please Enter  Grace Time'),
    workPercentage: yup.string().required('Please Enter Work Percentages'),
    updatedBy: yup.string().default(userId),
    createdBy: yup.string().default(userId)
  })

  const { handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const onSubmit = async data => {
    await dispatch(addOrgPreference(data))
  }

  useEffect(async () => {

    if (tabId.data === 'attendancescore') {
      const response = await dispatch(getData(activeOrgId))
      const res = response.payload.data
      if (res !== undefined) {
        reset({
          organizationId: activeOrgId,
          workPercentage: parseInt(res.workpercentage),
          punchInGrace: parseInt(res.punchingrace),
          updatedBy: userId,
          createdBy: userId
        })
      }

    }
  }, [tabId])


  const getRow = (fieldLabel, fieldName, reqflag = true) => {
    return (
      <Col md={12}>
        <Label sm='12' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col>
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input invalid={errors[fieldName] && true} {...field} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Col>
    )
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

                {getRow('Office Clock In Time - Grace period (in minutes)', 'punchInGrace', true)}

                {getRow('Work Availability definition(Percentage)', 'workPercentage', true)}

                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>

              </Row>
            </Col>
            <Col lg='6'>
              <Row>
                <Col md={4} >
                  <Badge color='warning'>Early</Badge>
                  <p>Before on Time</p></Col>
                <Col md={4} ><Badge color='success'>Regular</Badge>
                  <p>On Time to tolerence</p></Col>
                <Col md={4} ><Badge color='danger'>Late</Badge>
                  <p>After tolerence</p></Col>
              </Row>
              <Row>
                <Col md={4} ><Badge color='success'>Good</Badge>
                  <p>Equal or Above the Percent</p></Col>
                <Col md={4} ><Badge color='danger'>Bad</Badge>
                  <p>Below the Percent</p></Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default AttendanceScore
