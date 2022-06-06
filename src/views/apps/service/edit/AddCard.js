import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]
// ** Reactstrap Importsz
import { Row, Col, Card, Label, Button, CardBody } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States

  const schema = yup.object().shape({
    categoryId: yup.string().required("Please select a Category"),
    name: yup.string().required("Please Enter Name"),
    taxGroupId: yup.string().required("Please Select Tax Rate"),
    professionalFee: yup.string().required("Please Enter Professional Fee"),
    sacCode: yup.string().required("Please Enter SAC Code")
  })


  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: '',
      name: '',
      professionalFee: '',
      sacCode: '',
      taxGroupId: '',
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
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12' >Category</Label>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field, value, ref }) => (
                    <Select
                      {...register("categoryId")}
                      inputRef={ref}
                      className="react-select col-lg-9 col-sm-12"
                      classNamePrefix="addl-class"
                      options={options}
                      value={options.find(c => c.value === value)}
                      onChange={val => field.onChange(val.value)}
                    />
                  )}
                />
              </div>
              <p className='text-danger'>{errors.categoryId?.message}</p>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12' >Name</Label>
                <input size="md" type='text' className="form-control" {...register("name", { required: "Please Enter Service Names" })} />
              </div>
              <p className='text-danger'>{errors.name?.message}</p>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>SAC Code</Label>
                <input className='form-control' size="md" type='number' {...register("sacCode")} />
              </div>
              <p className='text-danger'>{errors.sacCode?.message}</p>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>Professional Fee</Label>
                <input className='form-control' size="md" type='number' {...register("professionalFee", { required: "Please Enter Professional Fee" })} />
              </div>
              <p className='text-danger'>{errors.professionalFee?.message}</p>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>Tax Rate</Label>
                <Controller
                  control={control}
                  name="taxGroupId"
                  render={({ field, value, ref }) => (
                    <Select
                      {...register("taxGroupId")}
                      inputRef={ref}
                      className="react-select col-lg-9 col-sm-12"
                      classNamePrefix="addl-class"
                      options={options}
                      value={options.find(c => c.value === value)}
                      onChange={val => field.onChange(val.value)}
                    />
                  )}
                />
              </div>
              <p className='text-danger'>{errors.taxGroupId?.message}</p>
            </Col>
          </Row>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='my-lg-0 my-1' lg='6' sm='12'>
              <div className='d-lg-flex'>
                <Label className='col-lg-3 col-sm-12'>Description</Label>
                <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} size="md" type='text' {...register("description", { required: "Please Enter Professional Fee" })} ></textarea>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Header */}
      </Card>
      <Card>
        <CardBody>
          <div className='modal-footer border-0'>
            <Button color='warning' outline>
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
