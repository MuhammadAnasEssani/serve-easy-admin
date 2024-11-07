import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {
  IReportList,
  IReportsFilters,
  IVoidReportParams,
  IVoidReportResponse,
} from '../../../../interfaces/IReports'
import Heading from '../../../../components/dashboard/Heading'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import VoidReportFilters from './VoidReportFilters'
import './void-report.scss'
import {convertTimeZone} from '../../../../services/helper/convert-time-zone'
import {OrderServices} from '../../../../services/api-services/order.service'
import {ReportService} from '../../../../services/api-services/report.service'
import moment from 'moment-timezone'

interface DataType {
  business_date: string
  id: number
  type: number
  amount: number
  qty: number
  void_message: string
}
export default function VoidReport() {
  const defaultFilter = {
    start_date: moment().subtract(120, 'days').format('YYYY-MM-DD'),
    end_date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
  }

  const [reports, setReports] = useState<IVoidReportResponse>()
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)
  const methods = useForm<IReportsFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const filterModal = () => {
    setFilterPopup(true)
  }

  const onSubmit = async (data: IReportsFilters) => {
    setFilterLoading(true)
    const filterData = {
      start_date: data.date_range?.[0],
      end_date: data.date_range?.[1],
    }
    getReport(filterData)
  }

  // Table Data
  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (value) => <a>{value}</a>,
    },
    {
      title: 'Void Date',
      dataIndex: 'business_date',
      key: 'business_date',
      render: (value) => <a>{convertTimeZone(value).formatted}</a>,
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
      render: (value) => <a>{value}</a>,
    },

    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Reason',
      dataIndex: 'void_message',
      key: 'void_message',
    },
  ]

  const getReport = async (filter: IVoidReportParams) => {
    let response = await ReportService.getVoidBreakdown(filter)
    setFilterLoading(false)
    if (response.status) {
      setReports(response.data)
    }
  }

  useEffect(() => {
    getReport(defaultFilter)
  }, [])

  return (
    <>
      <div className={'void-report'}>
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
                <VoidReportFilters loading={filterLoading} />
              </div>
            </Row>
            {/* <Row className={"mb-4"}>
                            <Col md={6} xl={6} xxl={3} >
                                <div className={"void-stat-box"}>
                                    <div className={"box-1"}>
                                        <h4>86ed</h4>
                                        <h3>$434.00</h3>
                                    </div>
                                    <div className={"box-2"}>
                                        <p>Void Order Count: 18</p>
                                        <p>Void Item Count: 28</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} xl={6} xxl={3}>
                                <div className={"void-stat-box"}>
                                    <div className={"box-1"}>
                                        <h4>Customer Changed Mind</h4>
                                        <h3>$1,323.02</h3>
                                    </div>
                                    <div className={"box-2"}>
                                        <p>Void Order Count: 18</p>
                                        <p>Void Item Count: 28</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} xl={6} xxl={3}>
                                <div className={"void-stat-box"}>
                                    <div className={"box-1"}>
                                        <h4>Server Error</h4>
                                        <h3>$421.51</h3>
                                    </div>
                                    <div className={"box-2"}>
                                        <p>Void Order Count: 18</p>
                                        <p>Void Item Count: 28</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} xl={6} xxl={3}>
                                <div className={"void-stat-box"}>
                                    <div className={"box-1"}>
                                        <h4>Testing/Training</h4>
                                        <h3>$224.00</h3>
                                    </div>
                                    <div className={"box-2"}>
                                        <p>Void Order Count: 18</p>
                                        <p>Void Item Count: 28</p>
                                    </div>
                                </div>
                            </Col>
                        </Row> */}
            <Row className={'mb-4'}>
              <Col lg={12} xl={6}>
                <Heading>
                  <h2>
                    <span>Unmade Voids by Customer</span>
                  </h2>
                </Heading>
                <div className={'scroll-inner fix-width'}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports?.top_unmade_voids_by_user.map((reportItem) => (
                        <tr>
                          <td>{reportItem.meta.user_name}</td>
                          <td>{reportItem.meta.void_order_item_count}</td>
                          <td>{reportItem.meta.void_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col lg={12} xl={6}>
                <Heading>
                  <h2>
                    <span>Made Voids by Customer</span>
                  </h2>
                </Heading>
                <div className={'scroll-inner fix-width'}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports?.top_made_voids_by_user.map((reportItem) => (
                        <tr>
                          <td>{reportItem.meta.user_name}</td>
                          <td>{reportItem.meta.void_order_item_count}</td>
                          <td>{reportItem.meta.void_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mt-3'} md={12}>
                <Heading>
                  <h2 className={'d-flex'} style={{paddingBottom: 0}}>
                    <span>All Voided Items</span>
                  </h2>
                </Heading>
                <Table
                  columns={columns}
                  dataSource={reports?.voids.data}
                  className={'main-table'}
                  // rowKey={(record) => record.key}
                  // pagination={pagination}
                  loading={loading}
                  scroll={{x: 'calc(600px + 50%)'}}
                />
              </Col>
            </Row>
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
