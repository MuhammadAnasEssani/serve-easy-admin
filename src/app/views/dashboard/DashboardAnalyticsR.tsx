import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import ThemeButton from '../../components/dashboard/ThemeButton'
import {IDashboardAnalytics, IDashboardAnalyticsParams} from '../../interfaces/IReports'
import {useUserContext} from '../../providers/UserProvider'
import {BACKEND_CONSTANTS} from '../../config/constants'
import {ReportService} from '../../services/api-services/report.service'
import '../../../assets/css/views/dashboard/dashboard-analyticsr.scss'
import {IoStorefrontOutline} from 'react-icons/io5'
import {Progress, Tabs} from 'antd'
import {RiEBike2Line, RiRestaurantLine} from 'react-icons/ri'
import {TfiBarChart} from 'react-icons/tfi'
import {AiOutlineLaptop} from 'react-icons/ai'
import {FiUser} from 'react-icons/fi'
import BarChart from '../../components/charts/BarChart'
import DashboardFilters from './DashboardFilters'
import {FaFilter} from 'react-icons/fa'
import ThemeModal from '../../components/Modal'
import DashboardHeatmap from '../../components/dashboard/HeatMap'
import DashboardAnalyticsSkeletons from '../../skeletons/DashboardAnalyticsSkeletons'
import InitialRestaurantSetup from './initial-restaurant-setup/index'
import {GroupByHour} from '../../utils/helpers'
import ExportReportXlsx from '../../components/dashboard/ExportReportXlsx'
import ForcastingChart from '../../components/charts/ForcastingChart'

