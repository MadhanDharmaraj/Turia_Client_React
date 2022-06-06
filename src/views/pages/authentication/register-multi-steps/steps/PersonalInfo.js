// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ChevronLeft, Check } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

const defaultValues = {
  businessName: '',
  businessEmail: '',
  contactNo: '',
  businessType: '',
  businessEntity: '',
  addressLine1: '',
  addressLine2: '',
  stateId : '',
  city: '',
  zipCode: '',
  country: ''
}

const PersonalInfo = ({ stepper }) => {
  // ** Hooks
  const {
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
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
            <Input placeholder='Turia' invalid={errors.businessName && true}  {...register(`businessName`, { required: true })} />
         
            {errors.businessName && <FormFeedback>{errors.businessName.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='businessEmail'>
              Business E-mail
            </Label>
            <Input type='email' id='email' name='email' placeholder='example@gmail.com' invalid={errors.businessEmail && true}  {...register(`businessEmail`, { required: true })}  />
            {errors.businessEmail && <FormFeedback>{errors.businessEmail.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='contactNo'>
              Contact No
            </Label>
            <Input type='number' id='contactNo' name='contactNo' placeholder='(472) 765-3654' invalid={errors.contactNo && true}  {...register(`contactNo`, { required: true })} />
            {errors.contactNo  && <FormFeedback>{errors.contactNo.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='businessType' >
              Business Type
            </Label>
            <Input id='businessType' name='businessType' invalid={errors.businessType && true}  {...register(`businessType`, { required: true })} />
            {errors.businessType  && <FormFeedback>{errors.businessType.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='pincode'>
              Business Entity
            </Label>
            <Input type='number' id='pincode' name='pincode' placeholder='657482' />
          </Col>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='address'>
              Address
            </Label>
            <Controller
              id='address'
              name='address'
              control={control}
              render={({ field }) => <Input invalid={errors.address && true} {...field} />}
            />
            {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
          </Col>
          <Col sm={12} className='mb-1'>
            <Label className='form-label' for='area-sector'>
              Area, Street, Sector, Village
            </Label>
            <Input id='area-sector' name='area-sector' placeholder='Area, Street, Sector, Village' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='state'>
              State
            </Label>
            <Input id='state' name='state' placeholder='State' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='postal-code'>
              Postal Code
            </Label>
            <Input type='number' id='postal-code' name='postal-code' placeholder='000 000' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='town-city'>
              Town/City
            </Label>
            <Input id='town-city' name='town-city' placeholder='Town/City' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='country'>
              Country
            </Label>
            <Input type='number' id='country' name='country' placeholder='United Kingdom' />
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

export default PersonalInfo
