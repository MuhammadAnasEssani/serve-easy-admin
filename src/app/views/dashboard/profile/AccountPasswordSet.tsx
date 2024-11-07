import React, {useRef, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {PasswordValidation, Required} from '../../../utils/patterns'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/account-personal-details.scss'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import PasswordInput from '../../../components/authentication/PasswordInput'
import {IAccountPasswordReset} from '../../../interfaces/IProfile'
import {UserAuthService} from '../../../services/api-services/user-auth-api.service'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function AccountPasswordSet() {
  const [loading, setLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showConfirmPassword, setConfirmShowPassword] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: {errors},
    clearErrors
  } = useForm<IAccountPasswordReset>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IAccountPasswordReset) => {
    setLoading(true)
    let response = await UserAuthService.changePassword(data)
    setLoading(false)
    if (response.status) {
      toast.success(response.message)
      editForm()
    }
  }
  function editForm() {
    setEdit(!edit)
  }
  return (
    <div className={'account-personal-detail'}>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={'personal-details'}>
              <h2>Change Password</h2>
              {edit ? (
                <div className={'save-personal-details'}>
                  <label>Password</label>
                  <p>******************</p>
                  <button className={'btn btn-edit'} onClick={editForm}>
                    Edit
                  </button>
                  {/*<ThemeButton*/}
                  {/*    loader={loading}*/}
                  {/*    type={'submit'}*/}
                  {/*    className={'form-create'}*/}
                  {/*    text={'Edit'}*/}
                  {/*    onClick={editForm}*/}
                  {/*/>*/}
                </div>
              ) : (
                <div className={'edit-personal-details'}>
                  <Row>
                    <Col md={12}>
                      <div className={'dfields'}>
                        <Controller
                          defaultValue={''}
                          name="current_password"
                          control={control}
                          rules={{pattern: PasswordValidation, required: Required}}
                          render={({field}) => (
                            <PasswordInput
                              variant={'field-white'}
                              labelColor="dark"
                              label={'Old Password'}
                              type={'password'}
                              labelPos={'out'}
                              placeholder="Old Password"
                              successIcon={<AiFillEye />}
                              errorIcon={<AiOutlineEyeInvisible />}
                              showPassword={showPassword}
                              setShowPassword={setShowPassword}
                              errors={errors.current_password}
                              field={field}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={'dfields'}>
                        <Controller
                          defaultValue={''}
                          name="password"
                          control={control}
                          // rules = {{pattern : PasswordValidation}}
                          rules={{
                            validate: (value) =>{
                                if(value == getValues("password_confirmation")){
                                    clearErrors("password_confirmation")
                                    return true;
                                } else{
                                   return 'The passwords do not match'
                                }
                            }
                          }}
                          render={({field}) => (
                            <PasswordInput
                              variant={'field-white'}
                              labelColor="dark"
                              label={'New Password'}
                              type={'password'}
                              labelPos={'out'}
                              placeholder="New Password"
                              successIcon={<AiFillEye />}
                              errorIcon={<AiOutlineEyeInvisible />}
                              showPassword={showConfirmPassword}
                              setShowPassword={setConfirmShowPassword}
                              errors={errors.password}
                              field={field}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={'dfields'}>
                        <Controller
                          defaultValue={''}
                          name="password_confirmation"
                          control={control}
                          // rules = {{pattern : PasswordValidation}}
                          rules={{
                            validate: (value) =>{
                                if(value == getValues("password")){
                                    clearErrors("password")
                                    return true;
                                } else{
                                   return 'The passwords do not match'
                                }
                            }
                          }}
                          render={({field}) => (
                            <PasswordInput
                              variant={'field-white'}
                              labelColor="dark"
                              label={'Confirm Password'}
                              type={'password'}
                              labelPos={'out'}
                              placeholder="Confirm Password"
                              successIcon={<AiFillEye />}
                              errorIcon={<AiOutlineEyeInvisible />}
                              showPassword={showConfirmPassword}
                              setShowPassword={setConfirmShowPassword}
                              errors={errors.password_confirmation}
                              field={field}
                            />
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                  <ThemeButton
                    type={'submit'}
                    className={'form-create'}
                    text={'Update'}
                    loader={loading}
                  />
                  {/* <button className={'btn btn-save'} type={'submit'}>
                    Save
                  </button> */}
                  {/*<ThemeButton*/}
                  {/*    loader={loading}*/}
                  {/*    type={'submit'}*/}
                  {/*    className={'form-create'}*/}
                  {/*    text={'Save'}*/}
                  {/*    onClick={editForm}*/}
                  {/*/>*/}
                </div>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
