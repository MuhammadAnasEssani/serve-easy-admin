import {Layout, Menu} from 'antd'
import React, {useEffect, useState} from 'react'
import {FiArrowRight} from 'react-icons/fi'
import '../../../assets/css/components/dashboard/sidebar.scss'
// import {IRolePermission} from "../../../interfaces/IRole";
import {useUserContext} from '../../providers/UserProvider'
import {IRolePermission} from '../../interfaces/IRole'
import {Link, NavLink} from 'react-router-dom'
import {SkeletonSidebarListing, SkeletonSidebarListingIcon} from '../Skeleton'
import logoIcon from '../../../assets/images/logo-icon.svg'
import {SidebarContent, SuperAdminSidebarContent} from './SidebarContent'

const {Sider} = Layout

export default function Sidebar() {
  const [modules, setModules] = useState<IRolePermission[]>([])
  const {
    sidebarCollapse,
    sidebarSwitcher,
    setSidebarCollapse,
    user,
    isUserReady,
    isRestaurantAdmin,
    isSuperAdmin,
  } = useUserContext()

  const CustomTrigger = () => (
    <div className={'sidebar-trigger'} onClick={sidebarSwitcher}>
      <FiArrowRight />
    </div>
  )

  useEffect(() => {
    setModules(user?.roles[0].permissions)
  }, [user])

  const [isMobileView, setIsMobileView] = useState<boolean>(false)

  function breakpoint(media: boolean) {
    setIsMobileView(media)
  }
  const handleClickMenu = () => {
    if (window.innerWidth < 850) {
      setSidebarCollapse(!sidebarCollapse)
    }
  }

  const filterAllowedModules = () => {
    // First filter none-admin modules then
    // Check permission from backend then set in permission key
    if (!isSuperAdmin) {
      let allowedModules = SidebarContent.filter((module) => !module.isAdminRequired).map(
        (module) => ({
          ...module,
          permission: module.permission || modules.some((isModule) => isModule.id === module.id),
          // Manage Children Modules Permissions if exist
          childrens: module?.childrens?.map((childModule) => ({
            ...childModule,
            permission:
              childModule.permission || modules.some((isModule) => isModule.id === childModule.id),
          })),
        })
      )
      // First filter admin modules then check user is RestaurantAdmin & then set permission
      let adminModules = SidebarContent.filter((module) => module.isAdminRequired).map(
        (module) => ({...module, permission: isRestaurantAdmin})
      )
      // Merge All Modules in finalizedModules.
      let finalizedModules = [...allowedModules, ...adminModules]
      return finalizedModules
    } else {
      return SuperAdminSidebarContent
    }
  }

  const showUserModules = () => {
    // console.log(modules, 'modules')
    // filter allowed modules from backend & admin
    let allowedModules = filterAllowedModules()

    return allowedModules.map((module, index) => {
      if (!module.permission) {
        return null
      }
      return module.childrens?.length > 0 ? (
        <Menu.SubMenu
          key={module.route}
          icon={<div className={'list-icon'}>{module.icon}</div>}
          title={module.title}
        >
          {module.childrens.map((childModule) => {
            if (childModule.permission) {
              return (
                <Menu.Item key={childModule.route} onClick={handleClickMenu}>
                  <Link to={childModule.route}>{childModule.title}</Link>
                </Menu.Item>
              )
            }
          })}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={module.route}
          onClick={handleClickMenu}
          icon={
            <div className={'list-icon'}>
              <Link to={module.route}>{module.icon}</Link>
            </div>
          }
        >
          <Link to={module.route}>{module.title}</Link>
        </Menu.Item>
      )
    })
  }

  const showLoader = () => {
    return Array(7)
      .fill({})
      .map((data, index) => {
        return (
          <Menu.Item
            key={index}
            icon={
              <div className={'list-icon'}>
                <SkeletonSidebarListingIcon />
              </div>
            }
          >
            <span>
              <SkeletonSidebarListing />
            </span>
          </Menu.Item>
        )
      })
  }

  return (
    <Sider
      trigger={<CustomTrigger />}
      reverseArrow={true}
      className={`dashboard-sidebar ${isMobileView && 'fixed-sidebar'}`}
      breakpoint={'xl'}
      width={300}
      collapsible
      collapsed={sidebarCollapse}
      onCollapse={(value) => setSidebarCollapse(value)}
      collapsedWidth={isMobileView ? 0 : 80}
      // zeroWidthTriggerStyle={<CustomTrigger />}
      onBreakpoint={(broken) => breakpoint(broken)}
    >
      <div className="logo">
        <div className={'logo-full logo-text'}>
          <NavLink to={'/dashboard'}>
            <img className={'logo-icon'} src={logoIcon} />
          </NavLink>
          {/*<img  className={`${!collapsed ? "show" : "hide"} img-fluid`} src={logoText}/>*/}
          <NavLink to={'/dashboard'}>
            <span className={`${!sidebarCollapse ? 'show' : 'hide'}`}>
              <b>Serve</b>Easy
            </span>
          </NavLink>
          <div className={'side-close'}></div>
        </div>
      </div>
      <div className={'sidebar-menus'}>
        <div className={'menu-1'}>
          <Menu theme={'dark'} defaultSelectedKeys={['1']} mode="inline">
            {isUserReady && modules.length > 0 ? showUserModules() : showLoader()}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
