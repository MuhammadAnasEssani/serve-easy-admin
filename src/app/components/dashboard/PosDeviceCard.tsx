import React, {useEffect, useState} from 'react'
import PosCardImg from '../../../assets/images/pos-devices/pos-card.svg'
import EditIcon from '../../../assets/images/pos-devices/edit.svg'
import DeleteIcon from '../../../assets/images/pos-devices/delete.svg'
import ThemeSwitch from '../authentication/Switch'
import {IDeviceList} from '../../interfaces/IPosDevice'
import {BACKEND_CONSTANTS} from '../../config/constants'
import moment from 'moment'
import {PosDeviceServices} from '../../services/api-services/posDevice.services'
import {toast} from 'react-toastify'
import {convertTimeZone} from '../../services/helper/convert-time-zone'

function PosDeviceCard({
  isActive,
  device,
  handleEdit,
  handleDelete,
}: {
  isActive: boolean
  device: IDeviceList
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}) {
  const [activeStatus, setActiveStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setActiveStatus(device.status === BACKEND_CONSTANTS.POS_DEVICE.STATUS.ACTIVE)
  }, [device.status])
  const handleChange = async (status: boolean) => {
    setActiveStatus(status)
    setLoading(true)
    const statusCode = status
      ? BACKEND_CONSTANTS.POS_DEVICE.STATUS.ACTIVE
      : BACKEND_CONSTANTS.POS_DEVICE.STATUS.INACTIVE
    const response = await PosDeviceServices.updateStatus(device.id, statusCode)
    if (!response.status) {
      // if getting error in api
      toast.error(response.message)
      // then rollback active status
      setActiveStatus(!activeStatus)
    }
    setLoading(false)
  }

  return (
    <div className={`pos-card-item ${!activeStatus ? 'disconnected' : ''}`}>
      <div className={'pos-status'}>{activeStatus ? 'Active Now' : 'Disconnected'}</div>
      <div className={'pos-edit-icon'}>
        <div>
          <img onClick={() => handleDelete(device.id)} src={DeleteIcon} className={'img-fluid'} />
        </div>
        <div className={'line'} />
        <div>
          <img onClick={() => handleEdit(device.id)} src={EditIcon} className={'img-fluid'} />
        </div>
      </div>

      <div className={'pos-img'}>
        <img src={PosCardImg} className={'img-fluid'} />
      </div>

      <div>
        <div className={'detail-item'}>
          <div>Status</div>
          <div>
            <ThemeSwitch
              disabled={loading}
              checked={activeStatus}
              fieldName={'tip_status'}
              setSwitchValue={handleChange}
            />
          </div>
        </div>
        <div className={'detail-item'}>
          <div>Device Name</div>
          <div>{device.name}</div>
        </div>
        <div className={'detail-item'}>
          <div>Date</div>
          <div>{convertTimeZone(device.created_at).date}</div>
        </div>
        <div className={'detail-item'}>
          <div>Code</div>
          <div>{device.verification_code}</div>
        </div>
        <div className={'detail-item'}>
          <div>Device Id</div>
          <div>{device.device_id}</div>
        </div>
      </div>
    </div>
  )
}
export default PosDeviceCard
