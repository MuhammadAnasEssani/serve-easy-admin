import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, minLength, Required} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import SelectCustomCategories from './SelectCustomCategories'
import TimeTable from '../../../../components/dashboard/TimeTable'
import '../../../../../assets/css/views/dashboard/create-custom-menu.scss'
import {ICreateCustomMenu} from '../../../../interfaces/ICustomMenu'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {useUserContext} from '../../../../providers/UserProvider'
import {useNavigate} from 'react-router-dom'
import SelectField from '../../../../components/dashboard/SelectField'
import {Tabs} from 'antd'
import DashCheckboxWithValue from '../../../../components/dashboard/DashCheckboxWithValue'
import {DealComboServices} from '../../../../services/api-services/deal-combo.services'
import {IDealComboListing} from '../../../../interfaces/IDealsCombo'
import {toast} from 'react-toastify'
import {CustomMenuServices} from '../../../../services/api-services/custom-menu-service'
import ViewCard from '../../../../components/dashboard/ViewCard'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import Heading from '../../../../components/dashboard/Heading'

export default function CreateCustomMenu() {
  const {TabPane} = Tabs
  const [combos, setCombos] = useState<IDealComboListing[]>([])
  const [deals, setDeals] = useState<IDealComboListing[]>([])
  const {setTitle, isRestaurantAdmin, user, isUserReady, establishmentId, establishments} =
    useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
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
  // const [establishments , setEstablishments] = useState<IGetEstablishmentDropdown[]>([])
  const navigator = useNavigate()
  const methods = useForm<ICreateCustomMenu>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const fetchCombos = () => {
    DealComboServices.all({
      establishment_id: establishmentId,
      type: [BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO],
    }).then((res) => {
      setCombos(res.data)
    })
  }
  const fetchDeals = () => {
    DealComboServices.all({
      establishment_id: establishmentId,
      type: [BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL],
    }).then((res) => {
      setDeals(res.data)
    })
  }

  useEffect(() => {
    setTitle('Create Custom Menu')
    fetchCombos()
    fetchDeals()
  }, [establishmentId])

  useEffect(() => {
    methods.setValue('establishment_id', establishmentId)
  }, [establishmentId])

  /*Set establishment in case of restaurant owner or establishment level employee*/
  useEffect(() => {
    !isRestaurantAdmin && isUserReady && methods.setValue('establishment_id', user.establishment_id)
  }, [user])

  const onSubmit = async (formData: ICreateCustomMenu) => {
    setLoading(true)
    formData.time_tables = formData.time_tables.filter(
      (timetable) => timetable.status === BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.ACTIVE
    )
    formData.combos = formData?.combos?.filter((combo) => combo != null) || []
    formData.deals = formData?.deals?.filter((deal) => deal != null) || []
    formData.custom_menu_order_types =
      formData?.custom_menu_order_types?.filter((orderType) => orderType.type != null) || []
    formData.deals_combos = [...formData.deals, ...formData?.combos]
    delete formData.deals
    delete formData.combos
    const res = await CustomMenuServices.store(formData)
    if (res.status) {
      toast.success(res.message)
      navigator(`/custom-menu-detail/${res.data.id}`)
    }
    setLoading(false)
  }

  return (
    <>
      <ViewCard>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={'create-custom-menu'}>
              <Row className={'h-100'}>
                <Col md={12} lg={6} xl={6} xxl={3}>
                  <div className={'left-col'}>
                    <Heading>
                      <h2>
                        <span>Create Custom Menu</span>
                      </h2>
                    </Heading>
                    <div className={'custom-menu-fields dfields'}>
                      <Controller
                        name="name"
                        defaultValue={''}
                        control={methods.control}
                        rules={{
                          required: Required,
                          minLength: minLength(3),
                          maxLength: maxLength(50),
                        }}
                        render={({field}) => (
                          <TextInput
                            placeholder={'name'}
                            variant={'field-white'}
                            label={'Custom Menu Name'}
                            labelPos={'out'}
                            labelColor={'dark'}
                            type={'text'}
                            field={field}
                            errors={methods.formState.errors.name}
                          />
                        )}
                      />
                    </div>

                    <div className={'custom-menu-fields dfields'}>
                      <Controller
                        name="establishment_id"
                        control={methods.control}
                        rules={{required: Required}}
                        render={({field: {name, ...field}}) => {
                          return (
                            <SelectField
                              label={'Select Establishment'}
                              errors={methods.formState.errors.establishment_id}
                              field={field}
                              selectOptions={establishments}
                              disabled={true}
                            />
                          )
                        }}
                      />
                    </div>

                    <div className={'dfields custom-menu-fields mt-2'}>
                      <Controller
                        name="description"
                        defaultValue={''}
                        control={methods.control}
                        rules={{maxLength: maxLength(500)}}
                        render={({field}) => (
                          <DescriptionField
                            variant={'field-white'}
                            label={'Custom Menu Description (Optional)'}
                            labelPos={'out'}
                            placeholder={'Add Description'}
                            labelColor={'dark'}
                            type={'text'}
                            field={field}
                            errors={methods.formState.errors.description}
                          />
                        )}
                      />
                    </div>
                    <div className={'discount-detail-check'}>
                      <h5>Order Type</h5>
                      <ul>
                        {orderTypes.map((orderType, index) => {
                          return (
                            <li>
                              <div className={'dfields discount-fields'}>
                                <Controller
                                  name={`custom_menu_order_types.${index}.type`}
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
                    <div className={'button-section'}>
                      <ThemeButton
                        onClick={() => navigator(-1)}
                        type={'button'}
                        className={'form-cancel'}
                        text={'Cancel'}
                      />
                      <ThemeButton
                        loader={loading}
                        className={'form-create'}
                        type={'submit'}
                        text={'Create'}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={12} lg={6} xl={6} xxl={4}>
                  <div className={'center-col'}>
                    <div className={'theme-tabs'}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Products" key="1">
                          <SelectCustomCategories />
                        </TabPane>
                        <TabPane tab="Combo" key="2">
                          <div className={'custom-menu-deals-combo-select'}>
                            <ul>
                              {combos.map((item, index: number) => {
                                return (
                                  <li key={item.id}>
                                    <div className={'dfields custom-menu-fields'}>
                                      <Controller
                                        name={`combos.${index}`}
                                        defaultValue={item.id}
                                        control={methods.control}
                                        render={({field: {name, value}}) => (
                                          <DashCheckboxWithValue
                                            checkedInput={false}
                                            setValue={methods.setValue}
                                            name={name}
                                            label={item.name}
                                            // disabled={}
                                            value={item.id}
                                          />
                                        )}
                                      />
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </TabPane>
                        <TabPane tab="Deals" key="3">
                          <div className={'custom-menu-deals-combo-select'}>
                            <ul>
                              {deals.map((item, index: number) => {
                                return (
                                  <li key={item.id}>
                                    <div className={'dfields custom-menu-fields'}>
                                      <Controller
                                        name={`deals.${index}`}
                                        defaultValue={item.id}
                                        control={methods.control}
                                        render={({field: {name, value}}) => (
                                          <DashCheckboxWithValue
                                            checkedInput={false}
                                            setValue={methods.setValue}
                                            name={name}
                                            label={item.name}
                                            // disabled={}
                                            value={item.id}
                                          />
                                        )}
                                      />
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </div>
                </Col>
                <Col md={12} lg={6} xl={6} xxl={5}>
                  <div className={'right-col'}>
                    <TimeTable />
                  </div>
                </Col>
              </Row>
            </div>
          </form>
        </FormProvider>
      </ViewCard>
    </>
  )
}
