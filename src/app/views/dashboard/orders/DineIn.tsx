import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {IOrderList, IOrdersFilters} from '../../../interfaces/IOrder'
import {Table} from 'antd'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {Link} from 'react-router-dom'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {OrderServices} from '../../../services/api-services/order.service'
import {BsEye} from 'react-icons/bs'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import OrderListingFilters from './OrderListingFilters'
import ThemeModal from '../../../components/Modal'
import {FaFilter} from 'react-icons/fa'

export default function DineIn() {
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const {setTitle, establishmentId, currencySymbol} = useUserContext()
  useEffect(() => {
    setTitle('Orders')
  }, [])
  const [popupClose, setPopupClose] = useState<number>();
  const [orders, setOrders] = useState<IOrderList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const orderStatus = [
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.ORDERED,
      name: 'Ordered',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.HOLD,
      name: 'Hold',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.KITCHEN,
      name: 'Kitchen',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.DISPATCH,
      name: 'Dispatch',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.DELIVERED,
      name: 'Delivered',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.STATUS.CANCELLED,
      name: 'Cancelled',
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
    data.type = BACKEND_CONSTANTS.ORDERS.TYPES.DINE
    const res = await OrderServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      data
    )
    if (res.status) {
      setOrders(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
    setLoading(false)
    setFilterLoading(false)
    setRefreshLoading(false)
  }

  const columns: ColumnsType<IOrderList> = [
    {
      className: 'first-col',
      title: 'Order Id',
      dataIndex: 'id',
      render: (id) => <SkeletonTableCell loading={loading} value={id} />,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '130px',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      render: (created_at) => (
        <SkeletonTableCell loading={loading} value={convertTimeZone(created_at).formatted} />
      ),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
    },
    {
      title: 'Order Taker',
      dataIndex: 'order_taker',
      render: (order_taker) => (
        <SkeletonTableCell loading={loading} value={order_taker?.full_name} />
      ),
      sorter: (a, b) =>
        a?.order_taker
          ? a?.order_taker?.full_name?.localeCompare(b?.order_taker?.full_name || '')
          : 0,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Table Number',
      dataIndex: 'table',
      render: (table) => <SkeletonTableCell loading={loading} value={table?.table_number} />,
      sorter: (a, b) => (a.table && b.table ? a.table?.table_number - b.table?.table_number : 0),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      render: (platform) => <SkeletonTableCell loading={loading} value={platform} />,
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      sortDirections: ['descend', 'ascend'],
      width: '130px',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      render: (status_text) => <SkeletonTableCell loading={loading} value={status_text} />,
      sorter: (a, b) => (a?.status_text ? a?.status_text?.localeCompare(b?.status_text || '') : 0),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status_text',
      render: (payment_status_text) => (
        <SkeletonTableCell loading={loading} value={payment_status_text} />
      ),
      sorter: (a, b) => a.payment_status_text.localeCompare(b.payment_status_text),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
    },
    {
      title: 'Amount',
      dataIndex: 'gross_amount',
      render: (gross_amount) => (
        <SkeletonTableCell loading={loading} value={currencySymbol + gross_amount} />
      ),
      sorter: (a, b) => a.gross_amount - b.gross_amount,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      className: 'actions actions-btns',
      fixed: 'right',
      width: '100px',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.ORDER_MANAGEMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/order-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
          </>
        )
      },
    },
  ]

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

  // const {
  //
  //     handleSubmit,
  //     setValue,
  //     reset,
  //     formState: { errors },
  //     control
  // } = useForm<IOrdersFilters>({
  //     mode: "onChange",
  // });
  const methods = useForm<IOrdersFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const onSubmit = async (data: IOrdersFilters) => {
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

          <div className={'d-none d-md-block'}>
            <OrderListingFilters
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
          <div className={'d-block d-md-none'}>
            <div className={'filter-sec'}>
              <ThemeButton
                  onClick={filterModal}
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
                    <OrderListingFilters
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
          <Row>
            <Col md={12}>
              <Table
                columns={columns}
                rowKey={(record) => record.id}
                loading={loading}
                dataSource={orders}
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
