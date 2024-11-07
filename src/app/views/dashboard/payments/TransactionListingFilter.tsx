import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
import DateRange from '../../../components/dashboard/DateRange'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import {IoRestaurantOutline} from 'react-icons/io5'
import {MdOutlinePayment, MdOutlineWeb} from 'react-icons/md'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {ITransactionsFilters} from '../../../interfaces/ITransactions'
import {BACKEND_CONSTANTS} from '../../../config/constants'

export default function TransactionListingFilter({
  loading,
  refreshLoading,
  handleRefresh,
}: {
  loading: boolean
  refreshLoading: boolean
  handleRefresh: () => void
}) {
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

  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<ITransactionsFilters>()

  return (
    <>
      <div className={'filter-sec'}>
        <Row>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="date_range"
                control={control}
                render={({field: {name}}) => <DateRange setValue={setValue} fieldName={name} />}
              />
            </div>
          </Col>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="order_type"
                control={control}
                render={({field}) => (
                  <MultiSelectField
                    errors={errors.order_type}
                    field={field}
                    selectOptions={orderType}
                    maxTagCount={1}
                    placeholder={'Order type'}
                    prefixIcon={<IoRestaurantOutline />}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="platform"
                control={control}
                render={({field}) => (
                  <MultiSelectField
                    errors={errors.platform}
                    field={field}
                    selectOptions={orderPlatforms}
                    maxTagCount={1}
                    placeholder={'Select Platform'}
                    prefixIcon={<MdOutlineWeb />}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="payment_type"
                control={control}
                render={({field}) => (
                  <MultiSelectField
                    errors={errors.payment_type}
                    field={field}
                    selectOptions={paymentType}
                    maxTagCount={1}
                    placeholder={'Payment Type'}
                    prefixIcon={<MdOutlinePayment />}
                  />
                )}
              />
            </div>
          </Col>
          <Col className={'gap-2 d-flex align-items-end'} md={3} lg={2}>
            <ThemeButton
              className={'filter-btn'}
              text={'Apply Filter'}
              type={'submit'}
              loader={loading}
            />
            <ThemeButton
              className={'filter-btn'}
              text={'refresh'}
              type="button"
              loader={refreshLoading}
              onClick={() => {
                handleRefresh()
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
