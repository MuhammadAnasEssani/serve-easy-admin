import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {
  EmailValidation,
  maxLength,
  minLength,
  PhoneValidation,
  Required,
} from '../../../utils/patterns'
import ViewCard from '../../../components/dashboard/ViewCard'
import '../../../../assets/css/views/dashboard/create-restaurant.scss'
import ThemeDatePicker from '../../../components/dashboard/ThemeDatePicker'
import {ICreateRestaurant} from '../../../interfaces/IRestaurant'
import EmailInput from '../../../components/authentication/EmailInput'
import PhoneInput from '../../../components/authentication/PhoneInput'
import PasswordInput from '../../../components/authentication/PasswordInput'
import {AiFillEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import SelectField from '../../../components/dashboard/SelectField'
import {RestaurantService} from '../../../services/api-services/restaurant.service'
import {toast} from 'react-toastify'
import {IDeliveryServiceList, IPaymentServiceList, IPlanList} from '../../../interfaces/IPlan'
import {PlanService} from '../../../services/api-services/plan.service'
import {useNavigate} from 'react-router'
import {useUserContext} from '../../../providers/UserProvider'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'
import {BACKEND_CONSTANTS} from '../../../config/constants'
import SelectTagsField from '../../../components/dashboard/SelectFieldTags'
import {CURRENCIES} from '../../../config/globalCurrencies'
import RestaurantDeliveryService from './create-restaurant/DeliveryService'
import RestaurantPaymentService from './create-restaurant/PaymentService'

export default function CreateRestaurants() {
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Create Restaurant')
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [plans, setPlans] = useState<IPlanList[]>([])
  const navigator = useNavigate()
  const methods = useForm<ICreateRestaurant>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const onSubmit = async (data: ICreateRestaurant) => {
    setLoading(true)
    let payload = {
      ...data,
      restaurant_domains:
        data?.restaurant_domains?.map((domain: string) => ({
          type: 10,
          domain,
        })) || [],
      restaurant_payment_service: data.restaurant_payment_service.payment_gateway
        ? data.restaurant_payment_service
        : undefined,
      restaurant_delivery_service: data.restaurant_delivery_service.delivery_service_id
        ? data.restaurant_delivery_service
        : undefined,
    }
    const res = await RestaurantService.store(payload)
    setLoading(false)
    if (res.status) {
      toast.success(res.message)
      navigator(`/restaurants`)
      methods.reset()
    }
  }

  const status = [
    {
      id: 10,
      name: 'Active',
    },
    {
      id: 20,
      name: 'In Active',
    },
  ]

  useEffect(() => {
    /*Fetch All Printers*/
    PlanService.all().then((res) => {
      setPlans(res.data)
    })
  }, [])

  return (
    <ViewCard>
      <div className={'create-restaurant'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row className={'h-100'}>
              <Col md={12}>
                <Heading>
                  <h2>
                    <span>Create Restaurant</span>
                  </h2>
                </Heading>
              </Col>

              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="name"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(3), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={' Name'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.name}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="established_date"
                    control={methods.control}
                    rules={{required: Required}}
                    render={({field: {name}}) => (
                      <ThemeDatePicker
                        setValue={methods.setValue}
                        fieldName={name}
                        label={'Established Date'}
                        size={'large'}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="no_of_employees"
                    defaultValue={0}
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(1), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'No of Employees'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={methods.formState.errors.no_of_employees}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="no_of_establishments"
                    defaultValue={0}
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(1), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'No of Establishment'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={methods.formState.errors.no_of_establishments}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name={'status'}
                    defaultValue={10}
                    control={methods.control}
                    render={({field}) => (
                      <SelectField
                        defaultValue={10}
                        label={'Status'}
                        errors={methods.formState.errors.status}
                        field={field}
                        selectOptions={status}
                        // setSelectedEstablishment = {setSelectedEstablishment}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="subscription_id"
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(1), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <SelectField
                        label={'Select Subscription'}
                        errors={methods.formState.errors.subscription_id}
                        field={field}
                        selectOptions={plans}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="owner_name"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(3), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'Owner Name'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.owner_name}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="email"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required, pattern: EmailValidation}}
                    render={({field}) => (
                      <EmailInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'Email'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.email}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="phone"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required, pattern: PhoneValidation}}
                    render={({field}) => (
                      <PhoneInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'Phone'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.phone}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="address"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required, minLength: minLength(3), maxLength: maxLength(50)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'Address'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.address}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="website"
                    defaultValue={''}
                    control={methods.control}
                    // rules={{required: Required}}
                    render={({field}) => (
                      <TextInput
                        placeholder={''}
                        variant={'field-white'}
                        label={'Website'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'text'}
                        field={field}
                        errors={methods.formState.errors.website}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="currency"
                    defaultValue={''}
                    control={methods.control}
                    rules={{required: Required}}
                    render={({field}) => (
                      <SelectField
                        label={'Select Currency'}
                        errors={methods.formState.errors.currency}
                        field={field}
                        selectOptions={CURRENCIES}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="restaurant_domains"
                    control={methods.control}
                    render={({field}) => (
                      <SelectTagsField
                        label={'Domain'}
                        errors={methods.formState.errors.restaurant_domains}
                        field={field}
                        selectOptions={[]}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <RestaurantDeliveryService />
            <RestaurantPaymentService />

            <Row>
              <Col className={'mb-4'} md={12}>
                <div className={'button-section'}>
                  <ThemeButton
                    onClick={() => navigator(-1)}
                    type={'button'}
                    className={'form-cancel'}
                    text={'Cancel'}
                  />
                  <ThemeButton
                    type={'submit'}
                    className={'form-create'}
                    text={'Create'}
                    loader={loading}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </FormProvider>
      </div>
    </ViewCard>
  )
}
