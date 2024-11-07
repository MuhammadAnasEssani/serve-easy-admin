import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-discount.scss'
import {useUserContext} from '../../../providers/UserProvider'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import SelectField from '../../../components/dashboard/SelectField'
import {ICreateDiscount} from '../../../interfaces/IDiscount'
import {Radio} from 'antd'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import TimeTable from '../../../components/dashboard/TimeTable'
import DashCheckboxWithValue from '../../../components/dashboard/DashCheckboxWithValue'
import {BACKEND_CONSTANTS, DISCOUNT} from '../../../config/constants'
import {useNavigate} from 'react-router-dom'
import {IProductList} from '../../../interfaces/IMenu'
import {DiscountServices} from '../../../services/api-services/discount.services'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MenuServices} from '../../../services/api-services/menu-services'
import Heading from '../../../components/dashboard/Heading'

// import {CiCalendarDate} from "react-icons/ci"

export function fineTuneDiscountFormData(formData: ICreateDiscount, establishmentId: number) {
  formData.establishment_id = establishmentId

  /*
   * Format discount product as per the API Structure
   * */
  if (formData.applies_to === DISCOUNT.APPLIES_TO.SPECIFIC && formData.products) {
    formData.discount_products = []
    for (const productId of formData.products) {
      formData.discount_products.push({
        product_id: productId,
        type: formData.include_exclude,
      })
    }
  }

  /*
   * Exclude null types
   * */

  formData.discount_payment_modes = formData.discount_payment_modes.filter((row) => !!row.type)
  formData.discount_order_types = formData.discount_order_types.filter((row) => !!row.type)

  /*
   * Time Table
   * */
  formData.time_tables = formData.time_tables.filter(
    (timetable) => timetable.status === BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.ACTIVE
  )

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

export default function CreateDiscount() {
  const methods = useForm<ICreateDiscount>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const navigator = useNavigate()
  const watchAppliesTo = methods.watch('applies_to', undefined) // you can supply default value as second argument
  const watchType = methods.watch('type', undefined) // you can supply default value as second argument
  const {setTitle, establishmentId} = useUserContext()
  const [products, setProducts] = useState<IProductList[]>()
  const [loader, setLoader] = useState<boolean>(true)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  useEffect(() => {
    setTitle('Create Discounts')
  }, [])

  const onSubmit = async (data: ICreateDiscount) => {
    setSubmitLoader(true)
    const formattedFormData = fineTuneDiscountFormData(data, establishmentId)
    const res = await DiscountServices.store(formattedFormData)
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
     * If the type is fixed then applies to should restricted to all
     * If Applies to is all, then set product empty
     * */
    if (watchType === DISCOUNT.DISCOUNT_TYPE.FIXED) {
      methods.setValue('applies_to', DISCOUNT.APPLIES_TO.ALL)
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.ALL) {
      methods.setValue('products', [])
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.SPECIFIC) {
      setLoader(true)
      MenuServices.getAllProducts(null, {
        establishment_id: establishmentId,
        api_type: 'basic',
      }).then((res) => {
        setProducts(res.data)
        setLoader(false)
      })
    }
  }, [watchType, watchAppliesTo, establishmentId])
  return (
    <>
      <div className={'discount'}>
        <FormProvider {...methods}>
          {
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Row>
                <Col md={12} lg={7} xl={8}>
                  <Row>
                    <Col md={12}>
                      <Heading>
                        <h2>
                          <span>Details</span>
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
                              maxLength: maxLength(100),
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
                                // prefixIcon={<CiCalendarDate/>}
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
                                  maxLength: maxLength(50000),
                                  validate: {
                                    validate: (value) => {
                                      if (
                                        methods.getValues().type === DISCOUNT.DISCOUNT_TYPE.FIXED &&
                                        Number(value) <= Number(methods.getValues().discount)
                                      ) {
                                        return 'Not Valid'
                                      } else if (
                                        Number(value) > Number(methods.getValues().max_order_amount)
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
                                  maxLength: maxLength(50000),
                                  validate: {
                                    validate: (value) => {
                                      if (
                                        Number(value) < Number(methods.getValues().min_order_amount)
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
                                      <li key={`${index}order-type-key`}>
                                        <div className={'dfields discount-fields'}>
                                          <Controller
                                            name={`discount_order_types.${index}.type`}
                                            defaultValue={orderType.id}
                                            control={methods.control}
                                            render={({field: {name, value}}) => (
                                              <DashCheckboxWithValue
                                                checkedInput={false}
                                                setValue={methods.setValue}
                                                name={name}
                                                label={orderType.name}
                                                // disabled={}
                                                value={orderType.id}
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
                                      <li key={`${index}applicable-on-key`}>
                                        <div className={'dfields discount-fields'}>
                                          <Controller
                                            name={`discount_payment_modes.${index}.type`}
                                            defaultValue={paymentType.id}
                                            control={methods.control}
                                            render={({field: {name, value}}) => (
                                              <DashCheckboxWithValue
                                                checkedInput={false}
                                                setValue={methods.setValue}
                                                name={name}
                                                label={paymentType.name}
                                                // disabled={}
                                                value={paymentType.id}
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
                                        // console.log(field);
                                        return (
                                          <>
                                            <Radio.Group
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
                                          loader={loader}
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
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={6} lg={5} xl={4}>
                  <TimeTable withDateRange={true} dateRangeRequired={true} />
                </Col>
              </Row>
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
            </Form>
          }
        </FormProvider>
      </div>
    </>
  )
}
