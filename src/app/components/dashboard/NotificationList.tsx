import React, {useEffect, useState} from 'react'
import '../../../assets/css/components/dashboard/notificationdropdown.scss'
import {AiOutlineCheck, AiOutlineInfoCircle} from 'react-icons/ai'
import {BsEnvelopeOpen} from 'react-icons/bs'
import {NotificationService} from '../../services/api-services/notification.service'
import {INotificationList} from '../../interfaces/INotification'
import {IoCloseOutline} from 'react-icons/io5'
import {useUserContext} from '../../providers/UserProvider'
import {BACKEND_CONSTANTS, ROLES} from '../../config/constants'
import {Link, useNavigate} from 'react-router-dom'

export default function NotificationList() {
  const [notifications, setNotifications] = useState<INotificationList[]>([])
  const {newNotification, user} = useUserContext()

  const navigator = useNavigate()

  const fetchNotification = async () => {
    const res = await NotificationService.all()
    if (res.status) {
      setNotifications(res.data)
    }
  }

  useEffect(() => {
    //todo: we will give permission to notification module from apis lateron.
    if (user.roles[0].id > ROLES.ADMIN) fetchNotification()
    //todo: fetch unreadCount
  }, [newNotification])

  const navigationSwitch = async (notification: INotificationList) => {
    const {type, read_at, ref_id, id} = notification
    if (!read_at) {
      const res = await NotificationService.readNotification(id)
      if (res.status) {
        //todo: update unreadCount
        fetchNotification()
      }
    }
    switch (type) {
      case BACKEND_CONSTANTS.NOTIFICATION_TYPE.MENU_MANAGEMENT:
        navigator('/menu')
        break
      case BACKEND_CONSTANTS.NOTIFICATION_TYPE.MODIFIERS:
        navigator('/modifiers')
        break
    }
  }
  const markAllRead = async () => {
    const res = await NotificationService.markAllRead()
    if (res.status) {
      //todo: update unreadCount
      fetchNotification()
    }
  }
  return (
    <div className="notification-list">
      <div className="drop-down__menu-box">
        <ul className="drop-down__menu">
          <li data-name="profile" className="notification-dropdown-header">
            Notification <BsEnvelopeOpen onClick={markAllRead} />{' '}
          </li>
          <li data-name="dashboard" className="not_drop-down__item danger">
            <ul className={'notification-section'}>
              {notifications.map((notification) => {
                return (
                  <li
                    onClick={() => navigationSwitch(notification)}
                    className={`drop-down__item ${
                      !notification?.extra_parsed
                        ? 'primary'
                        : notification?.extra_parsed?.status
                        ? 'success'
                        : 'danger'
                    }`}
                  >
                    <div className={'notification-box'}>
                      <div className={'avatar-icon flex-shrink-0'}>
                        <div className={'icon'}>
                          {!notification?.extra_parsed ? (
                            <AiOutlineInfoCircle />
                          ) : notification?.extra_parsed?.status ? (
                            <AiOutlineCheck />
                          ) : (
                            <IoCloseOutline />
                          )}
                        </div>
                      </div>
                      <div className={'Notification-detail'}>
                        <h5 style={{fontWeight: notification.read_at ? 'normal' : 'bold'}}>
                          {notification.title}
                        </h5>
                        <p>{notification.message}</p>
                        <small className={'time'}>{notification.created_ago}</small>
                      </div>
                      <span></span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </li>

          <li data-name="profile" className="notification-dropdown-footer">
            <Link to={'/notification-listing'}>View All Notifications</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
