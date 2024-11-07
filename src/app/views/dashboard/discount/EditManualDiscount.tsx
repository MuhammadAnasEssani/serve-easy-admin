import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-discount.scss'
import {useUserContext} from '../../../providers/UserProvider'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import SelectField from '../../../components/dashboard/SelectField'
import {ICreateManualDiscount} from '../../../interfaces/IDiscount'
import TimeTable from '../../../components/dashboard/TimeTable'
import {DISCOUNT} from '../../../config/constants'
import {useNavigate, useParams} from 'react-router-dom'
import CreateDiscountSkeleton from '../../../skeletons/discount/CreateDiscountSkeleton'
import {DiscountServices} from '../../../services/api-services/discount.services'
import moment from 'moment'
import {ITimetable} from '../../../interfaces/IGetEstablishment'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {fineTuneDiscountFormData} from './CreateManualDiscount'
import Heading from '../../../components/dashboard/Heading'

export default function EditManualDiscount() {
  const methods = useForm<ICreateManualDiscount>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const {id} = useParams<any>()
  const navigator = useNavigate()
  const {setTitle, establishmentId} = useUserContext()
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [timeSchedule, setTimeSchedule] = useState<ITimetable[]>()

  useEffect(() => {
    setTitle('Edit Manual Discount')
  }, [])

  const onSubmit = async (data: ICreateManualDiscount) => {
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

  const getSingleDiscount = async () => {
    setLoader(true)
    const res = await DiscountServices.getById(id)
    if (res.status) {
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
      const updateData: ICreateManualDiscount = {
        ...res.data,
        time_tables: updatedTimeTable,
        date_range: [
          moment(res.data.start_date).format('YYYY-MM-DD'),
          moment(res.data.expiry_date).format('YYYY-MM-DD'),
        ], // hold temp data
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
                  <Col md={6} lg={4} xl={5}>
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
                      <Col className={''} md={12}>
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
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} lg={8} xl={7}>
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
