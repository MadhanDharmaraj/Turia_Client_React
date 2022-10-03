import Select from "react-select"
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]

import classnames from 'classnames'

// ** Reactstrap Importsz
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States

  const schema = yup.object().shape({
    category_id: yup.string().required("Please select a Category"),
    name: yup.string().required("Please Enter Service Name"),
    tax_group_id: yup.string().required("Please Select Tax Rate"),
    professional_fee: yup.string().required("Please Enter Professional Fee"),
    sac_code: yup.string().required("Please Enter SAC Code")
  })


  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category_id: '',
      name: '',
      professional_fee: '',
      sac_code: '',
      tax_group_id: '',
      description: ''
    }
  })

  const onSubmit = ((data) => {
    console.log(data)
  })

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='category_id'>
                  Category
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="category_id"
                    id="category_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.category_id })}
                        {...field}
                        classNamePrefix='select'
                        options={options}
                        value={options.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                   { errors.category_id && <FormFeedback className='text-danger'>{errors.category_id?.message}</FormFeedback> } 
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='name'>
                  Name
                </Label>
                <Col sm='9'>
                  <Controller
                    id='name'
                    name='name'
                    control={control}
                    render={({ field }) => <Input invalid={errors.name && true} {...field} />}
                  />
                  {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='sac_code'>
                  SAC Code
                </Label>
                <Col sm='9'>
                  <Controller
                    id='sac_code'
                    name='sac_code'
                    control={control}
                    render={({ field }) => <Input invalid={errors.sac_code && true} {...field} />}
                  />
                  {errors.sac_code && <FormFeedback>{errors.sac_code.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='professional_fee'>
                  Professional Fee
                </Label>
                <Col sm='9'>
                  <Controller
                    id='professional_fee'
                    name='professional_fee'
                    control={control}
                    render={({ field }) => <Input invalid={errors.professional_fee && true} {...field} />}
                  />
                  {errors.professional_fee && <FormFeedback>{errors.professional_fee.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='tax_group_id'>
                  Tax Rate
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="tax_group_id"
                    id="tax_group_id"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.tax_group_id })}
                        {...field}
                        classNamePrefix='select'
                        options={options}
                        value={options.find(c => { return c.value === value })}
                        onChange={val => field.onChange(val.value)}
                      />
                    )}
                  />
                  { errors.tax_group_id && <FormFeedback className='text-danger'>{errors.tax_group_id?.message}</FormFeedback> }
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
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
            </Col>
          </Row>
        </CardBody>
        {/* /Header */}
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline tag={Link} to='/service/list'>
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
