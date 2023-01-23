// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// ** Custom Components
import classnames from 'classnames'

// ** Third Party Components
import axios from '@src/configs/axios/axiosConfig'
import Flatpickr from 'react-flatpickr'
import { X, Plus } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { getTask, addTaskParticipants } from '../store'

// ** Reactstrap Imports
import { Row, Col, Card, Label, Button, CardBody, FormFeedback, Input, CardHeader } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import { useDispatch, useSelector } from 'react-redux'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()

const EditCard = () => {
  // ** States
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [setOpen] = useState(false)
  const [date, setDate] = useState("")
  const { id } = useParams()

  const schema = yup.object().shape({
    updatedBy: yup.string().default(userId),
    clientId: yup.number().required("Please select a Client"),
    serviceId: yup.number().required("Please select a Service"),
    assignee: yup.array().min(1, "Please select Assignee"),
    reviewer: yup.array(),
    clientAccessFlag: yup.boolean().default(false),
    organizationId: yup.number().default(activeOrgId),
    taskStatus: yup.number().default(1),
    invoiceId: yup.number().default(0),
    startDate: yup.string().required('Please Select Start Date'),
    endDate: yup.string().required('Please Select End Date'),
    priority: yup.string().required("Please select a Priority"),
    invoiceFlag: yup.boolean().default(false)
  })
  const store = useSelector(state => state.task)

  const { handleSubmit, formState: { errors }, control, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const priorityOptions = [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" }
  ]

  const [assigneeUserOptions, setAssigneeUserOptions] = useState([])
  const [reviewerUserOptions, setReviewerUserOptions] = useState([])

  const dispatch = useDispatch()
  const [clientOptions, setClientOptions] = useState([])
  const [serviceOptions, setServiceOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])

  const [invoiceFlag, setinvoiceFlag] = useState(false)
  const [taskParticipants, seTaskParticipants] = useState([])

  useEffect(async () => {
    if (store.taskId !== null) {
      const arr = taskParticipants.map((obj) => {
        return { ...obj, taskId: store.taskId }
      })
      await dispatch(addTaskParticipants({ rows: arr }))

      const id = store.taskId
      navigate(`/recurring-task/view/${id}`)

    }
  }, [store.taskId])

  const formatparticipants = (user, type) => {
    const obj = {
      organizationId: activeOrgId,
      userId: user,
      type,
      createdBy: userId
    }
    return obj
  }

  const onSubmit = async data => {

    const tempParticipants = []
    data.assignee.forEach((user) => {
      tempParticipants.push(formatparticipants(user, 2))
    })

    data.reviewer.forEach((user) => {
      tempParticipants.push(formatparticipants(user, 2))
    })

    seTaskParticipants(tempParticipants)
    delete data.assignee
    delete data.reviewer

    await dispatch(updateTask(data))
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

  const getOrganizationUsers = async () => {
    axios.post('/organizationusers/list').then(response => {
      const arr = response.data
      setReviewerUserOptions(arr.organizationusers)
      setAssigneeUserOptions(arr.organizationusers)
      setUserOptions(arr.organizationusers)
    }).catch((err) => {
      console.log(err)
    })

  }

  const enableInvoice = () => {
    setinvoiceFlag(!invoiceFlag)
  }

  useEffect(() => {
    getClients()
    getServices()
    getOrganizationUsers()
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

  useEffect(async () => {
    if (store.selectedTask !== null) {
      reset({
        updatedBy: userId,
        clientId: store.selectedTask.clientid,
        serviceId: store.selectedTask.serviceid,
        assignee: [],
        reviewer: [],
        clientAccessFlag: false,
        organizationId: activeOrgId,
        taskStatus: store.selectedTask.taskstatus,
        invoiceId: store.selectedTask.invoiceid || 0,
        startDate: store.selectedTask.startdate,
        endDate: store.selectedTask.enddate,
        priority: parseInt(store.selectedTask.priority),
        invoiceFlag: store.selectedTask.invoiceflag
      })
    }
  }, [store.selectedTask])

  useEffect(async () => {
    if (id !== undefined) {
      await dispatch(getTask(id))
    }
  }, [id])

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
          return <FormFeedback key={k}> {errors[obj]?.message}</FormFeedback>
        })}
        <CardHeader>Edit Task</CardHeader>
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
                    render={({ field, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.clientId })}
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
                    render={({ field, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.serviceId })}
                        {...field}
                        classNamePrefix='select'
                        options={serviceOptions}
                        value={serviceOptions.find(c => { return c.id === field.value })}
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
                        className={classnames('due-date-picker', { 'flatpickr-input is-invalid': errors.startDate })} />
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
                        className={classnames('due-date-picker', { 'flatpickr-input is-invalid': errors.endDate })} />
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
                    render={({ field, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.priority })}
                        {...field}
                        classNamePrefix='select'
                        options={priorityOptions}
                        value={priorityOptions.find(c => { return c.id === field.value })}
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
                <Input className='form-check-input' type='checkbox' id='invoice_flag' value={field.value} {...field} onChange={(val) => { field.onChange(val); enableInvoice() }} />
              )}
            />
            <Label className='form-check-label' for='invoice_flag'>
              Create Proposal for this Task
            </Label>
          </div>
        </Row>
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button className='add-new-user' outline color='warning' tag={Link} to='/recurring-task/list'>
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

export default EditCard
