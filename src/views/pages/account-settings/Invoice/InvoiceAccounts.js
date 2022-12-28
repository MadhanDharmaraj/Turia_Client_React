// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  FormFeedback
} from 'reactstrap'
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { getData, addAccount, updateAccount, deleteAccount } from './store/invoiceaccount'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
// ** Third Party Components
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

const InvoiceAccounts = (tabId) => {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  const store = useSelector(state => state.invoiceaccount)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    bankName: yup.string().required('Please Enter Bank Name'),
    accountBusinessName: yup.string().required('Please Enter Account Name'),
    ifscCode: yup.string().required('Please IFSC Code'),
    accountNumber: yup.string().required('Please Enter Account Number'),
    branchAddress: yup.string().required('Please Enter Branch Name'),
    accountType: yup.string().required('Please Select Account Type'),
    description: yup.string(),
    transactionAccountTypeId: yup.string().default(2),
    isPrimary: yup.boolean().default(false),
    bankCode: yup.string().default('1'),
    accountHolderName: yup.string(),
    updatedBy: yup.string().default(userId),
    createdBy: yup.string().default(userId)
  })

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const deletefn = (id) => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.value) {
        await dispatch(deleteAccount(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Account has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        return true
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        return false
      }
    })
  }

  const onSubmit = async data => {
    if (selected !== null) {
      await dispatch(updateAccount(data))
      reset({})
      setSelected(null)
    } else {
      await dispatch(addAccount(data))
      reset({})
    }

  }

  useEffect(async () => {
    if (tabId.data === 'invoiceaccount') {
      await dispatch(getData())
    }

  }, [tabId])

  useEffect(() => {
    setData(store.data)
  }, [store.data])

  const formatAccountName = () => {
    const name = control._formValues.bankName
    const num = control._formValues.accountNumber
    if (num) {
      const temp = `${name} - XXXX${num.substr(-4, 4)}`
      setValue('accountHolderName', temp)
    }

  }

  const accountTypeOptions = [{ id: 1, name: "Savings" }, { id: 2, name: "Current" }]

  const getRow = (fieldLabel, fieldName, reqflag = true) => {
    return (
      <Col md={6}>
        <Label sm='12' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col>
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input invalid={errors[fieldName] && true} {...field}
              onInput={() => { if (fieldName === 'bankName' || fieldName === 'accountNumber') { formatAccountName() } }} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Col>
    )
  }

  const getSelectRow = (fieldLabel, fieldName, options, reqflag = false) => {
    return (

      <Col md={6}>
        <Label sm='12' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName} >
          {fieldLabel}
        </Label>
        <Col>
          <Controller
            control={control}
            name={fieldName}
            id={fieldName}
            render={({ field, ref }) => (
              <Select
                inputRef={ref}
                className={classnames('react-select', { 'is-invalid': errors[fieldName] })}
                {...field}
                classNamePrefix='select'
                options={options}
                value={options.find(c => { return c.id === field.value })}
                onChange={val => { return field.onChange(val.id) }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}

          />
          {errors[fieldName] && <FormFeedback className='text-danger'>{errors[fieldName]?.message}</FormFeedback>}
        </Col>
      </Col>

    )
  }

  const openEditModal = card => {
    setSelected(card)
    reset({
      organizationId: activeOrgId,
      bankName: card.bankName,
      id: card.id,
      accountBusinessName: card.accountBusinessName,
      ifscCode: card.ifscCode,
      accountNumber: card.accountNumber,
      branchAddress: card.branchAddress,
      accountType: parseInt(card.accountType),
      description: card.description,
      transactionAccountTypeId: card.transactionAccountTypeId,
      isPrimary: card.isPrimary,
      bankCode: card.bankCode,
      accountHolderName: card.accountHolderName
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody className='py-25'>
          <Row className='gx-4'>
            <Col lg='6'>
              {
                Object.keys(errors).map((key) => {

                  return <FormFeedback key={key}>${errors[key]?.message}</FormFeedback>

                })
              }
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>

                {getRow('Bank Name', 'bankName')}
                {getRow('Account Name', 'accountBusinessName')}
                {getRow('Account Number', 'accountNumber')}
                {getRow('IFSC Code', 'ifscCode')}
                {getRow('Branch Name', 'branchAddress')}

                {getSelectRow('Account Type', 'accountType', accountTypeOptions, true)}

                <Col md={12}>
                  <Label className='form-label' for='description'>
                    description
                  </Label>
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    render={({ field }) => <Input type="textarea" invalid={errors.description && true} {...field} />}
                  />
                  {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}

                </Col>


                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>

              </Row>
            </Col>
            <Col lg='6' className='mt-2 mt-lg-0'>
              <h6 className='fw-bolder mb-2'>My Accounts</h6>
              <div className='added-cards'>
                {data.map((card, index) => {
                  return (
                    <div
                      key={index}
                      className={classnames('cardMaster rounded border p-2')}
                    >
                      <div className='d-flex justify-content-between flex-sm-row flex-column'>
                        <div className='card-information'>
                          <h5 className='text-primary'>{card.bankName}</h5>
                          <div className='d-flex align-items-center mb-50'>
                            <h6 className='mb-0'>{card.accountBusinessName}</h6>
                            {index === 0 && (
                              <Badge color='light-primary' className='ms-50'>
                                Primary
                              </Badge>
                            )}
                          </div>
                          <span className='card-number '>
                            {card.accountHolderName}
                          </span>
                        </div>
                        <div className='d-flex flex-column text-start text-lg-end'>
                          <div className='d-flex order-sm-0 order-1 mt-1 mt-sm-0'>
                            <Button outline color='primary' className='me-75' onClick={() => openEditModal(card)}>
                              Edit
                            </Button>
                            {!card.isPrimary &&
                              <Button outline onClick={() => { deletefn(card.id) }}>Delete</Button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default InvoiceAccounts
