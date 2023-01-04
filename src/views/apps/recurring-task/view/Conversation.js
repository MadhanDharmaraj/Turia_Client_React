// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  Label
} from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import { Edit, Trash, Settings, MessageSquare, ChevronRight, Heart } from 'react-feather'
import Avatar from '../../../../@core/components/avatar'

// ** Images
const SecurityTab = () => {
  // ** Hook

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
          <Button color='primary' size='sm'>
            Post Comment
          </Button>
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

export default SecurityTab
