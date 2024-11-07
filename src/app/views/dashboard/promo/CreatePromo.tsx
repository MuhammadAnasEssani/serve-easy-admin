import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/promo.scss'
import {ICreatePromo} from '../../../interfaces/IPromo'
import SelectField from '../../../components/dashboard/SelectField'
import {PromoCodeServices} from '../../../services/api-services/promo-code-services'
import ViewCard from '../../../components/dashboard/ViewCard'
import {DISCOUNT, PROMO} from '../../../config/constants'
import {Radio} from 'antd'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import {IProductList} from '../../../interfaces/IMenu'
import {MenuServices} from '../../../services/api-services/menu-services'
import DateRange from '../../../components/dashboard/DateRange'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'

export function fineTunePromoFormData(formData: ICreatePromo, establishmentId: number) {
  formData.establishment_id = establishmentId
  /*
   * Format discount product as per the API Structure
   * */
  if (formData.applies_to === PROMO.APPLIES_TO.SPECIFIC && formData.products) {
    formData.promo_products = []
    for (const productId of formData.products) {
      formData.promo_products.push({
        product_id: productId,
        type: formData.include_exclude,
      })
    }
  }

  /*
   * Date Range
   * */
  if (formData?.date_range) {
    formData.start_date = formData?.date_range[0]
    formData.expiry_date = formData?.date_range[1]
    delete formData.date_range
  }

  return formData
}

export default function CreatePromo() {
  const navigator = useNavigate()
  const navigate = useNavigate()
  const {setTitle} = useUserContext()
  const [products, setProducts] = useState<IProductList[]>()
  const {establishmentId, establishments} = useUserContext()
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  const type = [
    {id: DISCOUNT.DISCOUNT_TYPE.PERCENTAGE, name: 'Percentage'},
    {id: DISCOUNT.DISCOUNT_TYPE.FIXED, name: 'Fixed'},
  ]
  useEffect(() => {
    setTitle('Create Promo')
    MenuServices.getAllProducts(null, {establishment_id: establishmentId, api_type: 'basic'}).then(
      (res) => {
        setProducts(res.data)
      }
    )
  }, [establishmentId])

  const {
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: {errors, isSubmitting, isValidating},
    control,
    watch,
    clearErrors,
  } = useForm<ICreatePromo>({
    mode: 'onChange',
  })

  const watchAppliesTo = watch('applies_to', undefined) // you can supply default value as second argument
  const watchType = watch('type', undefined) // you can supply default value as second argument

  const onSubmit = async (data: ICreatePromo) => {
    setSubmitLoader(true)
    const formattedFormData = fineTunePromoFormData(data, establishmentId)
    const res = await PromoCodeServices.store(formattedFormData)
    if (res.status) {
      reset()
      navigate('/promo-listings')
    }
    setSubmitLoader(false)
  }

  const appliesTo = [
    {
      id: DISCOUNT.APPLIES_TO.ALL,
      name: 'All',
    },
    {
      id: DISCOUNT.APPLIES_TO.SPECIFIC,
      name: 'Specific Item',
      disabled: watchType == DISCOUNT.DISCOUNT_TYPE.FIXED,
    },
  ]

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

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

  return (
    <>
      <ViewCard>
        <div className={'promo'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <Heading>
                  <h2>
                    <span>Add Promo</span>
                  </h2>
                </Heading>
              </Col>
            </Row>
            <Row>
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
                            clearErrors('min_order_amount')
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
                <div className={'dfields promo-fields'}>
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
              <Col md={4}>
                <div className={'dfields promo-fields'}>
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
                <div className={'dfields promo-fields'}>
                  <Controller
                    name="applies_to"
                    defaultValue={DISCOUNT.APPLIES_TO.ALL}
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
                    render={({field: {name}}) => (
                      <DateRange
                        setValue={setValue}
                        fieldName={name}
                        label={'Expiry Date'}
                        size={'large'}
                        errors={errors.date_range}
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
                  {watchAppliesTo == DISCOUNT.APPLIES_TO.SPECIFIC && (
                    <>
                      <h5>Specific Item</h5>
                      <div className={'combo-fields dfields'}>
                        <Controller
                          name="include_exclude"
                          defaultValue={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}
                          control={control}
                          rules={{required: Required}}
                          render={({field, field: {onChange, value}}) => {
                            // console.log(field);
                            return (
                              <>
                                <Radio.Group onChange={(e) => field.onChange(e.target.value)}>
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
                    onClick={() => navigator(-1)}
                    type={'button'}
                    className={'form-cancel'}
                    text={'Cancel'}
                  />
                  <ThemeButton
                    loader={submitLoader}
                    type={'submit'}
                    className={'form-create'}
                    text={'Create'}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </ViewCard>
    </>
  )
}
