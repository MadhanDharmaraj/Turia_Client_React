// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
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
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { getData, addAccount, updateAccount, deleteAccount } from './store/leavesettings'
import { activeOrganizationid } from '@src/helper/sassHelper'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const activeOrgId = activeOrganizationid()

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
    name: yup.string().required('Please Enter Name'),
    date: yup.string().required('Please Select Date'),
    comments: yup.string().nullable(),
    status: yup.boolean().default(true)
  })

  const { handleSubmit, formState: { errors }, control, reset } = useForm({
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

  const getRow = (fieldLabel, fieldName, reqflag = true) => {
    return (
      <Col md={12}>
        <Label sm='12' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col>
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input invalid={errors[fieldName] && true} {...field} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Col>
    )
  }

  const openEditModal = card => {
    setSelected(card)
    reset({
      name: card.name,
      date: card.date,
      id : card.id,
      comments: card.comments,
      status: card.status
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

                {getRow('Name', 'name', true)}

                <Col md={12}>
                  <Label className='form-label required' for='comments'>
                    Date
                  </Label>
                  <Controller
                    control={control}
                    name={`date`}
                    id='date'
                    render={({ field }) => (
                      <Flatpickr
                        value={field.value}
                        onChange={(date, dateStr) => { field.onChange(dateStr) }}
                        options={{ altInput: true, altFormat: "M j, Y", dateFormat: "U" }}
                        className='form-control invoice-edit-input date-picker'
                      />
                    )}
                  />
                  {errors.date && <FormFeedback>{errors.Date.message}</FormFeedback>}

                </Col>

                <Col md={12}>
                  <Label className='form-label' for='comments'>
                    Comments
                  </Label>
                  <Controller
                    id='comments'
                    name='comments'
                    control={control}
                    render={({ field }) => <Input type="textarea" invalid={errors.comments && true} {...field} />}
                  />
                  {errors.comments && <FormFeedback>{errors.comments.message}</FormFeedback>}

                </Col>

                <Col md={3}>
                  <Row className='form-switch form-check-success px-0'>
                    <Label className='form-label' for='status'>
                      Enabled?
                    </Label>
                    <Controller
                      id='status'
                      name='status'
                      control={control}
                      render={({ field }) => <Input type="switch" invalid={errors.status && true} onInput={(val) => field.onChange(val)} {...field} />}
                    />
                  </Row>
                </Col>

                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>

              </Row>
            </Col>
            <Col lg='6' className='mt-2 mt-lg-0'>
              <h6 className='fw-bolder mb-2'>Holidays</h6>
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
