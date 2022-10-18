// ** React Imports
import { useEffect, useState } from 'react'
import { Delete } from 'react-feather'
import { useForm, Controller, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, ListGroupItem, Input, Label, Button, FormFeedback } from 'reactstrap'

const CheckList = () => {
  // ** States
  const [listArr] = useState([])
  const schema = yup.object().shape({
    checklists: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        description: yup.string()
      })
    )
  })

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      checklists: []
    }
  })

  const { fields, append } = useFieldArray({ name: 'checklists', control })
  const onSubmit = data => console.log(data)

  const addItem = (() => {
    const id = listArr.length + 1
    const obj = { id, name: '', description: '' }
    append(obj)
  })

  const removeItem = e => {
    e.preventDefault()
    e.target.closest('.repeater-wrapper').remove()
  }

  useEffect(() => {
    addItem()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Row id='dd-with-handle'>
            <Row className='mb-1'>
              <Col sm='12' className='px-0 d-flex justify-content-between'>
                <Button color='primary' onClick={() => addItem()}>Add New</Button>
                <Button color='primary' className='ms-1' type='submit'>Save</Button>
              </Col>
            </Row>
            <Col md='12' sm='12'>

              {
                fields.map((item, i) => {
                  return (
                    <ListGroupItem className='draggable repeater-wrapper' key={i}>
                      <Row md={12}>
                        <Col sm='12' className='px-2 d-flex justify-content-between'>
                          <span className='handle'>Step {i + 1}</span>
                          <Delete onClick={removeItem} />
                        </Col>
                      </Row>
                      <br></br>
                      <Label>Name</Label>
                      <Controller
                        name={`checklists.${i}.name`}
                        control={control}
                        render={({ field }) => <Input type="text" invalid={errors.checklists?.[i]?.name && true} {...field} />}
                      />
                      {errors.checklists?.[i]?.name && <FormFeedback>{errors.checklists?.[i]?.name?.message}</FormFeedback>}
                      <Label>Description</Label>
                      <Controller
                        name={`checklists.${i}.description`}
                        control={control}
                        render={({ field }) => <Input type="textarea" invalid={errors.checklists?.[i]?.description && true} {...field} />}
                      />
                    </ListGroupItem>
                  )
                })
              }

            </Col>
          </Row>
        </CardBody>
      </Card >
    </form>
  )
}

export default CheckList
