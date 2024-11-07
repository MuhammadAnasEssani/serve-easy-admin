import React, {useState, useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {
  IDiscountBreakdownParams,
  IDiscountBreakdownResponse,
  IReportList,
  IReportsFilters,
} from '../../../../interfaces/IReports'
import './discount-report.scss'
import Heading from '../../../../components/dashboard/Heading'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import DiscountReportFilters from './Filter'
import DiscountReport from './DiscountReport'
import ItemDiscountReport from './ItemDiscountReport'
import {ReportService} from '../../../../services/api-services/report.service'
import moment from 'moment-timezone'
import {report} from 'process'

const defaultReport = {
  discount_sale_breakdown: [],
  item_discount_sale_breakdown: [],
}

export default function DiscountReports() {
  const [reports, setReports] = useState<IDiscountBreakdownResponse>(defaultReport)
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

  const fetchReport = async (filter: IDiscountBreakdownParams) => {
    setLoading(true)
    const response = await ReportService.getDiscountBreakdown(filter)
    if (response.status) {
      setReports(response.data)
    }
    setLoading(false)
    setFilterLoading(false)
  }

  useEffect(() => {
    fetchReport({
      start_date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      end_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    })
  }, [])

  const onFilter = async (data: IReportsFilters) => {
    setFilterLoading(true)
    const filterData = {
      start_date: data.date_range?.[0],
      end_date: data.date_range?.[1],
    }
    fetchReport(filterData)
  }

  return (
    <>
      <div className={'discount-report'}>
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
                <DiscountReportFilters loading={filterLoading} />
              </div>
            </Row>
            <DiscountReport data={reports.discount_sale_breakdown} loading={loading} />
            <ItemDiscountReport data={reports.item_discount_sale_breakdown} loading={loading} />
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
