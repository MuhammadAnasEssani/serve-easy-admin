import {Switch, Tooltip} from 'antd'
import React, {useState, useEffect} from 'react'
import '../../../assets/css/components/dashboard/dashboardheader.scss'
import {BsSearch, BsSun} from 'react-icons/bs'
import ProfileDropdown from './ProfileDropdown'
import NotificationDropdown from './NotificationDropdown'
import ThemeModal from '../Modal'
import SelectField from '../dashboard/SelectField'
import {useUserContext} from '../../providers/UserProvider'
import {IoMoonOutline} from 'react-icons/io5'
import {onMessageListener} from '../../services/helper/firebase'
import {ROLES} from '../../config/constants'
import {RiMenuUnfoldFill} from 'react-icons/ri'
import {RxDragHandleDots2} from 'react-icons/rx'
import DashboardOffCanvas from './DashboardOffCanvas'
import {toast} from 'react-toastify'
import {EstablishmentServices} from '../../services/api-services/establishment.services'

export default function DashboardHeader() {
  const {
    sidebarSwitcher,
    setNewNotification,
    newNotification,
    title,
    switchTheme,
    theme,
    isRestaurantAdmin,
    user,
    isUserReady,
    establishments,
    establishmentId,
    setEstablishmentId,
  } = useUserContext()
  const [dropdown, setdropdown] = useState({
    notification: false,
    profile: false,
  })
  const [mobileOffcanvas, setmobileOffcanvas] = useState(false)
  const [search, setSearch] = useState(false)
  const [localEstablishmentId, setLocalEstablishmentId] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (establishmentId) setLocalEstablishmentId(establishmentId)
  }, [establishmentId])

  function searchHanlder() {
    setSearch(!search)
  }

  onMessageListener()
    .then((payload: any) => {
      if (payload) {
        toast.success(payload?.notification?.body)
        setNewNotification(!newNotification)
      }
    })
    .catch((err) => console.log('failed: ', err))

  function openMobileCanvas() {
    setmobileOffcanvas(!mobileOffcanvas)
  }

  //Theme Mobile Switch
  const themeMobileSwitch = (checked: boolean) => {
    switchTheme()
  }

  const handleChangeEstablishment = async (value: number) => {
    setLoading(true)
    setLocalEstablishmentId(value)
    let response = await EstablishmentServices.updateUserEstablishment(value)
    if (response.status) {
      setEstablishmentId(response.data.establishment_id)
    } else {
      toast.error(response.message)
      setLocalEstablishmentId(establishmentId)
    }
    setLoading(false)
  }

  return (
    // <Header className="site-layout-background" style={{ padding: 0 }} >
    <div className={'dashboard-header'}>
      <div className={'menu-active'}>
        <div className={'menu-icon d-block d-xl-none'} onClick={sidebarSwitcher}>
          <RiMenuUnfoldFill />
        </div>
        <div className={'heading'}>
          <h3>{title}</h3>
        </div>
        {/*<div className={"date"}>*/}
        {/*    <h6>Last Login Date: 17-08-2021 | Tuesday</h6>*/}
        {/*</div>*/}
      </div>
      <div className={'header-options'}>
        <div className={'establishment-select'}>
          {/*<SelectField placeholder={"Select Restaurant"}/>*/}
          {isUserReady && user.roles[0].id > ROLES.ADMIN && (
            <SelectField
              defaultValue={establishmentId}
              placeholder={'Select Estabishment'}
              selectOptions={establishments}
              disabled={!isRestaurantAdmin}
              setSelectedEstablishment={handleChangeEstablishment}
              loading={loading}
            />
          )}
        </div>
        <div className={'d-none'}>
          <BsSearch onClick={searchHanlder} />
        </div>

        <div className={'switcher-icon d-none d-lg-block'} onClick={switchTheme}>
          {theme === 'light' ? (
            <Tooltip placement="bottom" title={'Dark Mood'}>
              <IoMoonOutline />
            </Tooltip>
          ) : (
            <Tooltip placement="bottom" title={'Light Mood'}>
              <BsSun />
            </Tooltip>
          )}
        </div>
        <NotificationDropdown dropdown={dropdown.notification} setDropdown={setdropdown} />
        <ProfileDropdown dropdown={dropdown.profile} setDropdown={setdropdown} />
        <div className={'mobile-options d-block d-lg-none'} onClick={openMobileCanvas}>
          <RxDragHandleDots2 />
        </div>
        <ThemeModal children={<SelectField />} setActive={setSearch} active={search} />
        <DashboardOffCanvas
          state={mobileOffcanvas}
          setActive={setmobileOffcanvas}
          children={
            <>
              <div className={'theme-change-m'}>
                <h4>Theme (MODE)</h4>
                <div className={'theme-mode-mobile'}>
                  <span>Light</span>
                  <div className={'theme-switch-m'}>
                    {' '}
                    <Switch defaultChecked={theme !== 'light'} onChange={themeMobileSwitch} />
                  </div>
                  <span>Dark</span>
                </div>
              </div>
              <div className={'establishment-select'}>
                {/*<SelectField placeholder={"Select Restaurant"}/>*/}
                {isUserReady && user.roles[0].id > ROLES.ADMIN && (
                  <SelectField
                    label={'Select Restaurant'}
                    defaultValue={localEstablishmentId}
                    placeholder={'Select Estabishment'}
                    selectOptions={establishments}
                    disabled={!isRestaurantAdmin}
                    setSelectedEstablishment={handleChangeEstablishment}
                  />
                )}
              </div>
            </>
          }
          heading={'Settings'}
        />
      </div>
    </div>

    // </Header>
  )
}
