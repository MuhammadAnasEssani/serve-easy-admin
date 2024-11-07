import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/admin-profile.scss'
import {Tabs} from 'antd'
import {Controller, useForm} from 'react-hook-form'
import {EmailValidation, maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {IProfile, IProfileUpdate} from '../../../interfaces/IProfile'
import EmailInput from '../../../components/authentication/EmailInput'
import ImageUpload from '../../../components/dashboard/ImageUpload'
import {InboxOutlined} from '@ant-design/icons'
import AccountPasswordSet from './AccountPasswordSet'
import {useUserContext} from '../../../providers/UserProvider'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {UserAuthService} from '../../../services/api-services/user-auth-api.service'
import {toast} from 'react-toastify'
import defaultImage from '../../../../assets/images/icons/user_avatar.png'

export default function AdminProfile() {
  const {setTitle, user, isUserReady} = useUserContext()
  const [currentProfile, setCurrentProfile] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
    control,
    watch,
    getValues,
  } = useForm<IProfile>({
    mode: 'onChange',
  })
  useEffect(() => {
    setTitle('Admin Profile')
  })
  const content = (
    <div>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </div>
  )
  const uploadedImage = watch('image')

  useEffect(() => {
    if (isUserReady) {
      setValue('full_name', user.full_name)
      setValue('email', user.email)
      // setValue("image", user?.user_image?.mediaUrl || "")
      setCurrentProfile(user?.user_image?.mediaUrl || '')
    }
  }, [user, isUserReady])
  useEffect(() => {
    if (uploadedImage && uploadedImage[0]?.path) {
      let S3Url = process.env.REACT_APP_S3_END_POINT
      setCurrentProfile(`${S3Url}/${uploadedImage[0]?.path}`)
    }
  }, [uploadedImage])
  const handleUpdate = async () => {
    let image = getValues().image || []
    let payload: IProfileUpdate = {
      full_name: getValues().full_name,
      user_image: image[0]?.path,
    }
    setLoading(true)
    let response = await UserAuthService.updateProfile(payload)
    setLoading(false)
    if (response.status) {
      toast.success(response.message)
    }
  }
  return (
    <ViewCard>
      <div className={'admin-profile'}>
        <Container>
          <Row>
            <Col md={4}>
              <div className={'admin-profile-card'}>
                <div className={'admin-profile-card-header'}>
                  <div className={'profile-logo'}>
                    <img src={currentProfile || defaultImage} className={'img-fluid'} />
                  </div>
                  <div className={'profile-detail'}>
                    <div>
                      <h3>{user.roles[0]?.display_name}</h3>
                      <p>{user?.restaurant?.name}</p>
                      <h6>{user?.restaurant?.address} </h6>
                      {/* <GoPrimitiveDot/> 14 hours */}
                    </div>
                    {/*<div>*/}
                    {/*    <ThemeButton type={'button'} text={'Edit'} prefixIcon={<MdOutlineModeEditOutline/>}/>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className={'profile-card'}>
                <div className={'theme-tabs'}>
                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="My Details" key="1">
                      <div className={'personal-details'}>
                        <div className={'detail-box'}>
                          <Row>
                            <Col md={8}>
                              <div className={'dfields'}>
                                <Controller
                                  name="full_name"
                                  defaultValue={''}
                                  control={control}
                                  rules={{required: Required, maxLength: maxLength(100)}}
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
                            {/* <Col md={6}>
                                                            <div className={'dfields'}>
                                                                <Controller
                                                                    name="last_name"
                                                                    defaultValue={''}
                                                                    control={control}
                                                                    rules={{required: Required, maxLength: maxLength(100)}}
                                                                    render={({field}) => (
                                                                        <TextInput
                                                                            placeholder={'Last Name'}
                                                                            variant={'field-white'}
                                                                            label={'Last Name'}
                                                                            labelPos={'out'}
                                                                            labelColor={'dark'}
                                                                            type={'text'}
                                                                            field={field}
                                                                            errors={errors.last_name}
                                                                        />
                                                                    )}
                                                                />
                                                            </div>
                                                        </Col> */}
                          </Row>
                        </div>
                        <div className={'detail-box'}>
                          <Row>
                            <Col md={8}>
                              <div className={'dfields'}>
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
                                      disabled={true}
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className={'detail-box'}>
                          <Row>
                            <Col md={8}>
                              <label className={'img-label'}>Your Photo</label>
                              <div className={'upload-profile'}>
                                <div className={'uploader'}>
                                  <img
                                    src={currentProfile || defaultImage}
                                    className={'img-fluid'}
                                  />
                                </div>
                                <div className={'dfields'}>
                                  <ImageUpload
                                    autoHideAfterUpload={true}
                                    maxCount={1}
                                    setValue={setValue}
                                    fieldName={'image'}
                                    body={content}
                                  />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="action-button">
                          <ThemeButton
                            type={'submit'}
                            className={'form-create'}
                            text={'Update'}
                            onClick={handleUpdate}
                            loader={loading}
                          />
                        </div>
                      </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Security" key="2">
                      <AccountPasswordSet />
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane tab="Branches" key="3">
                                        
                                            <div className={"branch-list"}>
                                                <ul>
                                                    <li>
                                                        <div className={"icon-box"}>
                                                            <img src={Branch} className={'img-fluid'}/>
                                                        </div>
                                                        <div className={'details'}>
                                                            <h3>12 Virginia Street 4479...</h3>
                                                            <p>Davago Building, 3rd floo</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={"icon-box"}>
                                                            <img src={Branch} className={'img-fluid'}/>
                                                        </div>
                                                        <div className={'details'}>
                                                            <h3>12 Rose Street 3659...</h3>
                                                            <p>Davago Building, 3rd floo</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={"icon-box"}>
                                                            <img src={Branch} className={'img-fluid'}/>
                                                        </div>
                                                        <div className={'details'}>
                                                            <h3>12 Wakefield Street, ...</h3>
                                                            <p>Davago Building, 3rd floo</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={"icon-box"}>
                                                            <img src={Branch} className={'img-fluid'}/>
                                                        </div>
                                                        <div className={'details'}>
                                                            <h3>12 Virginia Street 4479...</h3>
                                                            <p>Davago Building, 3rd floo</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Tabs.TabPane> */}
                  </Tabs>
                </div>
              </div>
            </Col>
            {/*<Col md={4}>*/}
            {/*    <div className={"profile-card"}>*/}
            {/*        <Heading>*/}
            {/*            <h2>*/}
            {/*                <span>Restaurant Establishments</span>*/}
            {/*            </h2>*/}
            {/*        </Heading>*/}
            {/*        <div className={"branch-list"}>*/}
            {/*            <ul>*/}
            {/*                <li>*/}
            {/*                    <div className={"icon-box"}>*/}
            {/*                        <img src={Branch} className={'img-fluid'}/>*/}
            {/*                    </div>*/}
            {/*                    <div className={'details'}>*/}
            {/*                        <h3>12 Virginia Street 4479...</h3>*/}
            {/*                        <p>Davago Building, 3rd floo</p>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*                <li>*/}
            {/*                    <div className={"icon-box"}>*/}
            {/*                        <img src={Branch} className={'img-fluid'}/>*/}
            {/*                    </div>*/}
            {/*                    <div className={'details'}>*/}
            {/*                        <h3>12 Rose Street 3659...</h3>*/}
            {/*                        <p>Davago Building, 3rd floo</p>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*                <li>*/}
            {/*                    <div className={"icon-box"}>*/}
            {/*                        <img src={Branch} className={'img-fluid'}/>*/}
            {/*                    </div>*/}
            {/*                    <div className={'details'}>*/}
            {/*                        <h3>12 Wakefield Street, ...</h3>*/}
            {/*                        <p>Davago Building, 3rd floo</p>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*                <li>*/}
            {/*                    <div className={"icon-box"}>*/}
            {/*                        <img src={Branch} className={'img-fluid'}/>*/}
            {/*                    </div>*/}
            {/*                    <div className={'details'}>*/}
            {/*                        <h3>12 Virginia Street 4479...</h3>*/}
            {/*                        <p>Davago Building, 3rd floo</p>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Col>*/}
          </Row>
        </Container>
      </div>
    </ViewCard>
  )
}
