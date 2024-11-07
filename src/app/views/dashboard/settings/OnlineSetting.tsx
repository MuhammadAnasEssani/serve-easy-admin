import React, {Dispatch, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap/'
import {Controller, useFormContext} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {ISettings} from '../../../interfaces/ISettings'
import '../../../../assets/css/views/dashboard/online-setting.scss'
import Heading from '../../../components/dashboard/Heading'

interface IOnline {
  setIsValid: Dispatch<boolean>
}

export default function OnlineSetting({setIsValid}: IOnline) {
  const {
    control,
    reset,
    formState: {errors, isSubmitting},
    watch,
    setError,
    clearErrors,
    setValue,
  } = useFormContext<ISettings>()
  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = ['delivery_radius', 'pickup_radius']
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
      <div className={'online-setting'}>
        <Row>
          <Col md={4}>
            <Heading>
              <h2>
                <span>Set Location Radius</span>
              </h2>
            </Heading>
            <div className={'radius-field'}>
              <div className={'dfields'}>
                <Controller
                  name="delivery_radius"
                  defaultValue={5}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(50000)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'300km'}
                      variant={'field-white'}
                      label={'Delivery Radius (km)'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'number'}
                      field={field}
                      errors={errors.delivery_radius}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="pickup_radius"
                  defaultValue={50}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(50000)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'300km'}
                      variant={'field-white'}
                      label={'Pickup Radius (km)'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'number'}
                      field={field}
                      errors={errors.pickup_radius}
                    />
                  )}
                />
              </div>
            </div>

            <div className={'social-links'}>
              <Heading>
                <h2>
                  <span>Social Networking URL</span>
                </h2>
              </Heading>
              <div className={'dfields'}>
                <Controller
                  name="facebook_url"
                  control={control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'url'}
                      variant={'field-white'}
                      label={'Facebook'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.facebook_url}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="twitter_url"
                  control={control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'url'}
                      variant={'field-white'}
                      label={'Twitter'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.twitter_url}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="instagram_url"
                  control={control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'url'}
                      variant={'field-white'}
                      label={'Instagram'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.instagram_url}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="google_plus_url"
                  control={control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'url'}
                      variant={'field-white'}
                      label={'Google'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.google_plus_url}
                    />
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

function setIsValid(arg0: boolean) {
  throw new Error('Function not implemented.')
}
