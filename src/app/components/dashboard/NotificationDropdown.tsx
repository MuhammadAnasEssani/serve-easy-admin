import React, {useState, useEffect} from 'react'
import '../../../assets/css/components/dashboard/notificationdropdown.scss'
import {AiOutlineBell} from 'react-icons/ai'
import {IHeaderDropdown} from '../../interfaces/IHeaderDropdown'
import {Badge, Popover} from 'antd'
import NotificationList from './NotificationList'
import {NotificationService} from '../../services/api-services/notification.service'

export default function NotificationDropdown({dropdown, setDropdown}: IHeaderDropdown) {
  const [open, setOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  function dropdownHandle() {
    setDropdown({
      notification: !dropdown,
      profile: false,
    })
  }
  const getNotificationCount = async () => {
    let response = await NotificationService.getUnreadCount()
    if (response.status) {
      setNotificationCount(response.data.unread_count)
    }
  }
  useEffect(() => {
    getNotificationCount()
  }, [])

  return (
    <Popover
      content={<NotificationList />}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="notification-dropdown">
        <div className={`drop-down`}>
          <div onClick={dropdownHandle} id="dropDown" className="drop-down__button">
            <Badge count={notificationCount}>
              <div className={'notification-icon'}>
                <AiOutlineBell />
                {/*todo: add counter */}
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </Popover>
  )
}
