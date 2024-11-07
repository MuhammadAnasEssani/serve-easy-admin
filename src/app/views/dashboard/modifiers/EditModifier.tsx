import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {IModifierClassList, IModifierCreate} from '../../../interfaces/IModifiers'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import SelectField from '../../../components/dashboard/SelectField'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import {IGetEstablishmentDropdown} from '../../../interfaces/IGetEstablishment'
import {ModifierClassServices} from '../../../services/api-services/modifer-class-services'
import {ModifierServices} from '../../../services/api-services/modifer-services'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import ImageUpload from '../../../components/dashboard/ImageUpload'
import EditModifierSkeleton from '../../../skeletons/menu-management/modifiers/EditModifiersSkeleton'

export default function EditModifier({
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
  const [modifierClasses, setModifierClasses] = useState<IModifierClassList[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>('')
  // const [change , setChange] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Edit Product Modifiers')
  }, [])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
    getValues,
    clearErrors,
  } = useForm<IModifierCreate>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IModifierCreate) => {
    setSubmitLoader(true)
    const media = data.modifier_media
    if (media && media.length > 0) {
      data.image_url = media[0].path
    }
    delete data.modifier_media

    const res = await ModifierServices.update(id?.toString(), data)
    if (res.status) {
      toast.success(res.message)
      if (reloadTable) {
        reloadTable()
      }
      if (handleClose) {
        handleClose()
      }
    }
    setSubmitLoader(false)
  }
  const getSingleModifier = async () => {
    setLoader(true)
    const res = await ModifierServices.getById(id?.toString())
    if (res.status) {
      reset(res.data)
      setImageUrl(res.data.modifier_image?.mediaUrl)
    }
    setLoader(false)
  }
  useEffect(() => {
    /*Fetch All Modifier Class*/
    ModifierClassServices.getAllModifiers().then((res) => {
      console.log(res.data)
      setModifierClasses(res.data)
    })

    /*Fetch All Establishments*/
    EstablishmentServices.all().then((res) => {
      setEstablishments(res.data)
    })

    getSingleModifier()
  }, [])

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
                    name="price"
                    defaultValue={0}
                    control={control}
                    rules={{
                      required: Required,
                      maxLength: maxLength(15),
                      validate: {
                        validate: (value) => {
                          if (Number(value) < Number(getValues().cost)) {
                            return 'modifier price should be greater then cost price'
                          } else {
                            clearErrors('cost')
                            return true
                          }
                        },
                      },
                    }}
                    render={({field}) => (
                      <TextInput
                        placeholder={'price'}
                        variant={'field-white'}
                        label={'Price'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.price}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className={'modifier-fields dfields'}>
                  <Controller
                    name="barcode"
                    defaultValue={0}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(8)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'barcode'}
                        variant={'field-white'}
                        label={'Barcode'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.barcode}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className={'modifier-fields dfields'}>
                  <Controller
                    name="cost"
                    defaultValue={0}
                    control={control}
                    rules={{
                      required: Required,
                      maxLength: maxLength(15),
                      validate: {
                        validate: (value) => {
                          if (Number(value) > Number(getValues().price)) {
                            return 'Cost price should be less then modifier price'
                          } else {
                            clearErrors('price')
                            return true
                          }
                        },
                      },
                    }}
                    render={({field}) => (
                      <TextInput
                        placeholder={'cost'}
                        variant={'field-white'}
                        label={'Cost'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.cost}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className={'dfields createrole-fields'}>
                  <Controller
                    name="modifier_class_id"
                    control={control}
                    rules={{required: Required}}
                    render={({field: {name, ...field}}) => {
                      return (
                        <SelectField
                          label={'Select Modifier Class'}
                          errors={errors.modifier_class_id}
                          field={field}
                          selectOptions={modifierClasses}
                        />
                      )
                    }}
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
            </Row>
            <Row>
              <Col md={12}>
                <div className={'dfields menu-manage-fields'}>
                  <ImageUpload
                    maxCount={1}
                    setValue={setValue}
                    fieldName={'modifier_media'}
                    value={imageUrl || null}
                    label={'Upload Modifier Image'}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mb-4 mt-4'} md={12}>
                <div className={'button-section'}>
                  <ThemeButton
                    className={'form-create'}
                    text={'Update'}
                    type={'submit'}
                    loader={submitLoader}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditModifierSkeleton />
      )}
    </>
  )
}
