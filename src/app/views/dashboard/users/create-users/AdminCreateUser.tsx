import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {
  EmailValidation,
  maxLength,
  MaxLength,
  minLength,
  PasswordValidation,
  PhoneValidation,
  Required,
} from '../../../../utils/patterns'
import '../../../../../assets/css/views/dashboard/create-users.scss'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {IUserAdminPanelRegistration} from '../../../../interfaces/IUser'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import PasswordInput from '../../../../components/authentication/PasswordInput'
import EmailInput from '../../../../components/authentication/EmailInput'
import PhoneInput from '../../../../components/authentication/PhoneInput'
import SelectField from '../../../../components/dashboard/SelectField'
import {RoleServices} from '../../../../services/api-services/role-services'
import {IRolesListing} from '../../../../interfaces/IRole'
import {UserAuthService} from '../../../../services/api-services/user-auth-api.service'
import {toast} from 'react-toastify'
import {useUserContext} from '../../../../providers/UserProvider'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function AdminCreateUser() {
  const {isRestaurantAdmin, user, isUserReady, establishmentId, establishments} = useUserContext()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [roles, setRoles] = useState<IRolesListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<IUserAdminPanelRegistration>({
    mode: 'onChange',
  })
  const navigator = useNavigate()
  const onSubmit = async (data: IUserAdminPanelRegistration) => {
    setLoading(true)
    data.device_type = 'web'
    data.device_token = 'api_hjkaldshfjakshldfjaklhjaksdhfjkl'
    data.image = 'file/user/image.jpg'

    const media = data.user_media
    if (media && media.length > 0) {
      data.image_url = media[0].path
    }
    delete data.user_media

    const res = await UserAuthService.registerUser(data)
    if (res.status) {
      toast.success(res.message)
      reset()
      navigator(`/users`)
    }
    setLoading(false)
  }
  const fetchRoles = async (establishment: number | null) => {
    const res = await RoleServices.all(establishment)
    setRoles(res.data)
  }

  useEffect(() => {
    fetchRoles(establishmentId)
    setValue('role_id', null)
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  /*Set establishment in case of restaurant owner or establishment level employee*/
  useEffect(() => {
    if (!isRestaurantAdmin && isUserReady) {
      setValue('establishment_id', user.establishment_id)
    }
  }, [user, isUserReady])

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
              <div className={'createuser-fields'}>
                <Controller
                  name="establishment_id"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      defaultValue={establishmentId}
                      label={'Select Establishment'}
                      errors={errors.establishment_id}
                      field={field}
                      selectOptions={establishments}
                      // setSelectedEstablishment = {setSelectedEstablishment}
                      disabled={true}
                    />
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className={'mt-2'}>
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
              <Controller
                name="role_id"
                control={control}
                rules={{required: Required}}
                render={({field}) => (
                  <SelectField
                    label={'Select Role'}
                    errors={errors.role_id}
                    field={field}
                    selectOptions={roles}
                    disabled={!isUserReady}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <Controller
                name="pin"
                control={control}
                rules={{required: Required, minLength: minLength(4), maxLength: maxLength(4)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'1234'}
                    variant={'field-white'}
                    label={'POS Pin'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors.pin}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={'createuser-fields dfields'}>
              <label>Upload Profile</label>
              <ImageUpload maxCount={1} setValue={setValue} fieldName={'user_media'} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={'button-section'}>
              <ThemeButton
                onClick={() => navigator(-1)}
                type={'button'}
                className={'form-cancel'}
                text={'Cancel'}
              />
              <ThemeButton
                loader={loading}
                type={'submit'}
                className={'form-create'}
                text={'Create'}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
