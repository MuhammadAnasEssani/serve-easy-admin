import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import {ICreatePromo} from '../../../interfaces/IPromo'
import {IGetEstablishmentDropdown} from '../../../interfaces/IGetEstablishment'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import SelectField from '../../../components/dashboard/SelectField'
import {PromoCodeServices} from '../../../services/api-services/promo-code-services'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import ViewCard from '../../../components/dashboard/ViewCard'
import {DISCOUNT, PROMO} from '../../../config/constants'
import DateRange from '../../../components/dashboard/DateRange'
import {Radio} from 'antd'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import {IProductList} from '../../../interfaces/IMenu'
import {MenuServices} from '../../../services/api-services/menu-services'
import {fineTunePromoFormData} from './CreatePromo'
import moment from 'moment'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import EditPromoSkeleton from '../../../skeletons/promo/EditPromoSkeleton'
import Heading from '../../../components/dashboard/Heading'

export default function EditPromo() {
  const {setTitle, establishmentId} = useUserContext()
  const {id} = useParams<any>()
  const {isRestaurantAdmin, user, isUserReady} = useUserContext()
  const [establishments, setEstablishments] = useState<IGetEstablishmentDropdown[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const navigate = useNavigate()

  const type = [
    {id: 10, name: 'Percentage'},
    {id: 20, name: 'Fixed'},
  ]
  const [products, setProducts] = useState<IProductList[]>()
  useEffect(() => {
    setTitle('Edit Promo')
    MenuServices.getAllProducts(null, {establishment_id: establishmentId, api_type: 'basic'}).then(
      (res) => {
        setProducts(res.data)
      }
    )
  }, [establishmentId])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
    watch,
    getValues,
    clearErrors,
  } = useForm<ICreatePromo>({
    mode: 'onChange',
  })

  const watchAppliesTo = watch('applies_to', undefined) // you can supply default value as second argument
  const watchType = watch('type', undefined) // you can supply default value as second argument

  const onSubmit = async (data: ICreatePromo) => {
    setSubmitLoader(true)
    const formattedFormData = fineTunePromoFormData(data, establishmentId)
    const res = await PromoCodeServices.update(id, formattedFormData)
    if (res.status) {
      toast.success(res.message)
      navigate('/promo-listings')
    }
    setSubmitLoader(false)
  }
  const appliesTo = [
    {
      id: PROMO.APPLIES_TO.ALL,
      name: 'All',
    },
    {
      id: PROMO.APPLIES_TO.SPECIFIC,
      name: 'Specific Item',
      disabled: watchType == DISCOUNT.DISCOUNT_TYPE.FIXED,
    },
  ]
  useEffect(() => {
    /*Fetch All Establishments*/
    EstablishmentServices.all().then((res) => {
      console.log(res)
      setEstablishments(res.data)
    })
  }, [])

  useEffect(() => {
    /*
     * If the type is fixed then applies to should restricted to all
     * If Applies to is all, then set product empty
     * */
    if (watchType === DISCOUNT.DISCOUNT_TYPE.FIXED) {
      setValue('applies_to', DISCOUNT.APPLIES_TO.ALL)
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.ALL) {
      setValue('products', [])
    }
  }, [watchType, watchAppliesTo])

  const getSinglePromo = async () => {
    setLoading(true)
    const res = await PromoCodeServices.getById(id)
    if (res.status) {
      const updateData: ICreatePromo = {
        code: res.data.code,
        discount: res.data.discount,
        type: res.data.type,
        min_order_amount: res.data.min_order_amount,
        establishment_id: res.data.establishment_id,
        promo_products: [],
        products: res.data.products.flatMap((product) => product.id), //to hold temporary data
        include_exclude: res.data.products?.[0]?.meta?.pivot_type, //to hold temporary data
        applies_to: res.data.applies_to,
        date_range: [
          moment(res.data.start_date).format('YYYY-MM-DD'),
          moment(res.data.expiry_date).format('YYYY-MM-DD'),
        ], // hold temp data
        expiry_date: res.data.expiry_date,
        start_date: res.data.start_date,
      }
      reset(updateData)
    }
    setLoading(false)
  }
  useEffect(() => {
    getSinglePromo()
  }, [])
  /*Set establishment in case of restaurant owner or establishment level employee*/
  useEffect(() => {
    !isRestaurantAdmin && isUserReady && setValue('establishment_id', user.establishment_id)
  }, [user])
  return (
    <>
      <ViewCard>
        {!loading ? (
          <div className={'promo'}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={12}>
                  <Heading>
                    <h2>
                      <span>Edit Promo</span>
                    </h2>
                  </Heading>
                </Col>
              </Row>
              <Row className={'mt-2 mb-3'}>
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
                    <Controller
                      name="code"
                      defaultValue={''}
                      control={control}
                      rules={{required: Required, maxLength: maxLength(100)}}
                      render={({field}) => (
                        <TextInput
                          placeholder={'Code'}
                          variant={'field-white'}
                          label={'Code'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'text'}
                          field={field}
                          errors={errors.code}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
                    <Controller
                      name="discount"
                      defaultValue={0}
                      control={control}
                      rules={{
                        required: Required,
                        maxLength: maxLength(10),
                        validate: {
                          validate: (value) => {
                            if (
                              getValues().type === DISCOUNT.DISCOUNT_TYPE.FIXED &&
                              Number(value) >= Number(getValues().min_order_amount)
                            ) {
                              return 'Discount should be less than min order amount'
                            } else {
                              clearErrors('discount')
                              return true
                            }
                          },
                        },
                      }}
                      render={({field}) => (
                        <TextInput
                          placeholder={'Discount'}
                          variant={'field-white'}
                          label={'Discount'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.discount}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
                    <Controller
                      name="min_order_amount"
                      defaultValue={0}
                      control={control}
                      rules={{
                        required: Required,
                        maxLength: maxLength(10),
                        validate: {
                          validate: (value) => {
                            if (
                              getValues().type === DISCOUNT.DISCOUNT_TYPE.FIXED &&
                              Number(value) <= Number(getValues().discount)
                            ) {
                              return 'Min order amount should be greater than discount'
                            } else {
                              clearErrors('discount')
                              return true
                            }
                          },
                        },
                      }}
                      render={({field}) => (
                        <TextInput
                          placeholder={'Min Order Amount'}
                          variant={'field-white'}
                          label={'Min Order Amount'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.min_order_amount}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
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
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
                    <Controller
                      name="type"
                      control={control}
                      rules={{required: Required}}
                      render={({field: {name, ...field}}) => {
                        return (
                          <SelectField
                            label={'Select Type'}
                            errors={errors.type}
                            field={field}
                            selectOptions={type}
                          />
                        )
                      }}
                    />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={'promo-fields dfields'}>
                    <Controller
                      name="applies_to"
                      defaultValue={PROMO.APPLIES_TO.ALL}
                      control={control}
                      rules={{required: Required}}
                      render={({field}) => (
                        <SelectField
                          defaultValue={''}
                          label={'Applies To'}
                          errors={errors.applies_to}
                          field={field}
                          selectOptions={appliesTo}
                          // disabled={!isRestaurantAdmin}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md={4}>
                  <div className={'dfields promo-fields'}>
                    <Controller
                      name="date_range"
                      control={control}
                      rules={{required: Required}}
                      render={({field: {name, value}}) => (
                        <DateRange
                          setValue={setValue}
                          fieldName={name}
                          label={'Expiry Date'}
                          size={'large'}
                          value={value}
                          disabledPrevDates={true}
                        />
                      )}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <div className={'center-col-2'}>
                    {watchAppliesTo == PROMO.APPLIES_TO.SPECIFIC && (
                      <>
                        <h5>Specific Item</h5>
                        <div className={'combo-fields dfields'}>
                          <Controller
                            name="include_exclude"
                            defaultValue={PROMO.PROMO_PRODUCT.INCLUDE}
                            control={control}
                            rules={{required: Required}}
                            render={({field, field: {onChange, value}}) => {
                              // console.log(field);
                              return (
                                <>
                                  <Radio.Group
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                  >
                                    <Radio value={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}>Include</Radio>
                                    <Radio value={DISCOUNT.DISCOUNT_PRODUCT.EXCLUDE}>Exclude</Radio>
                                  </Radio.Group>
                                  <div className="errors">
                                    {errors.include_exclude && (
                                      <small className="field-success">
                                        {errors.include_exclude?.message}
                                      </small>
                                    )}
                                  </div>
                                </>
                              )
                            }}
                          />
                        </div>
                        <div className={'promo-fields dfields'}>
                          <Controller
                            name={`products`}
                            control={control}
                            rules={{required: Required}}
                            defaultValue={[]}
                            render={({field, fieldState}) => (
                              <MultiSelectField
                                label={''}
                                errors={errors?.products}
                                field={field}
                                selectOptions={products}
                                // setSelectedEstablishment = {setSelectedEstablishment}
                                // disabled={true}
                                // maxTagCount={1}
                              />
                            )}
                          />
                        </div>
                      </>
                    )}
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
          <EditPromoSkeleton />
        )}
      </ViewCard>
    </>
  )
}
