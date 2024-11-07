import {Layout} from 'antd'
import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardFooter from '../components/dashboard/DashboardFooter'
import {Outlet} from 'react-router'
import {useUserContext} from '../providers/UserProvider'
import '../../assets/css/layouts/dashbaord.scss'

const {Content} = Layout
export default function Dashboard() {
  const {loader, theme} = useUserContext()

  return (
    <div data-theme={theme}>
      <Layout style={{minHeight: '100vh'}}>
        {/*<div className={loader ? 'Loader' : "Loader loader-hide"}>*/}
        {/*    <span><img src={loaderFile} alt=""/></span>*/}
        {/*</div>*/}
        <Sidebar />
        <Layout className="site-layout">
          <DashboardHeader />
          <Content style={{margin: '20px 20px', backgroundColor: 'white'}}>
            <Outlet />
          </Content>
          <DashboardFooter />
        </Layout>
      </Layout>
    </div>
  )
}
