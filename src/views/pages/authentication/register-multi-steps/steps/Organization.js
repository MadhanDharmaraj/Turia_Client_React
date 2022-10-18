// ** React Imports
import { Fragment } from 'react'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import { ChevronLeft, Check } from 'react-feather'
import classnames from 'classnames'
// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
const stateOptions = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]

const Organization = ({ stepper }) => {

  // ** Hooks
  const defaultValues = {
    businessName: '',
    businessEmail: '',
    contactNo: '',
    businessType: '',
    businessEntity: '',
    isGstRegistered: '',
    gstin: '',
    addressLine1: '',
    addressLine2: '',
    stateId: '',
    city: '',
    zipCode: '',
    country: ''
  }

  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const zipcodeRegExp = /^[0-9\- ]{6,6}$/

  const OrganizationSchema = yup.object().shape({
    businessName: yup.string().required(),
    businessEmail: yup.string().email().required(),
    contactNo: yup.string().required().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    businessEntity: yup.string().required(),
    businessType: yup.string().required(),
    isGstRegistered: yup.boolean().required(),
    gstin: yup.string().required(),
    addressLine1: yup.string().required(),
    addressLine2: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required().matches(zipcodeRegExp, { message: 'Zip Code is not valid', excludeEmptyString: true }),
    city: yup.string().required()
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(OrganizationSchema)
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      console.log(data)
      stepper.next()
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Organization Information</h2>
        <span>Enter Your Organization Details.</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='businessName'>
              Business Name
            </Label>
            <Controller
              control={control}
              name="businessName"
              id="businessName"
              render={({ field }) => (
                <Input placeholder='Turia' invalid={errors.businessName && true} {...field} />
              )}
            />
            {errors.businessName && <FormFeedback>{errors.businessName.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='businessEmail'>
              Business E-mail
            </Label>
            <Controller
              control={control}
              name="businessEmail"
              id="businessEmail"
              render={({ field }) => (
                <Input placeholder='example@turia.in' type='email' invalid={errors.businessEmail && true}  {...field} />
              )}
            />
            {errors.businessEmail && <FormFeedback>{errors.businessEmail.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='contactNo'>
              Conatct No
            </Label>
            <Controller
              control={control}
              name="contactNo"
              id="contactNo"
              render={({ field }) => (
                <Input placeholder='1234567890' type='number' invalid={errors.contactNo && true} {...field} />
              )}
            />
            {errors.contactNo && <FormFeedback>{errors.contactNo.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='businessType' >
              Business Type
            </Label>
            <Controller
              control={control}
              name="businessType"
              id="businessType"
              render={({ field, value, ref }) => (
                <Select
                  inputRef={ref}
                  className={classnames('react-select', { 'is-invalid': errors.businessType })}
                  {...field}
                  classNamePrefix='select'
                  options={stateOptions}
                  value={stateOptions.find(c => { return c.value === value })}
                  onChange={val => field.onChange(val.value)}
                />
              )}

            />
            {errors.businessType && <FormFeedback className='text-danger'>{errors.businessType?.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='pincode'>
              Business Entity
            </Label>
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
                  options={stateOptions}
                  value={stateOptions.find(c => { return c.value === value })}
                  onChange={val => field.onChange(val.value)}
                />
              )}
            />
            {errors.businessEntity && <FormFeedback className='text-danger'>{errors.businessEntity?.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='pincode'>
              Is GST Registered?
            </Label>
            <div className='form-switch form-check-success'>
              <Input type='switch' id='switch-success' name='isGstRegistered' defaultChecked />
            </div>
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='gstin'>
              GSTIN
            </Label>
            <Controller
              control={control}
              name="gstin"
              id="gstin"
              render={({ field }) => (
                <Input placeholder='1234567890' type='text' invalid={errors.gstin && true} {...field} />
              )}
            />
            {errors.gstin && <FormFeedback>{errors.gstin.message}</FormFeedback>}
          </Col>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='addressLine1'>
              Address
            </Label>
            <Controller
              id='addressLine1'
              name='addressLine1'
              control={control}
              render={({ field }) => <Input placeholder='Flat No' invalid={errors.addressLine1 && true} {...field} />}
            />
            {errors.addressLine1 && <FormFeedback>{errors.addressLine1.message}</FormFeedback>}
          </Col>
          <Col sm={12} className='mb-1'>
            <Label className='form-label' for='area-sector'>
              Area, Street, Sector, Village
            </Label>
            <Controller
              control={control}
              name="addressLine2"
              id="addressLine2"
              render={({ field }) => (
                <Input placeholder='Area, Street, Sector, Village' invalid={errors.addressLine2 && true} {...field} />
              )}
            />
            {errors.addressLine2 && <FormFeedback>{errors.addressLine2.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='state'>
              State
            </Label>
            <Controller
              control={control}
              name="state"
              id="state"
              render={({ field, value, ref }) => (
                <Select
                  inputRef={ref}
                  className={classnames('react-select', { 'is-invalid': errors.state })}
                  {...field}
                  classNamePrefix='select'
                  options={stateOptions}
                  value={stateOptions.find(c => { return c.value === value })}
                  onChange={val => field.onChange(val.value)}
                />
              )}

            />
            {errors.state && <FormFeedback className='text-danger'>{errors.state?.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='postal-code'>
              Postal Code
            </Label>
            <Controller
              control={control}
              name="zipCode"
              id="zipCode"
              render={({ field }) => (
                <Input placeholder='000 000' type='number' invalid={errors.zipCode && true} {...field} />
              )}
            />
            {errors.zipCode && <FormFeedback>{errors.zipCode.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='town-city'>
              Town/City
            </Label>
            <Controller
              control={control}
              name="city"
              id="city"
              render={({ field }) => (
                <Input placeholder='City' invalid={errors.city && true} {...field} />
              )}
            />
            {errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='country'>
              Country
            </Label>
            <Controller
              control={control}
              name="country"
              id="country"
              render={({ field, value, ref }) => (
                <Select
                  inputRef={ref}
                  className={classnames('react-select', { 'is-invalid': errors.country })}
                  {...field}
                  classNamePrefix='select'
                  options={stateOptions}
                  value={stateOptions.find(c => { return c.value === value })}
                  onChange={val => field.onChange(val.value)}
                />
              )}
            />
            {errors.country && <FormFeedback className='text-danger'>{errors.country?.message}</FormFeedback>}
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
      </Form>
    </Fragment>
  )
}

export default Organization
