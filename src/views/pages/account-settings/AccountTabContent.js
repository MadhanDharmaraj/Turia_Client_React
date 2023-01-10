// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import classnames from 'classnames'
import axios from '@src/configs/axios/axiosConfig'
// ** Reactstrap Imports
import { Row, Col, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, Form, FormFeedback } from 'reactstrap'
// ** Demo Components
import DeleteAccount from './DeleteAccount'
import { getOrganization, updateOrganization } from './store'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
console.log(userId)
const AccountTabs = ({ data }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const [businessEntityIdOptions, setBusinessEntityIdOptions] = useState([])
  const [businessTypesOptions, setBusinessTypesOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])
  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const pinzipcodeRegExp = /^[0-9\- ]{6,6}$/
  const store = useSelector(state => state.organization)
  const OrganizationSchema = yup.object().shape({
    updatedBy: yup.string().default(userId),
    id: yup.string().default(''),
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
    formState: { errors }, reset
  } = useForm({
    defaultValues: OrganizationSchema.cast(),
    resolver: yupResolver(OrganizationSchema)
  })


  // ** States
  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = async data => {
    await dispatch(updateOrganization(data))
  }

  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
  }

  const getBusineessEntity = () => {
    axios.post('/businessentities/list').then(response => {
      const arr = response.data
      setBusinessEntityIdOptions(arr.businessentities)
    })
  }

  const getBusineessTypes = () => {
    axios.post('/businesstypes/dropdown').then(response => {
      const arr = response.data
      setBusinessTypesOptions(arr.businesstypes)
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

  useEffect(async () => {
    getBusineessEntity()
    getBusineessTypes()
    getCountries()
    getStates()
  }, [])

  useEffect(async () => {
    await dispatch(getOrganization(activeOrgId))
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
        <Label sm='4' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName} >
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

  useEffect(() => {
    if (store.organizationData !== null) {
      const data = store.organizationData
      reset({
        updatedBy: userId,
        name: data.name,
        id : data.id,
        businessEmail: data.businessemail,
        contactNo: data.contactno,
        businessEntityId: data.businessentityid,
        businessTypeId: data.businesstypeid,
        isGstRegistered: data.isgstregistered,
        gstin: data.gstin,
        addressLine1: data.addressline1,
        addressLine2: data.addressline2,
        countryId: data.countryid,
        stateId: data.stateid,
        pinZipCode: data.pinzipcode,
        city: data.city
      })
    }
  }, [store.organizationData])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Organization Details</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Upload
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Reset
                </Button>
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div>
          <Row tag={Form} className='mt-1' onSubmit={handleSubmit(onSubmit)}>
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
                {getSelectRow('Business Entity', 'businessEntityId', businessTypesOptions, true)}
              </Col>
              <Col md='6' className='d-flex justify-content-between'>
                <div className='form-switch form-check-success col-md-12 p-0'>
                  <Label className='form-label' md={5} for='pincode'>
                    Is GST Registered?
                  </Label>
                  <Input type='switch' id='switch-success' name='isGstRegistered' defaultChecked />
                </div>
              </Col>
              <Col md='6'>
                {getRow('GSTIN', 'gstin', true)}
              </Col>
              <Col md='6' >
                {getRow('Address', 'addressLine1', true)}
              </Col>
              <Col md='6'>
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
              <Button type='submit' className='me-1' color='primary'>
                Submit
              </Button>
            </div>
          </Row>
        </CardBody>
      </Card>
      <DeleteAccount />
    </Fragment>
  )
}

export default AccountTabs
