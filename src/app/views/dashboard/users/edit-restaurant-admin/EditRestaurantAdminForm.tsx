import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {
  EmailValidation,
  MaxLength,
  PasswordValidation,
  PhoneValidation,
  Required,
} from '../../../../utils/patterns'
import '../../../../../assets/css/views/dashboard/create-users.scss'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {
  IGetRestaurantOwner,
  IRegisterRestaurantOwner,
  IUpdateRestaurantOwner,
} from '../../../../interfaces/IUser'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import PasswordInput from '../../../../components/authentication/PasswordInput'
import EmailInput from '../../../../components/authentication/EmailInput'
import PhoneInput from '../../../../components/authentication/PhoneInput'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {IRestaurantListing} from '../../../../interfaces/IRestaurant'
import {RestaurantService} from '../../../../services/api-services/restaurant.service'
import {UserAuthService} from '../../../../services/api-services/user-auth-api.service'
import SelectField from '../../../../components/dashboard/SelectField'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function EditRestaurantAdminForm() {
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
  } = useForm<IUpdateRestaurantOwner>({
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const {id} = useParams()
  const [singleUser, setSingleUser] = useState<IGetRestaurantOwner | null>(null)

  const onSubmit = async (data: IUpdateRestaurantOwner) => {
    setLoading(true)
    const payload: IUpdateRestaurantOwner = {
      full_name: data.full_name,
      user_image: data.user_image_input?.[0]?.path,
      password: data.password || undefined,
    }
    const res = await UserAuthService.updateRestaurantAdmin(id, payload)
    setLoading(false)
    if (res.status) {
      toast.success(res.message)
    }
  }

  const getSingleUser = async () => {
    setLoading(true)
    const result = await UserAuthService.getRestaurantAdmin(id)
    if (result.status) {
      setValue('full_name', result.data.full_name)
      setValue('phone', result.data.phone)
      setValue('email', result.data.email)
      setValue('restaurant_id', result.data.restaurant_id)
      setSingleUser(result.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    RestaurantService.all().then((res) => {
      setRestaurants(res.data)
    })
    getSingleUser()
  }, [])

  if (!singleUser) {
    return <></>
  }

  return (
    <div className={'pos-create-users'}>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
                    disabled={true}
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
                    disabled={true}
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
                // rules={{pattern: PasswordValidation, required: Required}}
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
                      disabled={true}
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
              <ImageUpload
                maxCount={1}
                setValue={setValue}
                fieldName={'user_image_input'}
                value={singleUser?.user_image?.mediaUrl || null}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mb-4 mt-4'} md={12}>
            <div className={'estab-bts'}>
              <ThemeButton
                type={'button'}
                className={'form-cancel'}
                text={'Cancel'}
                onClick={() => navigate('/admins')}
              />
              <ThemeButton
                type={'submit'}
                className={'form-create'}
                text={'Update'}
                loader={loading}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
