import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {Table} from 'antd'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {Link} from 'react-router-dom'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, GENERIC, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {BsEye} from 'react-icons/bs'
import {TransactionService} from '../../../services/api-services/transaction.service'
import {ITransactionListing, ITransactionsFilters} from '../../../interfaces/ITransactions'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import TransactionListingFilter from './TransactionListingFilter'
import {FaFilter} from 'react-icons/fa'
import ThemeModal from '../../../components/Modal'

export default function Transactions() {
  const {setTitle, establishmentId, currencySymbol} = useUserContext()
  useEffect(() => {
    setTitle('Payments')
  }, [])
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const [transactions, setTransactions] = useState<ITransactionListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

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

  const fetchData = async (params: IDatatableParams = {}, data: any) => {
    setLoading(true)
    const res = await TransactionService.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      data
    )
    if (res.status) {
      setTransactions(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
    setLoading(false)
    setFilterLoading(false)
    setRefreshLoading(false)
  }

  const columns: ColumnsType<ITransactionListing> = [
    {
      className: 'first-col',
      title: 'Transaction ID',
      dataIndex: 'id',
      render: (id) => <SkeletonTableCell loading={loading} value={`#${id}`} />,
      width: '150px',
    },
    {
      title: 'Order ID',
      dataIndex: 'order',
      render: (order) => (
        <SkeletonTableCell loading={loading} value={order?.id ? `#${order?.id}` : '-'} />
      ),
      width: '100px',
    },
    {
      title: 'Customer Name',
      dataIndex: 'order',
      width: '250px',
      render: (order) => (
        <SkeletonTableCell
          loading={loading}
          value={order?.delivery_customer?.name || order?.mobile_customer?.full_name || '-'}
        />
      ),
    },
    {
      title: 'Platform',
      dataIndex: 'order',
      render: (order) => <SkeletonTableCell loading={loading} value={order?.platform} />,
      width: '120px',
    },
    {
      title: 'Order Type',
      dataIndex: 'order',
      width: '150px',
      render: (order) => <SkeletonTableCell loading={loading} value={order?.type_text} />,
    },
    {
      title: 'Payment Type',
      dataIndex: 'source_type_text',
      render: (source_type_text) => (
        <SkeletonTableCell loading={loading} value={source_type_text} />
      ),
      width: '180px',
    },
    {
      title: 'Amount Received ',
      dataIndex: 'amount_received',
      render: (amount_received) => (
        <SkeletonTableCell loading={loading} value={`${currencySymbol}${amount_received}`} />
      ),
      width: '200px',
    },
    {
      title: 'Amount Returned ',
      dataIndex: 'amount_returned',
      render: (amount_returned) => (
        <SkeletonTableCell loading={loading} value={`${currencySymbol}${amount_returned}`} />
      ),
      width: '200px',
    },

    {
      title: 'Created Date',
      dataIndex: 'created_at',
      render: (created_at) => (
        <SkeletonTableCell loading={loading} value={convertTimeZone(created_at).formatted} />
      ),
      width: '200px',
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '100px',
      className: 'actions actions-btns',
      fixed: 'right',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.PAYMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/transaction-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
          </>
        )
      },
    },
  ]

  const orderLoader: any = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  const handleTableChange: any = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IGetEstablishment>
  ) => {
    fetchData(
      {
        sortField: sorter.field as string,
        sortOrder: sorter.order as string,
        pagination: newPagination,
        ...filters,
      },
      {}
    )
  }

  useEffect(() => {
    fetchData(
      {pagination},
      {
        establishment_id: establishmentId,
      }
    )
  }, [establishmentId])

  const methods = useForm<ITransactionsFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const onSubmit = async (data: ITransactionsFilters) => {
    setFilterLoading(true)
    data.establishment_id = establishmentId
    fetchData({pagination}, data)
  }
  const filterModal = () => {
    setFilterPopup(true)
  }
  return (
    <div className={'dine-in'}>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <>
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
                <ThemeModal
                  title={'Filters'}
                  active={filterPopup}
                  setActive={setFilterPopup}
                  children={
                    <TransactionListingFilter
                      loading={filterLoading}
                      refreshLoading={refreshLoading}
                      handleRefresh={() => {
                        setRefreshLoading(true)
                        fetchData(
                          {pagination},
                          {
                            establishment_id: establishmentId,
                          }
                        )
                        methods.reset()
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className={'d-none d-md-block'}>
              <TransactionListingFilter
                loading={filterLoading}
                refreshLoading={refreshLoading}
                handleRefresh={() => {
                  setRefreshLoading(true)
                  fetchData(
                    {pagination},
                    {
                      establishment_id: establishmentId,
                    }
                  )
                  methods.reset()
                }}
              />
            </div>
          </>

          <Row>
            <Col md={12}>
              <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={transactions}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{x: 'calc(600px + 50%)'}}
              />
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </div>
  )
}
