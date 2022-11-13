// ** React Imports
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
// ** Custom Components
import { addClient, addContactInfo } from '../store'
import axios from '../../../../configs/axios/axiosConfig'

import { X, Plus, Hash } from 'react-feather'
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

const AddCard = () => {

  // ** States
  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const zipcodeExp = /^[0-9\- ]{6,6}$/
  const navigate = useNavigate({})

  const dispatch = useDispatch()
  const [businessEntityOptions, setBusinessEntityOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [gstRegistrationTypeOptions, setGstRegistrationTypeOptions] = useState([])
  const [clientType, setClientType] = useState(2)
  const [clientInfo, setClientInfo] = useState([])
  const [contactId, setConatctId] = useState(null)

  const schema = yup.object().shape({
    clientType: yup.number(),
    uniqueIdentity: yup.string().required("Please Enter Unique Identity"),
    contactPersonName: yup.string().required("Please Enter a Contact Person Name"),
    name: yup.string().when("clientType", { is: (clientType) => clientType === 2, then: yup.string().required("Please Enter Business Name.") }),
    contactNumber: yup.string().required("Please Enter Conatct Number").matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    businessEntity: yup.string().when("clientType", { is: (clientType) => clientType === 2, then: yup.string().required("Please Select Business Enity.") }),
    gstRegistrationType: yup.string().required("Please select a GST Type"),
    gstin: yup.string().required("Please Enter GSTIN No"),
    placeOfSupply: yup.string().required("Please select Place Of Supply"),
    currency: yup.string(),
    billingAddressZip: yup.string().matches(zipcodeExp, { message: 'Zip Code is not valid', excludeEmptyString: true }),
    contact_info: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please Enter A Name"),
        email: yup.string().email().required("Please Enter valid Email"),
        designation: yup.string().required("Please Enter Designation"),
        contactNumber: yup.string().required("Please Enter Conatct Number").matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true })
      })
    ).min(1, "Please Enter atleast one contact Info")

  })


  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientType: 2,
      uniqueIdentity: '',
      contactPersonName: '',
      organization: 1,
      name: '',
      contactNumber: '',
      businessEntity: '',
      email: '',
      gstRegistrationType: '',
      gstin: '',
      placeOfSupply: '',
      currency: '',
      contact_info: [],
      billingAddressLine1: '',
      billingAddressLine2: '',
      billingAddressCountry: '',
      billingAddressState: '',
      billingAddressZip: '',
      billingAddressCity: ''
    }
  })

  const { fields, append } = useFieldArray({ name: 'contact_info', control })

  const saveContactInfo = (clientId) => {
    if (clientInfo.length > 0) {
      clientInfo.forEach((obj, ind) => {
        clientInfo[ind].contactId = clientId
      })
      const rows = clientInfo
      dispatch(addContactInfo({ rows }))
      navigate(`/client/view/${clientId}`)
    }
  }

  const onSubmit = async (data) => {

    const temp = data.contact_info
    setClientInfo(predata => ([...predata, ...temp]))
    delete data.contact_info
    const datatemp = await dispatch(addClient(data))
    setConatctId(datatemp.payload.client.id)

  }

  const addItem = (() => {
    append({ organizationId : 1, contactId: 0, name: '', email: '', contactNumber: '', designation: '', primaryStatus: '' })
  })

  const removeItem = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  const getBusineessEntity = () => {
    axios.post('/businessentities/list').then(response => {
      const arr = response.data
      setBusinessEntityOptions(arr.businessentities)
    })
  }

  const getCountries = () => {
    axios.post('/countries/list').then(response => {
      const arr = response.data
      setCountryOptions(arr.countries)
    })
  }

  const getStates = () => {
    axios.post('/states/list').then(response => {
      const arr = response.data
      setStateOptions(arr.states)
    })
  }

  const getCurrency = () => {
    axios.post('/currencies/list').then(response => {
      const arr = response.data
      setCurrencyOptions(arr.currencies)
    })
  }

  const getGSTRegType = () => {
    axios.post('/gstregistrationtypes/list').then(response => {
      const arr = response.data
      setGstRegistrationTypeOptions(arr.gstregistrationtypes)
    })
  }

  const getRow = (fieldLabel, fieldName) => {
    return (
      <Row className='mb-1'>
      <Label sm='3' size='lg' className='form-label' for={fieldName}>
        {fieldLabel}
      </Label>
      <Col sm='9'>
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

  useEffect(() => {
    getBusineessEntity()
    getCountries()
    getCurrency()
    getGSTRegType()
    getStates()

    addItem()
    if (contactId !== null) {
      saveContactInfo(contactId)
    }

  }, [clientInfo, contactId])

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
                    <Controller
                      name='clientType'
                      control={control}
                      render={({ field }) => <Input type='radio' id='clientType_1' defaultChecked value={2} {...field} onChange={() => setClientType(2)} />}
                    />
                    <Label className='form-check-label' for='clientType_1'>
                      Business
                    </Label>
                  </div>
                  <div className='form-check form-check-primary form-check-inline'>
                    <Controller
                      name='clientType'
                      control={control}
                      render={({ field }) => <Input id='clientType_2' type='radio' value={1} {...field} onChange={() => setClientType(1)} />}
                    />
                    <Label className='form-check-label' for='clientType_2'>
                      Individual
                    </Label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Unique No', 'uniqueIdentity')}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Contact Person Name', 'contactPersonName')}
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
                          value={businessEntityOptions.find(c => { return c.id === value })}
                          onChange={val => field.onChange(val.id)}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
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
                        id='contact_info_firstName'
                        name={`contact_info.${i}.name`}
                        render={({ field }) => (
                          <Input type='text' {...register(`contact_info.${i}.name`)} invalid={errors.contact_info?.[i]?.name && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.name && <FormFeedback>{errors.contact_info?.[i]?.name.message}</FormFeedback>}
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
                          <Input type='number'  {...register(`contact_info.${i}.contactNumber`)} invalid={errors.contact_info?.[i]?.contactNumber && true} {...field} />
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
                          <Input type='text' invalid={errors.contact_info?.[i]?.designation && true} {...register(`contact_info.${i}.designation`)} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.designation && <FormFeedback>{errors.contact_info?.[i]?.designation.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Primary</CardText>
                      <div className='form-switch form-check-primary'>
                        <Controller
                          control={control}
                          id='contact_info_primaryStatus'
                          name={`contact_info.${i}.primaryStatus`}
                          render={({ field }) => (
                            <Input type='switch' {...register(`contact_info.${i}.primaryStatus`)} {...field} />
                          )}
                        />
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
                        value={gstRegistrationTypeOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
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
                        aria-label='name'
                        value={stateOptions.find(c => c.id === value)}
                        options={stateOptions}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        onChange={val => field.onChange(val.id)}
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
                        value={currencyOptions.find(c => c.id === value)}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
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
                <Label sm='3' size='lg' className='form-label' for='billingAddress_addressline1'>
                  Address Line1
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billingAddress_addressline1'
                    name="billingAddressLine1"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billingAddress_addressline2'>
                  Address Line 2
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billingAddress_addressline2'
                    name="billingAddressLine2"
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
                <Label sm='3' size='lg' className='form-label' for='billingAddress_city'>
                  City
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billingAddress_city'
                    name="billingAddressCity"
                    control={control}
                    render={({ field }) => <Input  {...field} />}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billingAddressState'>
                  State
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="billingAddressState"
                    id="billingAddressState"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select')}
                        {...field}
                        classNamePrefix='select'
                        options={stateOptions}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        value={stateOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
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
                <Label sm='3' size='lg' className='form-label' for='billingAddressCountry'>
                  Country
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="billingAddressCountry"
                    id="billingAddressCountry"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select')}
                        {...field}
                        classNamePrefix='select'
                        options={countryOptions}
                        value={countryOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='billingAddress_zipcode'>
                  Zip Code
                </Label>
                <Col sm='9'>
                  <Controller
                    id='billingAddress_zipcode'
                    name='billingAddressZip'
                    control={control}
                    render={({ field }) => <Input type='text' invalid={errors.billingAddressZip && true} {...field} />}
                  />
                  {errors.billingAddressZip && <FormFeedback>{errors.billingAddressZip.message}</FormFeedback>}
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

/*
Code Smell:
DRY -> Donot Repeat Yourself -> Duplication avoiding.
Refactoring - MUST
Always try for Less Code

React - Snapshot Testing
React Dev Tools
Redux Dev Tools

1. React Components -> Mount -> Unit Test (or) React Snapshot
2. Redux -> Independent Unit Testing
     -> Reducers.
     -> Fire actions into this reducer.
     -> Check reducer state change.
     -> axios can be mocked
*/