// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// ** Custom Components
import classnames from 'classnames'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { getClient, addTask, updateInvocieId } from '../store'
import { addInvoice, addInvoiceItems } from '@src/views/apps/invoice/store/index.js'
// ** Reactstrap Imports
import { Row, Col, Card, Label, Button, CardBody, CardText, FormFeedback, Input, CardHeader } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { activeOrganizationid, activeOrganization, orgUserId } from '@src/helper/sassHelper'
import { useDispatch, useSelector } from 'react-redux'

const activeOrgId = activeOrganizationid()
const activeOrg = activeOrganization()
const userId = orgUserId()

const AddCard = () => {
  // ** States
  const inputRef = useRef(null)
  const [setOpen] = useState(false)
  const [date, setDate] = useState("")

  const schema = yup.object().shape({
    createdBy: yup.string().default(userId),
    clientId: yup.number().required("Please select a Client"),
    serviceId: yup.number().required("Please select a Service"),
    assignee: yup.array().min(1, "Please select Assignee"),
    reviewer: yup.array(),
    clientAccessFlag: yup.boolean().default(false),
    organizationId: yup.number().default(activeOrgId),
    taskStatus: yup.number().default(1),
    invoiceId: yup.number().default(0),
    startDate: yup.string()
      .nullable()
      .required('Please Select Start Date'),
    endDate: yup.string()
      .nullable()
      .required('Please Select End Date'),
    priority: yup.string().required("Please select a Priority"),
    invoiceFlag: yup.boolean().default(false),
    invoiceItems: yup.array().of(
      yup.object().shape({
        serviceId: yup.number().required("Please Select Service Item"),
        invoiceId: yup.number(),
        sacCode: yup.string(),
        price: yup.string(),
        organizationId: yup.number().default(activeOrgId),
        exemptioReasonId: yup.number(),
        actualPrice: yup.string().required(),
        taxGroupId: yup.number().required("Pleace Select Tax"),
        subTotalAmount: yup.string().required(1),
        isTaxApplicable: yup.boolean().default(true)
      })
    ).when("invoiceFlag", { is: (invoiceFlag) => invoiceFlag, then: yup.string().required("Require Atleast one Item when Proposal For this Task.") })
  })
  const store = useSelector(state => state.task)
  const invoicestore = useSelector(state => state.invoice)

  const { handleSubmit, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const priorityOptions = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" }
  ]

  const [assigneeUserOptions, setAssigneeUserOptions] = useState([{ id: 1, name: 'Madhan' }, { id: 2, name: 'Kavin' }, { id: 3, name: 'Akhalya' }])
  const [reviewerUserOptions, setReviewerUserOptions] = useState([{ id: 1, name: 'Madhan' }, { id: 2, name: 'Kavin' }, { id: 3, name: 'Akhalya' }])
  const userOptions = [{ id: 1, name: 'Madhan' }, { id: 2, name: 'Kavin' }, { id: 3, name: 'Akhalya' }]

  const dispatch = useDispatch()
  const [clientOptions, setClientOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  //const [userOptions, setUserOptions] = useState([])
  const [taskId, setTaskId] = useState([])
  const [exemptionReasonOptions, setExemptionReasonOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [invoiceFlag, setinvoiceFlag] = useState(true)
  const [taxValues, setTaxValues] = useState([])
  const [selectedClient, setSelectedClient] = useState({})
  const [invoiceData, setInvoiceData] = useState({})
  const [invoiceItems, setInvoiceItems] = useState({})
  const { fields, append, remove } = useFieldArray({ name: 'invoiceItems', keyName: 'rowid', control })

  useEffect(async () => {
    if (store.selectedTask !== null) {
      setTaskId(store.selectedTask.id)
      await dispatch(addInvoice(invoiceData))

      await d
    }
  }, [store.selectedTask])

  useEffect(async () => {
    if (invoicestore.selectedInvoice !== null) {
      const invoice_items = []
      const temp = invoiceItems
      temp.forEach((obj) => {
        invoice_items = obj
        invoice_items['invoiceId'] = invoicestore.selectedInvoice.id
      })
      await dispatch(addInvoiceItems(invoice_items))
      const invoiceId = invoicestore.selectedInvoice.id
      await dispatch(updateInvocieId({taskId, invoiceId}))
    }
  }, [invoicestore.selectedInvoice])


  const onSubmit = async data => {
    console.log(data)
    console.log(invoiceData)

    const temp = data.invoiceItems
    setInvoiceItems(predata => ([...predata, ...temp]))
    delete data.invoiceItems

    await dispatch(addTask(data))
  }

  const getExemptionReason = () => {
    axios.post('/exemptionreasons/dropdown').then(response => {
      const arr = response.data
      setExemptionReasonOptions(arr.exemptionreasons)
    })
  }

  const getClients = () => {
    axios.post('/clients/dropdown').then(response => {
      const arr = response.data
      setClientOptions(arr.clients)
    })
  }

  const getServices = () => {
    axios.post('/services/dropdown').then(response => {
      const arr = response.data
      setServiceOptions(arr.services)
    })
  }

  const getTaxGroups = () => {
    axios.post('/taxgroups/dropdown').then(response => {
      const arr = response.data
      setTaxGroupOptions(arr.taxgroups)
    })
  }

  const getClientData = async (id) => {
    const res = await dispatch(getClient(id))
    setSelectedClient(res.payload)
  }

  const getTaxValue = (taxType) => {
    const data = {
      type: taxType
    }
    axios.post('/taxvalues/list', data).then(response => {
      const arr = response.data
      setTaxValues(arr.taxvalues)
    })

  }

  const addItem = (() => {
    append({ invoiceId: 0, organizationId: activeOrgId, serviceId: '', sacCode: '', actualPrice: 0, taxGroupId: '', subTotalAmount: 0, taxPrice: 0, description: '', isTaxApplicable: false })
  })

  const removeItem = ((val) => {
    remove(val)
  })

  const taxvaluefn = () => {
    let taxtype = 1
    if (activeOrg.stateid === selectedClient.placeofsupplyid) {
      taxtype = 2
    }

    getTaxValue(taxtype)

  }

  useEffect(() => {
    if (Object.keys(selectedClient).length > 0) {
      const Invoicedata = {}
      Invoicedata['billingAddressCity'] = selectedClient.billingaddresscity
      Invoicedata['billingAddressLine1'] = selectedClient.billingaddressline1
      Invoicedata['billingAddressLine2'] = selectedClient.billingaddressline1
      Invoicedata['billingAddressState'] = selectedClient.billingaddressstatesname
      Invoicedata['billingAddressZipCode'] = selectedClient.billingaddresszip
      Invoicedata['billingCurrencyId'] = parseInt(selectedClient.currencyid)
      Invoicedata['billingCurrencySymbol'] = selectedClient.currenciessymbol
      Invoicedata['billingCurrencyShortName'] = selectedClient.currenciescode
      Invoicedata['billingCurrencyName'] = selectedClient.currenciesname
      Invoicedata['contactEmail'] = selectedClient.email
      Invoicedata['gstin'] = selectedClient.gstin
      Invoicedata['isRcmApplicable'] = false
      Invoicedata['contactName'] = selectedClient.name
      Invoicedata['placeOfSupplyId'] = selectedClient.placeofsupplyid
      Invoicedata['contactId'] = selectedClient.id
      Invoicedata['organizationAddressLine1'] = activeOrg.addressline1
      Invoicedata['organizationAddressLine2'] = activeOrg.addressline2
      Invoicedata['organizationCity'] = activeOrg.organizationcity
      Invoicedata['organizationState'] = activeOrg.statename
      Invoicedata['organizationZipCode'] = activeOrg.pinzipcode
      Invoicedata['organizationName'] = activeOrg.name
      Invoicedata['organizationImageUrl'] = ''
      Invoicedata['organizationStateCode'] = activeOrg.stateshortname
      Invoicedata['organizationGstin'] = activeOrg.gstin

      setInvoiceData(Invoicedata)
      taxvaluefn()
    }

  }, [selectedClient])

  const loadItemData = (ind, desFlg = false, priceFlg = false, sacFlg = false, taxFlg = false, itemFlg = false) => {
    const eachObj = control._formValues.rows[ind]
    if (eachObj.serviceId === undefined || eachObj.serviceId === '') {
      return false
    }

    const selectedService = serviceOptions.find((a) => a.id === eachObj.serviceId)
    if (itemFlg) {
      eachObj['sacCode'] = selectedService.saccode
      eachObj['actualPrice'] = selectedService.sellingprice | 0
      eachObj['price'] = String(selectedService.sellingprice) | 0
      eachObj['taxGroupId'] = selectedService.taxgroupid
      eachObj['description'] = selectedService.description
      eachObj['exemptionReasonId'] = selectedService.exemptionreasonid
    } else {
      eachObj['sacCode'] = sacFlg ? eachObj.sacCode : selectedService.saccode
      eachObj['price'] = priceFlg ? eachObj.price : selectedService.sellingprice | 0
      eachObj['actualPrice'] = String(selectedService.sellingprice) | 0
      eachObj['taxGroupId'] = taxFlg ? eachObj.taxGroupId : selectedService.taxgroupid
      eachObj['description'] = desFlg ? eachObj.description : selectedService.description
      eachObj['exemptionReasonId'] = selectedService.exemptionreasonid
    }

    let calculateTaxAmount = 0
    const invoice_item_taxes = []

    const taxGroups = taxGroupOptions.find((a) => a.id === eachObj.taxGroupId)
    eachObj['isTaxApplicable'] = taxGroups !== undefined ? !taxGroups.nontaxableflag : selectedService.istaxapplicable

    if (eachObj.isTaxApplicable) {
      if (taxGroups !== undefined) {
        taxValues.forEach(obj => {
          if (obj.taxid === eachObj['taxGroupId']) {
            let temp = 0
            temp = calculateTax(eachObj.price, obj.percentage, 2)
            calculateTaxAmount = parseFloat(calculateTaxAmount) + parseFloat(temp)
            const dataTemp = {}
            dataTemp["taxName"] = `${obj.name} (${obj.percentage}%)`
            dataTemp["taxId"] = parseInt(obj.id)
            dataTemp["taxNameValue"] = obj.name
            dataTemp["taxPercentage"] = String(obj.percentage)
            dataTemp["taxAmount"] = String(temp)

            invoice_item_taxes.push(dataTemp)
          }
        })
      }
    }

    eachObj['subTotalAmount'] = String(parseFloat(parseFloat(calculateTaxAmount | 0) + parseFloat(eachObj.price | 0)).toFixed(2))
    eachObj['taxPrice'] = parseFloat(calculateTaxAmount).toFixed(2)
    eachObj['taxes'] = JSON.stringify(invoice_item_taxes)

    update(ind, eachObj)

    ItemFinalTotalAmount()

  }

  useEffect(() => {
    getClients()
    getServices()
    getTaxGroups()
    getExemptionReason()
  }, [])

  useEffect(() => {
    addItem()
  }, [])

  // handle onChange event of the dropdown
  const handleAssigneeChange = (e) => {
    const tempArr = Array.isArray(e) ? e.map(x => x.id) : []
    let reviewerOptions
    if (tempArr.length > 0) {
      reviewerOptions = userOptions.filter(({ id: id1 }) => !tempArr.some(id2 => id2 === id1))
    } else { reviewerOptions = userOptions }

    setReviewerUserOptions(reviewerOptions)
    setValue("assignee", tempArr)
  }

  const handleReviwerChange = (e) => {
    const tempArr = Array.isArray(e) ? e.map(x => x.id) : []
    let assigneeOptions
    if (tempArr.length > 0) {
      assigneeOptions = userOptions.filter(({ id: id1 }) => !tempArr.some(id2 => id2 === id1))
    } else { assigneeOptions = userOptions }

    setAssigneeUserOptions(assigneeOptions)
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
        {Object.keys(errors).map((obj, k) => {
          return <FormFeedback key={k}> {errors[k]?.message}</FormFeedback>
        })}
        <CardHeader>Add Task</CardHeader>
        {/* Header */}
        <CardBody className='pb-2 px-2'>
          <Row>
            <div className='col-lg-6 col-sm-12'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='clientId'>
                  Client
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="clientId"
                    id="clientId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.clientId })}
                        {...field}
                        classNamePrefix='select'
                        options={clientOptions}
                        value={clientOptions.find(c => { return c.id === value })}
                        onChange={val => { field.onChange(val.id); getClientData(val.id) }}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.clientId && <FormFeedback className='text-danger'>{errors.clientId?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='serviceId'>
                  Service
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="serviceId"
                    id="serviceId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.serviceId })}
                        {...field}
                        classNamePrefix='select'
                        options={serviceOptions}
                        value={serviceOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.serviceId && <FormFeedback className='text-danger'>{errors.serviceId?.message}</FormFeedback>}
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
                        options={assigneeUserOptions}
                        isMulti={true}
                        value={value} // set selected values
                        onChange={handleAssigneeChange}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
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
                        options={reviewerUserOptions}
                        isMulti={true}
                        value={value} // set selected values
                        onChange={handleReviwerChange}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.reviewer && <FormFeedback className='text-danger'>{errors.reviewer?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='startDate'>
                  Start Date
                </Label>
                <Col sm='9'>
                  <Controller
                    value={date}
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
                    options={{ dateFormat: "d-m-Y" }}
                    render={({ field }) => (
                      <Flatpickr
                        value={field.value}
                        onChange={(date, dateStr) => { field.onChange(dateStr) }}
                        options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                        className='form-control due-date-picker' />
                    )}
                  />

                  {errors.startDate && <FormFeedback className='text-danger'>{errors.startDate?.message}</FormFeedback>}
                </Col>
              </Row>

              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='endDate'>
                  End Date
                </Label>
                <Col sm='9'>
                  <Controller
                    value={date}
                    onChange={date => setDate(date)}
                    name="endDate"
                    control={control}
                    rules={{ required: true }}
                    options={{ dateFormat: "d-m-Y" }}
                    render={({ field }) => (
                      <Flatpickr
                        value={field.value}
                        onChange={(date, dateStr) => { field.onChange(dateStr) }}
                        options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                        className='form-control due-date-picker' />
                    )}
                  />

                  {errors.endDate && <FormFeedback className='text-danger'>{errors.endDate?.message}</FormFeedback>}
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
                        value={priorityOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
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
        <Row className='px-1 pb-2'>
          <div className='form-check form-check-primary mx-2'>
            <Controller
              control={control}
              name={`invoiceFlag`}
              rules={{ required: true }}
              render={({ field }) => (
                <Input className='form-check-input' type='checkbox' id='invoice_flag' {...field} onChange={() => setinvoiceFlag(!invoiceFlag)} />
              )}
            />
            <Label className='form-check-label' for='invoice_flag'>
              Create Proposal for this Task
            </Label>
          </div>
        </Row>
        {invoiceFlag && (
          <CardBody className='invoice-padding invoice-product-details'>
            {fields.map((item, index) => {
              return (
                <div key={item.rowid} className='repeater-wrapper'>
                  <Row>
                    <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                      <Row className='w-100 pe-lg-0 pe-1 py-2'>
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-4 col-sm-12'>
                          <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                          <Controller
                            control={control}
                            name={`rows[${index}].serviceId`}
                            rules={{ required: true }}
                            render={({ field, ref }) => (
                              <Select
                                {...field}
                                inputRef={ref}
                                className={classnames('react-select', { 'is-invalid': errors.rows?.[index]?.serviceId })}
                                classNamePrefix='select'
                                options={serviceOptions}
                                value={serviceOptions.find(c => c.id === field.value)}
                                onChange={val => { field.onChange(val.id); loadItemData(index, false, false, false, false, true) }}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                              />
                            )}
                          />
                          {errors.rows?.[index]?.serviceId && <FormFeedback>{errors.rows?.[index]?.serviceId.message}</FormFeedback>}
                          <Controller
                            id={`rows_${index}_description`}
                            name={`rows[${index}].description`}
                            control={control}
                            render={({ field }) => <Input className='mt-1' invalid={errors.rows?.[index]?.description && true} onInput={(val) => { field.onChange(val); loadItemData(index, true, false, false, false, false) }} {...field} />}
                          />
                        </Col>
                        <Col className='my-lg-0 my-2 col-lg-2 col-sm-12'>
                          <CardText className='col-title mb-md-2 mb-0'>SAC Code</CardText>
                          <Controller
                            id={`rows_${index}_sacCode`}
                            name={`rows[${index}].sacCode`}
                            control={control}
                            render={({ field }) => <Input type='text' invalid={errors.rows?.[index]?.sacCode && true} onInput={(val) => { field.onChange(val); loadItemData(index, false, true, true, false, false) }} {...field} />}
                          />
                          {errors.rows?.[index]?.sacCode && <FormFeedback>{errors.rows?.[index]?.sacCode.message}</FormFeedback>}
                        </Col>
                        <Col className='my-lg-0 my-2' lg='2' sm='12'>
                          <CardText className='col-title mb-md-2 mb-0'>Price</CardText>
                          <Controller
                            id={`rows_${index}_price`}
                            name={`rows[${index}].price`}
                            control={control}
                            render={({ field }) => <Input type='number' id={`input_rows_${index}_price`} onInput={(val) => { field.onChange(val); console.log(val); loadItemData(index, false, true, false, false, false) }} {...field} invalid={errors.rows?.[index]?.price && true} />}
                          />
                          {errors.rows?.[index]?.price && <FormFeedback>{errors.rows?.[index]?.price.message}</FormFeedback>}
                        </Col>
                        <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                          <CardText className='col-title mb-md-50 mb-0'>Tax Rate</CardText>
                          <Controller
                            control={control}
                            name={`rows[${index}].taxGroupId`}
                            rules={{ required: true }}
                            render={({ field, ref }) => (
                              <Select
                                {...field}
                                inputRef={ref}
                                className={classnames('react-select', { 'is-invalid': errors.rows?.[index]?.taxGroupId })}
                                classNamePrefix='select'
                                options={taxGroupOptions}
                                value={taxGroupOptions.find(c => c.id === field.value)}
                                onChange={(val) => { field.onChange(val.id); loadItemData(index, false, true, false, true, false) }}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                              />
                            )}
                          />
                          {errors.rows?.[index]?.taxGroupId && <FormFeedback>{errors.rows?.[index]?.taxGroupId.message}</FormFeedback>}
                          {
                            !item.isTaxApplicable && <Controller
                              control={control}
                              name={`rows[${index}].exemptionReasonId`}
                              rules={{ required: true }}
                              render={({ field, ref }) => (
                                <Select
                                  {...field}
                                  inputRef={ref}
                                  className={classnames('react-select mt-1', { 'is-invalid': errors.rows?.[index]?.taxGroupId })}
                                  classNamePrefix='select'
                                  options={exemptionReasonOptions}
                                  value={exemptionReasonOptions.find(c => c.id === field.value)}
                                  onChange={(val) => { field.onChange(val.id) }}
                                  getOptionLabel={(option) => option.name}
                                  getOptionValue={(option) => option.id}
                                />
                              )}
                            />
                          }

                        </Col>
                        <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                          <CardText className='col-title mb-md-50 mb-0'>Amount</CardText>
                          {item.subTotalAmount}
                        </Col>
                      </Row>
                      <div className='d-lg-flex justify-content-center border-start invoice-product-actions py-50 px-25'>
                        <X size={18} className='cursor-pointer' onClick={() => { removeItem(index) }} />
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            })}
            <Row className='mt-1'>
              <Col sm='12' className='px-0'>
                <Button color='primary' size='sm' className='btn-add-new' onClick={() => addItem()}>
                  <Plus size={14} className='me-25'></Plus> <span className='align-middle'>Add Item</span>
                </Button>
              </Col>
            </Row>
          </CardBody>
        )}
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
