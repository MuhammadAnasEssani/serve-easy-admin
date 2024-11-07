import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {
  IReportList,
  IReportsFilters,
  ISaleBreakdownParams,
  ISaleBreakdownReportItem,
} from '../../../../interfaces/IReports'
import './sales-breakdown.scss'
import Heading from '../../../../components/dashboard/Heading'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import SalesBreakdownFilters from './Filter'
import SalesBreakdownReport from './SalesBreakdownReport'
import moment from 'moment-timezone'
import {ReportService} from '../../../../services/api-services/report.service'
import {BACKEND_CONSTANTS} from '../../../../config/constants'

export default function SalesBreakdown() {
  const {COMPARE} = BACKEND_CONSTANTS.REPORTS.SALES_SUMMARY.FILTER
  const defaultFilter = {
    start_date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
    end_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    compare_from: COMPARE.CATEGORY,
    compare_to: COMPARE.ORDER_TYPE,
  }
  const orderTypes = [
    {
      id: 10,
      name: 'Dine In',
    },
    {
      id: 20,
      name: 'Takeaway',
    },
    {
      id: 30,
      name: 'Delivery',
    },
    {
      id: 40,
      name: 'Online',
    },
  ]

  const [reports, setReports] = useState<ISaleBreakdownReportItem[]>([])
  // const [filter, setFilter] = useState<ISaleBreakdownParams>(defaultFilter)
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

  const makeGroupDataByOrderType = (
    data: ISaleBreakdownReportItem[]
  ): ISaleBreakdownReportItem[] => {
    let filteredData = orderTypes.map((orderType, index) => ({
      ...orderType,
      key: index,
      report_order_type_children: [],
      children: data
        .filter((item) => item.type === orderType.id)
        .map((reportItem) => ({
          name: reportItem?.meta?.name,
          sale_qty: reportItem.sale_qty || 0,
          net_sale: reportItem.net_sale || 0,
          gross_sale: reportItem.gross_sale || 0,
          discount_amount: reportItem.discount_amount || 0,
        })),
    }))
    return filteredData
  }

  const filterData = (
    data: ISaleBreakdownReportItem[],
    filter: ISaleBreakdownParams
  ): ISaleBreakdownReportItem[] => {
    const groupByOrderTypeCondition = [COMPARE.ORDER_TYPE]
    const withoutGroupByOrderTypeCondition = [COMPARE.CATEGORY, COMPARE.PRODUCT, COMPARE.MODIFIER]
    const compareFrom = filter.compare_from || 0
    if (groupByOrderTypeCondition.includes(compareFrom)) {
      return makeGroupDataByOrderType(data)
    } else if (withoutGroupByOrderTypeCondition.includes(compareFrom)) {
      let filteredData = data.map((item, index) => ({
        ...item,
        children: item.report_order_type_children.map((order_type_children) => ({
          ...order_type_children,
          name: order_type_children.type_text,
        })),
        key: index,
      }))
      return filteredData
    }
    return data
  }

  const fetchReport = async (filterOptions: ISaleBreakdownParams) => {
    setLoading(true)
    const response = await ReportService.getSaleBreakdown(filterOptions)
    setLoading(false)
    setFilterLoading(false)

    if (response.status) {
      let filteredData = filterData(response.data.data, filterOptions)
      setReports(filteredData)
    }
  }

  useEffect(() => {
    fetchReport(defaultFilter)
  }, [])

  const onFilter = async (data: ISaleBreakdownParams) => {
    setFilterLoading(true)
    const filterData = {
      start_date: data.date_range?.[0],
      end_date: data.date_range?.[1],
      compare_from: data.compare_from,
      compare_to: data.compare_to,
    }
    fetchReport(filterData)
  }

  return (
    <>
      <div className={'sales-breakdown'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onFilter)}>
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
                <SalesBreakdownFilters
                  applyFilterLoader={filterLoading}
                  clearFilterLoader={filterLoading}
                />
              </div>
            </Row>
            <SalesBreakdownReport data={reports} loading={loading} />
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
