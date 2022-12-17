import Select from "react-select"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addService } from '../store'
import axios from '@src/configs/axios/axiosConfig'
import classnames from 'classnames'

// ** Reactstrap Importsz
import { Row, Col, Card, Label, Button, CardBody, Input, FormFeedback, CardTitle, CardHeader } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from "react"
import { activeOrganizationid } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()
const AddCard = () => {
  // ** States
  const navigate = useNavigate({})
  const dispatch = useDispatch()
  const [categoryOptions, setCateoryOptions] = useState([])
  const [isTaxApplicable, setIsTaxApplicable] = useState(true)
  const [taxGroupOptions, setTaxGroupOptions] = useState([])
  const [exemptionReasonOptions, setExemptionReasonOptions] = useState([])

  const schema = yup.object().shape({
    categoryId: yup.string().required("Please select a Category"),
    categoryType: yup.number().default(1),
    name: yup.string().required("Please Enter Service Name"),
    organizationId: yup.number().default(activeOrgId),
    taxGroupId: yup.string().required("Please Select Tax Rate"),
    sellingPrice: yup.string().required("Please Enter Professional Fee"),
    isTaxApplicable: yup.boolean().default(true),
    exemptionReasonId: yup.number().when(["isTaxApplicable"], { is: (isTaxApplicable) => !isTaxApplicable, then: yup.number().required('Please Select Exemption Reason') }).nullable(),
    sacCode: yup.string().required("Please Enter SAC Code")
  })

  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
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

  useEffect(() => {
    getTaxGroups()
    getCategories()
    getExemptionReason()

  }, [])

  const onSubmit = async (data) => {
    const datatemp = await dispatch(addService(data))
    const seviceId = datatemp.payload.id
    navigate(`/service/view/${seviceId}`)
  }

  const showExemption = (val) => {
    if (val.nontaxableflag) {
      setIsTaxApplicable(false)
      setValue('isTaxApplicable', false)  
    } else {
      setIsTaxApplicable(true)
      setValue('exemptionReasonId', null)
      setValue('isTaxApplicable', true)
    }
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
          <CardTitle> Add Service</CardTitle>
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

export default AddCard
