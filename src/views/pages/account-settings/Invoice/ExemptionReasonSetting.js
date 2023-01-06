// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
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
import axios from '@src/configs/axios/axiosConfig'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import { addExemption, updateExemption, deleteExemption } from './store/exemptionreason'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
// ** Third Party Components
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

const InvoiceAccounts = (tabId) => {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  const dispatch = useDispatch()

  const schema = yup.object().shape({
    organizationId: yup.number().default(parseInt(activeOrgId)),
    name: yup.string().required('Please Enter Exemption'),
    updatedBy: yup.string().default(userId),
    createdBy: yup.string().default(userId)
  })

  const { handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })


  const getList = () => {
    axios.post('/exemptionreasons/list')
      .then((res) => {
        setData(res.data.exemptionreasons)
      })
      .catch((err) => { console.log(err) })
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
        await dispatch(deleteExemption(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Account has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        getList()
        return true
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        return false
      }
    })
  }

  const onSubmit = async data => {
    if (selected !== null) {
      await dispatch(updateExemption(data))
      reset({})
      setSelected(null)
    } else {
      await dispatch(addExemption(data))
      reset({})
    }
    getList()
  }

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

  useEffect(async () => {
    if (tabId.data === 'exemptionreason') {
      getList()
    }

  }, [tabId])

  const openEditModal = card => {
    setSelected(card)
    reset({
      organizationId: activeOrgId,
      id: card.id,
      name: card.name
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody className='py-25'>
          <Row className='gx-4'>
            <Col lg='4'>
              {
                Object.keys(errors).map((key) => {

                  return <FormFeedback key={key}>${errors[key]?.message}</FormFeedback>

                })
              }
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>

                {getRow('Exemption Reason', 'name')}

                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                </Col>

              </Row>
            </Col>
            <Col lg='8' className='mt-2 mt-lg-0'>
              <h6 className='fw-bolder mb-2'>Exemption Reasons</h6>
              <div className='added-cards'>
                {data.map((card, index) => {
                  return (
                    <div
                      key={index}
                      className={classnames('cardMaster rounded border p-2')}
                    >
                      <div className='d-flex justify-content-between flex-sm-row flex-column'>
                        <div className='card-information'>
                          <div className='d-flex align-items-center mb-50'>
                            <h6 className='mb-0'>{card.name}</h6>
                            {card.status === 1 ? (
                              <Badge color='light-success' className='ms-50'>
                                Active
                              </Badge>
                            ) : (
                              <Badge color='light-danger' className='ms-50'>
                                InActive
                              </Badge>
                            )}
                          </div>
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

export default InvoiceAccounts
