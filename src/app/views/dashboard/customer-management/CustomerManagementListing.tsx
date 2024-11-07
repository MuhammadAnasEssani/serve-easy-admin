import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/customer-management.scss'
import ViewCard from '../../../components/dashboard/ViewCard'
import type {ColumnsType} from 'antd/es/table'
import {Table} from 'antd'
import {useForm} from 'react-hook-form'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {ICustomerListing, ICustomerManagementFilter} from '../../../interfaces/ICustomerManagement'
import {useUserContext} from '../../../providers/UserProvider'
import {TablePaginationConfig} from 'antd/lib/table'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {CustomerServices} from '../../../services/api-services/customer-listing-service'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {Link} from 'react-router-dom'
import {BsEye} from 'react-icons/bs'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import CustomerListingFilters from './CustomerListingFilters'
import ThemeModal from '../../../components/Modal'
import BlacklistButton from '../../../components/authentication/CustomerBlacklist'

export default function CustomerManagementListing() {
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Customer Management')
  }, [])
  const [customers, setCustomers] = useState<ICustomerListing[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  //Customer Listing Api Fetching
  const fetchData = async (params: IDatatableParams = {}, data: any) => {
    setLoading(true)
    // data.type= BACKEND_CONSTANTS.ORDERS.TYPES.DINE
    const res = await CustomerServices.index(
      data,
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setLoading(false)
      setCustomers(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
  }

  //Table Data Inseting with Api
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

  const columns: ColumnsType<ICustomerListing> = [
    {
      className: 'first-col',
      title: 'Name',
      dataIndex: 'full_name',
      width: ' 250px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email, row) => <SkeletonTableCell loading={loading} value={email || '-'} />,
      width: ' 220px',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: ' 180px',
    },
    {
      title: 'Blacklist',
      dataIndex: 'customer_blacklist',
      width: ' 100px',
      render: (value, row) => <BlacklistButton customer={row} />,
    },
    {
      title: 'Created Ago',
      dataIndex: 'created_ago',
      width: ' 150px',
    },
    {
      title: 'Total Orders',
      dataIndex: 'meta',
      render: (meta) => meta.customer_total_orders_count,
      width: ' 150px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: ' 100px',
      className: 'actions actions-btns',
      fixed: 'right',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/customer-details/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
          </>
        )
      },
    },
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
  } = useForm<ICustomerManagementFilter>({
    mode: 'onChange',
  })

  const onSubmit = async (data: ICustomerManagementFilter) => {
    data.establishment_id = establishmentId
    fetchData({pagination}, data)
  }
  const filterModal = () => {
    setFilterPopup(true)
  }

  return (
    <ViewCard>
      <div className={'customer-management-listing'}>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              <CustomerListingFilters loading={loading} />
            </div>
            <ThemeModal
              title={'Filters'}
              active={filterPopup}
              setActive={setFilterPopup}
              children={<CustomerListingFilters loading={loading} />}
            />
          </Row>
        </Form>
        <Row>
          <Col md={12}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={customers}
              pagination={pagination}
              onChange={handleTableChange}
              scroll={{x: 'calc(600px + 50%)'}}
            />
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
