import React from 'react'
import LogoImage from '../../../assets/images//logo-icon.svg'
import {Form} from 'react-bootstrap'
import FormCard from '../../components/authentication/FormCard'
import EmailInput from '../../components/authentication/EmailInput'
import {BiEnvelope} from 'react-icons/bi'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import {IoCloseCircleOutline} from 'react-icons/io5'
import {EmailValidation} from '../../utils/patterns'
import ThemeBtn from '../../components/authentication/ThemeBtn'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {success} from '../../utils/message'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
  })
  const onSubmit = () => {
    console.log('run')
    success('Email has been sent')
    setTimeout(() => {
      navigate('/verification')
    }, 1500)
  }
  return (
    <div className={'forgot-password'}>
      <div className="Login-form">
        <div className="login-content">
          <img className="img-fluid mt-3 mb-3" src={LogoImage} />
          <h3>We need to verify your identity</h3>
          <p>How would you like to get your security code?</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <FormCard bgColor="dark">
            <EmailInput
              fieldIcon={<BiEnvelope />}
              variant="field-dark"
              labelPos="in"
              labelColor="white"
              label={'Email'}
              type={'email'}
              successIcon={<IoIosCheckmarkCircle />}
              errorIcon={<IoCloseCircleOutline />}
              placeholder="John@serveeasy.com"
              register={{
                ...register('email', {
                  pattern: EmailValidation,
                  required: true,
                }),
              }}
              errors={errors.email}
            />
          </FormCard>
          <div className="login-btns mt-3">
            <ThemeBtn type={'submit'} text={'Submit'} variant={'primary'} />
          </div>
        </Form>
      </div>
    </div>
  )
}
