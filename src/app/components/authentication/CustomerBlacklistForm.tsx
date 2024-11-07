import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useUserContext} from '../../providers/UserProvider'
import {useNavigate} from 'react-router'
import {Controller, useForm} from 'react-hook-form'
import ThemeButton from '../dashboard/ThemeButton'
import {Required, maxLength} from '../../utils/patterns'
import TextInput from './TextInput'
import {ICustomerBlacklistCreate} from '../../interfaces/ICustomerManagement'
import DescriptionField from './DescriptionField'

export default function CustomerBlacklistForm({
  name,
  onSubmit,
  loading,
}: {
  name: string
  onSubmit: (payload: ICustomerBlacklistCreate) => void
  loading: boolean
}) {
  const navigator = useNavigate()
  const {isUserReady, user} = useUserContext()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
    getValues,
    clearErrors,
  } = useForm<ICustomerBlacklistCreate>({
    mode: 'onChange',
  })

  return (
    <>
      <div className={'add-modifier-class'}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <div className={'modifier-fields dfields'}>
                <div className="single-label">Customer Name</div>
                <div className="single-value">{name}</div>
              </div>
            </Col>
            <Col md={12}>
              <div className={'modifier-fields dfields'}>
                <Controller
                  name="reason"
                  defaultValue={''}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(100)}}
                  render={({field}) => (
                    <DescriptionField
                      variant={'field-white'}
                      label={'Reason'}
                      labelPos={'out'}
                      placeholder={'Add Reason'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.reason}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={'mb-4 mt-4'} md={12}>
              <div className={'button-section'}>
                <ThemeButton
                  className={'form-create'}
                  text={'Submit'}
                  type={'submit'}
                  loader={loading}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}
