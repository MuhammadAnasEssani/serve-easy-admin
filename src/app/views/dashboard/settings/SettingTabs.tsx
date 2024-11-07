import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Tabs} from 'antd'
import {useUserContext} from '../../../providers/UserProvider'
import PosSetting from './PosSetting'
import {FormProvider, useForm} from 'react-hook-form'
import {Form} from 'react-bootstrap'
import {ISettings} from '../../../interfaces/ISettings'
import OnlineSetting from './OnlineSetting'
import TaxSetting from './TaxSetting'
import BusinessSetting from './BusinessSetting'
import '../../../../assets/css/views/dashboard/setting-tabs.scss'
import {RestaurantSettingService} from '../../../services/api-services/restaurant.setting.service'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {useNavigate} from 'react-router'

export default function SetttingTabs({
  isInitialSetup,
  handleNext,
}: {
  isInitialSetup?: boolean
  handleNext?: () => void
}) {
  const {setTitle, user} = useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  const navigator = useNavigate()

  useEffect(() => {
    setTitle('Settings')
  }, [])
  const {TabPane} = Tabs

  // Form Context of Settings
  const methods = useForm<ISettings>({
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      taxes: [{}],
    },
  })

  const onSubmit = async (formData: ISettings) => {
    setSubmitLoader(true)
    formData.tips = formData.tips?.filter((tip) => tip.percentage)
    const res = await RestaurantSettingService.store(formData)
    if (res.data) {
      toast.success(res.message)
      handleNext?.()
    }
    setSubmitLoader(false)
  }

  //Check Validation
  const [posTabValid, setPosTabValid] = useState<boolean>(true)
  const [onlineTabValid, setOnlineTabValid] = useState<boolean>(true)
  const [taxTabValid, setTaxTabValid] = useState<boolean>(true)
  const [businessTabValid, setBusinessTabValid] = useState<boolean>(true)

  const getRestaurantSetting = async () => {
    setLoading(true)
    const result = await RestaurantSettingService.get()
    if (result.status) {
      if (result.data) {
        const restaurantSettingData: ISettings = {
          delivery_radius: result.data.delivery_radius,
          pickup_radius: result.data.pickup_radius,
          tips: result.data?.tips?.map((tip) => {
            return {
              percentage: tip.percentage,
            }
          }),
          taxes: result.data?.taxes?.map((tax) => {
            return {
              tax_name: tax.tax_name,
              tax_rate: tax.tax_rate,
            }
          }),
          restaurant_business_profile: {
            name: result.data.restaurant.name,
            address: result.data.restaurant.address,
            phone: result.data.restaurant.phone,
          },
        }

        if (result.data.pos_idle_time)
          restaurantSettingData.pos_idle_time = result.data.pos_idle_time
        if (result.data.facebook_url) restaurantSettingData.facebook_url = result.data.facebook_url
        if (result.data.instagram_url)
          restaurantSettingData.instagram_url = result.data.instagram_url
        if (result.data.twitter_url) restaurantSettingData.twitter_url = result.data.twitter_url
        if (result.data.google_plus_url)
          restaurantSettingData.google_plus_url = result.data.google_plus_url
        restaurantSettingData.service_charges = result.data?.service_charges
        restaurantSettingData.delivery_charges = result.data?.delivery_charges
        restaurantSettingData.monthly_sales_target = result.data?.monthly_sales_target
        methods.reset(restaurantSettingData)
      } else {
        methods.setValue("restaurant_business_profile.name", user.restaurant.name)
        methods.setValue("restaurant_business_profile.address", user.restaurant.address)
        methods.setValue("restaurant_business_profile.phone", user.restaurant.phone)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    getRestaurantSetting()
  }, [])

  return (
    <>
      <ViewCard className={'position-unset'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={'settings'}>
              <div className={'theme-tabs'}>
                <Tabs
                  className={`${!posTabValid ? 'error-pos' : ''} ${
                    !onlineTabValid ? 'error-online' : ''
                  } ${!taxTabValid ? 'error-tax' : ''} ${
                    !businessTabValid ? 'error-business' : ''
                  }`}
                  defaultActiveKey="1"
                >
                  <TabPane forceRender={true} tab={`POS`} key="1">
                    <PosSetting setIsValid={setPosTabValid} />
                  </TabPane>
                  <TabPane forceRender={true} tab="Online" key="2">
                    <OnlineSetting setIsValid={setOnlineTabValid} />
                  </TabPane>
                  <TabPane forceRender={true} tab="Tax Rate Setup" key="3">
                    <TaxSetting setIsValid={setTaxTabValid} />
                  </TabPane>
                  <TabPane forceRender={true} tab="Business Profile Management" key="4">
                    <BusinessSetting setIsValid={setBusinessTabValid} />
                  </TabPane>
                </Tabs>
              </div>
            </div>

            <div className={`button-section ${isInitialSetup ? 'initial-setup-actions' : ''}`}>
              <ThemeButton
                onClick={() => navigator(-1)}
                type={'button'}
                className={'form-cancel'}
                text={'Cancel'}
                isHide={isInitialSetup}
              />
              <ThemeButton
                loader={submitLoader}
                type={'submit'}
                className={'form-create'}
                text={isInitialSetup ? 'Save & Next' : 'Save'}
              />
            </div>
          </Form>
        </FormProvider>
      </ViewCard>
    </>
  )
}
