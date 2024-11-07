import React, {useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-discount.scss'
import {useUserContext} from '../../../providers/UserProvider'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import SelectField from '../../../components/dashboard/SelectField'
import {ICreateManualDiscount} from '../../../interfaces/IDiscount'
import TimeTable from '../../../components/dashboard/TimeTable'
import {BACKEND_CONSTANTS, DISCOUNT} from '../../../config/constants'
import {useNavigate} from 'react-router-dom'
import {DiscountServices} from '../../../services/api-services/discount.services'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'

// import {CiCalendarDate} from "react-icons/ci"

export function fineTuneDiscountFormData(formData: ICreateManualDiscount, establishmentId: number) {
  formData.establishment_id = establishmentId

  formData.applies_to = DISCOUNT.APPLIES_TO.ALL

  formData.is_manual = true

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

export default function CreateManualDiscount() {
  const methods = useForm<ICreateManualDiscount>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const navigator = useNavigate()
  const {establishmentId} = useUserContext()
  const [loader, setLoader] = useState<boolean>(true)

  const onSubmit = async (data: ICreateManualDiscount) => {
    // console.log(data)
    const formattedFormData = fineTuneDiscountFormData(data, establishmentId)
    // console.log(formattedFormData)
    DiscountServices.store(formattedFormData).then((res) => {
      if (res.status) {
        toast.success(res.message)
        methods.reset()
        navigator(`/discount-detail/${res.data.id}`)
      }
    })
  }

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

  return (
    <>
      <div className={'discount'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row>
              <Col md={5}>
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
                  <Col className={'h-100'} md={12}>
                    <div className={'left-col h-100'}>
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
                                  methods.getValues().type === DISCOUNT.DISCOUNT_TYPE.PERCENTAGE &&
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
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
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
              <ThemeButton type={'submit'} className={'form-create'} text={'Create'} />
            </div>
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
