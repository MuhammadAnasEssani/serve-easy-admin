import React, {useEffect, useLayoutEffect, useState} from 'react'
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
import {defaultUser, IUser, IUserAdminPanelUpdate} from '../../../../interfaces/IUser'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import PasswordInput from '../../../../components/authentication/PasswordInput'
import EmailInput from '../../../../components/authentication/EmailInput'
import PhoneInput from '../../../../components/authentication/PhoneInput'
import SelectField from '../../../../components/dashboard/SelectField'
import {RoleServices} from '../../../../services/api-services/role-services'
import {IGetEstablishmentDropdown} from '../../../../interfaces/IGetEstablishment'
import {IRolesListing} from '../../../../interfaces/IRole'
import {UserAuthService} from '../../../../services/api-services/user-auth-api.service'
import {EstablishmentServices} from '../../../../services/api-services/establishment.services'
import {toast} from 'react-toastify'
import {useUserContext} from '../../../../providers/UserProvider'
import {useNavigate, useParams} from 'react-router-dom'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import EditAdminUserSkeleton from '../../../../skeletons/user-management/EditAdminUserSkeleton'

export default function AdminUser() {
  const {isRestaurantAdmin, user} = useUserContext()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [establishment, setEstablishment] = useState<IGetEstablishmentDropdown[]>([])
  const [selectedEstablishment, setSelectedEstablishment] = useState<number | null>(null)
  const [roles, setRoles] = useState<IRolesListing[]>([])
  const [singleUser, setSingleUser] = useState<IUser>(defaultUser)
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  const navigate = useNavigate()
  const {id} = useParams<any>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<IUserAdminPanelUpdate>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IUserAdminPanelUpdate) => {
    setSubmitLoader(true)
    data.device_type = 'web'
    data.device_token = 'api_hjkaldshfjakshldfjaklhjaksdhfjkl'
    data.image = 'file/user/image.jpg'
    !data.password && delete data.password

    const media = data.user_media
    if (media && media.length > 0) {
      data.image_url = media[0].path
    }
    delete data.user_media

    const res = await UserAuthService.updateUser(id, data)
    if (res.status) {
      toast.success(res.message)
      reset()
      navigate('/users', {replace: true})
    }
    setSubmitLoader(false)
  }
  const fetchRoles = async (establishment: number | null) => {
    const res = await RoleServices.all(establishment)
    setRoles(res.data)
  }
  const fetchEstablishment = async () => {
    /*Fetch All Establishments*/
    EstablishmentServices.all().then((res) => {
      setEstablishment(res.data)
    })
  }

  const getSingleUser = async () => {
    setLoader(true)
    const result = await UserAuthService.getById(id)
    setSingleUser(result.data)
    setSelectedEstablishment(result.data.establishment_id)
    reset(result.data)
    setValue('role_id', result.data.roles[0].id)
    setLoader(false)
  }

  useEffect(() => {
    fetchEstablishment()
  }, [])

  useEffect(() => {
    fetchRoles(selectedEstablishment)
    setValue('role_id', null)
  }, [selectedEstablishment])

  /*Set establishment in case of restaurant owner or establishment level employee*/
  useLayoutEffect(() => {
    if (!isRestaurantAdmin && user.establishment_id > 0) {
      setValue('establishment_id', user.establishment_id)
      setSelectedEstablishment(user.establishment_id)
    }
    getSingleUser()
  }, [user])

  return (
    <>
      {!loader ? (
        <div className={'pos-create-users'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={'file/user/image.jpg'} {...register('image')} />
            <input type="hidden" value={'web'} {...register('device_type')} />
            <input type="hidden" value={'api_desktop'} {...register('device_token')} />
            <Row className={'mt-2'}>
              <Col md={6}>
                <div className={'createuser-fields dfields'}>
                  <Controller
                    name="full_name"
                    defaultValue={singleUser?.full_name || 'sdfsd'}
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
                        loader={loader}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className={'createuser-fields dfields'}>
                  <Controller
                    name="phone"
                    defaultValue={singleUser.phone || ''}
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
                        loader={loader}
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
                    defaultValue={singleUser.email || ''}
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
                        disabled={true}
                        loader={loader}
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
                      defaultValue={singleUser.establishment_id || 0}
                      control={control}
                      rules={{required: Required}}
                      render={({field}) => (
                        <SelectField
                          defaultValue={''}
                          label={'Select Establishment'}
                          errors={errors.establishment_id}
                          field={field}
                          selectOptions={establishment}
                          // setSelectedEstablishment = {setSelectedEstablishment}
                          disabled={!isRestaurantAdmin}
                          loader={loader}
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
                    rules={{pattern: PasswordValidation}}
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
                        loader={loader}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className={'createuser-fields dfields'}>
                  <Controller
                    name="role_id"
                    defaultValue={singleUser.roles[0].id || null}
                    control={control}
                    rules={{required: Required}}
                    render={({field}) => (
                      <SelectField
                        label={'Select Role'}
                        errors={errors.role_id}
                        field={field}
                        selectOptions={roles}
                        disabled={false}
                        loader={loader}
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
                    defaultValue={singleUser.pin}
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
                        loader={loader}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className={'createuser-fields dfields'}>
                  <label>Upload Profile</label>
                  <ImageUpload
                    maxCount={1}
                    setValue={setValue}
                    fieldName={'user_media'}
                    value={singleUser.user_image?.mediaUrl || null}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mb-4 mt-4'} md={12}>
                <div className={'button-section'}>
                  <ThemeButton
                    onClick={() => navigate(-1)}
                    type={'button'}
                    className={'form-cancel'}
                    text={'Cancel'}
                  />
                  <ThemeButton
                    loader={submitLoader}
                    type={'submit'}
                    className={'form-create'}
                    text={'Save'}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditAdminUserSkeleton />
      )}
    </>
  )
}
