// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  InputGroup
} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import { Home, Check, X, Briefcase } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Utils
//import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const options = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

const BillingAddress = (props) => {
  // ** States
  const [show, setShow] = useState(false)

  // ** Hooks
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      countryId: '1',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      useAsBillingAddress: ''
    }
  })

  const onDiscard = () => {
    setShow(false)
  }

  const onSubmit = data => {
    props.parentCallback(data)
    onDiscard()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Billing Address</CardTitle>
          <Button color='primary' size='sm' onClick={() => setShow(true)}>
            Add or Edit Address
          </Button>
        </CardHeader>
      </Card>

      <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-4 mx-50'>
          <h1 className='address-title text-center mb-1'>Add New Address</h1>
          <p className='address-subtitle text-center mb-2 pb-75'>Add address for billing address</p>
          <Row tag='form' className='gy-1 gx-2'>
            <Col xs={12}>
              <Label className='form-label' for='country'>
                Country
              </Label>
              <Controller
                control={control}
                name="countryId"
                render={({ field, value, ref }) => (
                    <Select
                       {...register("countryId")}
                        inputRef={ref}
                        className="react-select"
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                    />
                )}
            />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='addressLine1'>
                Address Line 1
              </Label>
              <input id='addressLine1' className='form-control' placeholder='12, Business Park' {...register("addressLine1")}/>
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='addressLine2'>
                Address Line 2
              </Label>
              <input id='addressLine2' className='form-control' placeholder='Mall Road' {...register("addressLine2")}/>
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='city'>
                City
              </Label>
              <input id='city' className='form-control' placeholder='Los Angeles' {...register("city")}/>
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='state-province'>
                State / Province
              </Label>
              <Controller
                control={control}
                name="state"
                render={({ field, value, ref }) => (
                    <Select
                    {...register("state")}
                        inputRef={ref}
                        className="react-select"
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                    />
                )}
            />
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='zipCode'>
                Zip Code
              </Label>
              <input id='zipCode' className='form-control' placeholder='99950' {...register("zipCode")}/>
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch'>
                  <Input type='switch' defaultChecked id='billing-switch' name='useAsBillingAddress'  {...register("useAsBillingAddress")}/>
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <Label className='form-check-label fw-bolder' for='billing-switch'>
                  Use as a billing address?
                </Label>
              </div>
            </Col>
            <Col className='text-center' xs={12}>
              <Button type='button' className='me-1 mt-2' color='primary' onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
              <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default BillingAddress
