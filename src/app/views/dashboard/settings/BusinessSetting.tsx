import React, {Dispatch, useEffect, useState} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {ISettings} from '../../../interfaces/ISettings'
import {Col, Row} from 'react-bootstrap/'
import {maxLength, PhoneValidation, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import '../../../../assets/css/views/dashboard/business-setting.scss'
import PhoneInput from '../../../components/authentication/PhoneInput'

interface IBusiness {
  setIsValid: Dispatch<boolean>
}
export default function BusinessSetting({setIsValid}: IBusiness) {
  const {
    control,
    reset,
    formState: {errors, isSubmitting},
    watch,
    setError,
    clearErrors,
    setValue,
  } = useFormContext<ISettings>()
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const [showCPassword, setShowCPassword] = useState<boolean>(true)
  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = ['restaurant_business_profile']
    for (const field of fields) {
      if (errorsArray?.includes(field)) {
        setIsValid(false)
        break
      } else {
        setIsValid(true)
      }
    }
  }, [isSubmitting])
  return (
    <>
      <div className={'business-setting'}>
        <Row>
          <Col md={4}>
            <div className={'dfields'}>
              <Controller
                name="restaurant_business_profile.name"
                defaultValue={''}
                control={control}
                rules={{required: Required, maxLength: maxLength(100)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'business name'}
                    variant={'field-white'}
                    label={'Business Name'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors?.restaurant_business_profile?.name}
                  />
                )}
              />
            </div>
            <div className={'dfields'}>
              <Controller
                name="restaurant_business_profile.address"
                defaultValue={''}
                control={control}
                rules={{required: Required, maxLength: maxLength(100)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'address'}
                    variant={'field-white'}
                    label={'Address'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors?.restaurant_business_profile?.address}
                  />
                )}
              />
            </div>
            <div className={'dfields'}>
              {/*<Controller*/}
              {/*    name="restaurant_business_profile.phone"*/}
              {/*    defaultValue={0}*/}
              {/*    control={control}*/}
              {/*    rules = {{required:Required , pattern:PhoneValidation ,maxLength: maxLength(11)}}*/}
              {/*    render={({ field }) => (*/}
              {/*        <TextInput*/}
              {/*            placeholder={"phone"}*/}
              {/*            variant={"field-white"}*/}
              {/*            label={"Phone"}*/}
              {/*            labelPos={"out"}*/}
              {/*            labelColor={"dark"}*/}
              {/*            type={"number"}*/}
              {/*            field={field}*/}
              {/*            errors ={errors?.restaurant_business_profile?.phone}*/}
              {/*        />*/}
              {/*        */}
              {/*    )}*/}
              {/*/>*/}
              <Controller
                name="restaurant_business_profile.phone"
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
                    errors={errors?.restaurant_business_profile?.phone}
                    field={field}
                  />
                )}
              />
              <Controller
                name="monthly_sales_target"
                defaultValue={0}
                control={control}
                // rules={{required: Required, maxLength: maxLength(100)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'Monthly Sales Target'}
                    variant={'field-white'}
                    label={'Monthly Sales Target'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    // errors={errors?.restaurant_business_profile?.address}
                  />
                )}
              />
            </div>
            {/*<div className={"dfields"}>*/}
            {/*    <Controller*/}
            {/*        name="password"*/}
            {/*        control={control}*/}
            {/*        rules = {{pattern : PasswordValidation}}*/}
            {/*        render={({ field }) => (*/}
            {/*            <PasswordInput*/}
            {/*                variant={"field-white"}*/}
            {/*                labelColor="dark"*/}
            {/*                label={"Password"}*/}
            {/*                type={"password"}*/}
            {/*                labelPos={"out"}*/}
            {/*                placeholder="Password"*/}
            {/*                successIcon={<AiFillEye />}*/}
            {/*                errorIcon={<AiOutlineEyeInvisible />}*/}
            {/*                showPassword={showPassword}*/}
            {/*                setShowPassword={setShowPassword}*/}
            {/*                errors ={errors.password}*/}
            {/*                field={field}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className={"dfields"}>*/}
            {/*    <Controller*/}
            {/*        name="change_password"*/}
            {/*        control={control}*/}
            {/*        rules = {{pattern : PasswordValidation}}*/}
            {/*        render={({ field }) => (*/}
            {/*            <PasswordInput*/}
            {/*                variant={"field-white"}*/}
            {/*                labelColor="dark"*/}
            {/*                label={"Change Password"}*/}
            {/*                type={"password"}*/}
            {/*                labelPos={"out"}*/}
            {/*                placeholder="Change Password"*/}
            {/*                successIcon={<AiFillEye />}*/}
            {/*                errorIcon={<AiOutlineEyeInvisible />}*/}
            {/*                showPassword={showCPassword}*/}
            {/*                setShowPassword={setShowCPassword}*/}
            {/*                errors ={errors.change_password}*/}
            {/*                field={field}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}
          </Col>
        </Row>
      </div>
    </>
  )
}
