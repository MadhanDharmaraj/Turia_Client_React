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
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback, CardHeader, CardTitle } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from "react"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()

const EditCard = () => {

  const { id } = useParams()

  // ** States
  const navigate = useNavigate({})
  const dispatch = useDispatch()
  const [categoryOptions, setCateoryOptions] = useState([])
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [serviceDetails, setServiceDetails] = useState([])
  const [exemptionReasonOptions, setExemptionReasonOptions] = useState([])
  const [isTaxApplicable, setIsTaxApplicable] = useState(true)

  const schema = yup.object().shape({
    updatedBy: yup.string().default(userId),
    id: yup.string().default(id),
    categoryId: yup.string().required("Please select a Category"),
    categoryType: yup.number().default(1),
    name: yup.string().required("Please Enter Service Name"),
    organizationId: yup.number().default(activeOrgId),
    taxGroupId: yup.string().nullable(),
    sellingPrice: yup.string().nullable(),
    isTaxApplicable: yup.boolean().default(true),
    exemptionReasonId: yup.number().when(["isTaxApplicable"], { is: (isTaxApplicable) => !isTaxApplicable, then: yup.number().required('Please Select Exemption Reason') }).nullable(),
    sacCode: yup.string().nullable()
  })


  const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const getExemptionReason = () => {
    axios.post('/exemptionreasons/dropdown').then(response => {
      const arr = response.data
      setExemptionReasonOptions(arr.exemptionreasons)
    })
  }

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

  const showExemption = (val) => {
    if (val.nontaxableflag) {
      setIsTaxApplicable(false)
      setValue('isTaxApplicable', false)
    } else {
      setIsTaxApplicable(true)
      setValue('isTaxApplicable', true)
      setValue('exemptionReasonId', null)
    }
  }

  useEffect(() => {

    if (Object.keys(serviceDetails).length > 0) {
      reset({
        categoryId: serviceDetails.categoryid,
        name: serviceDetails.name,
        organizationId: serviceDetails.organizationid,
        sellingPrice: serviceDetails.sellingprice,
        sacCode: serviceDetails.saccode,
        taxGroupId: serviceDetails.taxgroupid,
        description: serviceDetails.description,
        isTaxApplicable: serviceDetails.istaxapplicable,
        exemptionReasonId: serviceDetails.exemptionreasonid
      })

      setIsTaxApplicable(serviceDetails.istaxapplicable)
    }

  }, [serviceDetails])

  useEffect(() => {
    getTaxGroups()
    getCategories()
    getExemptionReason()

    if (id !== undefined) {
      getServiceData()
    }
  }, [])

  const onSubmit = async (data) => {
    await dispatch(updateService(data))
    navigate(`/service/view/${id}`)
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
                onChange={val => { field.onChange(val.id); if (fieldName === 'taxGroupId') { showExemption(val) } }}
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
        <CardHeader>
          <CardTitle>Edit Service</CardTitle>
        </CardHeader>
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
              {getRow('SAC Code', 'sacCode', false)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getRow('Professional Fee', 'sellingPrice', false)}
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              {getSelectRow('Tax Rate', 'taxGroupId', taxGroupOptions, false)}
            </Col>
          </Row>
          {!isTaxApplicable &&
            <Row>
              <Col md='6' className='mb-1'>
                {getSelectRow('Exemption Reason', 'exemptionReasonId', exemptionReasonOptions, true)}
              </Col>
            </Row>
          }
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
