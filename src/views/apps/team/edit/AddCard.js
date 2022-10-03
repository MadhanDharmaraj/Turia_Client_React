// ** React Imports
import { Link } from 'react-router-dom'
import classnames from 'classnames'
// ** Third Party Components
import RoleCards from './RoleCards'
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form"
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
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {

  // ** States
  const schema = yup.object().shape({
    first_name: yup.string().required("Please Enter a First Name"),
    last_name: yup.string().required("Please Enter a Last Name"),
    contact_no: yup.string().required("Please Enter a Conatct No").max(10).min(10, "Invalid Contact No"),
    email: yup.string().email("Please Enter valid Email").required("Please Enter valid Email"),
    designation_id: yup.string().required("Please Select Designation"),
    role_id: yup.string().required("Please Select Role"),
    department_id: yup.string().required("Please Select Department")
  })

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      contact_no: '',
      email: '',
      designation_id: '',
      role_id: '',
      department_id: '',
      permissions: []
    }
  })

  const onSubmit = data => console.log(data)


  return (

    <form onSubmit={handleSubmit(onSubmit)} >
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='first_name'>
                  First Name
                </Label>
                <Col sm='9'>
                  <Controller
                    id='first_name'
                    name='first_name'
                    control={control}
                    render={({ field }) => <Input invalid={errors.first_name && true} {...field} />}
                  />
                  {errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='last_name'>
                  Last Name
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    id='last_name'
                    name='last_name'
                    render={({ field }) => (
                      <Input type='text' invalid={errors.last_name && true} {...field} />
                    )}
                  />
                  {errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='contact_no'>
                  Conatct No
                </Label>
                <Col sm='9'>
                  <Controller
                    id='contact_no'
                    name='contact_no'
                    control={control}
                    render={({ field }) => <Input invalid={errors.contact_no && true} {...field} />}
                  />
                  {errors.contact_no && <FormFeedback>{errors.contact_no.message}</FormFeedback>}
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
                <Label sm='3' size='lg' className='form-label' for='designation_id'>
                  Designation
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="designation_id"
                    id="designation_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.designation_id })}
                        {...field}
                        classNamePrefix='select'
                        options={options}
                        value={options.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.designation_id && <FormFeedback className='text-danger'>{errors.designation_id?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='role_id'>
                  Role
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="role_id"
                    id="role_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.role_id })}
                        {...field}
                        classNamePrefix='select'
                        options={options}
                        value={options.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.role_id && <FormFeedback className='text-danger'>{errors.role_id?.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='department_id'>
                  Department
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="department_id"
                    id="department_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.department_id })}
                        {...field}
                        classNamePrefix='select'
                        options={options}
                        value={options.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}

                  />
                  {errors.department_id && <FormFeedback className='text-danger'>{errors.department_id?.message}</FormFeedback>}
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
