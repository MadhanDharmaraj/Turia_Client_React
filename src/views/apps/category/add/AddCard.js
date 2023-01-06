import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addCategory } from "../store"
// ** Reactstrap Importsz
import { Label, Button, Input, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { useEffect, useState } from "react"

import { orgUserId, activeOrganizationid } from '@src/helper/sassHelper'
const userId = orgUserId()
const activeOrgId = activeOrganizationid()

const CategoryAdd = (props) => {
  // ** States
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    organizationId : yup.string().default(activeOrgId),
    createdBy : yup.string().default(userId),
    name: yup.string().required("Please Enter Category Name")
  })

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.cast()
  })
  
  const [formModal, setFormModal] = useState(false)
  const closeModal = () => {
    setFormModal(false)
    props.parentCallback(false)
  }
  useEffect(() => {
    setFormModal(props.addCategoryFlag)
  })

  const onSubmit = async (data) => {
    await dispatch(addCategory(data))
    setFormModal(false)
    reset({name: '', organizationId : 1})
    props.parentCallback(false)
  }

  return (

    <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
      <ModalHeader toggle={() => closeModal()}>Category Create</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className='mb-2'>
            <Label sm='3' size='lg' className='form-label' for='name'>
              Category Name
            </Label>

            <Controller
              id='name'
              name='name'
              control={control}
              render={({ field }) => <Input type="text" placeholder="Category" invalid={errors.name && true} {...field} />}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color='warning' onClick={() => closeModal()}>
            Cancel
          </Button>{' '}
          <Button color='primary' >
            Save
          </Button>{' '}
        </ModalFooter>
      </form>
    </Modal >
  )
}

export default CategoryAdd
