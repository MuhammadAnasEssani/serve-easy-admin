import React, {useState} from 'react'
import ThemeButton from './ThemeButton'
import RemoveDevice from '../../../assets/images/pos-devices/remove-device.svg'
import {PosDeviceServices} from '../../services/api-services/posDevice.services'
import {toast} from 'react-toastify'

function PosDeviceDelete({
  handleCancel,
  id,
  reloadTable,
}: {
  handleCancel: () => void
  reloadTable: () => void
  id: number
}) {
  const [loading, setLoading] = useState(false)
  const handleRemove = async (deviceId: number) => {
    setLoading(true)
    const response = await PosDeviceServices.destroy(deviceId)
    if (response.status) {
      reloadTable()
      toast.success(response.message)
      handleCancel()
    }
    setLoading(false)
  }

  return (
    <div className={`pos-delete-modal`}>
      <div className={'pos-icon'}>
        <img src={RemoveDevice} />
      </div>

      <div className={'pos-content'}>
        <div className={'title'}>Remove Device!</div>
        <div className={'question'}>Are you sure to remove this device?</div>
      </div>

      <div className={'action-buttons'}>
        <ThemeButton
          className={'pos-delete-btn red'}
          onClick={() => handleRemove(id)}
          loader={loading}
          text={'Yes'}
        />
        <ThemeButton className={'pos-delete-btn'} onClick={() => handleCancel()} text={'No'} />
      </div>
    </div>
  )
}
export default PosDeviceDelete
