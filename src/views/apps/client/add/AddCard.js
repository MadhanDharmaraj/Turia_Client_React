// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import AddActions from './AddActions'
import Repeater from '@components/repeater'

// ** Third Party Components
//import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import BillingAddress from './BillingAddress'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
const options = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

// ** Reactstrap Imports
//import { selectThemeColors } from '@utils'
import { Row, Col, Card, Form, Label, Button, CardBody, CardText, InputGroup, InputGroupText, Input } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States
  //const [setValue] = useState({})
  const [setOpen] = useState(false)
  // const [clients, setClients] = useState(null)
  // const [selected, setSelected] = useState(null)
  // const [picker, setPicker] = useState(new Date())
  // const [invoiceNumber, setInvoiceNumber] = useState(false)
  // const [dueDatepicker, setDueDatePicker] = useState(new Date())
  // const [options, setOptions] = useState([
  //   {
  //     value: 'add-new',
  //     label: 'Add New Customer',
  //     type: 'button',
  //     color: 'flat-success'
  //   }
  // ])
  const schema = yup.object().shape({
    contactPersonName : yup.string().required("Please Enter a Contact Person Name"),
    businessName : yup.string(),
    contactNo : yup.number("Please select Start Date").min(10).max(10),
    email : yup.date("Please select End Date"),
    gstType : yup.string().required("Please select a Priority"),
    gstin : yup.string().required("Please select a Priority"),
    placeOfSupply : yup.string().required("Please select a Priority"),
    currencyId : yup.string().required("Please select a Priority"),
    billingAddress : yup.string().required("Please select a Priority"),
    contact_info : yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("Please Enter A Name"),
        email: yup.string()
      })
    )
  })

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientType: '1',
      contactPersonName: '',
      businessName: '',
      contactNo: '',
      email: '',
      gstType: '',
      gstin: '',
      placeOfSupply: '',
      currencyId: '',
      contact_info: [],
      billingAddress : {

      }
    }
  })

  const { fields, append, remove } = useFieldArray({ name: 'contact_info', control })
  const onSubmit = data => console.log(data)

  const addItem = (() => {
    append({ firstName: '', email: '', contactNo: '', designation: '', isPrimary: ''})
  })

  const removeItem = ((val) => {
    remove(val)
  })

  useEffect(() => {
    addItem()
  }, [])

  const handleCallback = ((data) => {
    setValue('billingAddress', data)
  })

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
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label size="lg" className='col-lg-3 col-sm-12' >Client Type</Label>
              <Col className='my-lg-0 my-2 d-flex' lg='9' sm='9'>
                <div className='form-check form-check-primary mx-2'>
                  <Input type='radio' id='client_type_1' name='clientType' value='2' {...register("clientType")} />
                  <Label className='form-check-label' for='client_type_1'>
                    Business
                  </Label>
                </div>
                <div className='form-check form-check-primary mx-2'>
                  <Input type='radio' id='client_type_2' name='clientType' value='1' {...register("clientType")} />
                  <Label className='form-check-label' for='client_type_2'>
                    Individual
                  </Label>
                </div>
              </Col>
            </Col>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label className='col-lg-3 col-sm-12'>Unique No</Label>
              <input className='form-control' size="md" type='text' disabled />
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12' >Contact Person Name</Label>
                <input className={`form-control ${errors.contactPersonName ? 'is-invalid' : ''}`} size="md" {...register("contactPersonName", { required: "Contact Person Name Required" })} />
              </div>
            </Col>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12' >Business Name</Label>
                <input className={`form-control ${errors.businessName ? 'is-invalid' : ''}`} size="md" type='text' {...register("businessName", { required: "Business Name Required" })} />
              </div>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>Mobile Number</Label>
                <input className='form-control' size="md" type='number' {...register("contactNo")} />
              </div>
            </Col>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>Emiail ID</Label>
                <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} size="md" type='email' {...register("email", { required: "E Mail Required" })} />
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Header */}

        <hr className='invoice-spacing' />
        {/* Product Details */}
        <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (

            <div key={i} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>First Name</CardText>
                      <input type='text' {...register(`contact_info.${i}.firstName`, { required: true })} className={`form-control ${errors.contact_info?.[i]?.firstName ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.contact_info?.[i]?.firstName?.message}</div>
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-3 col-sm-12'>
                      <CardText className='col-title mb-md-2 mb-0'>Email</CardText>
                      <input type='email' {...register(`contact_info.${i}.email`, { required: true })} className={`form-control ${errors.contact_info?.[i]?.email ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.contact_info?.[i]?.email?.message}</div>
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Mobile</CardText>
                      <input className='form-control' type='number' placeholder='' {...register(`contact_info.${i}.contactNo`)} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Designation</CardText>
                      <input className='form-control' type='text' placeholder='' {...register(`contact_info.${i}.designation`)} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Primary</CardText>
                      <div className='form-switch form-check-primary'>
                        <Input type='switch' id='switch-primary' value={true} name='primary' defaultChecked {...register(`contact_info.${i}.isPrimary`)} />
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
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label className='col-lg-3 col-sm-12' >GST Type</Label>
              <Controller
                control={control}
                name="gstType"
                render={({ field, value, ref }) => (
                    <Select
                       {...register("gstType")}
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
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label className='col-lg-3 col-sm-12' >Place Of Supply</Label>
              <Controller
                control={control}
                name="placeOfSupply"
                render={({ field, value, ref }) => (
                    <Select
                       {...register("placeOfSupply")}
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
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label className='col-lg-3 col-sm-12'>GST Number</Label>
              <input className='form-control' size="md" type='text' {...register("gstin")}/>
            </Col>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label className='col-lg-3 col-sm-12'>Currency</Label>
              <Controller
                control={control}
                name="currencyId"
                render={({ field, value, ref }) => (
                    <Select
                       {...register("currencyId")}
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
          </Row>
        </CardBody>
        {/* Invoice Total */}
        <CardBody className=''>
          <BillingAddress parentCallback = {handleCallback}/>
        </CardBody>
        {/* /Invoice Total */}

      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline>
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
