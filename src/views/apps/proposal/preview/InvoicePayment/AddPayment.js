// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import classnames from 'classnames'
// ** Reactstrap Imports
import axios from '@src/configs/axios/axiosConfig'
import { Form, Input, Label, Button, Row, Col, FormFeedback } from 'reactstrap'

// ** Custom Components
import Sidebar from '@components/sidebar'
import {addInvociePayments} from './store/index'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from 'react-redux'

const AddPayment = ({ open, toggleSidebar, data }) => {

  const dispatch = useDispatch()
  const [taxDeducted, setTaxDeducted] = useState(false)
  const [accountOptions, setAccountOptions] = useState([])
  const [amountErr, setAmountErr] = useState(false)
  // ** States
  const schema = yup.object().shape({
    organizationId: yup.string().default(data.organizationid),
    contactId: yup.string().default(data.contactid),
    isTaxDeducted: yup.boolean().default(false),
    amountWithHeld: yup.string().when("isTaxDeducted", { is: (isTaxDeducted) => isTaxDeducted, then: yup.string().required("Please Enter Amount with Held") }),
    totalAmountPaid: yup.string().required("Please Enter Amount"),
    paymentDate: yup.string().required("Please Enter Payment Date"),
    referenceOfMainId : yup.string().default(data.id),
    pendingAmountBeforeRecord: yup.string().default(data.dueamount),
    transactionAccountId: yup.string().required("Please Select Account").default(data.bankaccountid),
    referenceNo: yup.string(),
    billingCurrency: yup.string().default(data.billingcurrencysymbol),
    billingAddress: yup.string().default(''),
    notes: yup.string(),
    paymentConfirmation: yup.boolean().default(false)
  })
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const onSubmit = async (formData) => {
    const payamount = parseFloat(control._formValues.totalAmountPaid)
    console.log(formData)

    if (taxDeducted) {
      const amountHeld = parseFloat(control._formValues.amountWithHeld)
      if (parseFloat(data.dueamount) < (payamount + amountHeld)) {
        setAmountErr(true)
        return false
      }
    } else {
      if (parseFloat(data.dueamount) < (payamount)) {
        setAmountErr(true)
        return false
      }
    }

    await dispatch(addInvociePayments(formData))
  }

  const getRow = (fieldLabel, fieldName, reqflag = false) => {
    return (
      <Row >
        <Label sm='12' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col sm='12'>
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input invalid={errors[fieldName] && true} {...field} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Row>
    )
  }

  const getSelectRow = (fieldLabel, fieldName, options, reqflag = false) => {
    return (

      <Row >
        <Label sm='12' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName} >
          {fieldLabel}
        </Label>
        <Col sm='12'>
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
                getOptionLabel={(option) => option.accountHolderName}
                getOptionValue={(option) => option.id}
              />
            )}

          />
          {errors[fieldName] && <FormFeedback className='text-danger'>{errors[fieldName]?.message}</FormFeedback>}
        </Col>
      </Row>
    )
  }

  const getBankAccounts = () => {
    axios.post('/transactionaccounts/dropdown').then(response => {
      const arr = response.data
      setAccountOptions(arr.transactionaccounts)
    })
  }

  useEffect(() => {
    getBankAccounts()
  }, [])

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add Payment'
      headerClassName='mb-1'
      contentClassName='p-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row>
          <span className='fw-bold ps-1'>Invoice Balance {data.billingcurrencysymbol} {data.dueamount}</span>
        </Row>
        {amountErr && <p className='text-danger'>Total Payment Amount should Lesserthan or Equal to Invoice Balance </p>}
        {getRow('Payment Amount', 'totalAmountPaid', true)}

        <Row >
          <Label sm='12' size='lg' className={classnames(`form-label'required`)} for={`paymentDate`} >
            Payment Date
          </Label>
          <Col sm='12'>
            <Controller
              control={control}
              name={`paymentDate`}
              id='paymentDate'
              render={({ field }) => (
                <Flatpickr
                  value={field.value}
                  onChange={(date, dateStr) => { field.onChange(dateStr) }}
                  options={{ altInput: true, altFormat: "M j, Y", dateFormat: "U" }}
                  className='form-control invoice-edit-input due-date-picker'
                />
              )}
            />
          </Col>
        </Row>

        {getSelectRow('Payment Account', "transactionAccountId", accountOptions, true)}

        {getRow('Reference Number', 'referenceNo', true)}

        <Row className='form-switch form-check-primary  px-0 py-1'>
          <Label for='isTaxDeducted' className='form-check-label'>
            Tax Deducted?
          </Label>
          <Controller
            control={control}
            id='isTaxDeducted'
            name='isTaxDeducted'
            render={({ field }) => (
              <Input type='switch' onInput={(val) => { field.onChange(val); setTaxDeducted(!taxDeducted) }} {...field} defaultChecked={field.value} />
            )}
          />
        </Row>

        {taxDeducted && getRow('Amount With Held', 'amountWithHeld', true)}

        {getRow('Payment Notes', 'notes', true)}

        <Row className='form-switch form-check-primary  px-0 py-1'>
          <Label for='paymentConfirmation' className='form-check-label'>
            Sent Payment Confirmation
          </Label>
          <Controller
            control={control}
            id='paymentConfirmation'
            name='paymentConfirmation'
            render={({ field }) => (
              <Input type='switch' onInput={(val) => { field.onChange(val) }} {...field} defaultChecked={field.value} />
            )}
          />
        </Row>

        <div className='d-flex flex-wrap mb-0'>
          <Button className='me-1' color='primary' type='submit'>
            Submit
          </Button>
          <Button color='secondary' outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default AddPayment
