// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
// ** Custom Components

import { addClient } from '../store/index'
// ** Third Party Components
import { useDispatch } from 'react-redux'


import axios from 'axios'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Reactstrap Imports
//import { selectThemeColors } from '@utils'
import { Row, Col, Card, Label, Button, CardBody, CardText, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {

  const dispatch = useDispatch()
  // ** States
  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const zipcodeExp = /^[0-9\- ]{6,6}$/

  const [businessEntityOptions, setBusinessEntityOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [gstRegistrationTypeOptions, setGstRegistrationTypeOptions] = useState([])
  const [clientType, setClientType] = useState(2)

  const schema = yup.object().shape({
    clientType: yup.number(),
    contactPersonName: yup.string().required("Please Enter a Contact Person Name"),
    name: yup.string().when(["clientType"], { is: (clientType) => clientType === 2, then: yup.string().required("Please Enter Business Name.") }),
    contactNumber: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    businessEntity: yup.string().when(["clientType"], { is: (clientType) => clientType === 2, then: yup.string().required("Please Select Business Enity.") }),
    gstRegistrationType: yup.string().required("Please select a GST Type"),
    gstin: yup.string().required("Please Enter GSTIN No"),
    placeOfSupply: yup.string().required("Please select Place Of Supply"),
    currency: yup.string(),
    contact_info: yup.array().of(
      yup.object().shape({
        first_name: yup.string().required("Please Enter A Name"),
        email: yup.string().email().required("Please Enter valid Email"),
        contactNumber: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true })
      })
    ).min(1, "Please Enter atleast one contact Info"),
    billing_address: yup.object().shape({
      zip_code: yup.string().matches(zipcodeExp, { message: 'Please Enter Valid ZipCode', excludeEmptyString: true })
    })
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientType: 2,
      contactPersonName: '',
      name: '',
      contactNumber: '',
      businessEntity: '',
      email: '',
      gstRegistrationType: '',
      gstin: '',
      placeOfSupply: '',
      currency: '',
      contact_info: [],
      billing_address: {
        country: '1',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        use_as_billing_address: ''
      }
    }
  })

  const { fields, append } = useFieldArray({ name: 'contact_info', control })
  const onSubmit = data => {
    dispatch(addClient(data))
  }

  const addItem = (() => {
    append({ first_name: '', email: '', contactNumber: '', designation: '', is_primary: '' })
  })

  const removeItem = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  useEffect(() => {
    // ** Get Clients
    axios.get('/api/clients/utilities').then(response => {
      const arr = response.data
      setCountryOptions(arr.country)
      setCurrencyOptions(arr.currency)
      setGstRegistrationTypeOptions(arr.gst_registration_type)
      setBusinessEntityOptions(arr.business_entities)
      setStateOptions(arr.state)
    })


  }, [])

  useEffect(() => {
    addItem()
  }, [])

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === 'button') {
      return (
        <Button className='text-start rounded-0 px-50' color={data.color} block onClick={() => setOpen(true)}>
          <Plus className='font-medium-1 me-50' />
          <span className='align-middle'>{data.label}</span>
        </Button>
      )
    } else {
      return <components.Option {...props}> {data.label} </components.Option>
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='contactPersonName'>
                  Client Type
                </Label>
                <Col sm='9'>
                  <div className='form-check form-check-primary form-check-inline'>
                    <Input type='radio' id='clientType_1' name='clientType' defaultChecked value='2' {...register("clientType")} onChange={() => setClientType(2)} />
                    <Label className='form-check-label' for='clientType_1'>
                      Business
                    </Label>
                  </div>
                  <div className='form-check form-check-primary form-check-inline'>
                    <Input type='radio' id='clientType_2' name='clientType' value='1' {...register("clientType")} onChange={() => setClientType(1)} />
                    <Label className='form-check-label' for='clientType_2'>
                      Individual
                    </Label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='unique_identity'>
                  Unique No
                </Label>
                <Col sm='9'>
                  <Controller
                    id='unique_identity'
                    name='unique_identity'
                    control={control}
                    render={({ field }) => <Input invalid={errors.unique_identity && true} {...field} />}
                  />
                  {errors.unique_identity && <FormFeedback>{errors.unique_identity.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='contactPersonName'>
                  Conatct Person Name
                </Label>
                <Col sm='9'>
                  <Controller
                    id='contactPersonName'
                    name='contactPersonName'
                    control={control}
                    render={({ field }) => <Input invalid={errors.contactPersonName && true} {...field} />}
                  />
                  {errors.contactPersonName && <FormFeedback>{errors.contactPersonName.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='name'>
                  Business Name
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    id='name'
                    name='name'
                    render={({ field }) => (
                      <Input type='text' invalid={errors.name && true} {...field} />
                    )}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='contactNumber'>
                  Mobile Number
                </Label>
                <Col sm='9'>
                  <Controller
                    id='contactNumber'
                    name='contactNumber'
                    control={control}
                    render={({ field }) => <Input invalid={errors.contactNumber && true} {...field} />}
                  />
                  {errors.contactNumber && <FormFeedback>{errors.contactNumber.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='email'>
                  Email ID
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    id='email'
                    name='email'
                    render={({ field }) => (
                      <Input type='email' invalid={errors.email && true} {...field} />
                    )}
                  />
                  {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>

          {clientType === 2 && (
            <Row>
              <Col md='6' className='mb-1'>
                <Row className='mb-1'>
                  <Label sm='3' size='lg' className='form-label' for='businessEntity'>
                    Business Entity
                  </Label>
                  <Col sm='9'>
                    <Controller
                      control={control}
                      name="businessEntity"
                      id="businessEntity"
                      render={({ field, value, ref }) => (
                        <Select
                          inputRef={ref}
                          className={classnames('react-select', { 'is-invalid': errors.businessEntity })}
                          {...field}
                          classNamePrefix='select'
                          options={businessEntityOptions}
                          value={businessEntityOptions.find(c => { return c.value === value })}
                          onChange={val => field.onChange(val.value)}
                        />
                      )}

                    />
                    {errors.businessEntity && <FormFeedback className='text-danger'>{errors.businessEntity?.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </CardBody>
        {/* /Header */}

        <hr className='invoice-spacing' />
        {errors.contact_info && <p className='text-danger ms-2'>{errors.contact_info?.message}</p>}
        {/* Product Details */}
        <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (

            <div key={i} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>First Name</CardText>
                      <Controller
                        control={control}
                        id='contact_info_first_name'
                        name={`contact_info.${i}.first_name`}
                        render={({ field }) => (
                          <Input type='text' {...register(`contact_info.${i}.first_name`)} invalid={errors.contact_info?.[i]?.first_name && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.first_name && <FormFeedback>{errors.contact_info?.[i]?.first_name.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-2 mb-0'>Email</CardText>
                      <Controller
                        control={control}
                        id='contact_info_email'
                        name={`contact_info.${i}.email`}
                        render={({ field }) => (
                          <Input type='email' {...register(`contact_info.${i}.email`)} invalid={errors.contact_info?.[i]?.email && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.email && <FormFeedback>{errors.contact_info?.[i]?.email.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Mobile</CardText>
                      <Controller
                        control={control}
                        id='contact_info_contactNumber'
                        name={`contact_info.${i}.contactNumber`}
                        render={({ field }) => (
                          <Input type='number'  {...register(`contact_info.${i}.conatct_no`)} invalid={errors.contact_info?.[i]?.contactNumber && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.contactNumber && <FormFeedback>{errors.contact_info?.[i]?.contactNumber.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Designation</CardText>
                      <Controller
                        control={control}
                        id='contact_info_designation'
                        name={`contact_info.${i}.designation`}
                        render={({ field }) => (
                          <Input type='text' {...field} {...register(`contact_info.${i}.designation`)} />
                        )}
                      />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Primary</CardText>
                      <div className='form-switch form-check-primary'>
                        <Input type='switch' id='switch-primary' value={true} name='primary' defaultChecked {...register(`contact_info.${i}.is_primary`)} />
                      </div>
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

        <hr className='invoice-spacing' />
        {/* Product Details */}
        <CardBody>

          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='gstRegistrationType'>
                  GST Type
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="gstRegistrationType"
                    id="gstRegistrationType"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.gstRegistrationType })}
                        {...field}
                        classNamePrefix='select'
                        options={gstRegistrationTypeOptions}
                        value={gstRegistrationTypeOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.gstRegistrationType && <FormFeedback className='text-danger'>{errors.gstRegistrationType?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='placeOfSupply'>
                  Place of Supply
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="placeOfSupply"
                    id="placeOfSupply"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        name="placeOfSupply"
                        title="Country"
                        className={classnames('react-select', { 'is-invalid': errors.gstRegistrationType })}
                        {...field}
                        classNamePrefix='select'
                        value={stateOptions.find(c => c.value === value)}
                        options={stateOptions}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                  {errors.placeOfSupply && <FormFeedback className='text-danger'>{errors.placeOfSupply?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='gstin'>
                  GSTIN
                </Label>
                <Col sm='9'>
                  <Controller
                    id='gstin'
                    name='gstin'
                    control={control}
                    render={({ field }) => <Input invalid={errors.gstin && true} {...field} />}
                  />
                  {errors.gstin && <FormFeedback>{errors.gstin.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='currency'>
                  Currency
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="currency"
                    id="currency"
                    render={({ field, value, ref }) => (
                      <Select
                        {...register("currency")}
                        inputRef={ref}
                        className="react-select col-lg-12 col-sm-12"
                        classNamePrefix="addl-class"
                        options={currencyOptions}
                        value={currencyOptions.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                  {errors.currency && <FormFeedback>{errors.currency.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
        {/* Invoice Total */}
        <CardBody className=''>
          <h4 className='text-primary'>Billing Address</h4>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_address_line1'>
                  Address Line1
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billing_address_address_line1'
                    name="billing_address.address_line1"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_address_line2'>
                  Address Line 2
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billing_address_address_line2'
                    name="billing_address.address_line2"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_city'>
                  City
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billing_address_city'
                    name="billing_address.city"
                    control={control}
                    render={({ field }) => <Input  {...field} />}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_state'>
                  State
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="billing_address.state"
                    id="billing_address_state"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select')}
                        {...field}
                        classNamePrefix='select'
                        options={stateOptions}
                        value={stateOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_country'>
                  Country
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="billing_address.country"
                    id="billing_address_country"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select')}
                        {...field}
                        classNamePrefix='select'
                        options={countryOptions}
                        value={countryOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billing_address_zip_code'>
                  Zip Code
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billing_address_zip_code'
                    name="billing_address.zip_code"
                    control={control}
                    render={({ field }) => <Input type='number' {...field} />}
                  />
                  {errors.billing_address?.zip_code && <FormFeedback className='text-danger'>{errors.billing_address?.zip_code.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline tag={Link} to='/client/list'>
              Cancel
            </Button>
            <Button color='primary' type="submit" >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </form >
  )
}

export default AddCard
