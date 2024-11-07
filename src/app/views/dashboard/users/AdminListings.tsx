import {Popconfirm, Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {BiEditAlt} from 'react-icons/bi'
import '../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Link} from 'react-router-dom'
import {IUser} from '../../../interfaces/IUser'
import {UserAuthService} from '../../../services/api-services/user-auth-api.service'
import {Col, Row} from 'react-bootstrap'
import ViewCard from '../../../components/dashboard/ViewCard'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function AdminListing() {
  const {setTitle, establishmentId, user} = useUserContext()
  useEffect(() => {
    setTitle('Admins')
  }, [])

  const [admins, setAdmins] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await UserAuthService.getAdmins(
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    if (res.status) {
      setLoading(false)
      setAdmins(res.data.data)
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
    sorter: SorterResult<IUser>
  ) => {
    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }

  const columns: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      width: '20%',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: (roles) => roles[0].name,
      sorter: (a, b) => a.roles[0].name.localeCompare(b.roles[0].name),
      sortDirections: ['descend', 'ascend'],
      width: '30%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (created_at) => convertTimeZone(created_at).formatted,
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '20%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '10%',
      render: (text, record, index) => {
        return (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-restaurant-admin/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>

            {record.id != user.id && (
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
                permissionName={'pivot_delete'}
              >
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                  <a className={'table-icon delete'}>
                    <RiDeleteBin4Line />
                  </a>
                </Popconfirm>
              </PermissionIcons>
            )}
          </>
        )
      },
    },
  ]

  const handleDelete = async (key: number) => {
    /*todo: call delete api here*/
    await UserAuthService.destroy(key)
    fetchData({pagination})
  }
  return (
    <ViewCard>
      <Row>
        <Col md={12} className={'d-flex align-items-center mb-3'}>
          <ThemeButton
            className={'create-listing-btn'}
            route={'/create-restaurant-admin'}
            text={'Create Admin'}
            prefixIcon={<MdAdd />}
            id={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={admins}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </ViewCard>
  )
}
