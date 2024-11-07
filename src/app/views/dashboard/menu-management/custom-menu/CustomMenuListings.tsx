import {Popconfirm, Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {IGetEstablishment} from '../../../../interfaces/IGetEstablishment'
import {useUserContext} from '../../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../../config/constants'
import {IDatatableParams} from '../../../../interfaces/IDatatable'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {BiEditAlt} from 'react-icons/bi'
import '../../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Col, Container, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../../components/Skeleton'
import PermissionBtn from '../../../../components/dashboard/PermissionBtn'
import {CustomMenuServices} from '../../../../services/api-services/custom-menu-service'
import {ICustomMenuList} from '../../../../interfaces/ICustomMenu'
import {BsEye} from 'react-icons/bs'
import ViewCard from '../../../../components/dashboard/ViewCard'
import {convertTimeZone} from '../../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function CustomMenuListing() {
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Custom Menu')
  }, [])

  const [customMenu, setCustomMenu] = useState<ICustomMenuList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await CustomMenuServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    console.log(res)
    if (res.status) {
      setLoading(false)
      setCustomMenu(res.data.data)
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

  const columns: ColumnsType<ICustomMenuList> = [
    {
      className: 'first-col',
      title: 'Name',
      dataIndex: 'name',
      width: '300px',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'No of Products',
      dataIndex: 'meta',
      render: (meta) => <SkeletonTableCell loading={loading} value={meta?.products_count} />,
      sorter: (a, b) => a.meta?.products_count - b.meta?.products_count,
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      render: (created_by) => <SkeletonTableCell loading={loading} value={created_by?.full_name} />,
      sorter: (a, b) =>
        a?.created_by ? a?.created_by?.full_name?.localeCompare(b?.created_by?.full_name || '') : 0,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Updated By',
      dataIndex: 'updated_by',
      render: (updated_by) => (
        <SkeletonTableCell loading={loading} value={updated_by?.full_name || '-'} />
      ),
      width: '150px',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (created_at) => convertTimeZone(created_at).formatted,
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      render: (status_text) => <SkeletonTableCell loading={loading} value={status_text} />,
      width: '100px',
      sorter: (a, b) => (a?.status_text ? a?.status_text?.localeCompare(b?.status_text || '') : 0),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '150px',
      className: 'actions actions-btns',
      fixed: 'right',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/custom-menu-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-custom-menu/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
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
    await CustomMenuServices.destroy(key)
    fetchData({pagination})
  }

  return (
    <ViewCard>
      <div className={'establishment-listing'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              route={'/create-custom-menu'}
              text={'Create Custom Menu'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          loading={loading}
          dataSource={customMenu}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
      </div>
    </ViewCard>
  )
}
