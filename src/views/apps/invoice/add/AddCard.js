// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
import Flatpickr from 'react-flatpickr'
import { X, Plus, Hash } from 'react-feather'
import Select from 'react-select'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
// ** Reactstrap Imports
import { Row, Col, Card, Input, Label, Button, CardBody, CardText, InputGroup, InputGroupText, FormFeedback } from 'reactstrap'
import classnames from 'classnames'

import { addInvoice, addInvoiceTax, addInvoiceItems, addInvoiceItemTax, getClient } from '../store/index'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { activeOrganizationid } from '@src/helper/sassHelper'
import { calculateTax } from '../helper/hepler'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const activeOrgId = activeOrganizationid()

const AddCard = () => {

  const [clientOptions, setClientOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [stateOptions, setStateOptions] = useState([])

  const [finalTotal, setFinalTotal] = useState(0)
  const [finalSubTotal, setFinalSubTotal] = useState(0)

  const [invoiceItems, setInvoiceItems] = useState([])
  const [selectedClient, setSelectedClient] = useState({})

  const dispatch = useDispatch()

  const store = useSelector(state => state.invoice)
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

  const getStates = () => {
    axios.post('/states/list').then(response => {
      const arr = response.data
      setStateOptions(arr.states)
    })
  }

  const getTaxGroups = () => {
    axios.post('/taxgroups/dropdown').then(response => {
      const arr = response.data
      setTaxGroupOptions(arr.taxgroups)
    })
  }

  useEffect(() => {
    // ** Get Clients
    getClients()
    getServices()
    getTaxGroups()
    getStates()

  }, [])

  const getClientData = async (id) => {
    const res = await dispatch(getClient(id))
    setSelectedClient(res.payload)
  }

  const schema = yup.object().shape({
    contactId: yup.string().required("Please select a Client"),
    uniqueIdentity: yup.string(),
    contactEmail: yup.string(),
    // invoiceDate: yup.string(),
    // paymentDue: yup.string(),
    placeOfSupplyId: yup.string().required("Please select a Place Of Supply"),
    subTotalAmount: yup.number().min(1),
    totalAmount: yup.number().min(1),
    totalTaxAmount: yup.number().min(1),
    organizationId: yup.number().default(activeOrgId),
    isRcmApplicable: yup.boolean().default(true),
    dueAmount: yup.number().min(1),
    billingAddressLine1: yup.string(),
    billingAddressLine2: yup.string(),
    billingAddressState: yup.string(),
    billingAddressCity: yup.string(),
    billingAddressZipCode: yup.string(),
    billingCurrencyId: yup.string(),
    bankAccountBankName: yup.string(),
    bankAccountBranchName: yup.string(),
    bankAccountHolderName: yup.string(),
    bankAccountId: yup.string(),
    bankAccountIfscCode: yup.string(),
    bankAccountNumber: yup.string(),
    contactEmail: yup.string(),
    gstin: yup.string(),
    note: yup.string(),
    status: yup.number().default(1),
    paymentStatus: yup.number().default(11),
    invoiceItems: yup.array().of(
      yup.object().shape({
        serviceId: yup.string().required("Please Select Service Item"),
        sacCode: yup.string(),
        price: yup.string(),
        organization_id: yup.string().default(activeOrgId),
        exemption_reason_id: yup.string(),
        actualPrice: yup.number().positive("Must be more than 0").required(),
        taxGroupId: yup.string().required("Pleace Select Tax"),
        totalAmount: yup.number().min(1)
      })
    )
  })

  const { handleSubmit, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const { fields, append, remove, update } = useFieldArray({ control, name: 'invoiceItems' })

  const onSubmit = async data => {
    const temp = data.invoiceItems
    setInvoiceItems(predata => ([...predata, ...temp]))
    delete data.invoiceItems
    console.log(invoiceItems)
    await dispatch(addInvoice(data))

  }

  const InvoiceTax = async () => {
    await dispatch(addInvoiceTax)
  }

  const InvoiceItems = async () => {
    await dispatch(addInvoiceItems)
  }

  const InvoiceItemTax = async () => {
    await dispatch(addInvoiceItemTax)
  }

  const addItem = (() => {
    append({ invoiceId: 0, serviceId: '', sacCode: '', actualPrice: 0, taxGroupId: '', totalAmount: 0, taxPrice: 0, description: '' })
  })

  useEffect(() => {
    addItem()
  }, [])

  useEffect(() => {
    if (Object.keys(selectedClient).length > 0) {
      setValue('billingAddressCity', selectedClient.billingaddresscity)
      setValue('billingAddressLine1', selectedClient.billingaddressline1)
      setValue('billingAddressLine2', selectedClient.billingaddressline1)
      setValue('billingAddressState', selectedClient.billingaddressstatesname)
      setValue('billingAddressZipCode', selectedClient.billingaddresszip)
      setValue('billingCurrencyId', selectedClient.currencyid)
      setValue('contactEmail', selectedClient.email)
      setValue('gstin', selectedClient.gstin)
      setValue('placeOfSupplyId', selectedClient.placeofsupplyid)
    }

  }, [selectedClient])

  useEffect(async () => {

    if (store.invoiceId !== null) {
      await InvoiceTax()
      await InvoiceItems()
      await InvoiceItemTax()
    }
  }, [store.invoiceId])

  const ItemFinalTotalAmount = () => {

    const items = control._formValues.invoiceItems
    let finalTotal = 0
    let finalsubTotalAmount = 0
    let finalTaxAmount = 0
    items.forEach(obj => {
      finalTotal = parseFloat(obj.totalAmount) + parseFloat(finalTotal)
      finalsubTotalAmount = parseFloat(obj.actualPrice) + parseFloat(finalsubTotalAmount)
      finalTaxAmount = parseFloat(finalTaxAmount) + parseFloat(obj.taxPrice)
    })

    control._formValues.subTotalAmount = finalsubTotalAmount
    control._formValues.totalAmount = finalTotal
    control._formValues.dueAmount = finalTotal
    control._formValues.totalTaxAmount = finalTaxAmount


    setFinalTotal(finalTotal)
    setFinalSubTotal(finalsubTotalAmount)
  }

  const removeItem = ((ind) => {
    remove(ind)

    ItemFinalTotalAmount()
  })

  const loadItemData = (ind, desFlg = false, priceFlg = false, sacFlg = false, taxFlg = false) => {
    const eachObj = control._formValues.invoiceItems[ind]

    if (eachObj.serviceId === undefined || eachObj.serviceId === '') {
      return false
    }
    const selectedService = serviceOptions.find((a) => a.id === eachObj.serviceId)

    eachObj['sacCode'] = sacFlg ? eachObj.sacCode : selectedService.saccode
    eachObj['actualPrice'] = priceFlg ? eachObj.actualPrice : selectedService.sellingprice | 0
    eachObj['taxGroupId'] = taxFlg ? eachObj.taxGroupId : selectedService.taxgroupid
    eachObj['description'] = desFlg ? eachObj.description : selectedService.description

    let calculateTaxAmount = 0
    const taxGroups = taxGroupOptions.find((a) => a.id === eachObj.taxGroupId)
    if (taxGroups !== undefined) {
      calculateTaxAmount = calculateTax(eachObj.actualPrice, 18, 2)
    }

    eachObj['totalAmount'] = parseFloat(calculateTaxAmount + eachObj.actualPrice).toFixed(2)
    eachObj['taxPrice'] = parseFloat(calculateTaxAmount).toFixed(2)

    update(ind, eachObj)

    ItemFinalTotalAmount()

  }

  const renderError = () => {
    const keys = Object.keys(errors)
    const ErrorsText = []
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        if (key !== 'invoiceItems') {
          ErrorsText.push(<FormFeedback key={key}>${errors[key]?.message}</FormFeedback>)
        } else {
          console.log(errors[key])
        }
      })
    }

    return ErrorsText

  }

  const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'

  return (


    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className='invoice-add'>
        <Fragment>
          <Col xl={10} md={8} sm={12}>

            <Card className='invoice-preview-card'>

              {/* Header */}
              <CardBody className='invoice-padding pb-0'>
                {
                  renderError()
                }
                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                  <div>
                    <div className='logo-wrapper'>

                      <h3 className='text-primary invoice-logo'>Vuexy</h3>
                    </div>
                    <p className='card-text mb-25'>Office 149, 450 South Brand Brooklyn</p>
                    <p className='card-text mb-25'>San Diego County, CA 91905, USA</p>
                    <p className='card-text mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</p>
                  </div>
                  <div className='invoice-number-date mt-md-0 mt-2'>
                    <div className='d-flex align-items-center justify-content-md-end mb-1'>
                      <h4 className='invoice-title'>Invoice</h4>
                      <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                        <InputGroupText>
                          <Hash size={15} />
                        </InputGroupText>
                        <Input
                          type='number'
                          className='invoice-edit-input'
                          value={3171}
                          placeholder='53634'
                          disabled
                        />
                      </InputGroup>
                    </div>
                    <div className='d-flex align-items-center mb-1'>
                      <span className='title'>Date:</span>
                      <Controller
                        control={control}
                        name={`invoiceDate`}
                        id='invoiceDate'
                        render={({ field }) => (
                          <Flatpickr
                            value={field.value}
                            onChange={date => field.onChange(date)}
                            className='form-control invoice-edit-input date-picker'
                          />
                        )}
                      />
                    </div>
                    <div className='d-flex align-items-center'>
                      <span className='title'>Due Date:</span>
                      <Controller
                        control={control}
                        name={`paymentDue`}
                        id='paymentDue'
                        render={({ field }) => (
                          <Flatpickr
                            value={field.value}
                            onChange={date => field.onChange(date)}
                            className='form-control invoice-edit-input due-date-picker'
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
              {/* /Header */}

              <hr className='invoice-spacing' />

              {/* Address and Contact */}
              <CardBody className='invoice-padding pt-0'>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to ps-0' xl='8'>
                    <h6 className='invoice-to-title'>Invoice To:</h6>
                    <div className='invoice-customer'>
                      <Controller
                        control={control}
                        name={`contactId`}
                        id={`contactId`}
                        render={({ field, ref }) => (
                          <Select
                            inputRef={ref}
                            className={classnames('react-select', { 'is-invalid': errors['contactId'] })}
                            {...field}
                            classNamePrefix='select'
                            options={clientOptions}
                            value={clientOptions.find(c => { return c.id === field.value })}
                            onChange={val => { field.onChange(val.id); getClientData(val.id) }}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                          />
                        )}
                      />
                    </div>
                    <Col className='pe-0 mt-xl-2' xl='4'>
                      <table>
                        <tbody>
                          <tr>
                            <td>{selectedClient.billingaddressline1}</td>
                          </tr>
                          <tr>
                            <td>{selectedClient.billingaddressline2}</td>
                          </tr>
                          <tr>
                            <td>{selectedClient.billingaddresscity} {selectedClient.billingaddresszip && `-`}  {selectedClient.billingaddresszip}</td>
                          </tr>
                          <tr>
                            <td>{selectedClient.billingaddressstatesname}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Col>
                  <Col className='pe-0 mt-xl-0 mt-2' xl='4'>
                    <h6 className='mb-2'>Payment Details:</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td className='pe-1'>Bank Name:</td>
                          <td>
                            <span className='fw-bolder'>$12,110.55</span>
                          </td>
                        </tr>
                        <tr>
                          <td className='pe-1'>Account name:</td>
                          <td>American Bank</td>
                        </tr>
                        <tr>
                          <td className='pe-1'>Branch Name:</td>
                          <td>United States</td>
                        </tr>
                        <tr>
                          <td className='pe-1'>IFSC Code:</td>
                          <td>ETD95476213874685</td>
                        </tr>
                        <tr>
                          <td className='pe-1'>Currency code:</td>
                          <td>BR91905</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Row className='row-bill-to invoice-spacing'>
                  <Col className='col-bill-to ps-0' xl='8'>
                    <h6 className='invoice-to-title mt-2'>Place Of Supply:</h6>
                    <div className='invoice-customer'>
                      <Controller
                        control={control}
                        name={`placeOfSupplyId`}
                        id={`placeOfSupplyId`}
                        render={({ field, ref }) => (
                          <Select
                            inputRef={ref}
                            className={classnames('react-select', { 'is-invalid': errors['placeOfSupplyId'] })}
                            {...field}
                            classNamePrefix='select'
                            options={stateOptions}
                            value={stateOptions.find(c => { return c.id === field.value })}
                            onChange={val => { return field.onChange(val.id) }}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                          />
                        )}
                      />
                    </div>
                    {(selectedClient.gstin !== '' && selectedClient.gstin !== undefined) && <div className='mt-1'> GSTIN : {selectedClient.gstin}</div>}
                  </Col>
                  <Col className='pe-0 mt-xl-0 mt-2' xl='4'>
                    <table>
                      <tbody>
                        <tr>
                          <td className='pe-1'>RCM Applicable:</td>
                          <td>
                            <div className='form-switch form-check-success'>
                              <Controller
                                control={control}
                                name={`isRcmApplicable`}
                                id='isRcmApplicable'
                                render={({ }) => (
                                  <Input type='switch' id='switch-success' defaultChecked />
                                )}
                              />
                            </div></td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
              {/* /Address and Contact */}

              {/* Product Details */}
              <CardBody className='invoice-padding invoice-product-details'>
                {fields.map((item, index) => {
                  return (
                    <div key={item.id} className='repeater-wrapper'>
                      <Row>
                        <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                          <Row className='w-100 pe-lg-0 pe-1 py-2'>
                            <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-4 col-sm-12'>
                              <CardText className='col-title mb-md-50 mb-0'>Item</CardText>
                              <Controller
                                control={control}
                                defaultValue={`${item.serviceId}`}
                                name={`invoiceItems[${index}].serviceId`}
                                rules={{ required: true }}
                                render={({ field, ref }) => (
                                  <Select
                                    {...field}
                                    inputRef={ref}
                                    className={classnames('react-select', { 'is-invalid': errors.invoiceItems?.[index]?.serviceId })}
                                    classNamePrefix='select'
                                    options={serviceOptions}
                                    value={serviceOptions.find(c => c.id === field.value)}
                                    onChange={val => { field.onChange(val.id) }}
                                    onClick={() => { loadItemData(index, false, false, false, false) }}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                  />
                                )}
                              />
                              {errors.invoiceItems?.[index]?.serviceId && <FormFeedback>{errors.invoiceItems?.[index]?.serviceId.message}</FormFeedback>}
                              <Controller
                                id={`invoiceItems_${index}_description`}
                                defaultValue={`${item.description}`}
                                name={`invoiceItems[${index}].description`}
                                control={control}
                                render={({ field }) => <Input className='mt-1' invalid={errors.invoiceItems?.[index]?.description && true} onClick={() => { loadItemData(index, true, false, false, false) }} {...field} />}
                              />
                            </Col>
                            <Col className='my-lg-0 my-2 col-lg-2 col-sm-12'>
                              <CardText className='col-title mb-md-2 mb-0'>SAC Code</CardText>
                              <Controller
                                id={`invoiceItems_${index}_sacCode`}
                                defaultValue={`${item.sacCode}`}
                                name={`invoiceItems[${index}].sacCode`}
                                control={control}
                                render={({ field }) => <Input type='text' invalid={errors.invoiceItems?.[index]?.sacCode && true} onClick={() => loadItemData(index, false, true, false, false)} {...field} />}
                              />
                              {errors.invoiceItems?.[index]?.sacCode && <FormFeedback>{errors.invoiceItems?.[index]?.sacCode.message}</FormFeedback>}
                            </Col>
                            <Col className='my-lg-0 my-2' lg='2' sm='12'>
                              <CardText className='col-title mb-md-2 mb-0'>Price</CardText>
                              <Controller
                                defaultValue={item.actualPrice}
                                id={`invoiceItems_${index}_price`}
                                name={`invoiceItems[${index}].actualPrice`}
                                control={control}
                                render={({ field }) => <Input type='number' invalid={errors.invoiceItems?.[index]?.actualPrice && true} onClick={() => { loadItemData(index, false, false, true, false) }} {...field} />}
                              />
                              {errors.invoiceItems?.[index]?.actualPrice && <FormFeedback>{errors.invoiceItems?.[index]?.actualPrice.message}</FormFeedback>}
                            </Col>
                            <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                              <CardText className='col-title mb-md-50 mb-0'>Tax Rate</CardText>
                              <Controller
                                control={control}
                                defaultValue={item.taxGroupId}
                                name={`invoiceItems[${index}].taxGroupId`}
                                rules={{ required: true }}
                                render={({ field, ref }) => (
                                  <Select
                                    {...field}
                                    inputRef={ref}
                                    className={classnames('react-select', { 'is-invalid': errors.invoiceItems?.[index]?.taxGroupId })}
                                    classNamePrefix='select'
                                    options={taxGroupOptions}
                                    value={taxGroupOptions.find(c => c.id === field.value)}
                                    onChange={(val) => { field.onChange(val.id) }}
                                    onClick={() => loadItemData(index, false, false, false, true)}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                  />
                                )}
                              />
                              {errors.invoiceItems?.[index]?.taxGroupId && <FormFeedback>{errors.invoiceItems?.[index]?.taxGroupId.message}</FormFeedback>}
                            </Col>
                            <Col className='my-lg-0 mt-2' lg='1' sm='12'>
                              <CardText className='col-title mb-md-50 mb-0'>Amount</CardText>
                              {item.totalAmount}
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

              {/* /Product Details */}

              {/* Invoice Total */}
              <CardBody className='invoice-padding'>
                <Row className='invoice-sales-total-wrapper'>
                  <Col className='mt-md-0 mt-3' md={{ size: '6', order: 1 }} xs={{ size: 12, order: 2 }}>

                  </Col>
                  <Col className='d-flex justify-content-end' md={{ size: '6', order: 2 }} xs={{ size: 12, order: 1 }}>
                    <div className='invoice-total-wrapper'>
                      <div className='invoice-total-item'>
                        <p className='invoice-total-title'>Pre Tax Amount:</p>
                        <p className='invoice-total-amount'>{finalSubTotal}</p>
                      </div>
                      <div className='invoice-total-item'>
                        <p className='invoice-total-title'>Tax:</p>
                        <p className='invoice-total-amount'>21%</p>
                      </div>
                      <hr className='my-50' />
                      <div className='invoice-total-item'>
                        <p className='invoice-total-title'>Total Payable:</p>
                        <p className='invoice-total-amount'>{finalTotal}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* /Invoice Total */}

              <hr className='invoice-spacing mt-0' />

              {/* Invoice Note */}
              <CardBody className='invoice-padding py-0'>
                <Row>
                  <Col>
                    <div className='mb-2'>
                      <Label for='note' className='form-label fw-bold'>
                        Note:
                      </Label>
                      <Input type='textarea' rows='2' id='note' defaultValue={note} />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* /Invoice Note */}
            </Card>

          </Col>
          <Col xl={2} md={4} sm={12}>
            <Card className='invoice-action-wrapper'>
              <CardBody>
                {/* <Button color='primary' block className='mb-75' disabled>
            Send Invoice
          </Button>
          <Button tag={Link} to='/invoice/preview' color='primary' block outline className='mb-75'>
            Preview
          </Button> */}
                <Button color='primary' type='submit' block outline className='mb-75'>
                  Save
                </Button>
                <Button color='warning' block outline tag={Link} to='/invoice/list'>
                  Cancel
                </Button>
              </CardBody>
            </Card>
            <div className='mt-2'>
              <div className='invoice-payment-option'>
                <p className='mb-50'>Accept payments via</p>
                <Input type='select' id='payment-select'>
                  <option>Cash</option>
                  <option>HDFC XXXX0172</option>
                  <option>SBI XXXX4412</option>
                  <option>IOB XXXX3212</option>
                </Input>
              </div>
            </div>
          </Col>
        </Fragment >
      </Row>
    </form >
  )
}

export default AddCard
