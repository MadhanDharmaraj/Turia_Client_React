// ** React Imports
import { useEffect, useState } from 'react'
import { Plus, Trash2, X } from 'react-feather'
import { useForm, Controller, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addWokflow, listWokflow, deleteWokflow } from '../store'
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
const MySwal = withReactContent(Swal)
const activeOrgId = activeOrganizationid()
const userId = orgUserId()
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, ListGroupItem, Input, Label, Button, FormFeedback } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'

const CheckList = () => {

  const storeLoc = useSelector(state => state.service)
  const [workflowList, setWorkflowList] = useState([])
  const [addFlag, setAddFLag] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()

  const deletefun = (workflowId) => {

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
        await dispatch(deleteWokflow({ workflowId, id }))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Service has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        return true
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        return false
      }
    })
  }

  // ** States
  const schema = yup.object().shape({
    rows: yup.array().of(
      yup.object().shape({
        createdBy: yup.string().default(userId),
        name: yup.string().required("Please Enter Name"),
        organizationId: yup.string().default(activeOrgId),
        serviceId: yup.string().default(id),
        id: yup.string().nullable(),
        description: yup.string()

      })
    )
  })

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })

  const { fields, append, remove } = useFieldArray({ name: 'rows', control, keyName: "rowid" })
  const onSubmit = async data => {
    await dispatch(addWokflow(data, id))
  }

  const addExisting = (() => {

    remove()

    if (workflowList.length > 0) {
      workflowList.forEach((obj) => {
        append(obj)
      })
    }

    setAddFLag(true)

  })

  const addItem = (() => {

    const obj = { id: '', name: '', description: '' }

    append(obj)
    setAddFLag(true)

  })

  const removeItem = async ind => {
    const obj = control._formValues.rows[ind]
    if (obj.id !== '') {
      const flg = await deletefun(obj.id)
      if (flg) {
        remove(ind)
        setAddFLag(false)
      }
    } else {
      remove(ind)
    }
  }

  useEffect(() => {
    setWorkflowList(storeLoc.workFlowLists)
  }, [storeLoc.workFlowLists])

  useEffect(async () => {

    await dispatch(listWokflow(id))

  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Row id='dd-with-handle'>
            <Row className='mb-1'>
              <Col sm='12' className='px-0 d-flex justify-content-end'>
                {!addFlag &&
                  < Button color='primary' onClick={() => addExisting()} outline size='sm'>Add or Edit</Button>
                }
                {addFlag &&
                  <div>
                    <Button color='warning' className='ms-1' outline size='sm' onClick={() => setAddFLag(false)}>Cancel</Button>

                    <Button color='primary' outline className='ms-1' size='sm' type='submit'>Save</Button>
                  </div>
                }
              </Col>
            </Row>
            {workflowList.length > 0 && !addFlag &&
              <ReactSortable tag='ul' className='list-group' list={workflowList} setList={setWorkflowList}>
                {workflowList.map(item => {
                  return (
                    <ListGroupItem className='draggable' key={item.id}>
                      <div className='d-flex align-items-center ju'>
                        <div>
                          <h5 className='mt-0'>{item.name}</h5>
                          {item.description}
                        </div>
                      </div>
                    </ListGroupItem>
                  )
                })}
              </ReactSortable>
            }

            {addFlag &&
              <Col md='12' sm='12'>

                {
                  fields.map((item, i) => {
                    return (
                      <ListGroupItem className='border-0 list-group-item mt-1 p-0' key={item.rowid}>
                        <Row md={12}>
                          <Col sm='12' className='px-2 d-flex justify-content-between'>
                            <span className='handle'>Step {i + 1}</span>
                            {fields.length > 1 &&
                              <Trash2 onClick={() => removeItem(i)} size='18' />
                            }
                          </Col>
                        </Row>
                        <br></br>
                        <Label>Name</Label>
                        <Controller
                          name={`rows.${i}.name`}
                          control={control}
                          render={({ field }) => <Input type="text" invalid={errors.rows?.[i]?.name && true} {...field} />}
                        />
                        {errors.rows?.[i]?.name && <FormFeedback>{errors.rows?.[i]?.name?.message}</FormFeedback>}
                        <Label>Description</Label>
                        <Controller
                          name={`rows.${i}.description`}
                          control={control}
                          render={({ field }) => <Input type="textarea" invalid={errors.rows?.[i]?.description && true} {...field} />}
                        />
                      </ListGroupItem>
                    )
                  })
                }

              </Col>
            }
          </Row>
          <Row className='mt-1'>
            <Col>
              {addFlag &&
                <Button color='primary' size='sm' className='btn-add-new' onClick={() => addItem()}>
                  <Plus size={14} className='me-25'></Plus> <span className='align-middle'>Add Item</span>
                </Button>
              }
            </Col>
          </Row>
        </CardBody>
      </Card >
    </form >
  )
}

export default CheckList
