import React, {useEffect, useState} from 'react'
import {Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {useUserContext} from '../../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../../config/constants'
import {IItemSummaryReport, IItemSummaryReportsFilters} from '../../../../interfaces/IReports'
// Charts js
import {Table, Tabs} from 'antd'
import '../../../../../assets/css/views/dashboard/sales-summary.scss'
import '../../../../../assets/css/views/dashboard/item-summary.scss'
import {ReportService} from '../../../../services/api-services/report.service'
import type {ColumnsType} from 'antd/es/table'
import {FiChevronRight} from 'react-icons/fi'
import moment from 'moment'
import {TablePaginationConfig} from 'antd/lib/table'
import {IDatatableParams} from '../../../../interfaces/IDatatable'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IGetEstablishment} from '../../../../interfaces/IGetEstablishment'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import ItemsSummaryFilters from './ItemsSummaryFilters'
import {FaFilter} from 'react-icons/fa'
import ThemeModal from '../../../../components/Modal'

export default function ItemSummaryReport() {
  const {setTitle, establishmentId} = useUserContext()
  const defaultFilters: IItemSummaryReportsFilters = {
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD'),
    establishment_id: establishmentId,
    order_type: [
      BACKEND_CONSTANTS.ORDERS.TYPES.DINE,
      BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY,
      BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY,
      BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE,
    ],
  }

  const {TabPane} = Tabs
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const [itemSummaryReport, setItemSummaryReport] = useState<IItemSummaryReport[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)
  const [filter, setFilters] = useState<IItemSummaryReportsFilters>(defaultFilters)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

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

  const methods = useForm<IItemSummaryReportsFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })
  const onSubmit = async (data: IItemSummaryReportsFilters) => {
    if (establishmentId > 0) {
      setFilterLoading(true)
      const filterData = {
        start_date: data.date_range?.[0],
        end_date: data.date_range?.[1],
        establishment_id: establishmentId,
        order_type: data.order_type,
      }
      setFilters(filterData)
      fetchData(filterData)
    }
  }
  const fetchData = async (data: IItemSummaryReportsFilters, params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await ReportService.getItemSummaryReport(
      params.pagination?.pageSize,
      params.pagination?.current,
      data
    )
    if (res.status) {
      setItemSummaryReport(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
    setLoading(false)
    setFilterLoading(false)
  }

  const handleTableChange: any = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IGetEstablishment>
  ) => {
    fetchData(
      {
        ...filter,
        establishment_id: establishmentId,
      },
      {
        sortField: sorter.field as string,
        sortOrder: sorter.order as string,
        pagination: newPagination,
        ...filters,
      }
    )
  }

  useEffect(() => {
    // console.log(establishmentId)
    establishmentId &&
      fetchData(
        {
          ...filter,
          establishment_id: establishmentId,
        },
        {pagination}
      )
  }, [establishmentId])

  const columns: ColumnsType<IItemSummaryReport> = [
    // {
    //     title: 'S.No',
    //     dataIndex: 'product_id',
    //     className: 'first-col',
    //     width: '5%',
    //     align:'center',
    // },
    {
      title: 'Item Code',
      dataIndex: 'product_id',
      sorter: (a, b) => a.product_id - b.product_id,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Name',
      dataIndex: 'product',
      className: 'first-col',
      render: (product) => {
        return (
          <>
            <span>
              {product.category.name} <FiChevronRight /> {product.name}
            </span>
          </>
        )
      },
      sorter: (a, b) => a.product.name.localeCompare(b.product.name),
      sortDirections: ['descend', 'ascend'],
      width: '300px',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      render: (unit_price) => `$${unit_price}`,
      sorter: (a, b) => a.unit_price - b.unit_price,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Sold Quantity',
      dataIndex: 'meta',
      render: (meta) => meta.sold_qty,
      sorter: (a, b) => a.meta.sold_qty - b.meta.sold_qty,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Total Sales Amount',
      dataIndex: 'meta',
      width: '180px',
      render: (meta, row) => `$${meta.sold_qty * row.unit_price}`,
    },
  ]

  const filterModal = () => {
    setFilterPopup(true)
  }

  return (
    <>
      <div className={'item-summary'}>
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
                <ItemsSummaryFilters loading={filterLoading} />
              </div>
            </Row>
            <ThemeModal
              title={'Filters'}
              active={filterPopup}
              setActive={setFilterPopup}
              children={<ItemsSummaryFilters loading={filterLoading} />}
            />
          </Form>
        </FormProvider>
        <hr />
        <Row>
          <Table
            columns={columns}
            dataSource={itemSummaryReport}
            className={'main-table'}
            rowKey={(record) => record.product_id + record.unit_price}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            scroll={{x: 'calc(600px + 50%)'}}
          />
        </Row>
      </div>
    </>
  )
}
