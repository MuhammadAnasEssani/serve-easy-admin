import React from 'react'
import {CgProfile} from 'react-icons/cg'
import {FiSettings} from 'react-icons/fi'
import {RiBankCardLine, RiQuestionLine} from 'react-icons/ri'
import {BiSupport} from 'react-icons/bi'
import {IoPricetagsOutline} from 'react-icons/io5'
import {AiOutlinePoweroff} from 'react-icons/ai'
import {IHeaderDropdownList} from '../../interfaces/IHeaderDropdown'
import {NavLink, useNavigate} from 'react-router-dom'

export default function ProfileDropdownList({handleLogout, handleClose}: IHeaderDropdownList) {
  const navigate = useNavigate()
  return (
    <div className="drop-down__menu-box">
      <ul className="drop-down__menu">
        {/* <li data-name="dashboard" className="drop-down__item">
          <FiSettings /> Settings
        </li>
        <li data-name="activity" className="drop-down__item">
          <RiBankCardLine /> Billing
        </li>
        <hr />
        <li data-name="profile" className="drop-down__item">
          {' '}
          <BiSupport /> Help{' '}
        </li>
        <li data-name="dashboard" className="drop-down__item">
          <RiQuestionLine /> FAQ
        </li>
        <li data-name="activity" className="drop-down__item">
          <IoPricetagsOutline /> Pricing{' '}
        </li>
        <hr /> */}
        <li
          data-name="profile"
          className="drop-down__item"
          onClick={() => {
            navigate('/profile');
            handleClose()
          }}
        >
          {' '}
          <CgProfile />
          Profile{' '}
        </li>
        <li onClick={handleLogout} data-name="activity" className="drop-down__item">
          <AiOutlinePoweroff /> Logout{' '}
        </li>
      </ul>
    </div>
  )
}
