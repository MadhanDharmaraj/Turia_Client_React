// ** React Imports
import { Fragment, useEffect } from 'react'
import Select from 'react-select'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  CardBody,
  FormFeedback
} from 'reactstrap'
import * as yup from "yup"
import { getData, addOrgPreference } from './store/index'
import { yupResolver } from "@hookform/resolvers/yup"

// ** Third Party Components
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import { useDispatch } from 'react-redux'
const activeOrgId = activeOrganizationid()
const userId = orgUserId()

const reminderOptions = [{ id: 1, name: 'Every Days' }, { id: 2, name: 'Every 2 Days' }, { id: 3, name: 'Every 3 Days' }, { id: 4, name: 'Every 4 Days' }, { id: 5, name: 'Every 5 Days' }, { id: 6, name: 'Every 6 Days' }, { id: 7, name: 'Never' }]

const GeneralSettings = (tabId) => {

  const dispatch = useDispatch()
  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    invoiceNote: yup.string().required('Please Enter Invoice Note'),
    invoiceReminderInterval: yup.string().nullable(),
    desiredProfitLimit: yup.string().nullable(),
    criticalLimit: yup.string().nullable(),
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

    if (tabId.data === 'general') {
      const response = await dispatch(getData(activeOrgId))
      const res = response.payload.data
      if (res !== undefined) {
        reset({
          organizationId: activeOrgId,
          invoiceNote: res.invoicenote.replace(/(\\n)/g, "\n"),
          invoiceReminderInterval: parseInt(res.invoicereminderinterval),
          desiredProfitLimit: res.desiredprofitlimit,
          criticalLimit: res.criticallimit,
          updatedBy: userId,
          createdBy: userId
        })
      }

    }

  }, [tabId])

  const getRow = (fieldLabel, fieldName, reqflag = true) => {
    return (
      <Col md={8} className='d-flex mt-2'>
        <Label md='4' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col md='6' >
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input type={fieldName === 'invoiceNote' ? 'textarea' : 'text'} invalid={errors[fieldName] && true} {...field} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Col>
    )
  }

  const getSelectRow = (fieldLabel, fieldName, options, reqflag = false) => {
    return (

      <Col md={8} className='d-flex mt-2'>
        <Label md='4' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName} >
          {fieldLabel}
        </Label>
        <Col md='6'>
          <Controller
            control={control}
            name={fieldName}
            id={fieldName}
            render={({ field, ref }) => (
              <Select
                inputRef={ref}
                className={classnames('react-select', { 'is-invalid': errors[fieldName] })}
                {...field}
                classNamePrefix='select'
                options={options}
                value={options.find(c => { return c.id === field.value })}
                onChange={val => { return field.onChange(val.id) }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}

          />
          {errors[fieldName] && <FormFeedback className='text-danger'>{errors[fieldName]?.message}</FormFeedback>}
        </Col>
      </Col>

    )
  }

  return (
    <Fragment>
      <Card>
        <CardBody className='py-25'>
          <Row className='gx-4'>
            <Col lg='12'>
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>

                <Row>
                  {getRow('Default invoiceNote', 'invoiceNote', false)}

                  {getSelectRow('Set automatic Reminder', 'invoiceReminderInterval', reminderOptions, false)}

                  {getRow('Desired Profit Limit (%)', 'desiredProfitLimit', false)}

                  {getRow('Critical limit (%)', 'criticalLimit', false)}

                </Row>

                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                  <Button color='secondary' outline>
                    Cancel
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

export default GeneralSettings
