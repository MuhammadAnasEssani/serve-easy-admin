import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import SetupStepper from './SetupStepper'
import '../../../../assets/css/views/dashboard/initial-restaurant-setp.scss'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, ROLES} from '../../../config/constants'

const InitialRestaurantSetup = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const {initialSetupStatus, user} = useUserContext()
  useEffect(() => {
    if (user.roles[0].id == ROLES.RESTAURANT_ADMIN) {
      if (initialSetupStatus == BACKEND_CONSTANTS.RESTAURANT_STEPPER.STATUS.FINISH) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
  }, [initialSetupStatus, user])
  return (
    <div className={'initial-restaurant-setup'}>
      <Modal
        transitionName={''}
        open={!!isOpen}
        title={null}
        footer={null}
        closeIcon={<></>}
        mask={false}
        width={'70%'}
        className={'restaurant-setup-modal'}
        wrapClassName={'wraper-setup-modal'}
      >
        <SetupStepper
          handleFinish={() => setIsOpen(false)}
          status={initialSetupStatus === null ? -1 : initialSetupStatus}
        />
      </Modal>
    </div>
  )
}
export default InitialRestaurantSetup
