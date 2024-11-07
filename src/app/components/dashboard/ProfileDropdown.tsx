import React, {useState} from 'react'
import {Popover} from 'antd'
import '../../../assets/css/components/dashboard/profiledropdown.scss'
import avatar from '../../../assets/images/icons/user_avatar.png'
import {IHeaderDropdown} from '../../interfaces/IHeaderDropdown'
import {UserAuthService} from '../../services/api-services/user-auth-api.service'
import {useUserContext} from '../../providers/UserProvider'
import ProfileDropdownList from './ProfileDropdownList'

const ProfileDropdown = ({dropdown, setDropdown}: IHeaderDropdown) => {
  const [open, setOpen] = useState(false)

  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const {user} = useUserContext()

  function dropdownHandle() {
    setDropdown({
      notification: false,
      profile: !dropdown,
    })
  }

  const logout = () => {
    UserAuthService.logout()
  }

  return (
    <Popover
      content={<ProfileDropdownList handleLogout={logout} handleClose={()=> handleOpenChange(false)} />}
      title={null}
      trigger="click"
      overlayClassName='overlay-profile-dropdown'
      open={open}
      onOpenChange={handleOpenChange}
      className={'profile-dropdown-list'}
    >
      <div className="profile-dropdown">
        <div className={`drop-down ${dropdown && 'drop-down--active'}`}>
          <div onClick={dropdownHandle} id="dropDown" className="drop-down__button">
            <div className={'avatar-box'}>
              <img
                alt={'Profile'}
                src={user.user_image?.mediaUrl || avatar}
                className={'img-fluid'}
              />
            </div>
            <div className={'profile-detail'}>
              <h4>{user.full_name}</h4>
              <h5>{user.roles[0].display_name}</h5>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  )
}

export default ProfileDropdown
