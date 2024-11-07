import React, {useRef, useState} from 'react'
import LogoImage from '../../../assets/images//logo-icon.svg'
import {Form} from 'react-bootstrap'
import FormCard from '../../components/authentication/FormCard'
import {PasswordValidation} from '../../utils/patterns'
import ThemeBtn from '../../components/authentication/ThemeBtn'
import {Controller, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PasswordInput from '../../components/authentication/PasswordInput'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {message} from 'antd'

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showCPassword, setShowCPassword] = useState<boolean>(true)
  const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(true)
  const navigate = useNavigate()
  const onSubmit = () => {
    console.log('run')
    message.loading({content: 'Changing Password...'})
    setTimeout(() => {
      message.success({content: 'Password Change Successfully!', duration: 2})
      navigate('/')
    }, 1000)
  }
  //React Form
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
  })
  const password = useRef({})
  password.current = watch('password', '')

  return (
    <div className={'verification'}>
      <div className="Login-form">
        <div className="login-content">
          <img className="img-fluid mt-3 mb-3" src={LogoImage} />
          <h3>RESET PASSWORD</h3>
          <p>Please enter a new password different from your old one</p>
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
            <Controller
              name="password"
              control={control}
              rules={{pattern: PasswordValidation}}
              render={({field}) => (
                <PasswordInput
                  variant={'field-white'}
                  labelColor="dark"
                  label={'Password'}
                  type={'password'}
                  labelPos={'out'}
                  placeholder="Password"
                  successIcon={<AiFillEye />}
                  errorIcon={<AiOutlineEyeInvisible />}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  errors={errors.password}
                  field={field}
                />
              )}
            />
            <Controller
              name="cpassword"
              control={control}
              rules={{
                validate: (value) => value == password.current || 'The password does not match',
              }}
              render={({field}) => (
                <PasswordInput
                  variant={'field-white'}
                  labelColor="dark"
                  label={'Password'}
                  type={'password'}
                  labelPos={'out'}
                  placeholder="Password"
                  successIcon={<AiFillEye />}
                  errorIcon={<AiOutlineEyeInvisible />}
                  showPassword={showCPassword}
                  setShowPassword={setShowCPassword}
                  errors={errors.cpassword}
                  field={field}
                />
              )}
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
