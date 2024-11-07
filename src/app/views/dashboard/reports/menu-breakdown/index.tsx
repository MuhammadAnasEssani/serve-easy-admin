import React, {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {
  IMenuBreakdownParams,
  IMenuBreakdownResponse,
  IReportList,
  IReportsFilters,
} from '../../../../interfaces/IReports'
import './menu-breakdown.scss'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import MenuBreakdownFilters from './Filter'
import TopCategories from './TopCategories'
import TopModifiers from './TopModifiers'
import TopProducts from './TopProducts'
import ProductMixBreakdown from './ProductMixBreakdown'
import {async} from '@firebase/util'
import {ReportService} from '../../../../services/api-services/report.service'
import moment from 'moment'

const defaultReport = {
  category_sale_breakdown: [],
  modifier_sale_breakdown: [],
  product_sale_breakdown: [],
}

export default function MenuBreakdown() {
  const [reports, setReports] = useState<IMenuBreakdownResponse>(defaultReport)
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
  const fetchReport = async (filter: IMenuBreakdownParams) => {
    setLoading(true)
    const response = await ReportService.getMenuBreakdown(filter)
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
      <div className={'menu-breakdown'}>
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
                <MenuBreakdownFilters loading={filterLoading} />
              </div>
            </Row>
            <Row>
              <TopCategories data={reports.category_sale_breakdown} />
              <TopProducts data={reports.product_sale_breakdown} />
              <TopModifiers data={reports.modifier_sale_breakdown} />
            </Row>
            <Row>{/* <ProductMixBreakdown /> */}</Row>
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
