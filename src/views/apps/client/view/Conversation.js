// ** React Imports
import { Fragment, useState } from 'react'
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
  Row
} from 'reactstrap'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { X, Heart, Paperclip } from 'react-feather'
import Avatar from '../../../../@core/components/avatar'

// ** Images
const ConversationTab = () => {
  // ** Hook
  //** State */
  const [files, setFiles] = useState([])

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

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>
          <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
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
            <Input id={`add-comment-`} type='textarea' rows='3' placeholder='Add Comment' />
          </fieldset>

          <input {...getInputProps()} />

          <Button type='button' color='primary' size='sm' {...getRootProps({ className: 'dropzone' })} >
            <Paperclip size={14} className=''></Paperclip>
          </Button>

          <Button color='primary' className='ms-1' size='sm'>
            Post Comment
          </Button>

          <ListGroup>{fileList}</ListGroup>

          <div className='d-flex align-items-start my-1'>
            <Avatar className='mt-25 me-75' imgHeight='34' imgWidth='34' />
            <div className='profile-user-info w-100'>
              <div className='d-flex align-items-center justify-content-between'>
                <h6 className='mb-0'>Madhan</h6>
                <a href='/' onClick={e => e.preventDefault()}>
                  <Heart
                    size={18} />
                  <span className='align-middle ms-25 text-muted'>2</span>
                </a>
              </div>
              <small>Test</small>
            </div>
          </div>
          <div className='d-flex align-items-start my-1'>
            <Avatar className='mt-25 me-75' imgHeight='34' imgWidth='34' />
            <div className='profile-user-info w-100'>
              <div className='d-flex align-items-center justify-content-between'>
                <h6 className='mb-0'>Madhan</h6>
                <a href='/' onClick={e => e.preventDefault()}>
                  <Heart
                    size={18}

                  />
                  <span className='align-middle ms-25 text-muted'>2</span>
                </a>
              </div>
              <small>Test</small>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default ConversationTab
