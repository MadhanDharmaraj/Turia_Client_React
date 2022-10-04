// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// ** Custom Components
import classnames from 'classnames'

// ** Third Party Components
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Reactstrap Imports
import { Row, Col, Card, Form, Label, Button, CardBody, CardText, FormFeedback, Input } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States

  const inputRef = useRef(null)
  const [setOpen] = useState(false)
  const [date, setDate] = useState("")

  const schema = yup.object().shape({
    client_id: yup.string().required("Please select a Client"),
    service_id: yup.string().required("Please select a Service"),
    assignee: yup.array().min(1, "Please select Assignee"),
    start_date: yup.date()
      .nullable()
      .required('Please Select Start Date'),
    end_date: yup.date()
      .nullable()
      .required('Please Select End Date'),
    priority: yup.string().required("Please select a Priority"),
    invoice_items: yup.array().of(
      yup.object().shape({
        item_id: yup.string().required("Please Select Service"),
        sac_code: yup.string(),
        price: yup.number().min(1).positive("Must be more than 0").required(),
        tax_group_id: yup.string().required("Pleace Select Tax")
      })
    )
  })

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      client_id: '',
      service_id: '',
      description: '',
      assignee: [],
      reviewer: [],
      start_date: null,
      end_date: null,
      priority: '',
      invoice_items: []
    }
  })

  const [clientOptions, setClientOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [priorityOptions, setPriorityOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])

  const { fields, append, remove } = useFieldArray({ name: 'invoice_items', control })
  const onSubmit = data => console.log(data)

  const addItem = (() => {
    append({ item_id: '', sac_code: '', price: 0, tax_group_id: '', subTotal: 0, taxPrice: 0 })
  })

  const removeItem = ((val) => {
    remove(val)
  })

  useEffect(() => {
    // ** Get Clients
    axios.get('/api/task/utilities').then(response => {
      const arr = response.data
      setClientOptions(arr.clients)
      setServiceOptions(arr.services)
      setPriorityOptions(arr.priority)
      setUserOptions(arr.users)
      setTaxGroupOptions(arr.tax_group)
    })


  }, [])

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
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='client_id'>
                  Client
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="client_id"
                    id="client_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.client_id })}
                        {...field}
                        classNamePrefix='select'
                        options={clientOptions}
                        value={clientOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.client_id && <FormFeedback className='text-danger'>{errors.client_id?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='service_id'>
                  Service
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="service_id"
                    id="service_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.service_id })}
                        {...field}
                        classNamePrefix='select'
                        options={serviceOptions}
                        value={serviceOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.service_id && <FormFeedback className='text-danger'>{errors.service_id?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='description'>
                  Description
                </Label>
                <Col sm='9'>
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    render={({ field }) => <Input type="textarea" invalid={errors.description && true} {...field} />}
                  />
                  {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}
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

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='assignee'>
                  Assignee
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="assignee"
                    id="assignee"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.assignee })}
                        {...field}
                        classNamePrefix='select'
                        options={userOptions}
                        isMulti={true}
                        value={value} // set selected values
                        onChange={handleAssigneeChange}
                      />
                    )}

                  />
                  {errors.assignee && <FormFeedback className='text-danger'>{errors.assignee?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='reviewer'>
                  Reviewer
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="reviewer"
                    id="reviewer"
                    render={({ field, value, ref }) => (
                      <Select
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.reviewer })}
                        {...field}
                        classNamePrefix='select'
                        options={userOptions}
                        isMulti={true}
                        value={value} // set selected values
                        onChange={handleReviwerChange}
                      />
                    )}

                  />
                  {errors.reviewer && <FormFeedback className='text-danger'>{errors.reviewer?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='start_date'>
                  Start Date
                </Label>
                <Col sm='9'>
                  <Controller
                    value={date}
                    name="start_date"
                    control={control}
                    rules={{ required: true }}
                    options={{ dateFormat: "d-m-Y" }}
                    render={({ field, value }) => (
                      <Flatpickr className={classnames('form-control', { 'is-invalid': errors.start_date })} options={{ dateFormat: "d-m-Y" }} name="start_date" onChange={date => field.onChange(date)} value={value} />
                    )}
                  />

                  {errors.start_date && <FormFeedback className='text-danger'>{errors.start_date?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='end_date'>
                  End Date
                </Label>
                <Col sm='9'>
                  <Controller
                    value={date}
                    onChange={date => setDate(date)}
                    name="end_date"
                    control={control}
                    rules={{ required: true }}
                    options={{ dateFormat: "d-m-Y" }}
                    render={({ field, value }) => (
                      <Flatpickr className={classnames('form-control', { 'is-invalid': errors.end_date })} options={{ dateFormat: "d-m-Y" }} name="end_date" FormFeedback onChange={date => field.onChange(date)} value={value} />
                    )}
                  />

                  {errors.end_date && <FormFeedback className='text-danger'>{errors.end_date?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='priority'>
                  Priority
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="priority"
                    id="priority"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.priority })}
                        {...field}
                        classNamePrefix='select'
                        options={priorityOptions}
                        value={priorityOptions.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.priority && <FormFeedback className='text-danger'>{errors.priority?.message}</FormFeedback>}
                </Col>
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
                        name={`invoice_items.${i}.item_id`}
                        rules={{ required: true }}
                        render={({ field, value, ref }) => (
                          <Select
                            inputRef={ref}
                            className={classnames('react-select', { 'is-invalid': errors.invoice_items?.[i]?.item_id })}
                            classNamePrefix='select'
                            options={serviceOptions}
                            value={serviceOptions.find(c => c.value === value)}
                            onChange={val => field.onChange(val.value)}
                          />
                        )}
                      />
                      {errors.invoice_items?.[i]?.item_id && <FormFeedback className='text-danger'>{errors.invoice_items?.[i]?.item_id?.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>SAC Code</CardText>

                      <Controller
                        name={`invoice_items.${i}.sac_code`}
                        control={control}
                        render={({ field }) => <Input type="text" invalid={errors.invoice_items?.[i]?.sac_code && true} {...field} />}
                      />
                      {errors.invoice_items?.[i]?.sac_code && <FormFeedback>{errors.invoice_items?.[i]?.sac_code?.message}</FormFeedback>}


                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-2 mb-0'>Price</CardText>
                      <Controller
                        name={`invoice_items.${i}.price`}
                        control={control}
                        render={({ field }) => <Input type="number" invalid={errors.invoice_items?.[i]?.price && true} {...field} />}
                      />
                      {errors.invoice_items?.[i]?.price && <FormFeedback>{errors.invoice_items?.[i]?.price?.message}</FormFeedback>}

                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Tax Rate</CardText>
                      <Controller
                        control={control}
                        name={`invoice_items.${i}.tax_group_id`}
                        rules={{ required: true }}
                        render={({ field, value, ref }) => (
                          <Select
                            inputRef={ref}
                            className={classnames('react-select', { 'is-invalid': errors.invoice_items?.[i]?.tax_group_id })}
                            classNamePrefix='select'
                            options={taxGroupOptions}
                            value={taxGroupOptions.find(c => c.value === value)}
                            onChange={val => field.onChange(val.value)}
                          />
                        )}
                      />
                      {errors.invoice_items?.[i]?.tax_group_id && <FormFeedback className='text-danger'>{errors.invoice_items?.[i]?.tax_group_id?.message}</FormFeedback>}
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
            <Button className='add-new-user' outline color='warning' tag={Link} to='/task/list'>
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
