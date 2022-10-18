// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
// ** Third Party Components
//import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import Select from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Reactstrap Imports
import { Row, Col, Card, Label, Button, CardBody, CardText, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import axios from 'axios'

const AddCard = () => {

  const phoneRegExp = /^[0-9\- ]{10,10}$/

  const schema = yup.object().shape({
    client_id: yup.string().required("Please select a Client"),
    dsc_lists: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        email: yup.string().email().required("Please Enter Email"),
        contact_no: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
        issued_date: yup.date("Please Enter Valid Date").nullable().required("Please Enter Issued Date"),
        expiry_date: yup.date("Please Enter Valid Date").nullable().required("Please Enter Expiry Date"),
        password: yup.string().min(5, "Password length should be 5 or above.")
      })
    )
  })

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      client_id: '',
      dsc_lists: []
    }
  })

  //const [date, setDate] = useState("")
  const [clientOptions, setClientOptions] = useState([])
  const { fields, append } = useFieldArray({ name: 'dsc_lists', control })
  const onSubmit = data => console.log(data)


  useEffect(() => {
    // ** Get Clients
    axios.get('/api/client/dropdown').then(response => {
      const arr = response.data
      setClientOptions(arr)
    })

  }, [])

  const addItem = (() => {
    append({ name: '', email: '', contact_no: '', issued_date: '', expiry_date: '', password: '' })
  })

  const removeItem = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  useEffect(() => {
    addItem()
  }, [])

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='client_id'>
                  Client
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="client_id"
                    id="client_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.client_id })}
                        {...field}
                        classNamePrefix='select'
                        options={clientOptions}
                        value={clientOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.client_id && <FormFeedback className='text-danger'>{errors.client_id?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
        <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (
            <div key={i} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Name</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_name'
                        name={`dsc_lists.${i}.name`}
                        render={({ field }) => (
                          <Input type='text'  {...register(`dsc_lists.${i}.name`)} invalid={errors.dsc_lists?.[i]?.name && true} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.name && <FormFeedback>{errors.dsc_lists?.[i]?.name.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Email</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_email'
                        name={`dsc_lists.${i}.email`}
                        render={({ field }) => (
                          <Input type='email'  {...register(`dsc_lists.${i}.email`)} invalid={errors.dsc_lists?.[i]?.email && true} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.email && <FormFeedback>{errors.dsc_lists?.[i]?.email.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Mobile</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_contact_no'
                        name={`dsc_lists.${i}.contact_no`}
                        render={({ field }) => (
                          <Input type='number'  {...register(`dsc_lists.${i}.conatct_no`)} invalid={errors.dsc_lists?.[i]?.contact_no && true} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.contact_no && <FormFeedback>{errors.dsc_lists?.[i]?.contact_no.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Issued Date</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_issued_date'
                        name={`dsc_lists.${i}.issued_date`}
                        render={({ field, value }) => (
                          <Flatpickr className={classnames('form-control', { 'is-invalid': errors.dsc_lists?.[i]?.issued_date })} options={{ dateFormat: "d-m-Y" }} onChange={date => field.onChange(date)} value={value} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.issued_date && <FormFeedback>{errors.dsc_lists?.[i]?.issued_date.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Expiry Date</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_expiry_date'
                        name={`dsc_lists.${i}.expiry_date`}
                        render={({ field, value }) => (
                          <Flatpickr className={classnames('form-control', { 'is-invalid': errors.dsc_lists?.[i]?.expiry_date })} options={{ dateFormat: "d-m-Y" }} onChange={date => field.onChange(date)} value={value} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.expiry_date && <FormFeedback>{errors.dsc_lists?.[i]?.expiry_date.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Password</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_password'
                        name={`dsc_lists.${i}.password`}
                        render={({ field }) => (
                          <Input type='text'  {...register(`dsc_lists.${i}.password`)} invalid={errors.dsc_lists?.[i]?.password && true} {...field} />
                        )}
                      />
                      {errors.dsc_lists?.[i]?.password && <FormFeedback>{errors.dsc_lists?.[i]?.password.message}</FormFeedback>}
                    </Col>

                  </Row>
                  <div className='d-lg-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                    <X size={18} className='cursor-pointer' onClick={removeItem} />
                  </div>
                </Col>
              </Row>
            </div>
          ))}

          <Row className='mt-1'>
            <Col sm='12' className='px-0'>
              <Button color='primary' size='sm' className='btn-add-new' onClick={() => addItem()}>
                <Plus size={14} className='me-25'></Plus> <span className='align-middle'>Add Item</span>
              </Button>
            </Col>
          </Row>

        </CardBody>
        {/* /Header */}
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline tag={Link} to='/digital-signature/list'>
              Cancel
            </Button>
            <Button color='primary' type="submit" >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  )
}

export default AddCard
