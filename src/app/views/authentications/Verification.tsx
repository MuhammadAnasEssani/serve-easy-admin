import React, {useState} from 'react'
import LogoImage from '../../../assets/images//logo-icon.svg'
import {Form} from 'react-bootstrap'
import ThemeBtn from '../../components/authentication/ThemeBtn'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import {success} from '../../utils/message'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Count Downn
import {message, Statistic} from 'antd'
import OtpInput from 'react-otp-input'
//css
import '../../../assets/css/components/authentication/otp-field.scss'
import {UserAuthService} from '../../services/api-services/user-auth-api.service'
import {useUserContext} from '../../providers/UserProvider'
import {BACKEND_CONSTANTS} from '../../config/constants'
import ThemeButton from '../../components/dashboard/ThemeButton'

export default function Verification() {
  const navigate = useNavigate()
  const {} = useUserContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
  })
  const [otpCode, setOtpCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleReceiveOTP = async (otpCodeInput: string) => {
    setLoading(true)
    let response = await UserAuthService.verifyOTP(otpCodeInput)
    setLoading(false)
    if (response.status) {
      navigate(BACKEND_CONSTANTS.DEFAULT_NAVIGATION_AFTER_LOGIN)
    }
  }

  const onSubmit = (data: object) => {
    if (otpCode.length === 0) {
      setError(true)
      setErrorMessage('Please Enter OTP code')
    } else if (otpCode.length > 0 && otpCode.length < 3) {
      setError(true)
      setErrorMessage('OTP code is incomplete')
    } else {
      setError(false)
      handleReceiveOTP(otpCode)
    }
  }
  const handleOtpChange = (otp: string) => {
    if (otp.length === 4) {
      handleReceiveOTP(otp)
    } else if (otp.length <= 0) {
      setError(true)
      setErrorMessage('Please Enter OTP code')
    } else if (otp.length > 0 && otp.length < 3) {
      setError(true)
      setErrorMessage('OTP code is incomplete')
    } else {
      setError(false)
    }
    setOtpCode(otp)
  }

  const [otpDisable, setOtpDisable] = useState<boolean>(true)
  const [deadline, setdeadline] = useState<number>(Date.now() + 1000 * 60)
  const {Countdown} = Statistic
  const onFinish = () => {
    setOtpDisable(false)
  }
  const RequestOtp = async () => {
    message.loading({content: 'Sending OTP...', duration: 0.2})
    let response = await UserAuthService.resendOTP()
    if (response.status) {
      message.success({content: 'OTP sent to email', duration: 1})
      setOtpCode('')
      setOtpDisable(true)
      setdeadline(Date.now() + 1000 * 60)
    }
  }
  return (
    <div className={'verification'}>
      <div className="Login-form">
        <div className="login-content">
          <img className="img-fluid mt-3 mb-3" src={LogoImage} />
          <h3>OTP VERIFICATION</h3>
          {/* <p>Check your email. We've sent you the PIN at jo****@***mail.com</p> */}
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

          <div className={'otp-field'}>
            <Countdown title="Otp Expire After " value={deadline} format="ss" onFinish={onFinish} />
            <OtpInput
              value={otpCode}
              onChange={(otp: string) => handleOtpChange(otp)}
              numInputs={4}
              isInputNum={true}
              placeholder={'----'}
              className={'OtpInput'}
              hasErrored={true}
              focusStyle="focus"
              isDisabled={!otpDisable}
            />

            {error && (
              <div className={'validation-error'} role="alert">
                {errorMessage}
              </div>
            )}
            <div className="otp-actions">
              <div>
                <p>
                  <a onClick={() => navigate('/')}>Use another account ?</a>
                </p>
              </div>

              <div className="count-container">
                {/* {!otpDisable && ( */}
                <p>
                  Didn't Get Code ? <a onClick={RequestOtp}> Request Again</a>
                </p>
                {/* )} */}
              </div>
            </div>
          </div>

          <div className="login-btns mt-3">
            <ThemeButton type={'submit'} text={'Submit'} variant={'primary'} loader={loading} />
          </div>
        </Form>
      </div>
    </div>
  )
}
