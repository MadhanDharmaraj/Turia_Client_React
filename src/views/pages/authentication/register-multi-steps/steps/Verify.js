// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import { ChevronLeft, ChevronRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, InputGroup, InputGroupText, FormFeedback } from 'reactstrap'

// ** Card Images
// import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
// import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
// import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
// import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
// import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
// import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
// import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
// import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

// const cardsObj = {
//   jcb: jcbCC,
//   uatp: uatpCC,
//   visa: visaCC,
//   amex: amexCC,
//   diners: dinersCC,
//   maestro: maestroCC,
//   discover: discoverCC,
//   mastercard: mastercardCC
// }

const Verify = ({ stepper }) => {
  // ** States

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { cardNumber: '' }
  })

  const onSubmit = data => {
    if (data.cardNumber && data.cardNumber.length > 0) {
      stepper.next()
    } else {
      setError('cardNumber', {
        type: 'manual'
      })
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
            <InputGroup className='input-group-merge'>
              <Controller
                name='cardNumber'
                control={control}
                render={({ field }) => (
                  <Cleave
                    {...field}
                    id='credit-card'
                    placeholder='1356'
                    className={classnames('form-control', { 'is-invalid': errors.cardNumber })}
                  />
                )}
              />
            </InputGroup>
            {errors.cardNumber && <FormFeedback className='d-block'>Please enter a valid card number</FormFeedback>}
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
