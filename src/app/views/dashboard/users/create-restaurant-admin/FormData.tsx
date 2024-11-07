import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {EmailValidation, MaxLength, PasswordValidation, PhoneValidation, Required} from '../../../../utils/patterns'
import '../../../../../assets/css/views/dashboard/create-users.scss'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {IRegisterRestaurantOwner} from '../../../../interfaces/IUser'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import PasswordInput from '../../../../components/authentication/PasswordInput'
import EmailInput from '../../../../components/authentication/EmailInput'
import PhoneInput from '../../../../components/authentication/PhoneInput'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {IRestaurantListing} from '../../../../interfaces/IRestaurant'
import {RestaurantService} from '../../../../services/api-services/restaurant.service'
import {UserAuthService} from '../../../../services/api-services/user-auth-api.service'
import SelectField from '../../../../components/dashboard/SelectField'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function FormData() {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [restaurants, setRestaurants] = useState<IRestaurantListing[]>([])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<IRegisterRestaurantOwner>({
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const onSubmit = async (data: IRegisterRestaurantOwner) => {
    setLoading(true)
    data.device_type = 'web'
    data.device_token = 'api_hjkaldshfjakshldfjaklhjaksdhfjkl'
    data.image = 'file/user/image.jpg'
    const res = await UserAuthService.registerRestaurantAdmin(data)
    setLoading(false)
    if (res.status) {
      toast.success(res.message)
      reset()
      navigate(`/admins`)
    }
  }

  useEffect(() => {
    RestaurantService.all().then((res) => {
      setRestaurants(res.data)
    })
  }, [])

  return (
    <div className={'pos-create-users'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={'file/user/image.jpg'} {...register('image')} />
        <input type="hidden" value={'web'} {...register('device_type')} />
        <input type="hidden" value={'api_web'} {...register('device_token')} />
        <Row className={'mt-2'}>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <Controller
                name="full_name"
                defaultValue={''}
                control={control}
                rules={{
                  required: Required,
                  minLength: {value: 3, message: 'Max length is 3'},
                  maxLength: MaxLength,
                }}
                render={({field}) => (
                  <TextInput
                    placeholder={'Full Name'}
                    variant={'field-white'}
                    label={'Full Name'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors.full_name}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <Controller
                name="phone"
                defaultValue={''}
                control={control}
                rules={{required: Required, pattern: PhoneValidation}}
                render={({field}) => (
                  <PhoneInput
                    variant="field-white"
                    labelPos="out"
                    labelColor="dark"
                    label={'Phone'}
                    type={'text'}
                    placeholder="Number"
                    errors={errors.phone}
                    field={field}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row className={'mt-2'}>
          <Col md={6}>
            <div className={'dfields createuser-fields'}>
              <Controller
                name="email"
                defaultValue={''}
                control={control}
                rules={{pattern: EmailValidation, required: Required}}
                render={({field}) => (
                  <EmailInput
                    variant="field-white"
                    labelPos="out"
                    labelColor="dark"
                    label={'Email'}
                    type={'email'}
                    placeholder="John@serveeasy.com"
                    errors={errors.email}
                    field={field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <Controller
                name="password"
                defaultValue={''}
                control={control}
                rules={{pattern: PasswordValidation, required: Required}}
                render={({field}) => (
                  <PasswordInput
                    variant={'field-white'}
                    labelColor="dark"
                    label={'Password'}
                    type={'password'}
                    labelPos={'out'}
                    placeholder={'Password'}
                    successIcon={<AiFillEye />}
                    errorIcon={<AiOutlineEyeInvisible />}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    errors={errors.password}
                    field={field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <div className={'createuser-fields'}>
                <Controller
                  name="restaurant_id"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      label={'Select Restaurant'}
                      errors={errors.restaurant_id}
                      field={field}
                      selectOptions={restaurants}
                      // setSelectedEstablishment = {setSelectedEstablishment}
                      disabled={false}
                    />
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <label>Upload Profile</label>
              <ImageUpload maxCount={1} setValue={setValue} fieldName={'image'} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mb-4 mt-4'} md={12}>
            <div className={'estab-bts'}>
              <ThemeButton type={'button'} className={'form-cancel'} text={'Cancel'} />
              <ThemeButton
                type={'submit'}
                className={'form-create'}
                text={'Create'}
                loader={loading}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
