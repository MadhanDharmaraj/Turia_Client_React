// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classnames from 'classnames'
// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import Select from 'react-select'
import { DSCList, addDsc } from '../store/index'
import { useForm, useFieldArray, Controller } from "react-hook-form"
//import moment from 'moment'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Reactstrap Imports
import { Row, Col, Card, Label, Button, CardBody, CardText, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useDispatch, useSelector } from 'react-redux'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const AddCard = () => {

  const phoneRegExp = /^[0-9\- ]{10,10}$/
  const dispatch = useDispatch()
  const store = useSelector(state => state.digitalsignature)
  const navigate = useNavigate()
  const [clientId, setClientId] = useState(null)
  const schema = yup.object().shape({
    clientId: yup.string().required("Please select a Client"),
    rows: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        createdBy: yup.string().default(userId),
        organizationId: yup.string().default(activeOrgId),
        email: yup.string().email().required("Please Enter Email"),
        contact: yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
        issuedDate: yup.number().required("Please Enter Issued Date"),
        expiryDate: yup.number().required("Please Enter Expiry Date"),
        password: yup.string().min(5, "Password length should be 5 or above.")
      })
    )
  })

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  //const [date, setDate] = useState("")
  const [clientOptions, setClientOptions] = useState([])
  const { fields, append, remove } = useFieldArray({ name: 'rows', keyName: 'rowid', control })
  const onSubmit = async data => {
    console.log(data)
    await dispatch(addDsc(data))
    navigate('/digital-signature/list')

  }

  const addItem = (() => {
    append({ clientId: '', name: '', email: '', contact: '', issuedDate: '', expiryDate: '', password: '' })

    control._formValues.rows.forEach((obj, key) => {
      control._formValues.rows[key].clientId = clientId
    })
    console.log(control._formValues.rows)

  })

  const removeItem = (ind) => {
    remove(ind)
  }

  // const compareDate = (fie) => {

  //   console.log(fie)
  //   // if (control._formValues.rows[ind].issuedDate !== '' && control._formValues.rows[ind].expiryDate !== '') {
  //   //   const issDate = control._formValues.rows[ind].issuedDate[0]
  //   //   const expDate = control._formValues.rows[ind].expiryDate[0]

  //   //   if (expDate < issDate) {
  //   //     console.log('Success Date')
  //   //   }
  // }

  const getClientList = () => {
    axios.post('/clients/dropdown').then(response => {
      const arr = response.data
      setClientOptions(arr.clients)
    })
  }

  const getClientInfo = async (id) => {
    setClientId(id)
    remove()
    await dispatch(DSCList(id))
  }

  useEffect(() => {
    store.DSCLists.forEach((obj) => {
      const data = {}

      data['name'] = obj.name
      data['createdBy'] = userId
      data['email'] = obj.email
      data['organizationId'] = activeOrgId
      data['clientId'] = clientId
      data['contact'] = obj.contact
      data['issuedDate'] = obj.issuedDate | null
      data['expiryDate'] = obj.expiryDate | null
      data['password'] = obj.password | ''

      append(data)
    })

  }, [store.DSCLists])

  useEffect(() => {
    getClientList()
    addItem()
  }, [])

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='clientId'>
                  Client
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="clientId"
                    id="clientId"
                    render={({ field, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.clientId })}
                        classNamePrefix='select'
                        options={clientOptions}
                        value={clientOptions.find(c => { return c.id === field.value })}
                        onChange={(val) => { field.onChange(val.id); getClientInfo(val.id) }}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}
                  />
                  {errors.clientId && <FormFeedback className='text-danger'>{errors.clientId?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
        <CardBody className='invoice-padding invoice-product-details'>
          {fields.map((item, i) => (
            <div key={item.rowid} className='repeater-wrapper'>
              <Row >
                <Col className='d-lg-flex product-details-border position-relative pe-0' sm='12'>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                    <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Name</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_name'
                        name={`rows[${i}].name`}
                        render={({ field }) => (
                          <Input type='text' invalid={errors.rows?.[i]?.name && true} {...field} />
                        )}
                      />
                      {errors.rows?.[i]?.name && <FormFeedback>{errors.rows?.[i]?.name.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2 col-lg-2 col-sm-12'>
                      <CardText className='col-title mb-md-50 mb-0'>Email</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_email'
                        name={`rows[${i}].email`}
                        render={({ field }) => (
                          <Input type='email' invalid={errors.rows?.[i]?.email && true} {...field} />
                        )}
                      />
                      {errors.rows?.[i]?.email && <FormFeedback>{errors.rows?.[i]?.email.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 my-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Mobile</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_contactNumber'
                        name={`rows[${i}].contact`}
                        render={({ field }) => (
                          <Input type='number'invalid={errors.rows?.[i]?.contact && true} {...field} />
                        )}
                      />
                      {errors.rows?.[i]?.contact && <FormFeedback>{errors.rows?.[i]?.contact.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Issued Date</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_issuedDate'
                        name={`rows[${i}].issuedDate`}
                        render={({ field }) => (
                          <Flatpickr
                            value={field.value}
                            onChange={(date, dateStr) => { field.onChange(dateStr) }}
                            options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                            className='form-control invoice-edit-input date-picker'
                          />
                        )}
                      />
                      {errors.rows?.[i]?.issuedDate && <FormFeedback>{errors.rows?.[i]?.issuedDate.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Expiry Date</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_expiryDate'
                        name={`rows[${i}].expiryDate`}
                        render={({ field }) => (
                          <Flatpickr
                            value={field.value}
                            onChange={(date, dateStr) => { field.onChange(dateStr) }}
                            options={{ altInput: true, altFormat: "F j, Y", dateFormat: "U" }}
                            className='form-control invoice-edit-input date-picker'
                          />
                        )}
                      />
                      {errors.rows?.[i]?.expiryDate && <FormFeedback>{errors.rows?.[i]?.expiryDate.message}</FormFeedback>}
                    </Col>
                    <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                      <CardText className='col-title mb-md-50 mb-0'>Password</CardText>
                      <Controller
                        control={control}
                        id='dsc_list_password'
                        name={`rows[${i}].password`}
                        render={({ field }) => (
                          <Input type='text' invalid={errors.rows?.[i]?.password && true} {...field} />
                        )}
                      />
                      {errors.rows?.[i]?.password && <FormFeedback>{errors.rows?.[i]?.password.message}</FormFeedback>}
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
