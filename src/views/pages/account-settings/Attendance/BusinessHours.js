// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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
import axios from '@src/configs/axios/axiosConfig'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid } from '@src/helper/sassHelper'
import { addExemption, updateExemption } from './store/holidays'

const activeOrgId = activeOrganizationid()

// ** Third Party Components
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

const InvoiceAccounts = (tabId) => {

  const [data, setData] = useState([])
  console.log(data)
  const [selected, setSelected] = useState(null)

  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    name: yup.string().required('Please Enter Exemption')
  })

  const { handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })


  const onSubmit = async data => {
    if (selected !== null) {
      await dispatch(updateExemption(data))
      reset({})
      setSelected(null)
    } else {
      await dispatch(addExemption(data))
      reset({})
    }

  }

  const getList = () => {
    axios.post('/exemptionreasons/list')
      .then((res) => {
        setData(res.data.exemptionreasons)
      })
      .catch((err) => { console.log(err) })
  }
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

  useEffect(async () => {
    if (tabId.data === 'exemptionreason') {
      getList()
    }

  }, [tabId])

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

                {getRow('Office Clock In Time - Grace period (in minutes)', 'name')}

                {getRow('Work Availability definition(Percentage)', 'name')}

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

export default InvoiceAccounts
