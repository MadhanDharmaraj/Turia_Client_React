// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  CardBody,
  InputGroup,
  FormFeedback,
  InputGroupText
} from 'reactstrap'

// ** Third Party Components
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'


const PaymentMethods = () => {
  // ** States
  const [cardType, setCardType] = useState('')

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { cardInput: '' } })

  const onSubmit = data => {
    if (data.cardInput.length <= 0) {
      setError('cardInput', {
        type: 'manual',
        message: 'Please Enter Valid Card Number'
      })
    }
  }


  return (
    <Fragment>
      <Card>
        <CardBody className='py-25'>
          <Row className='gx-4'>
            <Col lg='6'>
              <Row tag={Form} className='gx-2 gy-1' onSubmit={handleSubmit(onSubmit)}>

                <Col xs={6}>
                  <Label className='form-label' for='credit-card'>
                    Account Name
                  </Label>
                  <InputGroup>
                    <Controller
                      id='credit-card'
                      name='cardInput'
                      control={control}
                      placeholder='1356 3215 6548 7898'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          name='cardInput'
                          className={classnames('form-control', { 'is-invalid': errors.cardInput })}
                          options={{ creditCard: true, onCreditCardTypeChanged: type => setCardType(type) }}
                        />
                      )}
                    />
                    {cardType !== '' && cardType !== 'unknown' ? (
                      <InputGroupText>
                        <img height='24' alt='card-type' src={cardsObj[cardType]} />
                      </InputGroupText>
                    ) : null}
                  </InputGroup>
                  {errors.cardInput ? (
                    <FormFeedback className='d-block'>{errors.cardInput.message}</FormFeedback>
                  ) : null}
                </Col>
                <Col md={6}>
                  <Label className='form-label' for='card-name'>
                    Bank Name
                  </Label>
                  <Input id='card-name' placeholder='' />
                </Col>
                <Col md={6}>
                  <Label className='form-label' for='card-name'>
                    Account Number
                  </Label>
                  <Input id='card-name' placeholder='' />
                </Col>
                <Col md={6}>
                  <Label className='form-label' for='card-name'>
                    IFSC Code
                  </Label>
                  <Input id='card-name' placeholder='' />
                </Col>
                <Col md={6}>
                  <Label className='form-label' for='card-name'>
                    Branch Name
                  </Label>
                  <Input id='card-name' placeholder='' />
                </Col>

                <Col md={6}>
                  <Label className='form-label' for='card-name'>
                    Account Type
                  </Label>
                  <Input id='card-name' placeholder='' />
                </Col>

                <Col md={12}>
                  <Label className='form-label' for='card-name'>
                    Description
                  </Label>
                  <Input id='card-name' placeholder='' type='textarea' />
                </Col>

                
                <Col className='mt-2 pt-1' xs={12}>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
                  </Button>
                  <Button color='secondary' outline>
                    Cancel
                  </Button>
                </Col>

              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      
    </Fragment>
  )
}

export default PaymentMethods
