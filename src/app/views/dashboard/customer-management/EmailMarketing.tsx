import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {EmailValidation, MaxLength, maxLength, MinLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {IEmailMarketing} from '../../../interfaces/ICustomerManagement'
import DescriptionField from '../../../components/authentication/DescriptionField'
import ImageUpload from '../../../components/dashboard/ImageUpload'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import {BACKEND_CONSTANTS, DISCOUNT} from '../../../config/constants'
import SelectField from '../../../components/dashboard/SelectField'
import {Radio} from 'antd'
import '../../../../assets/css/views/dashboard/email-marketing.scss'
import ThemeBtn from '../../../components/authentication/ThemeBtn'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from 'react-places-autocomplete'
import EmailInput from '../../../components/authentication/EmailInput'
import Heading from '../../../components/dashboard/Heading'

export default function EmailMarketing() {
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Email Marketing')
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
    watch,
  } = useForm<IEmailMarketing>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IEmailMarketing) => {
    console.log(data)
  }

  const watchAppliesTo = watch('applies_to', undefined) // you can supply default value as second argument
  const watchType = watch('type', undefined) // you can supply default value as second argument

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
    /*
     * If the type is fixed then applies to should restricted to all
     * If Applies to is all, then set product empty
     * */
    if (watchType === DISCOUNT.DISCOUNT_TYPE.FIXED) {
      setValue('applies_to', DISCOUNT.APPLIES_TO.ALL)
    }

    if (watchAppliesTo === DISCOUNT.APPLIES_TO.ALL) {
      setValue('users', [])
    }
  }, [watchType, watchAppliesTo])
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
  const users = [
    {
      id: 1,
      name: 'Ali',
    },
    {
      id: 3,
      name: 'Umair',
    },
    {
      id: 4,
      name: 'Waqar',
    },
    {
      id: 5,
      name: 'Hassan',
    },
    {
      id: 6,
      name: 'Shahzaib',
    },
    {
      id: 7,
      name: 'Anus',
    },
    {
      id: 8,
      name: 'Talha',
    },
  ]

  const url = [
    {
      id: 1,
      name: 'www.example.com',
    },
    {
      id: 2,
      name: 'www.sample.com',
    },
  ]

  //Location function
  const [latitude, setLatitude] = useState<null | number>(null)
  const [longitude, setLongitude] = useState<null | number>(null)

  const handleChange = (address: string) => {
    // setAddress(address);
    setValue('address', address)
  }

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results: google.maps.GeocoderResult[]) => {
        // setAddress(results[0].formatted_address)
        setValue('address', address)
        // setCity(results[0].address_components[3]?.short_name)
        // setState(results[0].address_components[6]?.short_name)
        return getLatLng(results[0])
      })
      .then((latLng: google.maps.LatLngLiteral) => {
        setLatitude(latLng.lat)
        setLongitude(latLng.lng)
      })
      .catch((error: any) => console.error('Error', error))
  }

  return (
    <ViewCard>
      <div className={'email-marketing'}>
        <Row>
          <Col md={5}>
            <Heading>
              <h2>
                <span>Message</span>
              </h2>
            </Heading>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className={'dfields'}>
                <Controller
                  name="title"
                  defaultValue={''}
                  control={control}
                  rules={{required: Required, maxLength: maxLength(100)}}
                  render={({field}) => (
                    <TextInput
                      placeholder={'title'}
                      variant={'field-white'}
                      label={'Title'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.title}
                    />
                  )}
                />
              </div>
              <div className={'dfields establishment-fields'}>
                <div className={'location-field'}>
                  <Controller
                    name="address"
                    defaultValue={''}
                    control={control}
                    rules={{required: Required, minLength: MinLength, maxLength: MaxLength}}
                    render={({field}) => (
                      <>
                        <Form.Label className={'label-light'}>Address</Form.Label>
                        <PlacesAutocomplete
                          value={field.value}
                          onChange={handleChange}
                          onSelect={handleSelect}
                        >
                          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                            <div className={'form-group'}>
                              <input
                                {...getInputProps({
                                  placeholder: 'Search Places ...',
                                  className: 'form-control location-search-input',
                                })}
                              />

                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}

                                {suggestions.map((suggestion: Suggestion) => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item'
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                    : {backgroundColor: '#ffffff', cursor: 'pointer'}
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span className={'serach-data'}>
                                        {suggestion.description}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </>
                    )}
                  />
                </div>

                <div className="errors">
                  {errors.address && (
                    <small className="field-success">{errors.address.message}</small>
                  )}
                </div>
              </div>
              <div className={'dfields'}>
                <Controller
                  name="reply_email"
                  defaultValue={''}
                  control={control}
                  rules={{required: Required, pattern: EmailValidation}}
                  render={({field}) => (
                    <EmailInput
                      placeholder={'sample@gmail.com'}
                      variant={'field-white'}
                      label={'Reply-to email address'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.reply_email}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="res_website_url"
                  defaultValue={DISCOUNT.APPLIES_TO.ALL}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      defaultValue={''}
                      label={'Restaurant website address (URL)'}
                      errors={errors.res_website_url}
                      field={field}
                      selectOptions={url}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="description"
                  defaultValue={''}
                  control={control}
                  rules={{maxLength: maxLength(500)}}
                  render={({field}) => (
                    <DescriptionField
                      variant={'field-white'}
                      label={'Custom Message'}
                      labelPos={'out'}
                      placeholder={'Add Description'}
                      labelColor={'dark'}
                      type={'text'}
                      field={field}
                      errors={errors.description}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
                <label>Upload Your Image Here</label>
                <ImageUpload maxCount={1} setValue={setValue} fieldName={'notification_image'} />
              </div>
              <div className={'dfields'}>
                <Controller
                  name="platform"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      label={'Order Type'}
                      errors={errors.platform}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                    />
                  )}
                />
              </div>
              <div className={'dfields'}>
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
              <div className={'selected-users'}>
                {watchAppliesTo == DISCOUNT.APPLIES_TO.SPECIFIC && (
                  <>
                    <h5>Specific Item</h5>
                    <div className={'dfields'}>
                      <Controller
                        name="include_exclude"
                        defaultValue={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}
                        control={control}
                        rules={{required: Required}}
                        render={({field, field: {onChange, value}}) => {
                          // console.log(field);
                          return (
                            <Radio.Group
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              defaultValue={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}
                            >
                              <Radio value={DISCOUNT.DISCOUNT_PRODUCT.INCLUDE}>Include</Radio>
                              <Radio value={DISCOUNT.DISCOUNT_PRODUCT.EXCLUDE}>Exclude</Radio>
                            </Radio.Group>
                          )
                        }}
                      />
                    </div>
                    <div className={'dfields'}>
                      <Controller
                        name={`users`}
                        control={control}
                        rules={{required: Required}}
                        defaultValue={[]}
                        render={({field, fieldState}) => (
                          <MultiSelectField
                            label={''}
                            errors={errors?.users}
                            field={field}
                            selectOptions={users}
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
              <div className={'mt-4'}>
                <ThemeBtn size={'lg'} text={'Submit'} type={'submit'} />
              </div>
            </Form>
          </Col>
          <Col md={7}>
            <Heading>
              <h2>
                <span>Preview</span>
              </h2>
            </Heading>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
