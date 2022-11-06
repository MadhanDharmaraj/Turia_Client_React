import Select from "react-select"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateService, getService } from '../store'
import axios from '../../../../configs/axios/axiosConfig'
import classnames from 'classnames'

// ** Reactstrap Importsz
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from "react"

const AddCard = () => {
  
  const { id } = useParams()

  // ** States
  const navigate = useNavigate({})
  const dispatch = useDispatch()
  const [categoryOptions, setCateoryOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [serviceDetails, setServiceDetails] = useState([])

  const schema = yup.object().shape({
    categoryId: yup.string().required("Please select a Category"),
    name: yup.string().required("Please Enter Service Name"),
    taxgroupid: yup.string().required("Please Select Tax Rate"),
    sellingPrice: yup.string().required("Please Enter Professional Fee"),
    sacCode: yup.string().required("Please Enter SAC Code")
  })


  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      organizationId: 1,
      categoryType: 1,
      categoryId: '',
      name: '',
      sellingPrice: '',
      sacCode: '',
      taxgroupid: '',
      description: ''
    }
  })

  const getTaxGroups = () => {
    axios.post('/taxgroups/dropdown').then(response => {
      const arr = response.data
      setTaxGroupOptions(arr.taxgroups)
    })
  }

  const getCategories = () => {
    axios.post('/categories/list').then(response => {
      const arr = response.data
      setCateoryOptions(arr.categories)
    })
  }

  const getServiceData = async () => {
    const service = await dispatch(getService(id))
    setServiceDetails(service.payload)

  }

  useEffect(() => {
    
    if (Object.keys(serviceDetails).length > 0) {
      reset({
        categoryId: serviceDetails.categoryid,
        name: serviceDetails.name,
        organizationId: serviceDetails.organizationid,
        sellingPrice: serviceDetails.sellingprice,
        sacCode: serviceDetails.saccode,
        taxgroupid: serviceDetails.taxgroupid,
        description: serviceDetails.description
      })
    }

  }, [serviceDetails])

  useEffect(() => {
    getTaxGroups()
    getCategories()

    getServiceData()
  }, [])

  const onSubmit = async (data) => {
    const datatemp = await dispatch(updateService(data))
    const seviceId = datatemp.payload.services.id
    navigate(`/service/view/${seviceId}`)
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='categoryId'>
                  Category
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="categoryId"
                    id="categoryId"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.categoryId })}
                        {...field}
                        classNamePrefix='select'
                        options={categoryOptions}
                        value={categoryOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}

                      />
                    )}
                  />
                  {errors.categoryId && <FormFeedback className='text-danger'>{errors.categoryId?.message}</FormFeedback>}
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
                <Label sm='3' size='lg' className='form-label' for='sacCode'>
                  SAC Code
                </Label>
                <Col sm='9'>
                  <Controller
                    id='sacCode'
                    name='sacCode'
                    control={control}
                    render={({ field }) => <Input invalid={errors.sacCode && true} {...field} />}
                  />
                  {errors.sacCode && <FormFeedback>{errors.sacCode.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='sellingPrice'>
                  Professional Fee
                </Label>
                <Col sm='9'>
                  <Controller
                    id='sellingPrice'
                    name='sellingPrice'
                    control={control}
                    render={({ field }) => <Input invalid={errors.sellingPrice && true} {...field} />}
                  />
                  {errors.sellingPrice && <FormFeedback>{errors.sellingPrice.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label' for='taxgroupid'>
                  Tax Rate
                </Label>
                <Col sm='9'>
                  <Controller
                    control={control}
                    name="taxgroupid"
                    id="taxgroupid"
                    render={({ field, value, ref }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        className={classnames('react-select', { 'is-invalid': errors.taxgroupid })}
                        {...field}
                        classNamePrefix='select'
                        options={taxGroupOptions}
                        value={taxGroupOptions.find(c => { return c.id === value })}
                        onChange={val => field.onChange(val.id)}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    )}
                  />
                  {errors.taxgroupid && <FormFeedback className='text-danger'>{errors.taxgroupid?.message}</FormFeedback>}
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
