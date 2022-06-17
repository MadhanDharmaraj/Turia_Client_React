// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import {Link } from 'react-router-dom'
// ** Custom Components
import AddActions from './AddActions'
import Repeater from '@components/repeater'

// ** Third Party Components
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, useFieldArray } from "react-hook-form"

const countryOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'usa', label: 'USA' },
  { value: 'france', label: 'France' },
  { value: 'russia', label: 'Russia' },
  { value: 'canada', label: 'Canada' }
]

// ** Reactstrap Imports
import { selectThemeColors } from '@utils'
import { Row, Col, Card, Form, Label, Button, CardBody, CardText, InputGroup, InputGroupText, Input } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States
  const [value] = useState({})
  const [setOpen] = useState(false)
  // const [clients, setClients] = useState(null)
  // const [selected, setSelected] = useState(null)
  // const [picker, setPicker] = useState(new Date())
  // const [invoiceNumber, setInvoiceNumber] = useState(false)
  // const [dueDatepicker, setDueDatePicker] = useState(new Date())
  const [options, setOptions] = useState([
    {
      value: 'add-new',
      label: 'Add New Customer',
      type: 'button',
      color: 'flat-success'
    }
  ])
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      clientId: '',
      dsc_lists: []
    }
  })

  const { fields, append, remove } = useFieldArray({ name: 'dsc_lists', control })
  const onSubmit = data => console.log(data)


  useEffect(() => {
    // ** Get Clients
    axios.get('/api/invoice/clients').then(response => {
      const arr = options
      response.data.map(item => arr.push({ value: item.name, label: item.name }))
      setOptions([...arr])
      // setClients(response.data)
    })


  }, [])

  // ** Deletes form
  // const deleteForm = e => {
  //   e.preventDefault()
  //   e.target.closest('.repeater-wrapper').remove()
  // }
  const addItem = (() => {
    append({ name: '', email: '', contactNo: '', issuedDate: '', expiryDate: '', password: '' })
  })

  const removeItem = ((val) => {
    remove(val)
  })

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
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12' >Client</Label>
                <Select
                  id='label'
                  value={value}
                  theme={selectThemeColors}
                  classNamePrefix='Select Client'
                  options={countryOptions}
                  isClearable={false}
                  className={`react-select col-lg-9 col-sm-12 ${errors.clientId ? 'is-invalid' : ''}`}
                  {...register("clientId", { required: "Please Select Client." })}
                />
              </div>
            </Col>
          </Row>
          </CardBody>
          <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (
            <div key={i} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Name</CardText>
                      <input type='text' {...register(`dsc_lists.${i}.firstName`, { required: true })} className={`form-control ${errors.dsc_lists?.[i]?.firstName ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.dsc_lists?.[i]?.firstName?.message}</div>
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Email</CardText>
                      <input type='email' {...register(`dsc_lists.${i}.email`, { required: true })} className={`form-control ${errors.dsc_lists?.[i]?.email ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.dsc_lists?.[i]?.email?.message}</div>
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Mobile</CardText>
                      <input className='form-control' type='number' placeholder='' {...register(`dsc_lists.${i}.contactNo`)} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Issued Date</CardText>
                      <input className='form-control' type='text' placeholder='' {...register(`dsc_lists.${i}.issuedDate`, { required: true })} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Expiry Date</CardText>
                      <input className='form-control' type='text' placeholder='' {...register(`dsc_lists.${i}.expiryDate`, { required: true })} />
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Password</CardText>
                      <input className='form-control' type='text' placeholder='' {...register(`dsc_lists.${i}.password`)} />
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
        {/* /Header */}
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline tag={Link} to='/digital-signature/list'>
              Cancel
            </Button>
            <Button color='primary' type="submit" >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  )
}

export default AddCard
