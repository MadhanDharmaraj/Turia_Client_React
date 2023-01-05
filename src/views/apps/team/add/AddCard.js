// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import classnames from 'classnames'
// ** Third Party Components
import RoleCards from './RoleCards'
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from '@src/configs/axios/axiosConfig'

import { addUser, inviteMail } from '../store/index'
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from 'react'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import moment from 'moment'
import { useDispatch } from 'react-redux'
const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const AddCard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ** States
  const schema = yup.object().shape({
    createdBy: yup.string().default(userId),
    organizationId: yup.string().default(activeOrgId),
    firstName: yup.string().required("Please Enter a First Name"),
    lastName: yup.string().required("Please Enter a Last Name"),
    name: yup.string(),
    contactNo: yup.string().required("Please Enter a Conatct No").max(10).min(10, "Invalid Contact No"),
    userTypeId: yup.string().default(4),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    designationId: yup.string().required("Please Select Designation"),
    roleId: yup.string().required("Please Select Role"),
    invitedAt: yup.string().default(moment().unix()),
    recurringFlag: yup.boolean().default(true),
    expiryDate: yup.string().default(moment().add(5, 'days').unix()),
    departmentId: yup.string().required("Please Select Department"),
    isRegistered: yup.boolean().default(false),
    invitedBy: yup.string().default('51')
  })

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const [departmentOptions, setDepartmentOptions] = useState([])
  const [designationOptions, setDesignationOptions] = useState([])
  const [rolesOptions, setRolesOptions] = useState([])

  const getDesignation = () => {
    axios.post('/designations/dropdown').
      then((res) => {
        setDesignationOptions(res.data.designations)
      }).catch(() => { })
  }

  const getDepartment = () => {
    axios.post('/departments/dropdown')
      .then((res) => {
        setDepartmentOptions(res.data.departments)
      }).catch(() => { })
  }

  const getRoles = () => {
    axios.post('/roles/dropdown').then((res) => { setRolesOptions(res.data.roles) }).catch(() => { })
  }

  useEffect(() => {
    getDesignation()
    getDepartment()
    getRoles()
  }, [])

  const invitemail = async (id) => {
    await dispatch(inviteMail(id))
    navigate(`/team/view/${id}`)
  }

  const onSubmit = async data => {
    data['name'] = `${control._formValues.firstName} ${control._formValues.lastName}`
    const res = await dispatch(addUser(data))
    invitemail(res.payload.invitations.id)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} >
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='firstName'>
                  First Name
                </Label>
                <Col sm='9'>
                  <Controller
                    id='firstName'
                    name='firstName'
                    control={control}
                    render={({ field }) => <Input invalid={errors.firstName && true} {...field} />}
                  />
                  {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    id='lastName'
                    name='lastName'
                    render={({ field }) => (
                      <Input type='text' invalid={errors.lastName && true} {...field} />
                    )}
                  />
                  {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='contactNo'>
                  Conatct No
                </Label>
                <Col sm='9'>
                  <Controller
                    id='contactNo'
                    name='contactNo'
                    control={control}
                    render={({ field }) => <Input invalid={errors.contactNo && true} {...field} />}
                  />
                  {errors.contactNo && <FormFeedback>{errors.contactNo.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='email'>
                  Email
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    id='email'
                    name='email'
                    render={({ field }) => (
                      <Input type='email' invalid={errors.email && true} {...field} />
                    )}
                  />
                  {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='designationId'>
                  Designation
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="designationId"
                    id="designationId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.designationId })}
                        {...field}
                        classNamePrefix='select'
                        options={designationOptions}
                        value={designationOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.designationId && <FormFeedback className='text-danger'>{errors.designationId?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='roleId'>
                  Role
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="roleId"
                    id="roleId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.roleId })}
                        {...field}
                        classNamePrefix='select'
                        options={rolesOptions}
                        value={rolesOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.roleId && <FormFeedback className='text-danger'>{errors.roleId?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='departmentId'>
                  Department
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="departmentId"
                    id="departmentId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.departmentId })}
                        {...field}
                        classNamePrefix='select'
                        options={departmentOptions}
                        value={departmentOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}

                  />
                  {errors.departmentId && <FormFeedback className='text-danger'>{errors.departmentId?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

          </Row>

        </CardBody>
        {/* /Header */}

        {/* Product Details */}
        <CardBody className='invoice-padding'>
          <RoleCards />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline tag={Link} to='/team/list'>
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
