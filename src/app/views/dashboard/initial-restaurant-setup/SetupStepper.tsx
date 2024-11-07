import {Steps} from 'antd'
import React, {useEffect, useState} from 'react'
import SetttingTabs from '../settings/SettingTabs'
import WebsiteManagement from '../cms/WebsiteManagement'
import FinishScreen from './FinishScreen'
import {RestaurantStepperService} from '../../../services/api-services/restaurant.stepper.service'
import {BACKEND_CONSTANTS} from '../../../config/constants'
import MobileManagement from '../cms/MobileManagement'
import CreateEstablishment from '../establishments/CreateEstablishment'
import {useUserContext} from '../../../providers/UserProvider'
import EditEstablishment from '../establishments/EditEstablishment'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import { LogoutOutlined } from '@ant-design/icons';
import { UserAuthService } from '../../../services/api-services/user-auth-api.service'

const SetupStepper = ({handleFinish, status}: {handleFinish: () => void; status: number}) => {
  const {setInitialSetupStatus, establishmentId} = useUserContext()
  const STEPS_CONSTANT = {
    ESTABLISHMENT: 0,
    SETTING: 1,
    WEB_THEME: 2,
    MOBILE_THEME: 3,
    FINISH: 4,
  }
  const [current, setCurrent] = useState(STEPS_CONSTANT.ESTABLISHMENT)
  const STEPPER_STATUS = BACKEND_CONSTANTS.RESTAURANT_STEPPER.STATUS
  const next = () => {
    setCurrent(current + 1)
    RestaurantStepperService.store({
      restaurant_status: current,
    })
    // if (current === STEPS_CONSTANT.FINISH) {
    setInitialSetupStatus(current)
    // }
  }
  const handleChange = (value: number) => {
    if (value < current) {
      setCurrent(value)
    }
  }
  const handleLogout = () => {
    UserAuthService.logout()
  }

  useEffect(() => {
    setCurrent(status + 1)
  }, [status])
  const steps = [
    {
      title: 'Create Establishment',
      component:
        status >= STEPS_CONSTANT.ESTABLISHMENT ? (
          establishmentId && (
            <EditEstablishment
              isInitialSetup={true}
              handleNext={next}
              idByProps={establishmentId}
            />
          )
        ) : (
          <CreateEstablishment isInitialSetup={true} handleNext={next} />
        ),
    },
    {
      title: 'Restaurant Settings',
      component: <SetttingTabs isInitialSetup={true} handleNext={next} />,
    },
    {
      title: 'Website Theme',
      component: <WebsiteManagement isInitialSetup={true} handleNext={next} />,
    },
    {
      title: 'Mobile Theme',
      component: <MobileManagement isInitialSetup={true} handleNext={next} />,
    },
    {
      title: 'Finish',
      component: <FinishScreen handleSubmit={handleFinish} handleNext={next} />,
    },
  ]
  const items = steps.map((item) => ({key: item.title, title: item.title}))

  return (
    <>
      <div className="steps-header">
        <Steps current={current} items={items} onChange={handleChange} />
        <ThemeButton
          onClick={handleLogout}
          className={'form-create'}
          text={'Logout'}
        />
      </div>

      <div className="steps-content">{steps[current]?.component}</div>
    </>
  )
}

export default SetupStepper
