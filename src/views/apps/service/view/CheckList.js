// ** React Imports
import { useEffect, useState } from 'react'
import { Trash2 } from 'react-feather'
import { useForm, Controller, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addWokflow, listWokflow } from '../store'
// ** Third Party Components
import { activeOrganizationid } from '@src/helper/sassHelper'

const activeOrgId = activeOrganizationid()

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, ListGroupItem, Input, Label, Button, FormFeedback } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'


const CheckList = () => {

  const store = useSelector(state => state.service)
  const [workflowList, setWorkflowList] = useState([])
  const [addFlag, setAddFLag] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()
  // ** States
  const schema = yup.object().shape({
    rows: yup.array().of(
      yup.object().shape({
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
    await dispatch(addWokflow(data))
  }

  const addItem = (() => {

    const obj = { id: '', name: '', description: '' }
    append(obj)
    setAddFLag(!addFlag)
  })

  const removeItem = ind => {
    remove(ind)
  }

  useEffect(() => {
    setWorkflowList(store.workFlowLists)
  }, [store.workFlowLists])

  useEffect(async () => {
    addItem()

    await dispatch(listWokflow({ id }))

  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Row id='dd-with-handle'>
            <Row className='mb-1'>
              <Col sm='12' className='px-0 d-flex justify-content-end'>
                <Button color='primary' onClick={() => addItem()}>Add New</Button>
                {!addFlag &&
                  <Button color='primary' className='ms-1' type='submit'>Save</Button>
                }
              </Col>
            </Row>

            {workflowList.length === 0 &&
              <Col md='12' sm='12'>

                {
                  fields.map((item, i) => {
                    return (
                      <ListGroupItem className='draggable repeater-wrapper' key={item.rowid}>
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
          {workflowList.length > 0 &&
            <ReactSortable tag='ul' className='list-group' list={workflowList} setList={setWorkflowList}>
              {workflowList.map(item => {
                return (
                  <ListGroupItem className='draggable' key={item.name}>
                    <div className='d-flex align-items-center'>
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
        </CardBody>
      </Card >
    </form>
  )
}

export default CheckList
