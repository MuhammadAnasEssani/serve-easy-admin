import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
import DateRange from '../../../../components/dashboard/DateRange'
import MultiSelectField from '../../../../components/dashboard/MultiSelectField'
import {MdOutlineFastfood} from 'react-icons/md'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {IItemSummaryReportsFilters, IReportsFilters} from '../../../../interfaces/IReports'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {Required} from '../../../../utils/patterns'

export default function ItemSummaryReports({loading}: {loading: boolean}) {
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
  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<IItemSummaryReportsFilters>()
  return (
    <>
      <div className={'filter-sec'}>
        <Row>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="date_range"
                control={control}
                rules={{required: Required}}
                render={({field: {name}}) => (
                  <DateRange setValue={setValue} fieldName={name} errors={errors.date_range} />
                )}
              />
            </div>
          </Col>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="order_type"
                control={control}
                rules={{required: Required}}
                render={({field}) => (
                  <MultiSelectField
                    errors={errors.order_type}
                    field={field}
                    selectOptions={orderType}
                    maxTagCount={1}
                    prefixIcon={<MdOutlineFastfood />}
                    placeholder={'Order type'}
                  />
                )}
              />
            </div>
          </Col>
          <Col className={'d-flex align-items-end'} md={3} lg={2}>
            <ThemeButton
              className={'filter-btn'}
              text={'Apply Filter'}
              type={'submit'}
              loader={loading}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