export default function DashboardAnalyticsR() {
  const {TabPane} = Tabs
  const [analytics, setAnalytics] = useState<IDashboardAnalytics>()
  const [loading, setLoading] = useState<boolean>(false)
  const [applyFilterLoader, setApplyFilterLoader] = useState<boolean>(false)
  const [clearFilterLoader, setClearFilterLoader] = useState<boolean>(false)
  const [latestReportLoader, setLatestReportLoader] = useState<boolean>(false)
  const {setTitle, establishmentId, user, isUserReady, currencySymbol} = useUserContext()

  const fetchData = async (data?: IDashboardAnalyticsParams) => {
    let payload = data || methods.getValues()
    if (payload.compare_from && payload.compare_to) {
      setLoading(true)
      const res = await ReportService.dashboardAnalytics(payload)
      setApplyFilterLoader(false)
      setClearFilterLoader(false)
      setLatestReportLoader(false)
      setLoading(false)
      if (res.status) {
        const dinein_data = res.data.bar_chart_result.filter(
          (data) => data.order_type == BACKEND_CONSTANTS.ORDERS.TYPES.DINE
        )
        const takeaway_data = res.data.bar_chart_result.filter(
          (data) => data.order_type == BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY
        )
        const delivery_data = res.data.bar_chart_result.filter(
          (data) => data.order_type == BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY
        )
        const online_data = res.data.bar_chart_result.filter(
          (data) => data.order_type == BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE
        )

        const compare_from = payload.compare_from
          ? payload.compare_from
          : BACKEND_CONSTANTS.COMPARED.FROM.TODAY
        const dinein_result = GroupByHour(dinein_data, compare_from)
        const takeaway_result = GroupByHour(takeaway_data, compare_from)
        const delivery_result = GroupByHour(delivery_data, compare_from)
        const online_result = GroupByHour(online_data, compare_from)

        const modifiedData = {
          ...res.data,
          dinein_result,
          takeaway_result,
          delivery_result,
          online_result,
        }
        setAnalytics(modifiedData)
      }
    }
  }

  const fetchTodayData = async () => {
    methods.setValue('compare_from', BACKEND_CONSTANTS.COMPARED.TO.YESTERDAY)
    methods.setValue('compare_to', BACKEND_CONSTANTS.COMPARED.FROM.TODAY)
    methods.setValue('is_updated', false)
    await fetchData()
  }

  const reloadData = async () => {
    setClearFilterLoader(true)
    await fetchTodayData()
  }

  const getLatestData = async () => {
    setLatestReportLoader(true)
    await fetchData()
  }

  useEffect(() => {
    isUserReady && setTitle(`Welcome ${user.restaurant.name}`)
  }, [isUserReady])

  useEffect(() => {
    fetchTodayData()
  }, [])

  const methods = useForm<IDashboardAnalyticsParams>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const onSubmit = async (data: IDashboardAnalyticsParams) => {
    setApplyFilterLoader(true)
    fetchData(data)
  }

  const AllChart = [
    {
      label: 'Dine-in',
      data: analytics?.dinein_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(252, 187, 54,0.9)',
    },
    {
      label: 'Takeaway',
      data: analytics?.takeaway_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
    {
      label: 'Delivery',
      data: analytics?.delivery_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(110, 201, 168,0.9)',
    },
    {
      label: 'Online',
      data: analytics?.online_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
  ]
  const DineChart = [
    {
      label: 'Dine-in',
      data: analytics?.dinein_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(110, 201, 168,0.9)',
    },
  ]
  const TakeawayChart = [
    {
      label: 'Take-away',
      data: analytics?.takeaway_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
  ]
  const DeliveryChart = [
    {
      label: 'Delivery',
      data: analytics?.delivery_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(110, 201, 168,0.9)',
    },
  ]
  const OnlineChart = [
    {
      label: 'Online',
      data: analytics?.online_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
  ]

  // Popup
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const filterModal = () => {
    setFilterPopup(true)
  }

  const data = [
    {
      label: 'Delivery',
      data: analytics?.delivery_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(110, 201, 168,0.9)',
    },
  ]
  return (
    <div className={'dashboard-analyticsr'}>
      <Container fluid>
        <div className={'dashboard-filter'}>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Row>
                <div className={'d-block d-md-none'}>
                  <div className={''}>
                    <ThemeButton
                      onClick={() => {
                        filterModal()
                      }}
                      className={'filter-popup-btn'}
                      text={'Apply Filter'}
                      type={'button'}
                      suffixIcon={<FaFilter />}
                    />
                    <ThemeModal
                      title={'Filters'}
                      active={filterPopup}
                      setActive={setFilterPopup}
                      children={
                        <DashboardFilters
                          applyFilterLoader={applyFilterLoader}
                          clearFilterLoader={clearFilterLoader}
                          latestReportLoader={latestReportLoader}
                        />
                      }
                    />
                  </div>
                </div>
                <div className={'d-none d-md-block'}>
                  <DashboardFilters
                    applyFilterLoader={applyFilterLoader}
                    clearFilterLoader={clearFilterLoader}
                    latestReportLoader={latestReportLoader}
                    reloadData={reloadData}
                    getLatestData={getLatestData}
                  />
                </div>
              </Row>
            </Form>
          </FormProvider>
        </div>
        {!loading ? (
          <>
            <Row>
              <Col className={'order-lg-1 order-md-1'} md={6} lg={4}>
                <div className={'chart-card'}>
                  <div className={'progress-chart'}>
                    <h4>
                      <span>
                        Monthly Sales Target -{' '}
                        <sup>
                          <small>{currencySymbol}</small>
                        </sup>
                        {analytics?.monthly_sales_target?.sales_target || 0}
                      </span>
                    </h4>
                    <div className={'p-chart'}>
                      <Progress
                        width={250}
                        strokeColor={'#0178e5'}
                        type="circle"
                        strokeWidth={8}
                        percent={analytics?.monthly_sales_target?.target_completed_percentage || 0}
                        format={(percent) => {
                          return (
                            <>
                              <h5 className={'chart-text'}>Target Achieved</h5>
                              <span className={'chart-percent'}>
                                {analytics?.monthly_sales_target?.target_completed_percentage || 0}{' '}
                                <small>%</small>
                              </span>
                            </>
                          )
                        }}
                      />
                    </div>
                    <div className={'progress-chart-target'}>
                      <ul>
                        <li>
                          <h4>
                            Current Month Sales{' '}
                            <span className={'t-sales'}>
                              <sup>
                                <small>{currencySymbol}</small>
                              </sup>{' '}
                              {analytics?.monthly_sales_target?.current_month_sale || 0}
                            </span>
                          </h4>
                          {/*<div className={"box up"}>*/}
                          {/*    <div className={"box-icon"}>*/}
                          {/*        {DashStatGreen}*/}
                          {/*    </div>*/}
                          {/*    <div className={"box-detail"}>*/}
                          {/*        <h4>Today’s Sale</h4>*/}
                          {/*        <p>{analytics?.all_sales_net_amount.current}</p>*/}
                          {/*    </div>*/}
                          {/*</div>*/}
                        </li>

                        <li>
                          <h4>
                            Predicted Sales{' '}
                            <span className={'t-sales'}>
                              <sup>
                                <small>{currencySymbol}</small>
                              </sup>{' '}
                              {0}
                            </span>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className={'order-lg-1 order-md-2'} md={6} lg={4}>
                <div className={'stats-card-2'}>
                  <div className={'stats-icon  dine-in'}>
                    <RiRestaurantLine />
                  </div>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.dinein_net_amount?.current || 0}
                    </h4>
                    <h5>Dine in</h5>
                  </div>
                </div>
                <div className={'stats-card-2'}>
                  <div className={'stats-icon online'}>
                    <AiOutlineLaptop />
                  </div>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.online_net_amount?.current || 0}
                    </h4>
                    <h5>Online</h5>
                  </div>
                </div>
                <div className={'stats-card'}>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.net_amount.current}
                    </h4>
                    <h5>Total Sales</h5>
                  </div>
                  <div className={'stats-icon'}>
                    <TfiBarChart />
                  </div>
                </div>
                <div className={'stats-card'}>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.net_amount.past}
                    </h4>
                    <h5>Yesterday's Sales</h5>
                  </div>
                  <div className={'stats-icon'}>
                    <TfiBarChart />
                  </div>
                </div>
              </Col>
              <Col className={'order-lg-3 order-md-3'} md={6} lg={4}>
                <div className={'stats-card-2'}>
                  <div className={'stats-icon take-away'}>
                    <IoStorefrontOutline />
                  </div>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.takeaway_net_amount?.current || 0}
                    </h4>
                    <h5>Take away</h5>
                  </div>
                </div>
                <div className={'stats-card-2'}>
                  <div className={'stats-icon  delivery'}>
                    <RiEBike2Line />
                  </div>
                  <div className={'stats-content'}>
                    <h4>
                      <sup>
                        <small>{currencySymbol}</small>
                      </sup>{' '}
                      {analytics?.delivery_net_amount?.current || 0}
                    </h4>
                    <h5>Delivery</h5>
                  </div>
                </div>
                <div className={'visitor-count'}>
                  <h3>Visitors Comparison</h3>
                  <ul>
                    <li>
                      <span>Android</span>{' '}
                      <span className={'number'}>
                        <FiUser />
                        {analytics?.android_platform_orders.current || 0}
                      </span>
                    </li>
                    <li>
                      <span>Ios</span>{' '}
                      <span className={'number'}>
                        <FiUser />
                        {analytics?.ios_platform_orders.current || 0}
                      </span>
                    </li>
                    <li>
                      <span>Desktop</span>{' '}
                      <span className={'number'}>
                        <FiUser />
                        {analytics?.desktop_platform_orders.current || 0}
                      </span>
                    </li>
                    <li>
                      <span>Pos</span>{' '}
                      <span className={'number'}>
                        <FiUser />
                        {analytics?.pos_platform_orders.current || 0}
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col className={'order-lg-4 order-md-5'} md={12} lg={8}>
                <div className={'theme-tabs'}>
                  <div className={'guest-card'}>
                    <Tabs
                      defaultActiveKey="1"
                      tabBarExtraContent={<ExportReportXlsx data={AllChart} />}
                    >
                      <TabPane tab="All" key="1">
                        <Row>
                          <Col md={12}>
                            <div className={'mapdiv'}>
                              <BarChart dataSets={AllChart} />
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab="Dine-in" key="2">
                        <Row>
                          <Col md={12}>
                            <BarChart dataSets={DineChart} />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab="Takeaway" key="3">
                        <Row>
                          <Col md={12}>
                            <BarChart dataSets={TakeawayChart} />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab="Delivery" key="4">
                        <Row>
                          <Col md={12}>
                            <BarChart dataSets={DeliveryChart} />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tab="Online" key="5">
                        <Row>
                          <Col md={12}>
                            <BarChart dataSets={OnlineChart} />
                          </Col>
                        </Row>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Col>
              {/*<Col className={"order-lg-5 order-md-4"} md={6} lg={4}>*/}
              {/*    <div className={"category-chart"}>*/}
              {/*        <h4><span>Top Selling Products</span><span>Net Sales</span></h4>*/}
              {/*        <div className={"category-list"}>*/}
              {/*            <ul>*/}
              {/*                {analytics?.product_sales_breakdown.map((data:IProductSaleBreakdown)=> {*/}
              {/*                    return (*/}
              {/*                        <li>*/}
              {/*                            <div>{data.product.name}</div>*/}
              {/*                            <div className={"stats-box"}>*/}
              {/*                                /!*<span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
              {/*                                <span>{data.meta.sale}</span>*/}
              {/*                            </div>*/}
              {/*                        </li>*/}
              {/*                    )*/}
              {/*                })}*/}
              {/*            </ul>*/}
              {/*        </div>*/}

              {/*    </div>*/}
              {/*</Col>*/}
              <Col className={'order-lg-5 order-md-4'} md={6} lg={4}>
                {/*<div className={"category-list"}>*/}
                {/*    <ul>*/}
                {/*        {analytics?.product_sales_breakdown.map((data:IProductSaleBreakdown, index)=> {*/}
                {/*            return (*/}
                {/*                <li key={index} >*/}
                {/*                    <div>{data.product.name}</div>*/}
                {/*                    <div className={"stats-box"}>*/}
                {/*/!*<span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*                        <span>{data.meta.sale}</span>*/}
                {/*                    </div>*/}
                {/*                </li>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats down"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats down"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*/!*<li>*!/*/}
                {/*    /!*    <div>Beef Burger</div>*!/*/}
                {/*    /!*    <div className={"stats-box"}>*!/*/}
                {/*        /!*        <span className={"stats up"}><IoMdArrowDropdown/>30%</span>*!/*/}
                {/*        /!*        <span>4210</span>*!/*/}
                {/*    /!*    </div>*!/*/}
                {/*/!*</li>*!/*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <div className={'category-chart'}>
                  <DashboardHeatmap data={analytics?.heat_map_result} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <ForcastingChart />
              </Col>
            </Row>
          </>
        ) : (
          <DashboardAnalyticsSkeletons />
        )}
      </Container>
      <InitialRestaurantSetup />
    </div>
  )
}
