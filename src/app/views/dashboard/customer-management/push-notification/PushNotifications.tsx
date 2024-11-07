import React, {useEffect, useState} from 'react'
import ViewCard from '../../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../../providers/UserProvider'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import {IPushNotifications} from '../../../../interfaces/ICustomerManagement'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import '../../../../../assets/css/views/dashboard/push-notifications.scss'
import {BsThreeDots} from 'react-icons/bs'
import pushNot from '../../../../../assets/images/push-notification.png'
import {NotificationService} from '../../../../services/api-services/notification.service'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {IPushNotificationFilter} from '../../../../interfaces/INotification'
import PushFilters from './PushFilters'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import ThemeModal from '../../../../components/Modal'
import Heading from '../../../../components/dashboard/Heading'

export default function PushNotifications() {
  const {setTitle, establishmentId} = useUserContext()
  const [previewImage, setPreviewImage] = useState<any>('')
  const [disableField, setDisableField] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const [filterLoader, setFilterLoader] = useState<boolean>(false)
  const [pushNotificationFilter, setPushNotificationFilter] = useState<IPushNotificationFilter>()
  const [deviceCountMessage, setDeviceCountMessage] = useState<string>('')
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const navigator = useNavigate()

  useEffect(() => {
    setTitle('Push Notifications')
  })

  const pushFilter = useForm<IPushNotificationFilter>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const methods = useForm<IPushNotifications>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const onFilterSubmit = async (data: IPushNotificationFilter) => {
    console.log(data, 'filter data')
    // methods.setValue('selected_user', false)
    setFilterLoader(true)
    const res = await NotificationService.getDeviceCount(data)
    if (res.status) {
      if (res.data.length > 0) {
        setDeviceCountMessage(res.message)
        setDisableField(false)
      } else {
        setDeviceCountMessage('')
        setDisableField(true)
      }
      setPushNotificationFilter(data)
      toast.success(res.message)
    }
    setFilterLoader(false)
  }

  const onSubmit = async (data: IPushNotifications) => {
    setSubmitLoader(true)
    if (data.images) {
      data.image = data.images[0].path
    }
    const notificationData = {
      ...data,
      ...pushNotificationFilter,
    }
    console.log(notificationData)
    const res = await NotificationService.onlineUserNotification(notificationData)
    if (res.status) {
      toast.success(res.message)
      navigator(`/customer-management-listing`)
    }
    setSubmitLoader(false)
  }

  // methods.register("selected_user", { value: true })
  // const selected = methods.watch('selected_user' )
  // useEffect(()=>{
  //     console.log(selected,'selected')
  //     setDisableField(selected)
  // },[selected])
  // Push Notification Preview Watch with Hook Form

  const pushTitle = methods.watch('title')
  const pushDes = methods.watch('message')
  const pushImg = methods.watch('image')
  const media = methods.watch('images')

  useEffect(() => {
    console.log(methods.getValues(['images']))
    const notification_image = methods.getValues('images')
    if (notification_image?.length > 0) {
      const image: any = notification_image[0]
      setPreviewImage(`${process.env.REACT_APP_S3_END_POINT}/${image.path}`)
    }
  }, [media])

  const orderType = [
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY,
      name: 'Delivery',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DINE,
      name: 'Dine In',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE,
      name: 'Online',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY,
      name: 'Take away',
    },
  ]

  const [maxOrderAmount, setMaxOrderAmount] = useState<number | undefined | null>(0)
  const [minOrderAmount, setMinOrderAmount] = useState<number | undefined | null>(0)

  // Min Max Code
  // const minAmount = pushFilter.watch("min_order_amount");
  // const maxAmount = pushFilter.watch("max_order_amount");
  // useEffect(()=>{
  //     setMaxOrderAmount(maxAmount)
  //     setMinOrderAmount(minAmount)
  //     console.log(minAmount , 'min ')
  //     console.log(maxAmount, 'max')
  // },[minAmount, maxAmount])

  // const maxRange = pushFilter.watch("max_order_amount", 0);
  // const mixRange = pushFilter.watch("max_order_amount", 0);
  const filterModal = () => {
    setFilterPopup(true)
  }
  return (
    <ViewCard>
      <div className={'push-notifications'}>
        <FormProvider {...pushFilter}>
          <Form onSubmit={pushFilter.handleSubmit(onFilterSubmit)}>
            <Row>
              <div className={'d-block d-md-none'}>
                <div className={'filter-sec'}>
                  <ThemeButton
                    onClick={() => {
                      filterModal()
                    }}
                    className={'filter-popup-btn'}
                    text={'Apply Filter'}
                    type={'button'}
                    suffixIcon={<FaFilter />}
                  />
                </div>
              </div>
              <div className={'d-none d-md-block'}>
                <PushFilters loading={filterLoader} />
              </div>
              <ThemeModal
                title={'Filters'}
                active={filterPopup}
                setActive={setFilterPopup}
                children={<PushFilters loading={filterLoader} />}
              />
            </Row>
          </Form>
        </FormProvider>
        <Row>
          <Col>
            {disableField ? (
              <h3>
                No user selected{' '}
                <span>(please select the users from the above filter to able the form)</span>
              </h3>
            ) : (
              <h3>{deviceCountMessage}</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={5}>
            <Heading>
              <h2>
                <span>Message</span>
              </h2>
            </Heading>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className={'dfields'}>
                <Controller
                  name="title"
                  defaultValue={''}
                  control={methods.control}
                  rules={{required: Required, maxLength: maxLength(100)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'title'}
                      variant={'field-white'}
                      label={'Title'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      disabled={disableField}
                      field={field}
                      errors={methods.formState.errors.title}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="message"
                  defaultValue={''}
                  control={methods.control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <DescriptionField
                      variant={'field-white'}
                      label={'Message'}
                      labelPos={'out'}
                      placeholder={'Add Description'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      disabled={disableField}
                      errors={methods.formState.errors.message}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <label>Upload Your Image Here</label>
                <ImageUpload
                  disabled={disableField}
                  maxCount={1}
                  setValue={methods.setValue}
                  fieldName={'images'}
                />
              </div>
              {/*<div className={"dfields"}>*/}
              {/*    <Controller*/}
              {/*        name="platform"*/}
              {/*        control={control}*/}
              {/*        rules = {{required : Required}}*/}
              {/*        render={({ field }) => (*/}
              {/*            <MultiSelectField*/}
              {/*                label={"Order Type"}*/}
              {/*                errors={errors.platform}*/}
              {/*                field = {field}*/}
              {/*                selectOptions={orderType}*/}
              {/*                maxTagCount={1}*/}
              {/*            />*/}
              {/*        )}*/}
              {/*    />*/}
              {/*</div>*/}
              {/*<div className={"dfields"}>*/}
              {/*    <Controller*/}
              {/*        name="applies_to"*/}
              {/*        defaultValue={DISCOUNT.APPLIES_TO.ALL}*/}
              {/*        control={control}*/}
              {/*        rules = {{required : Required}}*/}
              {/*        render={({ field }) => (*/}
              {/*            <SelectField*/}
              {/*                defaultValue={''}*/}
              {/*                label={"Applies To"}*/}
              {/*                errors={errors.applies_to}*/}
              {/*                field = {field}*/}
              {/*                selectOptions = {appliesTo}*/}
              {/*                // disabled={!isRestaurantAdmin}*/}
              {/*            />*/}
              {/*        )}*/}
              {/*    />*/}
              {/*</div>*/}
              {/*<div className={"selected-users"}>*/}
              {/*    {watchAppliesTo == DISCOUNT.APPLIES_TO.SPECIFIC && (*/}
              {/*        <>*/}
              {/*            <h5>Specific Item</h5>*/}
              {/*            <div className={"dfields"}>*/}
              {/*                <Controller*/}
              {/*                    name="include_exclude"*/}
              {/*                    defaultValue={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}*/}
              {/*                    control={control}*/}
              {/*                    rules = {{required : Required}}*/}
              {/*                    render={({ field, field:{onChange , value} }) => {*/}
              {/*                        // console.log(field);*/}
              {/*                        return (*/}
              {/*                            <Radio.Group*/}
              {/*                                value={field.value}*/}
              {/*                                onChange={(e) => field.onChange(e.target.value)}*/}
              {/*                                defaultValue={*/}
              {/*                                    DISCOUNT.DISCOUNT_PRODUCT.INCLUDE*/}
              {/*                                }*/}
              {/*                            >*/}
              {/*                                <Radio value={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}>Include</Radio>*/}
              {/*                                <Radio value={DISCOUNT.DISCOUNT_PRODUCT.EXCLUDE}>Exclude</Radio>*/}
              {/*                            </Radio.Group>*/}
              {/*                        );*/}
              {/*                    }}*/}
              {/*                />*/}
              {/*            </div>*/}
              {/*            /!*<div className={"dfields"}>*!/*/}
              {/*            /!*    <Controller*!/*/}
              {/*            /!*        name={`users`}*!/*/}
              {/*            /!*        control={control}*!/*/}
              {/*            /!*        rules = {{required : Required}}*!/*/}
              {/*            /!*        defaultValue={[]}*!/*/}
              {/*            /!*        render={({ field, fieldState }) => (*!/*/}
              {/*            /!*            <MultiSelectField*!/*/}
              {/*            /!*                label={""}*!/*/}
              {/*            /!*                errors={errors?.users}*!/*/}
              {/*            /!*                field = {field}*!/*/}
              {/*            /!*                selectOptions = {users}*!/*/}
              {/*            /!*                // setSelectedEstablishment = {setSelectedEstablishment}*!/*/}
              {/*            /!*                // disabled={true}*!/*/}
              {/*            /!*                // maxTagCount={1}*!/*/}
              {/*            /!*            />*!/*/}
              {/*            /!*        )}*!/*/}
              {/*            /!*    />*!/*/}
              {/*            /!*</div>*!/*/}
              {/*        </>*/}
              {/*    )*/}
              {/*    }*/}

              {/*</div>*/}
              {/*<div className={"mt-4"}>*/}
              {/*    */}
              {/*    <ThemeBtn disabled={disableField} size={"lg"} text={"Submit"} type={"submit"}/>*/}
              {/*</div>*/}
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
                  disabled={disableField}
                />
              </div>
            </Form>
          </Col>
          <Col md={12} lg={7}>
            <Heading>
              <h2>
                <span>Preview</span>
              </h2>
            </Heading>
            <div className={'preview'}>
              <div className={'push-box'}>
                <div className={'push-header'}>
                  <h3>Masto Grill</h3>
                  <span>
                    <BsThreeDots />
                  </span>
                </div>
                <div className={'push-img'}>
                  <img src={previewImage ? previewImage : pushNot} className={'img-fluid'} />
                </div>
                <div className={'push-body'}>
                  <h4>{pushTitle ? pushTitle : 'New Discount available now'}</h4>
                  <p>
                    {pushDes
                      ? pushDes
                      : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem \n' +
                        "Ipsum has been the industry's standard dummy text ever since the 1500s, when \n" +
                        'an unknown printer took a galley of type.\n'}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
