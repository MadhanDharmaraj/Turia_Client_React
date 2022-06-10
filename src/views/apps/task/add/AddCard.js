// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react'
import {Link } from 'react-router-dom'
// ** Custom Components
import AddActions from './AddActions'
import Repeater from '@components/repeater'

// ** Third Party Components
//import axios from 'axios'
import Flatpickr from 'react-flatpickr'
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

// ** Deletes form

const AddCard = () => {
  // ** States

  const inputRef = useRef(null)
  const [setOpen] = useState(false)
  // const [clients, setClients] = useState(null)
  // const [selected, setSelected] = useState(null)
  const [date, setDate] = useState("")

  const schema = yup.object().shape({
    clientId: yup.string().required("Please select a Client"),
    serviceId: yup.string().required("Please select a Service"),
    assignee: yup.array().min(1, "Please select Assignee"),
    startDate: yup.date("Please select Start Date"),
    endDate: yup.date("Please select End Date"),
    priority: yup.string().required("Please select a Priority"),
    invoice_items: yup.array().of(
      yup.object().shape({
        itemId: yup.string().required("Please Select Service"),
        sacCode: yup.string(),
        price: yup.number().positive("Must be more than 0").required(),
        taxGroupId: yup.string().required("Pleace Select Tax")
      })
    )
  })

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientId: '',
      serviceId: '',
      description: '',
      assignee: [],
      reviewer: [],
      startDate: new Date(),
      endDate: new Date(),
      priority: '',
      invoice_items: []
    }
  })

  const { fields, append, remove } = useFieldArray({ name: 'invoice_items', control })
  const onSubmit = data => console.log(data)

  const addItem = (() => {
    append({ itemId: '', sacCode: '', price: 0, taxGroupId: '', subTotal: 0, taxPrice: 0 })
  })

  const removeItem = ((val) => {
    remove(val)
  })

  useEffect(() => {
    addItem()
  }, [])


  // handle onChange event of the dropdown
  const handleAssigneeChange = (e) => {
    const tempArr = Array.isArray(e) ? e.map(x => x.value) : []
    setValue("assignee", tempArr)
  }

  const handleReviwerChange = (e) => {
    const tempArr = Array.isArray(e) ? e.map(x => x.value) : []
    setValue("reviewer", tempArr)
  }

  const changeHandler = (event) => {
    console.log(event.target.files)
  }

  // const handleSubmission = () => {
  //   const formData = new FormData()

  //     // Update the formData object
  //     formData.append(
  //       "myFile",
  //       selectedFile,
  //       selectedFile.name
  //     )

  //     // Details of the uploaded file
  //     console.log(selectedFile)
  // }

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
        <CardBody className='pb-2 px-2'>
          <Row>
            <div className='col-lg-6 col-sm-12'>
              <Row className='my-2'>
                <div className='d-lg-flex'>
                  <Label className='col-lg-3 col-sm-12' >Client</Label>
                  <Controller
                    className
                    control={control}
                    rules={{ required: "Please Select Client" }}
                    name="clientId"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className="react-select col-lg-9 col-sm-12"
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                </div>
                <p className='text-danger'>{errors.clientId?.message}</p>
              </Row>
              <Row className='my-2'>
                <div className='d-lg-flex'>
                  <Label className='col-lg-3 col-sm-12' >Service</Label>
                  <Controller
                    control={control}
                    name="serviceId"
                    rules={{ required: true }}
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className="react-select col-lg-9 col-sm-12"
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                </div>
                <p className='text-danger'>{errors.serviceId?.message}</p>
              </Row>
              <Row className='my-2'>
                <Col>
                  <div className='d-lg-flex'>
                    <Label className='col-lg-3 col-sm-12' >Description</Label>
                    <textarea className='form-control' size="md" {...register("description")}></textarea>
                  </div>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <div className='d-lg-flex'>
                    <input type='file' className='hidden' multiple onChange={changeHandler} ref={inputRef} />
                    <Button type='button' outline color='primary' onClick={() => inputRef.current.click()}>
                      <Plus size={14} className='me-25'></Plus> Add Attachment</Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <Row className='my-2'>
                <div className='d-lg-flex'>
                  <Label className='col-lg-3 col-sm-12' >Assignee</Label>
                  <Controller
                    control={control}
                    name="assignee"
                    rules={{ required: true }}
                    render={({ value, ref }) => (
                      <Select
                        inputRef={ref}
                        className="react-select col-lg-9 col-sm-12"
                        classNamePrefix="addl-class"
                        options={options}
                        isMulti={true}
                        value={value} // set selected values
                        onChange={handleAssigneeChange}
                      />
                    )}
                  />
                </div>
                <p className='text-danger'>{errors.assignee?.message}</p>
              </Row>
              <Row className='my-2'>
                <div className='d-lg-flex'>
                  <Label className='col-lg-3 col-sm-12' >Reviewer</Label>
                  <Controller
                    control={control}
                    name="reviewer"
                    rules={{ required: true }}
                    render={({ value, ref }) => (
                      <Select
                        inputRef={ref}
                        isMulti={true}
                        className="react-select col-lg-9 col-sm-12"
                        classNamePrefix="addl-class"
                        options={options}
                        value={value}
                        onChange={handleReviwerChange}
                      />
                    )}
                  />
                </div>
              </Row>
              <Row className='my-2'>
                <Col>
                  <div className='d-lg-flex'>
                    <Label className='col-lg-3 col-sm-12' >Start Date</Label>
                    <Controller
                      value={date}
                      name="startDate"
                      control={control}
                      rules={{ required: true }}
                      options={{ dateFormat: "d-m-Y" }}
                      render={({ field, value }) => (
                        <Flatpickr options={{ dateFormat: "d-m-Y" }} name="startDate" onChange={date => field.onChange(date)} value={value} className='form-control due-date-picker' />
                      )}
                    />
                  </div>
                  <p className='text-danger'>{errors.startDate?.message}</p>
                </Col>
              </Row>
              <Row className='my-2'>
                <Col>
                  <div className='d-lg-flex'>
                    <Label className='col-lg-3 col-sm-12' >End Date</Label>
                    <Controller
                      value={date}
                      onChange={date => setDate(date)}
                      name="endDate"
                      control={control}
                      rules={{ required: true }}
                      options={{ dateFormat: "d-m-Y" }}
                      render={({ field, value }) => (
                        <Flatpickr options={{ dateFormat: "d-m-Y" }} name="endDate" onChange={date => field.onChange(date)} value={value} className='form-control due-date-picker' />
                      )}
                    />
                  </div>
                  <p className='text-danger'>{errors.endDate?.message}</p>
                </Col>
              </Row>
              <Row className='my-2'>
                <div className='d-lg-flex'>
                  <Label className='col-lg-3 col-sm-12' >Priority</Label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className="react-select col-lg-9 col-sm-12"
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find(c => c.value === value)}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                </div>
                <p className='text-danger'>{errors.priority?.message}</p>
              </Row>
            </div>
          </Row>
        </CardBody>
        <hr className='invoice-spacing' />
        <Row className='px-1'>
          <div className='form-check form-check-primary mx-2'>
            <input className='form-check-input' type='checkbox' id='client_type_2' name='invoiceFlag' value={true} {...register("invoiceFlag")} />
            <Label className='form-check-label' for='client_type_2'>
              Create Proposal for this Task
            </Label>
          </div>
        </Row>
        <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (

            <div key={i} className='repeater-wrapper'>
              <Row>
                <Col className='d-lg-flex product-details-border position-relative pe-0 ps-sm-0' sm='12'>
                  <Row className='w-100 pe-lg-0 py-2 ms-sm-1'>
                    <Col className='my-lg-0 my-2' lg='4' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                      <Controller
                        control={control}
                        name={`invoice_items.${i}.itemId`}
                        rules={{ required: true }}
                        render={({ field, value, ref }) => (
                          <Select
                            inputRef={ref}
                            className="react-select"
                            classNamePrefix="addl-class"
                            options={options}
                            value={options.find(c => c.value === value)}
                            onChange={val => field.onChange(val.value)}
                          />
                        )}
                      />
                      <p className='text-danger'>{errors.invoice_items?.[i]?.itemId?.message}</p>
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>SAC Code</CardText>
                      <input type='number' {...register(`invoice_items.${i}.sacCode`)} className={`form-control ${errors.invoice_items?.[i]?.sacCode ? 'is-invalid' : ''}`} />
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Price</CardText>
                      <input className='form-control' type='number' placeholder='' {...register(`invoice_items.${i}.price`)} />
                      <p className='text-danger'>{errors.invoice_items?.[i]?.price?.message}</p>
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Tax Rate</CardText>
                      <Controller
                        control={control}
                        name={`invoice_items.${i}.taxGroupId`}
                        rules={{ required: true }}
                        render={({ field, value, ref }) => (
                          <Select
                            inputRef={ref}
                            className="react-select col-lg-9 col-sm-12"
                            classNamePrefix="addl-class"
                            options={options}
                            value={options.find(c => c.value === value)}
                            onChange={val => field.onChange(val.value)}
                          />
                        )}
                      />
                      <p className='text-danger'>{errors.invoice_items?.[i]?.taxGroupId?.message}</p>
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Amount</CardText>

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
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
          <Button className='add-new-user' color='warning' tag={Link} to='/task/list'>
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
