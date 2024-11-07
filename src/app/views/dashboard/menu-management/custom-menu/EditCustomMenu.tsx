import React, {useEffect, useState} from 'react'
import {Col, Row, TabPane} from 'react-bootstrap'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {maxLength, minLength, Required} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import TimeTable from '../../../../components/dashboard/TimeTable'
import '../../../../../assets/css/views/dashboard/create-custom-menu.scss'
import {ICreateCustomMenu, ICustomMenuList} from '../../../../interfaces/ICustomMenu'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../../config/constants'
import {useUserContext} from '../../../../providers/UserProvider'
import {useNavigate, useParams} from 'react-router-dom'
import {CustomMenuServices} from '../../../../services/api-services/custom-menu-service'
import SelectField from '../../../../components/dashboard/SelectField'
import {ITimetable} from '../../../../interfaces/IGetEstablishment'
import EditSelectCustomCategories from './EditSelectCustomMenu'
import DashCheckboxWithValue from '../../../../components/dashboard/DashCheckboxWithValue'
import {Tabs} from 'antd'
import {DealComboServices} from '../../../../services/api-services/deal-combo.services'
import {IDealComboListing} from '../../../../interfaces/IDealsCombo'
import {toast} from 'react-toastify'
import ViewCard from '../../../../components/dashboard/ViewCard'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import CustomMenuDetailSkeleton from '../../../../skeletons/menu-management/custom-menu/CustomMenuDetailSkeleton'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {IMenu} from '../../../../interfaces/IMenu'
import Heading from '../../../../components/dashboard/Heading'

