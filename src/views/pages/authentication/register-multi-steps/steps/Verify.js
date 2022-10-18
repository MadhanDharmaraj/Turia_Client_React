// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { ChevronLeft, ChevronRight } from 'react-feather'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

const Verify = ({ stepper }) => {
  // ** States
  const codeRegExp = /^[0-9\- ]{4,4}$/
  const VerifySchema = yup.object().shape({
    verifyCode: yup.string().required('Please Enter Verify Code').matches(codeRegExp, { message: 'Please Enter Valid verify Code', excludeEmptyString: true })
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { verifyCode: '' },
    resolver: yupResolver(VerifySchema)
  })

  const onSubmit = data => {
    if (data.verifyCode && data.verifyCode.length > 0) {
      console.log(data)
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Account Verification</h2>
        {/* <span>Select plan as per your requirement.</span> */}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row className='gx-2 mb-1'>
          <Col sm={12} className='mb-1'>
            <Label className='form-label' for='credit-card'>
              Verification Code
            </Label>
            <Controller
              name='verifyCode'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  id='credit-card'
                  placeholder='1356'
                  className={classnames('form-control', { 'is-invalid': errors.verifyCode })}
                />
              )}
            />
            {errors.verifyCode && <FormFeedback>{errors.verifyCode?.message} </FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ChevronRight size={14} className='align-middle ms-sm-25 ms-0'></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Verify
