// ** React Imports
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
// ** Custom Components
import { updateClient, updateContactInfo, getClient, getConatctInfo, deleteContactInfo } from '../store'
import axios from '@src/configs/axios/axiosConfig'

import { X, Plus } from 'react-feather'
import Select from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
// ** Reactstrap Imports
import { Row, Col, Card, Label, Button, CardBody, CardText, Input, FormFeedback, CardTitle, CardHeader } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const EditCard = () => {

  // ** States
  const MySwal = withReactContent(Swal)
  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const zipcodeExp = /^[0-9\- ]{6,6}$/
  const navigate = useNavigate({})
  const store = useSelector(state => state.client)
  const dispatch = useDispatch()
  const [businessEntityOptions, setBusinessEntityOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [gstRegistrationTypeOptions, setGstRegistrationTypeOptions] = useState([])
  const [clientType, setClientType] = useState(2)
  const [clientInfo, setClientInfo] = useState([])
  const [contactId, setConatctId] = useState(null)
  const [clientDetails, setClientDetails] = useState({})

  const schema = yup.object().shape({
    clientType: yup.number(),
    updatedBy: yup.string().default(userId),
    uniqueIdentity: yup.string().nullable(),
    contactPersonName: yup.string().required("Please Enter a Contact Person Name"),
    name: yup.string().when(["clientType"], { is: (clientType) => clientType === 2, then: yup.string().required("Please Enter Business Name.") }),
    contactnumber: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    businessEntity: yup.string().when(["clientType"], { is: (clientType) => clientType === 2, then: yup.string().required("Please Select Business Enity.") }),
    gstRegistrationType: yup.string().required("Please select a GST Type"),
    gstin: yup.string().required("Please Enter GSTIN No"),
    placeOfSupply: yup.string().required("Please select Place Of Supply"),
    currency: yup.string(),
    billingAddressLine1: yup.string().nullable(),
    billingAddressLine2: yup.string().nullable(),
    billingAddressCity: yup.string().nullable(),
    billingAddressState: yup.number().nullable(),
    billingAddressCountry: yup.number().nullable(),
    billingAddressZip: yup.string().matches(zipcodeExp, { message: 'Zip Code is not valid', excludeEmptyString: true }),
    contact_info: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please Enter A Name"),
        email: yup.string().email().required("Please Enter valid Email"),
        contactnumber: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true })
      })
    ).min(1, "Please Enter atleast one contact Info")

  })

  const { handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })
  const { id } = useParams()
  const { fields, append, remove } = useFieldArray({ name: 'contact_info', control, keyName: 'rowid' })

  const saveContactInfo = () => {

    const data = { rows: clientInfo }
    dispatch(updateContactInfo(data))
    navigate(`/client/view/${contactId}`)

  }

  const onSubmit = async (data) => {

    const temp = data.contact_info
    delete data.contact_info
    const id = clientDetails.id
    await dispatch(updateClient({ data, id }))

    setClientInfo(predata => ([...predata, ...temp]))

  }

  const deletefun = (id) => {

    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.value) {
        await dispatch(deleteContactInfo(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Conatct has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        return true
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        return false
      }
    })
  }

  const addItem = (() => {
    append({ id: '', name: '', email: '', contactnumber: '', contactid: id, organizationid: activeOrgId, designation: '', primarystatus: false })
  })

  const removeItem = async (ind) => {
    const tempid = control._formValues.contact_info[ind].id
    let flg
    if (tempid !== undefined) {
      flg = await deletefun(tempid)
    }
    if (flg) {
      remove(ind)
    }
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

  const getClientInfo = async () => {
    await dispatch(getConatctInfo(contactId))

  }

  const getClientData = async () => {
    const client = await dispatch(getClient(id))
    setClientDetails(client.payload)
  }

  useEffect(() => {

    if (Object.keys(clientDetails).length > 0) {
      reset({
        clientType: 1,
        uniqueIdentity: clientDetails.uniqueidentity,
        contactPersonName: clientDetails.contactpersonname,
        organization: clientDetails.organizationid,
        name: clientDetails.name,
        contactnumber: clientDetails.contactnumber,
        businessEntity: clientDetails.businessentityid,
        email: clientDetails.email,
        gstRegistrationType: clientDetails.gstregistrationtypeid,
        gstin: clientDetails.gstin,
        placeOfSupply: clientDetails.placeofsupplyid,
        currency: clientDetails.currencyid,
        billingAddressLine1: clientDetails.billingaddressline1,
        billingAddressLine2: clientDetails.billingaddressline2,
        billingAddressCountry: clientDetails.billingaddresscountry,
        billingAddressState: clientDetails.billingaddressstate,
        billingAddressZip: clientDetails.billingaddresszip,
        billingAddressCity: clientDetails.billingaddresscity
      })

      setConatctId(clientDetails.id)

    }

    if (contactId !== null) {
      getClientInfo()
    }

  }, [contactId, clientDetails])

  useEffect(() => {
    store.clientInformations.forEach((obj) => {
      append(obj)
    })
  }, [store.clientInformations])

  useEffect(() => {
    if (clientInfo.length) {
      saveContactInfo()
    }
  }, [clientInfo])

  useEffect(() => {
    getBusineessEntity()
    getCountries()
    getCurrency()
    getGSTRegType()
    getStates()

    getClientData()

  }, [])


  const getRow = (fieldLabel, fieldName, reqflag = false) => {
    return (
      <Row className='mb-1'>
        <Label sm='4' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col sm='8'>
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

      <Row className='mb-1'>
        <Label sm='4' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col sm='8'>
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
                isDisabled={fieldName === 'currency'}
                options={options}
                value={options.find(c => { return c.id === field.value })}
                onChange={val => field.onChange(val.id)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}

          />
          {errors[fieldName] && <FormFeedback className='text-danger'>{errors[fieldName]?.message}</FormFeedback>}
        </Col>
      </Row>

    )
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardHeader>
          <CardTitle> Edit Client</CardTitle>
        </CardHeader>
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='4' size='lg' className='form-label required' for='contactPersonName'>
                  Client Type
                </Label>
                <Col sm='8'>
                  <div className='form-check form-check-primary form-check-inline'>
                    <Controller
                      name='clientType'
                      control={control}
                      render={({ field }) => <Input type='radio' id='clientType_1' defaultChecked value={2} {...field} onInput={() => setClientType(2)} />}
                    />
                    <Label className='form-check-label' for='clientType_1'>
                      Business
                    </Label>
                  </div>
                  <div className='form-check form-check-primary form-check-inline'>
                    <Controller
                      name='clientType'
                      control={control}
                      render={({ field }) => <Input id='clientType_2' type='radio' value={1} {...field} onInput={() => setClientType(1)} />}
                    />
                    <Label className='form-check-label' for='clientType_2'>
                      Individual
                    </Label>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Unique No', 'uniqueIdentity', true)}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Contact Person Name', 'contactPersonName', true)}
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Business Name', 'name', true)}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Mobile Number', 'contactnumber')}
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Email ID', 'email', true)}
            </Col>
          </Row>

          {clientType === 2 && (
            <Row>
              <Col md='6' className='mb-1'>
                {getSelectRow('Business Entity', 'businessEntity', businessEntityOptions, true)}
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

            <div key={item.rowid} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>First Name</CardText>
                      <Controller
                        control={control}
                        id='contact_info_name'
                        name={`contact_info[${i}].name`}
                        render={({ field }) => (
                          <Input type='text' onChange={(val) => { field.onChange(val) }} invalid={errors.contact_info?.[i]?.name && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.name && <FormFeedback>{errors.contact_info?.[i]?.name.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-2 mb-0 '>Email</CardText>
                      <Controller
                        control={control}
                        id='contact_info_email'
                        name={`contact_info[${i}].email`}
                        render={({ field }) => (
                          <Input type='email' onChange={(val) => { field.onChange(val) }} invalid={errors.contact_info?.[i]?.email && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.email && <FormFeedback>{errors.contact_info?.[i]?.email.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Mobile</CardText>
                      <Controller
                        control={control}
                        id='contact_info_contactnumber'
                        name={`contact_info[${i}].contactnumber`}
                        render={({ field }) => (
                          <Input type='number' onChange={(val) => { field.onChange(val) }} invalid={errors.contact_info?.[i]?.contactnumber && true} {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.contactnumber && <FormFeedback>{errors.contact_info?.[i]?.contactnumber.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Designation</CardText>
                      <Controller
                        control={control}
                        id='contact_info_designation'
                        name={`contact_info[${i}].designation`}
                        render={({ field }) => (
                          <Input type='text' invalid={errors.contact_info?.[i]?.designation && true} onChange={(val) => { field.onChange(val) }}  {...field} />
                        )}
                      />
                      {errors.contact_info?.[i]?.designation && <FormFeedback>{errors.contact_info?.[i]?.designation.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Primary</CardText>
                      <div className='form-switch form-check-primary'>
                        <Controller
                          control={control}
                          id='contact_info_primarystatus'
                          name={`contact_info[${i}].primarystatus`}
                          render={({ field }) => (
                            <Input type='switch' onChange={(val) => { field.onChange(val) }} {...field} defaultChecked={field.value} />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className='d-lg-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                    <X size={18} className='cursor-pointer' onClick={() => removeItem(i)} />
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
              {getSelectRow('GST Type', 'gstRegistrationType', gstRegistrationTypeOptions, true)}
            </Col>
            <Col md='6' className='mb-1'>
              {getSelectRow('Place of Supply', 'placeOfSupply', stateOptions, true)}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getRow('GSTIN', 'gstin', true)}
            </Col>
            <Col md='6' className='mb-1'>
              {getSelectRow('Currency', 'currency', currencyOptions, false)}
            </Col>
          </Row>
        </CardBody>
        {/* Invoice Total */}
        <CardBody className=''>
          <h4 className='text-primary'>Billing Address</h4>
          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Address Line1', 'billingAddressLine1')}
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Address Line2', 'billingAddressLine2')}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getRow('City', 'billingAddressCity')}
            </Col>
            <Col md='6' className='mb-1'>
              {getSelectRow('State', 'billingAddressState', stateOptions)}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getSelectRow('Country', 'billingAddressCountry', countryOptions)}
            </Col>
            <Col md='6' className='mb-1'>
              {getRow('Zip Code', 'billingAddressZip')}
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

export default EditCard
