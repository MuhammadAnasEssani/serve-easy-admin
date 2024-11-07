import {Popconfirm, Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {BiEditAlt} from 'react-icons/bi'
import '../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Col, Container, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import {PromoCodeServices} from '../../../services/api-services/promo-code-services'
import {IPromoList} from '../../../interfaces/IPromo'
import ViewCard from '../../../components/dashboard/ViewCard'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function PromoCodeListing() {
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Promo Codes')
  }, [])

  const [promo, setPromo] = useState<IPromoList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await PromoCodeServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    if (res.status) {
      setLoading(false)
      setPromo(res.data.data)
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
    sorter: SorterResult<IGetEstablishment>
  ) => {
    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }
  const promoLoader: any = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  const columns: ColumnsType<IPromoList> = [
    {
      title: 'Code',
      dataIndex: 'code',
      render: (code) => <SkeletonTableCell loading={loading} value={code} />,
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Type',
      dataIndex: 'type_text',
      render: (type_text) => <SkeletonTableCell loading={loading} value={type_text} />,
      sorter: (a, b) => a.type_text.localeCompare(b.type_text),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      render: (discount) => <SkeletonTableCell loading={loading} value={discount} />,
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Applies to',
      dataIndex: 'applies_to_text',
      render: (applies_to_text) => <SkeletonTableCell loading={loading} value={applies_to_text} />,
      sorter: (a, b) => a.applies_to_text.localeCompare(b.applies_to_text),
      sortDirections: ['descend', 'ascend'],
      width: '130px',
    },
    {
      title: 'Min Order Amount',
      dataIndex: 'min_order_amount',
      render: (min_order_amount) => (
        <SkeletonTableCell loading={loading} value={min_order_amount} />
      ),
      sorter: (a, b) => a.min_order_amount - b.min_order_amount,
      sortDirections: ['descend', 'ascend'],
      width: '200px',
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
              moduleId={BACKEND_CONSTANTS.MODULES.PROMO}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-promo/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.PROMO}
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
    await PromoCodeServices.destroy(key)
    fetchData({pagination})
  }

  return (
    <ViewCard>
      <div className={'establishment-listing'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              route={'/create-promo'}
              text={'Create Promo'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.PROMO}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          loading={loading}
          dataSource={promo}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
      </div>
    </ViewCard>
  )
}
