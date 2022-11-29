// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { ChevronLeft, Check, Coffee, X } from 'react-feather'
import classnames from 'classnames'
import axios from '@src/configs/axios/axiosConfig'
import { getHomeRouteForLoggedInUser } from '@utils'
import { createOrganization, createOrganizationUser } from '../store/index'
import toast from 'react-hot-toast'
import { Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ToastContent = ({ t, name }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const Organization = ({ stepper }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate({})
  const [businessEntityIdOptions, setBusinessEntityIdOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const store = useSelector(state => state.register)
  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const pinzipcodeRegExp = /^[0-9\- ]{6,6}$/

  const OrganizationSchema = yup.object().shape({

    name: yup.string().required('Please Enter Business Name'),
    businessEmail: yup.string().email().required('Please Enter Business Email'),
    contactNo: yup.string().required('Please Enter Contact Number').matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    businessEntityId: yup.string().required('Please Select Business Entity'),
    businessTypeId: yup.string().required('Please Select Business Type'),
    isGstRegistered: yup.boolean(),
    gstin: yup.string().required('Please Enter GSTIN'),
    addressLine1: yup.string().required('Please Enter Address Line 1'),
    addressLine2: yup.string().required('Please Enter Area, Street, Sector, Village'),
    countryId: yup.string().required('Please Select CountryId'),
    stateId: yup.string().required('Please Select State'),
    pinZipCode: yup.string().required('Please Enter Postal Code').matches(pinzipcodeRegExp, { message: 'Postal Code is not valid', excludeEmptyString: true }),
    city: yup.string().required('Please Enter City')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: OrganizationSchema.cast(),
    resolver: yupResolver(OrganizationSchema)
  })

  const onSubmit = async data => {
    data.userId = store.loginUser.id
    await dispatch(createOrganization(data))
  }

  const getBusineessEntity = () => {
    axios.post('/businessentities/list').then(response => {
      const arr = response.data
      setBusinessEntityIdOptions(arr.businessentities)
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

  const createOrgUser = async (user, org) => {
    const data = {
      userId: user.id,
      name: user.name,
      organizationId: org.id,
      email : user.email,
      userTypeId : user.accounttype 
    }
    await dispatch(createOrganizationUser(data))
    navigate(getHomeRouteForLoggedInUser(data.role))
  }

  useEffect(() => {
    getBusineessEntity()
    getCountries()
    getStates()

    if (store.activeOrganization !== null) {
      localStorage.setItem('activeOrganization',store.activeOrganization)
      const user = store.loginUser
      const org = store.activeOrganization
     
      createOrgUser(user, org)
      toast(t => (
        <ToastContent t={t} name={data.name} />
      ))
    }


  }, [store.activeOrganization])


  const getRow = (fieldLabel, fieldName, reqflag = false) => {
    return (
      <Row className='mb-1'>
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

      <Row className='mb-1'>
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
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Organization Information</h2>
        <span>Enter Your Organization Details.</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' >
            {getRow('Business Name', 'name', true)}
          </Col>
          <Col md='6' >
            {getRow('Business E-mail', 'businessEmail', true)}
          </Col>
          <Col md='6' >
            {getRow('Conatct No', 'contactNo', true)}
          </Col>
          <Col md='6'>
            {getSelectRow('Business Type', 'businessTypeId', businessEntityIdOptions, true)}
          </Col>
          <Col md='6'>
            {getSelectRow('Business Entity', 'businessEntityId', businessEntityIdOptions, true)}
          </Col>
          <Col md='6'>
            <Label className='form-label' for='pincode'>
              Is GST Registered?
            </Label>
            <div className='form-switch form-check-success'>
              <Input type='switch' id='switch-success' name='isGstRegistered' defaultChecked />
            </div>
          </Col>
          <Col md='6'>
            {getRow('GSTIN', 'gstin', true)}
          </Col>
          <Col sm='12' >
            {getRow('Address', 'addressLine1', true)}
          </Col>
          <Col sm={12}>
            {getRow('Area, Street, Sector, Village', 'addressLine2', true)}
          </Col>
          <Col md='6'>
            {getSelectRow('State', 'stateId', stateOptions, true)}
          </Col>
          <Col md='6'>
            {getRow('Postal Code', 'pinZipCode', true)}
          </Col>
          <Col md='6'>
            {getRow('Town/City', 'city', true)}
          </Col>
          <Col md='6'>
            {getSelectRow('Country', 'countryId', countryOptions, true)}
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='success' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
            <Check size={14} className='align-middle ms-sm-25 ms-0'></Check>
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default Organization
