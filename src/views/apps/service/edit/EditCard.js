import Select from "react-select"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateService, getService } from '../store'
import axios from '@src/configs/axios/axiosConfig'
import classnames from 'classnames'

// ** Reactstrap Importsz
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from "react"
import { activeOrganizationid } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()

const EditCard = () => {

  const { id } = useParams()

  // ** States
  const navigate = useNavigate({})
  const dispatch = useDispatch()
  const [categoryOptions, setCateoryOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [serviceDetails, setServiceDetails] = useState([])

  const schema = yup.object().shape({
    categoryId: yup.string().required("Please select a Category"),
    categoryType : yup.number().default(1),
    organizationId : yup.number().default(activeOrgId),
    name: yup.string().required("Please Enter Service Name"),
    taxGroupId: yup.string().required("Please Select Tax Rate"),
    sellingPrice: yup.string().required("Please Enter Professional Fee"),
    sacCode: yup.string().required("Please Enter SAC Code")
  })


  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
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
        taxGroupId: serviceDetails.taxGroupId,
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
    const datatemp = await dispatch(updateService({ data, id }))
    const seviceId = datatemp.payload.services.id
    navigate(`/service/view/${seviceId}`)
  }


  const getRow = (fieldLabel, fieldName, reqflag = false) => {
    return (
      <Row className='mb-1'>
        <Label sm='3' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col sm='9'>
          <Controller
            id={fieldName}
            name={fieldName}
            control={control}
            render={({ field }) => <Input invalid={errors[fieldName] && true} {...field} />}
          />
          {errors[fieldName] && <FormFeedback>{errors[fieldName].message}</FormFeedback>}
        </Col>
      </Row>
    )
  }

  const getSelectRow = (fieldLabel, fieldName, options, reqflag = false) => {
    return (

      <Row className='mb-1'>
        <Label sm='3' size='lg' className={classnames(`form-label ${reqflag ? 'required' : ''}`)} for={fieldName}>
          {fieldLabel}
        </Label>
        <Col sm='9'>
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
                onChange={val => field.onChange(val.id)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
            )}

          />
          {errors[fieldName] && <FormFeedback className='text-danger'>{errors[fieldName]?.message}</FormFeedback>}
        </Col>
      </Row>

    )
  }
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='pb-0'>
          <Row>
            <Col md='6' className='mb-1'>
              {getSelectRow('Category', 'categoryId', categoryOptions, true)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Name', 'name', true)}
            </Col>
          </Row>

          <Row>
            <Col md='6' className='mb-1'>
              {getRow('SAC Code', 'sacCode', true)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Professional Fee', 'sellingPrice', true)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getSelectRow('Tax Rate', 'taxGroupId', taxGroupOptions, true)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Row className='mb-1'>
                <Label sm='3' size='lg' className='form-label required' for='description'>
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

export default EditCard
