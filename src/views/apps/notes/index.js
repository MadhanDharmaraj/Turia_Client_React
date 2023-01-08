// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// ** Reactstrap Imports
import {
  Card,
  Input,
  Button,
  CardBody,
  Label,
  ListGroup,
  ListGroupItem,
  Col,
  Row
} from 'reactstrap'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { X, Paperclip, Edit, Trash2 } from 'react-feather'
import Avatar from '@src/@core/components/avatar'
import { getData, addNotes, deleteNotes, updateNotes } from './store/index'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { activeOrganizationid, orgUserId } from '@src/helper/sassHelper'
import moment from 'moment'

const activeOrgId = activeOrganizationid()
const userId = orgUserId()
const MySwal = withReactContent(Swal)
// ** Images
const Notes = props => {
  // ** Hook
  const { moduleName, moduleRefId, tabId } = props

  console.log(moduleName)

  const renderClient = row => {

    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.username.charAt(0) || 'T'}
      />
    )

  }

  const dispatch = useDispatch()
  //** State */
  const [files, setFiles] = useState([])
  const [data, setData] = useState([])
  const [comment, setComment] = useState('')

  const store = useSelector(state => state.notes)

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
        await store.dispatch(deleteNotes(id))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Invoice has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const editNote = (k) => {
    setData(
      data.map((obj, i) => {
        if (i === k) {
          return { ...obj, editFlag: true }
        } else {
          return { ...obj, editFlag: false }
        }
      })
    )
  }

  const dateformat = (val) => {

    return moment(val, 'x').format('h:m A')

  }
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error('You can only upload image Files!.')
      } else {
        setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      }
    }
  })

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const setEditComment = (k, val) => {
    setData(
      data.map((obj, i) => {
        if (i === k) {
          return { ...obj, description: val }
        }
      })
    )
  }

  const saveNote = async (obj) => {
    if (obj.description !== '') {
      await dispatch(updateNotes(obj))
    }
  }

  useEffect(async () => {
    if (tabId === 'clientnotes' || tabId === 'tasknotes' || tabId === 'dscnotes') {
      await dispatch(getData(moduleRefId))
    }
  }, [tabId])

  useEffect(() => {
    setData(store.data || [])
  }, [store.data])

  const postComment = async () => {
    if (comment !== '') {
      const data = {
        organizationId: activeOrgId,
        createdBy: userId,
        updatedBy: userId,
        description: comment,
        attachmentIds: [],
        moduleReferenceId: moduleRefId,
        moduleId: 1
      }
      await dispatch(addNotes(data))

      setComment('')
    }

  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>
          <Avatar />
        </div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <Fragment>
      <Card>
        <CardBody>

          <fieldset className='form-label-group mb-50'>
            <Label className='form-check-label' for={`add-comment-`}>
              Add Comment
            </Label>
            <Input id={`add-comment-`} type='textarea' rows='3' placeholder='Add Comment' onInput={(e) => setComment(e.target.value)} />
          </fieldset>

          <input {...getInputProps()} />

          <Button type='button' color='primary' size='sm' {...getRootProps({ className: 'dropzone' })} >
            <Paperclip size={14} className=''></Paperclip>
          </Button>

          <Button color='primary' className='ms-1' size='sm' onClick={() => postComment()}>
            Post Comment
          </Button>

          <ListGroup>{fileList}</ListGroup>

          {data.map((item, k) => {
            return (
              <div className='d-flex align-items-start my-1' key={k}>
                {renderClient(item)}
                <div className='profile-user-info w-100'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h6 className='mb-0'>{item.username}
                      &nbsp;&nbsp;<span>{dateformat(item.createdon)}</span>
                    </h6>
                    {!item.editFlag &&
                      <Col className='d-flex' md={1}>
                        <Edit size={18} className='col-4 cursor-pointer' onClick={() => editNote(k)} />
                        <Trash2 size={18} className='ms-1 col-4 cursor-pointer' onClick={() => deletefn(item.id)} />
                      </Col>
                    }
                  </div>
                  {!item.editFlag &&
                    <Row className='mt-1'>
                      <small>{item.description}</small>
                    </Row>
                  }
                  {item.editFlag &&
                    <Row className='mt-2'>
                      <Input value={item.description} onInput={(e) => { setEditComment(k, e.target.value) }} />

                      <Col className='d-flex justify-content-end mt-1' >

                        <Button size='sm' color='warning' outline onClick={() => editNote(-1)}>Cancel</Button>
                        <Button size='sm' color='primary' className='ms-1' onClick={() => saveNote(item)} >Save</Button>
                      </Col>
                    </Row>
                  }
                </div>
              </div>
            )
          })
          }
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Notes
