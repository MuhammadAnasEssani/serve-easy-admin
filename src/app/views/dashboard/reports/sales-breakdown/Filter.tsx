import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
// import SelectField from '../../components/dashboard/SelectField'
import {BsCalendarDate} from 'react-icons/bs'
import {
  IDashboardAnalyticsParams,
  IReportComponentProps,
  ISaleBreakdownParams,
} from '../../../../interfaces/IReports'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import SelectField from '../../../../components/dashboard/SelectField'
import {Required} from '../../../../utils/patterns'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import DateRange from '../../../../components/dashboard/DateRange'

export default function DashboardFilters({applyFilterLoader, reloadData}: IReportComponentProps) {
  const {COMPARE} = BACKEND_CONSTANTS.REPORTS.SALES_SUMMARY.FILTER
  const {
    control,
    setValue,
    watch,
    formState: {errors},
  } = useFormContext<ISaleBreakdownParams>()
  const defaultComparedFrom = [
    {
      id: COMPARE.CATEGORY,
      name: 'Category',
      comparable: [COMPARE.ORDER_TYPE],
    },
    {
      id: COMPARE.PRODUCT,
      name: 'Product',
      comparable: [COMPARE.ORDER_TYPE],
    },
    {
      id: COMPARE.MODIFIER,
      name: 'Modifier',
      comparable: [COMPARE.ORDER_TYPE],
    },
    {
      id: COMPARE.ORDER_TYPE,
      name: 'Order type',
      comparable: [COMPARE.CATEGORY, COMPARE.MODIFIER, COMPARE.PRODUCT],
    },
  ]

  const defaultComparedTo = [
    {
      id: COMPARE.ORDER_TYPE,
      name: 'Order type',
      disabled: false,
    },
    {
      id: COMPARE.CATEGORY,
      name: 'Category',
      disabled: false,
    },
    {
      id: COMPARE.PRODUCT,
      name: 'Product',
      disabled: false,
    },
    {
      id: COMPARE.MODIFIER,
      name: 'Modifier',
      disabled: false,
    },
  ]
  const toggleCompareFrom = (compareFrom: number) => {
    let comparableOptions =
      defaultComparedFrom.find((item) => item.id === compareFrom)?.comparable || []
    setCompareTo(
      compareTo.map((item) => {
        return {
          ...item,
          disabled: !comparableOptions.includes(item.id),
        }
      })
    )
  }
  const watchComparedFrom = watch('compare_from', undefined)
  const watchComparedTo = watch('compare_to', undefined)
  useEffect(() => {
    setValue('compare_to', undefined)
    toggleCompareFrom(watchComparedFrom || 0)
  }, [watchComparedFrom])

  const [compareTo, setCompareTo] = useState(defaultComparedTo)
  return (
    <Row>
      <Col md={3} lg={3} xl={3}>
        <div className={'filter-fields'}>
          <Controller
            name="date_range"
            control={control}
            render={({field: {name}}) => <DateRange setValue={setValue} fieldName={name} />}
          />
        </div>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={2}>
        <div className={'dfields filter-fields'}>
          <Controller
            name="compare_from"
            control={control}
            rules={{required: Required}}
            render={({field}) => (
              <SelectField
                errors={errors.compare_from}
                field={field}
                prefixIcon={<BsCalendarDate />}
                selectOptions={defaultComparedFrom}
              />
            )}
          />
        </div>
      </Col>
      <Col className={'d-flex'} md={1} lg={1} xl={1} xxl={1}>
        <span className={'compare-span m-auto'}>By</span>
      </Col>
      <Col md={3} lg={3} xl={3} xxl={2}>
        <div className={'dfields filter-fields'}>
          <Controller
            name="compare_to"
            control={control}
            rules={{required: Required}}
            render={({field}) => (
              <SelectField
                errors={errors.compare_to}
                field={field}
                selectOptions={compareTo}
                prefixIcon={<BsCalendarDate />}
              />
            )}
          />
        </div>
      </Col>
      <Col className={'d-flex align-items-end gap-2'} md={4} lg={4} xl={4} xxl={2}>
        <ThemeButton
          className={'filter-btn'}
          text={'Apply Filter'}
          type={'submit'}
          loader={applyFilterLoader}
          disabled={!watchComparedFrom || !watchComparedTo}
        />
      </Col>
    </Row>
  )
}
