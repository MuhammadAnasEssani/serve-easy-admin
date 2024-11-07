import React, {useEffect} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Tabs} from 'antd'
import SalesSummary from './sales-summary/SalesSummary'
import '../../../../assets/css/views/dashboard/reports.scss'
import ItemSummaryReport from './item-summary/ItemSummaryReport'
import {useUserContext} from '../../../providers/UserProvider'
import MenuBreakdown from "./menu-breakdown";
import DiscountReports from "./discount-reports";
import SalesBreakdown from "./sales-breakdown";
import ESReport from "./es-report/ESReport";
import VoidReport from "./void-report/VoidReport";

export default function ReportTabs() {
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Reports')
  }, [])
  const {TabPane} = Tabs
  return (
    <>
      <ViewCard>
        <div className={'reports'}>
          <div className={'theme-tabs'}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Sales Summary Reports (SSR)" key="1">
                <SalesSummary />
              </TabPane>
              <TabPane tab="Item Summary" key="2">
                <ItemSummaryReport />
              </TabPane>
              <TabPane tab="Discount Report" key="3">
                <DiscountReports />
              </TabPane>
              <TabPane tab="Menu Breakdown" key="4">
                <MenuBreakdown />
              </TabPane>
              <TabPane tab="Sales Breakdown" key="5">
                <SalesBreakdown />
              </TabPane>
              <TabPane tab="86 Report" key="6">
                <ESReport/>
              </TabPane>
              <TabPane tab="Void Summary Report" key="7">
                <VoidReport/>
              </TabPane>
              <TabPane tab="86 Summary Report" key="8"></TabPane>
            </Tabs>
          </div>
        </div>
      </ViewCard>
    </>
  )
}
