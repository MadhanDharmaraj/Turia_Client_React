// ** React Imports
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '@src/configs/axios/axiosConfig'
// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, FormFeedback } from 'reactstrap'
import useJwt from '@src/auth/jwt/useJwt'
// ** Styles
import { inviteregister, createOrganizationUser } from './register-multi-steps/store/index'
import { AbilityContext } from '@src/utility/context/Can'
import { handleLogin } from '@store/authentication'
import '@styles/react/pages/page-authentication.scss'
import { useEffect, useState, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeRouteForLoggedInUser } from '@utils'

const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const invitationRegister = () => {

  const { uniquekey } = useParams()
  const [invitaion, setInvitation] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate({})
  const ability = useContext(AbilityContext)
  const store = useSelector(state => state.register)

  const SignupSchema = yup.object().shape({
    uniquekey: yup.string().default(uniquekey),
    name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().required().matches(
      passwordRegx,
      "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
  })

  const {
    control,
    handleSubmit,
    formState: { errors }, setValue
  } = useForm({
    defaultValues: SignupSchema.cast(),
    resolver: yupResolver(SignupSchema)
  })

  const getInvitation = () => {
    axios.post('/invitations/getinvitation', { uniquekey })
      .then((res) => {
        setInvitation(res.data.invitation)
        setValue('email', res.data.invitation.email)
        setValue('name', `${res.data.invitation.firstname} ${res.data.invitation.lastname}`)
      })
      .catch((err) => { console.log(err) })
  }

  const onSubmit = async (data) => {
    await dispatch(inviteregister(data))

    useJwt
      .login({ email: data.email, password: data.password })
      .then(res => {
        const data = res.data
        data.role = 'admin'
        data.ability = [
          {
            action: 'manage',
            subject: 'all'
          }
        ]
        dispatch(handleLogin(data))
        ability.update(data.ability)

        toast(t => (
          <ToastContent t={t} name={data.name} />
        ))
      })
      .catch(err => console.log(err))

  }

  const createOrgUser = async (data) => {
    await dispatch(createOrganizationUser(data))
  }

  useEffect(async () => {
    if (store.registerSuccess) {
      const user = store.loginUser
      navigate(getHomeRouteForLoggedInUser(user.role))
    }
  }, [store.registerSuccess])

  useEffect(async () => {
    if (store.loginUser !== null) {
      const OrgUser = {}
      const fullname = `${invitaion.firstname} ${invitaion.lastname}`
      OrgUser['name'] = fullname
      OrgUser['email'] = invitaion.email
      OrgUser['departmentId'] = invitaion.designationid
      OrgUser['designationId'] = invitaion.departmentid
      OrgUser['userTypeId'] = invitaion.usertypeid
      OrgUser['organizationId'] = invitaion.organizationid
      OrgUser['roleId'] = invitaion.roleid

      createOrgUser(OrgUser)
    }
    if (store.loginError !== null) {
      errors.email = store.loginError.email
    }
  }, [dispatch, store.loginUser, store.loginError])

  useEffect(() => {
    if (uniquekey) {
      getInvitation()
    }
  }, [uniquekey])

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ms-1'>Turia</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to Turia! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label required' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      disabled
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label required' for='login-password'>
                    Password
                  </Label>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
                {errors.password && <FormFeedback>{errors.password?.message}</FormFeedback>}
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button color='primary' block>
                Sign in
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default invitationRegister