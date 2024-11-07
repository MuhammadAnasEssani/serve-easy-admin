import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {IModifierClassCreate} from '../../../interfaces/IModifiers'
import {useUserContext} from '../../../providers/UserProvider'
import ThemeBtn from '../../../components/authentication/ThemeBtn'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import {ModifierClassServices} from '../../../services/api-services/modifer-class-services'
import {toast} from 'react-toastify'
import SelectField from '../../../components/dashboard/SelectField'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useNavigate} from 'react-router-dom'
import {Switch} from 'antd'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function CreateModifierClass({reloadTable, id}: {reloadTable?: any; id?: number}) {
  const [loader, setLoader] = useState<boolean>(false)
  const {setTitle} = useUserContext()
  const navigator = useNavigate()
  const {isRestaurantAdmin, user, isUserReady, establishmentId, establishments} = useUserContext()
  useEffect(() => {
    setTitle('Modifier Class')
  }, [])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<IModifierClassCreate>({
    mode: 'onChange',
  })

  const onSubmit = async (data: IModifierClassCreate) => {
    setLoader(true)
    const res = await ModifierClassServices.store(data)
    if (res.status) {
      reloadTable()
      toast.success(res.message)
      reset({
        establishment_id: establishmentId,
      })
      reloadTable()
    }
    setLoader(false)
  }

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  const onChange = (data: any) => {
    setValue('multi_select', data)
  }
  return (
    <>
      <div className={'add-modifier-class'}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <div className={'modifier-fields dfields'}>
                <Controller
                  name="name"
                  defaultValue={''}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(100)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'name'}
                      variant={'field-white'}
                      label={'Name'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.name}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={'modifier-fields dfields'}>
                <Controller
                  name="max_amount"
                  defaultValue={0}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(15)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'max amount'}
                      variant={'field-white'}
                      label={'Max Amount'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'number'}
                      field={field}
                      errors={errors.max_amount}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={'modifier-fields dfields'}>
                <Controller
                  name="min_amount"
                  defaultValue={0}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(15)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'min amount'}
                      variant={'field-white'}
                      label={'Min Amount'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'number'}
                      field={field}
                      errors={errors.min_amount}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={'dfields createrole-fields'}>
                <Controller
                  name="establishment_id"
                  control={control}
                  rules={{required: Required}}
                  render={({field: {name, ...field}}) => {
                    return (
                      <SelectField
                        label={'Select Establishment'}
                        errors={errors.establishment_id}
                        field={field}
                        selectOptions={establishments}
                        disabled={true}
                      />
                    )
                  }}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className={'offcanvas-switch dfields'}>
                <Controller
                  name="multi_select"
                  control={control}
                  defaultValue={true}
                  // rules = {{required : Required}}
                  render={({field: {name, ...field}}) => {
                    return (
                      <>
                        <label className={'multi-select-label'}>Multi select</label>
                        <div>
                          <Switch disabled={false} defaultChecked={true} onChange={onChange} />
                        </div>
                      </>
                    )
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={'mb-4 mt-4'} md={12}>
              <div className={'button-section'}>
                <ThemeButton className={'form-create'} text={'Create'} loader={loader} />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}