export default function EditCustomMenu() {
  const {TabPane} = Tabs
  const [combos, setCombos] = useState<IDealComboListing[]>([])
  const [deals, setDeals] = useState<IDealComboListing[]>([])
  const [menuCategories, setMenuCategories] = useState<IMenu[]>([])
  const [customMenuCategories, setCustomMenuCategories] = useState<IMenu[]>([])
  const {setTitle, establishments, establishmentId} = useUserContext()
  const {id} = useParams<any>()
  const [timeSchedule, setTimeSchedule] = useState<ITimetable[]>()
  const [singleCustomMenu, setSingleCustomMenu] = useState<ICustomMenuList>()
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const navigator = useNavigate()
  const methods = useForm<ICreateCustomMenu>({
    shouldUnregister: false,
    mode: 'onChange',
  })
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
  const fetchDealCombos = (type: number) => {
    return singleCustomMenu?.deals_combos.filter((data) => data.type == type)
  }

  const updateFormData = (data: ICustomMenuList) => {
    let updatedTimeTable = Array(7)
      .fill({
        start_time: '',
        end_time: '',
      })
      .map((item, index) => {
        let matchValue = data.time_tables.find((item) => item.day_id === index + 1)
        if (matchValue) return matchValue
        else
          return {
            ...item,
            day_id: index + 1,
          }
      })

    const updateData: ICreateCustomMenu = {
      name: data.name,
      description: data.description,
      establishment_id: data.establishment_id,
      product: [],
      time_tables: updatedTimeTable,
      deals_combos: [],
      custom_menu_order_types: orderTypes.map((orderType) => ({
        type: data.order_types.find((singleOrderType) => singleOrderType.type === orderType.id)
          ?.type,
      })),
      combos: data.deals_combos
        .filter((data) => data.type == BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO)
        ?.flatMap((data) => data.id),
      deals: data.deals_combos
        .filter((data) => data.type == BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL)
        ?.flatMap((data) => data.id),
    }
    methods.reset(updateData)
  }
  useEffect(() => {
    if (singleCustomMenu) updateFormData(singleCustomMenu)
  }, [singleCustomMenu])

  const fetchCombos = () => {
    return DealComboServices.all({
      establishment_id: establishmentId,
      type: [BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO],
    })
  }
  const fetchDeals = () => {
    return DealComboServices.all({
      establishment_id: establishmentId,
      type: [BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL],
    })
  }
  const fetchSingleCustomMenu = () => {
    return CustomMenuServices.getById(id, {relations: ['deals_combos', 'order_types']})
  }
  const fetchCustomMenuCategories = () => {
    return CustomMenuServices.getAllCategories(id, {
      type: BACKEND_CONSTANTS.CUSTOM_MENU.TYPE.ALL_CHECKED_PRODUCTS,
    })
  }
  const fetchMenuCategories = () => {
    return MenuServices.getAllCategories(
      null,
      {establishment_id: establishmentId, relation: 'all'},
      false,
      PAGINATION.perPage,
      1
    )
  }

  const initialize = async () => {
    setLoader(true)
    const dealsResponse = await fetchDeals()
    const combosResponse = await fetchCombos()
    const customMenuResponse = await fetchSingleCustomMenu()
    const customMenuCategoriesResponse = await fetchCustomMenuCategories()
    const menuCategoriesResponse = await fetchMenuCategories()
    if (
      dealsResponse.status &&
      combosResponse.status &&
      customMenuResponse.status &&
      customMenuCategoriesResponse.status &&
      menuCategoriesResponse.status
    ) {
      setSingleCustomMenu(customMenuResponse.data)
      setTimeSchedule(customMenuResponse.data?.time_tables)
      setDeals(dealsResponse.data)
      setCombos(combosResponse.data)
      setCustomMenuCategories(customMenuCategoriesResponse.data)
      setMenuCategories(menuCategoriesResponse.data)
      setLoader(false)
    }
  }

  useEffect(() => {
    setTitle('Edit Custom Menu')
    initialize()
  }, [])

  const onSubmit = async (formData: ICreateCustomMenu) => {
    setSubmitLoading(true)
    formData.time_tables = formData.time_tables.filter(
      (timetable) => timetable.status === BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.ACTIVE
    )
    formData.combos = formData?.combos?.filter((combo) => combo != null) || []
    formData.deals = formData?.deals?.filter((deal) => deal != null) || []
    formData.custom_menu_order_types = formData?.custom_menu_order_types?.filter(
      (orderType) => orderType.type
    )
    formData.deals_combos = [...formData.deals, ...formData?.combos]
    delete formData.deals
    delete formData.combos
    const res = await CustomMenuServices.update(id, formData)
    if (res.status) {
      toast.success(res.message)
      navigator(`/custom-menu-detail/${res.data.id}`)
    }
    setSubmitLoading(false)
  }
  if (loader) {
    return <CustomMenuDetailSkeleton />
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
                        <span>Edit Custom Menu</span>
                      </h2>
                    </Heading>
                    <div className={'createuser-fields dfields'}>
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

                    <div className={'createuser-fields dfields'}>
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

                    <div className={'dfields menu-manage-fields mt-2'}>
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
                            <li key={index}>
                              <div className={'dfields discount-fields'}>
                                <Controller
                                  name={`custom_menu_order_types.${index}.type`}
                                  control={methods.control}
                                  render={({field: {name, value}}) => (
                                    <DashCheckboxWithValue
                                      checkedInput={singleCustomMenu?.order_types.some(
                                        (orderTypes) => orderTypes.type === orderType.id
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
                    <div className={'button-section'}>
                      <ThemeButton
                        onClick={() => navigator(-1)}
                        type={'button'}
                        className={'form-cancel'}
                        text={'Cancel'}
                      />
                      <ThemeButton
                        loader={submitLoading}
                        type={'submit'}
                        className={'form-create'}
                        text={'Save'}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={12} lg={6} xl={6} xxl={4}>
                  <div className={'center-col'}>
                    <div className={'theme-tabs'}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Products" key="1">
                          {singleCustomMenu && (
                            <EditSelectCustomCategories
                              establishmentId={singleCustomMenu?.establishment_id}
                              menuCategories={menuCategories}
                              customMenuCategories={customMenuCategories}
                            />
                          )}
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
                                        // defaultValue={item.id}
                                        control={methods.control}
                                        render={({field: {name, value}}) => (
                                          <DashCheckboxWithValue
                                            checkedInput={singleCustomMenu?.deals_combos.some(
                                              (data) => data.id === item.id
                                            )}
                                            setValue={methods.setValue}
                                            name={name}
                                            label={item.name}
                                            fieldValue={item.id}
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
                                        // defaultValue={item.id}
                                        control={methods.control}
                                        render={({field: {name, value}}) => (
                                          <DashCheckboxWithValue
                                            checkedInput={singleCustomMenu?.deals_combos.some(
                                              (data) => data.id === item.id
                                            )}
                                            setValue={methods.setValue}
                                            name={name}
                                            label={item.name}
                                            fieldValue={item.id}
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
                    {timeSchedule && <TimeTable apiData={timeSchedule} />}
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
