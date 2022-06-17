// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
// ** Custom Components
import AddActions from './AddActions'
import Repeater from '@components/repeater'

// ** Third Party Components
//import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from "react-hook-form"
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
    contactPersonName: yup.string().required("Please Enter a Contact Person Name"),
    businessName: yup.string(),
    contactNo: yup.string().max(10).min(0, "Invalid Contact No"),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    gstType: yup.string().required("Please select a GST Type"),
    gstin: yup.string().required("Please Enter GSTIN No"),
    placeOfSupply: yup.string().required("Please select Place Of Supply"),
    contact_info: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("Please Enter A Name"),
        email: yup.string().email().required("Please Enter valid Email")
      })
    )
  })

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientType: '2',
      contactPersonName: '',
      businessName: '',
      contactNo: '',
      email: '',
      gstType: '',
      gstin: '',
      placeOfSupply: '',
      currencyId: '',
      contact_info: [],
      billingAddress: {
        countryId: '1',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        useAsBillingAddress: ''
      }
    }
  })

  //const { fields, append, remove } = useFieldArray({ name: 'contact_info', control })
  const onSubmit = data => console.log(data)


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
              <Label size="lg" className='col-lg-3 col-sm-12' >Filing Name</Label>
              <Controller
                control={control}
                name="gstType"
                render={({ field, value, ref }) => (
                  <Select
                    {...register("gstType")}
                    inputRef={ref}
                    className="react-select col-lg-9 col-sm-12"
                    classNamePrefix="addl-class"
                    options={options}
                    value={options.find(c => c.value === value)}
                    onChange={val => field.onChange(val.value)}
                  />
                )}
              />
            </Col>
            <Col className='my-lg-0 my-1 d-lg-flex' lg='6' sm='12'>
              <Label size="lg" className='col-lg-3 col-sm-12'>Filing Frequency</Label>
              <Controller
                control={control}
                name="gstType"
                render={({ field, value, ref }) => (
                  <Select
                    {...register("gstType")}
                    inputRef={ref}
                    className="react-select col-lg-9 col-sm-12"
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
        {/* /Header */}
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
