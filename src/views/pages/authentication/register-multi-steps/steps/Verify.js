// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { ChevronLeft, ChevronRight } from 'react-feather'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { verfiyCode } from '../store/index'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

const Verify = ({ stepper }) => {
  // ** States
  const codeRegExp = /^[0-9\- ]{4,4}$/
  const dispatch = useDispatch()
  const store = useSelector(state => state.register)
  const VerifySchema = yup.object().shape({
    emailCode: yup.string().required('Please Enter Verify Code').matches(codeRegExp, { message: 'Please Enter Valid verify Code', excludeEmptyString: true })
    //acceptTermsAndCondition: yup.boolean().oneOf([true], 'Please Accept terms and Condition')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { emailCode: '', acceptTermsAndCondition: true },
    resolver: yupResolver(VerifySchema)
  })

  const onSubmit = async data => {
    if (data.emailCode && data.emailCode.length > 0) {
      data.email = store.loginUser.email
      await dispatch(verfiyCode(data))
    }
  }

  useState(() => {
    if (store.verifyprocess) {
      stepper.next()
    }
  }, [store.verifyprocess])

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
              name='emailCode'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  id='credit-card'
                  placeholder='1356'
                  className={classnames('form-control', { 'is-invalid': errors.emailCode })}
                />
              )}
            />
            {errors.emailCode && <FormFeedback>{errors.emailCode?.message} </FormFeedback>}
          </Col>
          <Col sm={12} className='mb-1 '>
            <div className='form-check form-check-inline'>
              <Controller
                name='acceptTermsAndCondition'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type='checkbox'
                    defaultChecked={true}
                    name='acceptTermsAndCondition'
                    id='acceptTermsAndCondition'

                  />
                )}
              />
              <Label for='credit-card' className={classnames('form-label', { 'text-danger': errors.emailCode })}>
                I would like to receive updates, tips and
                offers about <a href="#">Turia's products &amp; services</a>
              </Label>
              <Label className={classnames('form-label', { 'text-danger': errors.emailCode })}>
                <p>By choosing <b>Next</b> you agree to <b>Turia's <a href="https://www.turia.in/terms">Terms of Use</a>, <a href="https://www.turia.in/privacy">Privacy</a> and <a href="https://www.turia.in/privacy">Data Protection Policies</a>.</b></p>
              </Label>
            </div>

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
