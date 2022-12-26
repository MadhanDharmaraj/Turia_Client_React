import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'

const SecurityContetTab = () => {
    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup
            .string()
            .required()
            .oneOf([yup.ref(`password`), null], 'Passwords must match')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: schema.cast()
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Card>
            <CardHeader className='border-bottom'>
                <CardTitle tag='h4'> Reset Password </CardTitle>
            </CardHeader>
            <CardBody className='pt-2'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col sm='6'>
                            <FormGroup>
                                <Controller
                                    id='oldPassword'
                                    name='oldPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <InputPasswordToggle label='Old Password' className='input-group-merge' invalid={errors.oldPassword && true} {...field} />
                                    )}
                                />
                                {errors.oldPassword && <FormFeedback>{errors.oldPassword?.message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <FormGroup>
                                <Controller
                                    id='password'
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <InputPasswordToggle label='Password' className='input-group-merge' invalid={errors.password && true} {...field} />
                                    )}
                                />
                                {errors.password && <FormFeedback>{errors.password?.message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col sm='6'>
                            <FormGroup>
                                <Controller
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <InputPasswordToggle label='Confirm Password' className='input-group-merge' invalid={errors.confirmPassword && true} {...field} />
                                    )}
                                />
                                {errors.confirmPassword && <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col className='mt-1' sm='12'>
                            <Button.Ripple type='submit' className='mr-1' color='primary'>
                                Save changes
                            </Button.Ripple>
                            <Button.Ripple color='secondary' outline className='ms-1'>
                                Cancel
                            </Button.Ripple>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default SecurityContetTab
