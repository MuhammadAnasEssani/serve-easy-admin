import {Popconfirm, Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, DISCOUNT, GENERIC, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {BiEditAlt} from 'react-icons/bi'
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import ViewCard from '../../../components/dashboard/ViewCard'
import {DiscountServices} from '../../../services/api-services/discount.services'
import {IDiscountListing} from '../../../interfaces/IDiscount'
import {BsEye} from 'react-icons/bs'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function DiscountListings() {
  const {setTitle, establishmentId, currencySymbol} = useUserContext()
  useEffect(() => {
    setTitle('Discounts')
  }, [])

  const [discounts, setDiscounts] = useState<IDiscountListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await DiscountServices.index(
      {establishment_id: establishmentId},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setLoading(false)
      setDiscounts(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
  }

  useEffect(() => {
    fetchData({pagination})
  }, [establishmentId])

  const handleTableChange: any = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IDiscountListing>
  ) => {
    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }

  const columns: ColumnsType<IDiscountListing> = [
    {
      className: 'first-col',
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <SkeletonTableCell loading={loading} value={id} />,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '80px',
    },
    {
      title: 'Discount Name',
      dataIndex: 'name',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Bill Print Name',
      dataIndex: 'bill_print_name',
      render: (bill_print_name) => <SkeletonTableCell loading={loading} value={bill_print_name} />,
      sorter: (a, b) => a.bill_print_name.localeCompare(b.bill_print_name),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Discount Type',
      dataIndex: 'type_text',
      render: (type_text) => <SkeletonTableCell loading={loading} value={type_text} />,
      sorter: (a, b) => a.type_text.localeCompare(b.type_text),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      render: (discount, row) => (
        <SkeletonTableCell
          loading={loading}
          value={`${row?.type === DISCOUNT.DISCOUNT_TYPE.FIXED ? currencySymbol : ''}${discount}${
            row?.type === DISCOUNT.DISCOUNT_TYPE.PERCENTAGE ? '%' : ''
          }`}
        />
      ),
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Applies to',
      dataIndex: 'applies_to_text',
      render: (applies_to_text, row) => (
        <SkeletonTableCell loading={loading} value={applies_to_text} />
      ),
      sorter: (a, b) => a.applies_to_text.localeCompare(b.applies_to_text),
      sortDirections: ['descend', 'ascend'],
      width: '150px',
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
      title: 'Manual',
      dataIndex: 'is_manual',
      render: (is_manual) => (is_manual ? 'Yes' : 'No'),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      className: 'actions actions-btns',
      fixed: 'right',
      width: '140px',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
              permissionName={'pivot_read'}
            >
              <Link to={`/discount-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
              permissionName={'pivot_update'}
            >
              <Link
                to={
                  record.is_manual
                    ? `/edit-manual-discount/${record.id}`
                    : `/edit-discount/${record.id}`
                }
                className={'table-icon edit'}
              >
                <BiEditAlt />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
              permissionName={'pivot_delete'}
            >
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a className={'table-icon delete'}>
                  <RiDeleteBin4Line />
                </a>
              </Popconfirm>
            </PermissionIcons>
          </>
        )
      },
    },
  ]

  const handleDelete = async (key: number) => {
    /*todo: call delete api here*/
    await DiscountServices.destroy(key)
    fetchData({pagination})
  }

  return (
    <ViewCard>
      <div className={'discount-listing'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              route={'/create-discount'}
              text={'Create Discount'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.DISCOUNT}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={discounts}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
      </div>
    </ViewCard>
  )
}
