import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import {IoCloseCircleOutline, IoKeyOutline} from 'react-icons/io5'
import {BiEnvelope} from 'react-icons/bi'
import '../../../assets/css/views/login.scss'
import EmailInput from '../../components/authentication/EmailInput'
import PasswordInput from '../../components/authentication/PasswordInput'
import FormCard from '../../components/authentication/FormCard'
import {Controller, useForm} from 'react-hook-form'
import {EmailValidation, MaxLength, MinLength, PasswordValidation, Required} from '../../utils/patterns'
import LogoImage from '../../../assets/images//logo-icon.svg'
import {Link, useNavigate} from 'react-router-dom'
import {IAuth} from '../../interfaces/IAuth'
import {UserAuthService} from '../../services/api-services/user-auth-api.service'
import {getTokens} from '../../../app/services/helper/firebase'
import ThemeButton from '../../components/dashboard/ThemeButton'
import {BACKEND_CONSTANTS, ROLES} from '../../config/constants'
import {toast} from 'react-toastify'

export default function SuperAdminLogin() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm<IAuth>({
    mode: 'onChange',
  })

  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)

  const onSubmit = async (data: IAuth) => {
    setLoader(true)

    let deviceToken = null
    let permission = await window.Notification.requestPermission()

    if (permission === 'granted') {
      deviceToken = await getTokens()
      if (!deviceToken) toast.error('Unable to get device token!')
    }

    data.device_type = 'web'
    data.device_token = deviceToken || 'web'
    data.platform = 'web'
    const res = await UserAuthService.superAdminlogin(data)
    setLoader(false)
    if (res.status) {
        navigate(BACKEND_CONSTANTS.DEFAULT_SUPER_ADMIN_NAVIGATION,
          {replace: true}
        )
    }
  }

  return (
    <div className="Login-form">
      <div className="login-content">
        <img className="img-fluid mt-3 mb-3" src={LogoImage} />
        <h3>
          Super Admin Login
        </h3>
        <p>
          To keep connected with us please login with your information by email address and
          password
        </p>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={'web'} {...register('device_type')} />
        <input type="hidden" value={'api_web'} {...register('device_token')} />
        <FormCard bgColor="dark">
          <Controller
            name="email"
            defaultValue={''}
            control={control}
            rules={{required: Required, pattern: EmailValidation}}
            render={({field}) => (
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
                errors={errors.email}
                field={field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            rules={{required: Required, pattern: PasswordValidation, minLength: MinLength, maxLength: MaxLength}}
            render={({field}) => (
              <PasswordInput
                fieldIcon={<IoKeyOutline />}
                variant={'field-dark'}
                labelColor="white"
                label={'Password'}
                type={'password'}
                labelPos={'in'}
                placeholder="Password"
                successIcon={<AiOutlineEyeInvisible />}
                errorIcon={<AiFillEye />}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                errors={errors.password}
                field={field}
              />
            )}
          />
        </FormCard>

        <div className="login-btns">
          <ThemeButton type={'submit'} text={'Sign In'} loader={loader} />
        </div>
      </Form>
    </div>
  )
}
