import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-discount.scss'
import {useUserContext} from '../../../providers/UserProvider'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import SelectField from '../../../components/dashboard/SelectField'
import {ICreateDiscount, IDiscountListing} from '../../../interfaces/IDiscount'
import {Radio} from 'antd'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import TimeTable from '../../../components/dashboard/TimeTable'
import DashCheckboxWithValue from '../../../components/dashboard/DashCheckboxWithValue'
import {BACKEND_CONSTANTS, DISCOUNT} from '../../../config/constants'
import {useNavigate, useParams} from 'react-router-dom'
import {IProductList} from '../../../interfaces/IMenu'
import {MenuServices} from '../../../services/api-services/menu-services'
import CreateDiscountSkeleton from '../../../skeletons/discount/CreateDiscountSkeleton'
import {DiscountServices} from '../../../services/api-services/discount.services'
import moment from 'moment'
import {ITimetable} from '../../../interfaces/IGetEstablishment'
import {fineTuneDiscountFormData} from './CreateDiscount'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'

export default function EditDiscount() {
  const methods = useForm<ICreateDiscount>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const {id} = useParams<any>()
  const navigator = useNavigate()
  const watchAppliesTo = methods.watch('applies_to', undefined) // you can supply default value as second argument
  const watchType = methods.watch('type', undefined) // you can supply default value as second argument
  const {setTitle, establishmentId} = useUserContext()
  const [products, setProducts] = useState<IProductList[]>()
  const [productsLoader, setProductsLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [timeSchedule, setTimeSchedule] = useState<ITimetable[]>()
  const [singleDiscount, setSingleDiscount] = useState<IDiscountListing>()

  useEffect(() => {
    setTitle('Edit Discount')
  }, [])

  const onSubmit = async (data: ICreateDiscount) => {
    setSubmitLoader(true)
    const formattedFormData = fineTuneDiscountFormData(data, establishmentId)
    const res = await DiscountServices.update(id, formattedFormData)
    if (res.status) {
      toast.success(res.message)
      methods.reset()
      navigator(`/discount-detail/${res.data.id}`)
    }
    setSubmitLoader(false)
  }

  const paymentTypes = [
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CARD,
      name: 'Card',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CASH,
      name: 'Cash',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.KEENU,
      name: 'Keenu',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.EASY_PAISA,
      name: 'Easy Paisa',
    },
  ]

  const orderTypes = [
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY,
      name: 'Take away',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DINE,
      name: 'Dine In',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY,
      name: 'Delivery',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE,
      name: 'Online',
    },
  ]

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

  const DiscountType = [
    {
      id: DISCOUNT.DISCOUNT_TYPE.PERCENTAGE,
      name: 'Percentage',
    },
    {
      id: DISCOUNT.DISCOUNT_TYPE.FIXED,
      name: 'Fixed',
    },
  ]

  useEffect(() => {
    /*
     * If the type is fixed then applies to should be restricted to all
     * If Applies to is all, then set product empty
     * */
    if (watchType === DISCOUNT.DISCOUNT_TYPE.FIXED) {
      methods.setValue('applies_to', DISCOUNT.APPLIES_TO.ALL)
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.ALL) {
      methods.setValue('products', [])
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.SPECIFIC) {
      setProductsLoader(true)
      MenuServices.getAllProducts(null, {
        establishment_id: establishmentId,
        api_type: 'basic',
      }).then((res) => {
        setProducts(res.data)
        setProductsLoader(false)
      })
    }
  }, [watchType, watchAppliesTo, establishmentId])
  const getSingleDiscount = async () => {
    setLoader(true)
    const res = await DiscountServices.getById(id)
    if (res.status) {
      setSingleDiscount(res.data)
      setTimeSchedule(res.data.entity_timetables.timetables)
      let updatedTimeTable = Array(7)
        .fill({
          start_time: '',
          end_time: '',
        })
        .map((item, index) => {
          let matchValue = res.data.entity_timetables.timetables.find(
            (it) => it.day_id === index + 1
          )
          if (matchValue) return matchValue
          else return item
        })
      const updateData: ICreateDiscount = {
        name: res.data.name,
        discount: res.data.discount,
        type: res.data.type,
        min_order_amount: res.data.min_order_amount,
        max_order_amount: res.data.max_order_amount,
        bill_print_name: res.data.bill_print_name,
        discount_order_types: orderTypes.map((orderType) => ({
          type: res.data.discount_order_types.find(
            (discountType) => discountType.type === orderType.id
          )?.type,
        })),
        discount_payment_modes: res.data.discount_payment_modes.map((paymentMode) => {
          return {type: paymentMode.type}
        }),
        establishment_id: res.data.establishment_id,
        time_tables: updatedTimeTable,
        products: res.data.products.flatMap((product) => product.id),
        discount_products: [],
        include_exclude: res.data.products?.[0]?.meta?.pivot_type, //to hold temporary data
        applies_to: res.data.applies_to,
        date_range: [
          moment(res.data.start_date).format('YYYY-MM-DD'),
          moment(res.data.expiry_date).format('YYYY-MM-DD'),
        ], // hold temp data
        expiry_date: res.data.expiry_date,
        start_date: res.data.start_date,
      }
      methods.reset(updateData)
    }
    setLoader(false)
  }
  useEffect(() => {
    getSingleDiscount()
  }, [])
  return (
    <>
      <div className={'discount'}>
        <ViewCard>
          <FormProvider {...methods}>
            {loader ? (
              <CreateDiscountSkeleton />
            ) : (
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Row>
                  <Col md={12} lg={7} xl={8}>
                    <Row>
                      <Col md={12}>
                        <Heading>
                          <h2>
                            <span>Discount Details</span>
                          </h2>
                        </Heading>
                      </Col>
                    </Row>
                    <Row className={'h-100'}>
                      <Col className={''} md={6}>
                        <div className={'left-col'}>
                          <div className={'discount-fields dfields'}>
                            <Controller
                              name="name"
                              defaultValue={''}
                              control={methods.control}
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
                                  errors={methods.formState.errors.name}
                                />
                              )}
                            />
                          </div>

                          <div className={'discount-fields dfields'}>
                            <Controller
                              name="type"
                              defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                              control={methods.control}
                              rules={{required: Required}}
                              render={({field}) => (
                                <SelectField
                                  defaultValue={''}
                                  label={'Discount Type'}
                                  errors={methods.formState.errors.type}
                                  field={field}
                                  selectOptions={DiscountType}
                                  // disabled={!isRestaurantAdmin}
                                />
                              )}
                            />
                          </div>

                          <div className={'discount-fields dfields'}>
                            <Controller
                              name="discount"
                              defaultValue={0}
                              control={methods.control}
                              rules={{
                                required: Required,
                                maxLength: maxLength(3),
                                validate: {
                                  validate: (value) => {
                                    if (
                                      methods.getValues().type === DISCOUNT.DISCOUNT_TYPE.FIXED &&
                                      Number(value) >= Number(methods.getValues().min_order_amount)
                                    ) {
                                      return 'Not Valid'
                                    } else if (
                                      methods.getValues().type ===
                                        DISCOUNT.DISCOUNT_TYPE.PERCENTAGE &&
                                      Number(value) > 100
                                    ) {
                                      return 'Not Valid'
                                    } else {
                                      return true
                                    }
                                  },
                                },
                              }}
                              render={({field}) => (
                                <TextInput
                                  placeholder={'value'}
                                  variant={'field-white'}
                                  label={'Discount'}
                                  labelPos={'out'}
                                  labelColor={'dark'}
                                  type={'number'}
                                  field={field}
                                  errors={methods.formState.errors.discount}
                                />
                              )}
                            />
                          </div>
                          <div className={'discount-fields dfields'}>
                            <Controller
                              name="bill_print_name"
                              defaultValue={''}
                              control={methods.control}
                              rules={{required: Required, maxLength: maxLength(50)}}
                              render={({field}) => (
                                <TextInput
                                  placeholder={'Exlusive discount'}
                                  variant={'field-white'}
                                  label={'Bill Print Name'}
                                  labelPos={'out'}
                                  labelColor={'dark'}
                                  type={'text'}
                                  field={field}
                                  errors={methods.formState.errors.bill_print_name}
                                />
                              )}
                            />
                          </div>

                          <div className={'discount-fields dfields'}>
                            <Controller
                              name="applies_to"
                              defaultValue={DISCOUNT.APPLIES_TO.ALL}
                              control={methods.control}
                              rules={{required: Required}}
                              render={({field}) => (
                                <SelectField
                                  defaultValue={''}
                                  label={'Applies To'}
                                  errors={methods.formState.errors.applies_to}
                                  field={field}
                                  selectOptions={appliesTo}
                                  // disabled={watchType === DISCOUNT.DISCOUNT_TYPE.FIXED}
                                />
                              )}
                            />
                          </div>

                          <div className={'max-min-amount'}>
                            <h5>Min / Max Bill Amount </h5>
                            <div className={'h-fields'}>
                              <div className={'discount-fields dfields'}>
                                <Controller
                                  name="min_order_amount"
                                  defaultValue={0}
                                  control={methods.control}
                                  rules={{
                                    required: Required,
                                    maxLength: maxLength(5),
                                    validate: {
                                      validate: (value) => {
                                        if (
                                          methods.getValues().type ===
                                            DISCOUNT.DISCOUNT_TYPE.FIXED &&
                                          Number(value) <= Number(methods.getValues().discount)
                                        ) {
                                          return 'Not Valid'
                                        } else if (
                                          Number(value) >
                                          Number(methods.getValues().max_order_amount)
                                        ) {
                                          return 'Not Valid'
                                        } else {
                                          methods.clearErrors('discount')
                                          methods.clearErrors('max_order_amount')
                                          return true
                                        }
                                      },
                                    },
                                  }}
                                  render={({field}) => (
                                    <TextInput
                                      placeholder={'minimum'}
                                      variant={'field-white'}
                                      label={'Minimum'}
                                      labelPos={'out'}
                                      labelColor={'dark'}
                                      type={'number'}
                                      field={field}
                                      errors={methods.formState.errors.min_order_amount}
                                    />
                                  )}
                                />
                              </div>
                              <div className={'discount-fields dfields'}>
                                <Controller
                                  name="max_order_amount"
                                  defaultValue={0}
                                  control={methods.control}
                                  rules={{
                                    required: Required,
                                    maxLength: maxLength(6),
                                    validate: {
                                      validate: (value) => {
                                        if (
                                          Number(value) <
                                          Number(methods.getValues().min_order_amount)
                                        ) {
                                          return 'Not Valid'
                                        } else {
                                          methods.clearErrors('discount')
                                          methods.clearErrors('min_order_amount')
                                          return true
                                        }
                                      },
                                    },
                                  }}
                                  render={({field}) => (
                                    <TextInput
                                      placeholder={'maximum'}
                                      variant={'field-white'}
                                      label={'Maximum'}
                                      labelPos={'out'}
                                      labelColor={'dark'}
                                      type={'number'}
                                      field={field}
                                      errors={methods.formState.errors.max_order_amount}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6} className={'h-100'}>
                        <div className={'center-col h-100'}>
                          <div className={'center-col-1'}>
                            <Row className={'h-100'}>
                              <Col md={6}>
                                <div className={'discount-detail-check'}>
                                  <h5>Order Type</h5>
                                  <ul>
                                    {orderTypes.map((orderType, index) => {
                                      return (
                                        <li key={index}>
                                          <div className={'dfields discount-fields'}>
                                            <Controller
                                              name={`discount_order_types.${index}.type`}
                                              // defaultValue={orderType.id}
                                              control={methods.control}
                                              render={({field: {name, value}}) => (
                                                <DashCheckboxWithValue
                                                  checkedInput={singleDiscount?.discount_order_types.some(
                                                    (discountType) =>
                                                      discountType.type === orderType.id
                                                  )}
                                                  setValue={methods.setValue}
                                                  name={name}
                                                  label={orderType.name}
                                                  // disabled={}
                                                  value={orderType.id}
                                                  fieldValue={orderType.id}
                                                />
                                              )}
                                            />
                                          </div>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className={'discount-detail-check'}>
                                  <h5>Applicable On</h5>
                                  <ul>
                                    {paymentTypes.map((paymentType, index) => {
                                      return (
                                        <li key={index}>
                                          <div className={'dfields discount-fields'}>
                                            <Controller
                                              name={`discount_payment_modes.${index}.type`}
                                              // defaultValue={paymentType.id}
                                              control={methods.control}
                                              render={({field: {name, value}}) => (
                                                <DashCheckboxWithValue
                                                  checkedInput={singleDiscount?.discount_payment_modes.some(
                                                    (discountPayment) =>
                                                      discountPayment.type === paymentType.id
                                                  )}
                                                  setValue={methods.setValue}
                                                  name={name}
                                                  label={paymentType.name}
                                                  // disabled={}
                                                  value={paymentType.id}
                                                  fieldValue={paymentType.id}
                                                />
                                              )}
                                            />
                                          </div>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <Row>
                            <Col md={12}>
                              <div className={'center-col-2'}>
                                {watchAppliesTo == DISCOUNT.APPLIES_TO.SPECIFIC && (
                                  <>
                                    <h5>Specific Item</h5>
                                    <div className={'combo-fields dfields'}>
                                      <Controller
                                        name="include_exclude"
                                        control={methods.control}
                                        rules={{required: Required}}
                                        render={({field, field: {onChange, value}}) => {
                                          return (
                                            <>
                                              <Radio.Group
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                              >
                                                <Radio value={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}>
                                                  Include
                                                </Radio>
                                                <Radio value={DISCOUNT.DISCOUNT_PRODUCT.EXCLUDE}>
                                                  Exclude
                                                </Radio>
                                              </Radio.Group>
                                              <div className="errors">
                                                {methods.formState.errors.include_exclude && (
                                                  <small className="field-success">
                                                    {
                                                      methods.formState.errors.include_exclude
                                                        ?.message
                                                    }
                                                  </small>
                                                )}
                                              </div>
                                            </>
                                          )
                                        }}
                                      />
                                    </div>
                                    <div className={'combo-fields dfields'}>
                                      <Controller
                                        name={`products`}
                                        control={methods.control}
                                        rules={{required: Required}}
                                        defaultValue={[]}
                                        render={({field, fieldState}) => (
                                          <MultiSelectField
                                            label={''}
                                            errors={methods.formState.errors?.products}
                                            field={field}
                                            selectOptions={products}
                                            loader={productsLoader}
                                          />
                                        )}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} lg={5} xl={4}>
                    {timeSchedule && (
                      <TimeTable
                        withDateRange={true}
                        dateRangeRequired={true}
                        apiData={timeSchedule}
                      />
                    )}
                    {/*<TimeTable withDateRange={true} dateRangeRequired={true}/>*/}
                  </Col>
                </Row>
                <Row>
                  <Col className={''} md={12}>
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
                        text={'Save'}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </FormProvider>
        </ViewCard>
      </div>
    </>
  )
}
