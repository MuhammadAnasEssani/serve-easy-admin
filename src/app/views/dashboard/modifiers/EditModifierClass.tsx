import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {IModifierClassCreate} from '../../../interfaces/IModifiers'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import {ModifierClassServices} from '../../../services/api-services/modifer-class-services'
import {toast} from 'react-toastify'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import {IGetEstablishmentDropdown} from '../../../interfaces/IGetEstablishment'
import SelectField from '../../../components/dashboard/SelectField'
import {useNavigate} from 'react-router-dom'
import {Switch} from 'antd'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import EditModifierClassSkeleton from '../../../skeletons/menu-management/modifiers/EditModifiersClassSkeleton'

export default function EditModifierClass({
  reloadTable,
  id,
  handleClose,
}: {
  reloadTable?: () => void
  id?: number
  handleClose?: () => void
}) {
  const {setTitle} = useUserContext()
  // const {id} = useParams<any>()
  const navigator = useNavigate()
  const {isRestaurantAdmin, user, isUserReady} = useUserContext()
  const [establishments, setEstablishments] = useState<IGetEstablishmentDropdown[]>([])
  const [change, setChange] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Modifiers')
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
    setSubmitLoader(true)
    const res = await ModifierClassServices.update(id?.toString(), data)

    if (res.status) {
      toast.success(res.message)
      setChange(!change)
      reset()
      navigator(`/modifiers`)
      if (reloadTable) {
        reloadTable()
      }
      if (handleClose) {
        handleClose()
      }
    }
    setSubmitLoader(false)
  }
  const getSingleModiferClass = async () => {
    setLoader(true)
    const res = await ModifierClassServices.getById(id?.toString())
    if (res.status) {
      reset(res.data)
    }
    setLoader(false)
  }
  const onChange = (data: any) => {
    setValue('multi_select', data)
  }
  useEffect(() => {
    /*Fetch All Establishments*/
    EstablishmentServices.all().then((res) => {
      setEstablishments(res.data)
    })
  }, [])
  useEffect(() => {
    getSingleModiferClass()
  }, [change])
  /*Set establishment in case of restaurant owner or establishment level employee*/
  useEffect(() => {
    !isRestaurantAdmin && isUserReady && setValue('establishment_id', user.establishment_id)
  }, [user])
  return (
    <>
      {!loader ? (
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
                          disabled={!isRestaurantAdmin}
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
                    // defaultValue={true}
                    // rules = {{required : Required}}
                    render={({field: {name, ...field}}) => {
                      return (
                        <>
                          <label className={'multi-select-label'}>Multi select</label>
                          <div>
                            <Switch checked={field.value} disabled={false} onChange={onChange} />
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
                  <ThemeButton className={'form-create'} text={'Update'} loader={submitLoader} />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditModifierClassSkeleton />
      )}
    </>
  )
}
