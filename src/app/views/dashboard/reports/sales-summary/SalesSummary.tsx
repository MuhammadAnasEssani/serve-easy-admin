import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {useUserContext} from '../../../../providers/UserProvider'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {IReportList, IReportsFilters} from '../../../../interfaces/IReports'
import {Tabs} from 'antd'
import '../../../../../assets/css/views/dashboard/sales-summary.scss'
import {IoMdArrowDropdown} from 'react-icons/io'
import {ExcelIcon, ReportMade} from '../../../../../assets/images/icons/menu-icons/performances'
import BarChart from '../../../../components/charts/BarChart'
import {ReportService} from '../../../../services/api-services/report.service'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import SalesSummaryFilters from './SalesSummaryFilters'
import {FaFilter} from 'react-icons/fa'
import ThemeModal from '../../../../components/Modal'
import SalesSummarySkeleton from '../../../../skeletons/reports/SalesSummarySkeleton'
import {GroupByHour} from '../../../../utils/helpers'
import moment from 'moment'
import ExportReportXlsx from '../../../../components/dashboard/ExportReportXlsx'

// Charts js

export default function SalesSummary() {
  const {TabPane} = Tabs
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const [reports, setReports] = useState<IReportList>()
  const [loading, setLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)

  const paymentType = [
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CARD,
      name: 'Card',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CASH,
      name: 'Cash',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.EASY_PAISA,
      name: 'Easy Paisa',
    },
    {
      id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.KEENU,
      name: 'Keenu',
    },
  ]
  const orderType = [
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY,
      name: 'Delivery',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DINE,
      name: 'Dine In',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE,
      name: 'Online',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY,
      name: 'Take away',
    },
  ]
  const orderPlatforms = [
    {
      id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.IOS,
      name: 'iOS',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.ANDROID,
      name: 'Android',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.WEB,
      name: 'Web',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.POS,
      name: 'POS',
    },
  ]

  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    if (establishmentId > 0)
      fetchData({
        establishment_id: establishmentId,
      })
  }, [establishmentId])

  const methods = useForm<IReportsFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const onSubmit = async (data: IReportsFilters) => {
    if (establishmentId > 0) {
      setFilterLoading(true)
      const filterData = {
        start_date: data.date_range?.[0],
        end_date: data.date_range?.[1],
        establishment_id: establishmentId,
      }
      fetchData(filterData)
    }
  }
  const fetchData = async (data: IReportsFilters) => {
    setLoading(true)
    const res = await ReportService.index(data)
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

      const dinein_result = GroupByHour(dinein_data, BACKEND_CONSTANTS.COMPARED.FROM.TODAY)
      const takeaway_result = GroupByHour(takeaway_data, BACKEND_CONSTANTS.COMPARED.FROM.TODAY)
      const delivery_result = GroupByHour(delivery_data, BACKEND_CONSTANTS.COMPARED.FROM.TODAY)
      const online_result = GroupByHour(online_data, BACKEND_CONSTANTS.COMPARED.FROM.TODAY)
      const modifiedData = {
        ...res.data,
        dinein_result,
        takeaway_result,
        delivery_result,
        online_result,
      }
      setReports(modifiedData)
    }
    setLoading(false)
    setFilterLoading(false)
  }

  const AllChart = [
    {
      label: 'Dine-in',
      data: reports?.dinein_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(252, 187, 54,0.9)',
    },
    {
      label: 'Takeaway',
      data: reports?.takeaway_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
    {
      label: 'Delivery',
      data: reports?.delivery_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(110, 201, 168,0.9)',
    },
    {
      label: 'Online',
      data: reports?.online_result.map((data) => {
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
      data: reports?.dinein_result.map((data) => {
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
      data: reports?.takeaway_result.map((data) => {
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
      data: reports?.delivery_result.map((data) => {
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
      data: reports?.online_result.map((data) => {
        return {
          x: JSON.stringify(data.x_label),
          y: data.net_amount,
        }
      }),
      backgroundColor: 'rgba(1, 120, 229,0.9)',
    },
  ]

  //Tab Button
  const operations = <button className={'excel-btn btn'}>{ExcelIcon} Export CSV</button>

  const filterModal = () => {
    setFilterPopup(true)
  }

  return (
    <>
      <div className={'sales-summary'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row>
              <div className={'d-block d-md-none'}>
                <div className={'filter-sec'}>
                  <ThemeButton
                    onClick={() => {
                      filterModal()
                    }}
                    className={'filter-popup-btn'}
                    text={'Apply Filter'}
                    type={'submit'}
                    suffixIcon={<FaFilter />}
                  />
                </div>
              </div>
              <div className={'d-none d-md-block'}>
                <SalesSummaryFilters loading={filterLoading} />
              </div>
            </Row>
            <ThemeModal
              title={'Filters'}
              active={filterPopup}
              setActive={setFilterPopup}
              children={<SalesSummaryFilters loading={filterLoading} />}
            />
          </Form>
        </FormProvider>
        {!loading ? (
          <>
            <Row>
              <Col className={'order-lg-4 order-md-5'} md={12} lg={12}>
                <div className={'theme-tabs'}>
                  <div className={'guest-card'}>
                    <Tabs defaultActiveKey="1" tabBarExtraContent={<ExportReportXlsx data={AllChart} />}>
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
            </Row>
            <Row className={'mt-2'}>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Sales</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Net Sales</h4>
                          <p>{reports?.net_amount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.net_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Gross Sales</h4>
                          <p>{reports?.gross_amount.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.gross_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Service Charges</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Total Service Charges</h4>
                          <p>{reports?.service_charges.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.service_charges.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Tip By Cash</h4>
                          <p>{reports?.tip.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.tip.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Tip By Card</h4>
                          <p>0</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>0%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Discounts</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Manual Discount</h4>
                          <p>{reports?.discount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.discount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Promotional Discount</h4>
                          <p>{reports?.promo_discount.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.promo_discount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Payment</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Cash</h4>
                          <p>{reports?.cash_amount_received.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.cash_amount_received.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Credit Card</h4>
                          <p>{reports?.card_amount_received.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.card_amount_received.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Open Check</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Open Check Count</h4>
                          <p>{reports?.open_check_orders.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.open_check_orders.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Open Check Amount</h4>
                          <p>{reports?.open_check_amount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.open_check_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Dine-in</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4> Dine-In Sales</h4>
                          <p>{reports?.dinein_net_amount.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.dinein_net_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Check</h4>
                          <p>{reports?.dinein_check.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.dinein_check.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Average</h4>
                          <p>{reports?.dinein_avg_amount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.dinein_avg_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <h3 className={'report-heading mt-4'}>
                    <span>Takeaway</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Take away Sales</h4>
                          <p>{reports?.takeaway_net_amount.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.takeaway_net_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Check</h4>
                          <p>{reports?.takeaway_check.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.takeaway_check.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Average</h4>
                          <p>{reports?.takeaway_avg_amount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.takeaway_avg_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <h3 className={'report-heading mt-4'}>
                    <span>Delivery</span>
                  </h3>
                  <ul className={''}>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Delivery Sales</h4>
                          <p>{reports?.delivery_net_amount.current}</p>
                          <div className={'report-stats down'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.delivery_net_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Check</h4>
                          <p>{reports?.delivery_check.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.delivery_check.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'report-box'}>
                        <div className={'report-details'}>
                          <h4>Average</h4>
                          <p>{reports?.delivery_avg_amount.current}</p>
                          <div className={'report-stats up'}>
                            <div className={'icon'}>
                              <IoMdArrowDropdown />
                            </div>
                            <div className={'num'}>
                              <span>{reports?.delivery_avg_amount.diff}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={6}>
                <div className={'report-section'}>
                  <h3 className={'report-heading'}>
                    <span>Sales Category</span>
                  </h3>
                  <div className={'category-box'}>
                    <div className={'icon-box'}>{ReportMade}</div>
                    <div className={'content'}>
                      <h6>Food</h6>
                      <p>
                        8,15,856 <span>40%</span>
                      </p>
                    </div>
                  </div>
                  <div className={'category-box'}>
                    <div className={'icon-box'}>{ReportMade}</div>
                    <div className={'content'}>
                      <h6>Beragres</h6>
                      <p>
                        6,18,484<span>27%</span>
                      </p>
                    </div>
                  </div>
                  <div className={'category-box'}>
                    <div className={'icon-box'}>{ReportMade}</div>
                    <div className={'content'}>
                      <h6>Desserts</h6>
                      <p>
                        8,15,856<span>30%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <SalesSummarySkeleton />
        )}
      </div>
    </>
  )
}
