// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
// ** Reactstrap Imports
import axios from '@src/configs/axios/axiosConfig'
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
import { getData, addLeaveTypes, updateLeaveTypes, deleteLeaveTypes } from './store/leavesettings'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
// ** Third Party Components
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

const leaveTypeOptions = [{ id: '1', name: "Paid" }, { id: 2, name: 'Non Paid' }]

const LeaveTypes = (tabId) => {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)
  const [designationOptions, setDesignationOptions] = useState([])

  const store = useSelector(state => state.leavesettings)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    name: yup.string().required('Please Enter Name'),
    daysCount: yup.string().required('Please Select Date'),
    leaveTpe: yup.string().nullable(),
    status: yup.boolean().default(true),
    updatedBy: yup.string().default(userId),
    createdBy: yup.string().default(userId)
  })

  const { handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const getDesignation = () => {
    axios.post('/designations/dropdown').
      then((res) => {
        setDesignationOptions(res.data.designations)
      }).catch(() => { })
  }

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
        await dispatch(deleteLeaveTypes(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'LeaveTypes has been deleted.',
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
      await dispatch(updateLeaveTypes(data))
      reset({})
      setSelected(null)
    } else {
      await dispatch(addLeaveTypes(data))
      reset({})
    }

  }

  useEffect(() => {
    getDesignation()
  }, [])

  useEffect(async () => {
    if (tabId.data === 'leave') {
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


  const getSelectRow = (fieldLabel, fieldName, options, reqflag = false) => {
    return (

      <Col md={12}>
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
      name: card.name,
      daysCount: card.dayscount,
      id: card.id,
      leaveType: card.leavetype,
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

                {getSelectRow('Leave Type', 'leaveType', leaveTypeOptions, true)}

                {getRow('No of Days', 'daysCount', true)}

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

                <Col md={12}>
                  <Label sm='12' className={classnames(`form-label required`)} for={`designations`} >
                    Applicable Designation
                  </Label>
                  <Col>
                    <Controller
                      control={control}
                      name={`designations`}
                      id={`designations`}
                      render={({ field, ref }) => (
                        <Select
                          inputRef={ref}
                          className={classnames('react-select', { 'is-invalid': errors['designations'] })}
                          {...field}
                          isMulti
                          classNamePrefix='select'
                          options={designationOptions}
                          value={designationOptions.find(c => { return c.id === field.value })}
                          onChange={val => { return field.onChange(val.id) }}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                        />
                      )}

                    />
                    {errors['designations'] && <FormFeedback className='text-danger'>{errors['designations']?.message}</FormFeedback>}
                  </Col>
                </Col>

                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col lg='6' className='mt-2 mt-lg-0'>
              <h6 className='fw-bolder'>Leave Settings</h6>
              <div className='demo-inline-spacing'>
                <div className='form-check form-switch'>
                  <Input type='switch' name='customSwitch' id='exampleCustomSwitch' />
                  <Label for='exampleCustomSwitch' className='form-check-label'>
                    Exclude Weekend for Leave Calculation
                  </Label>
                </div>
                <div className='form-check form-switch'>
                  <Input type='switch' name='customSwitchDisabled' id='exampleCustomSwitchDisabled' />
                  <Label for='exampleCustomSwitchDisabled' className='form-check-label'>
                    Exclude Holidays for Leave Calculation
                  </Label>
                </div>
              </div>

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

export default LeaveTypes
