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
import {Col, Container, Row} from 'react-bootstrap'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import ViewCard from '../../../components/dashboard/ViewCard'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function UserListing() {
  const {setTitle, establishmentId, user} = useUserContext()
  useEffect(() => {
    setTitle('Users')
  }, [])

  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await UserAuthService.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    if (res.status) {
      setLoading(false)
      setUsers(res.data.data)
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
      width: '280px',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Establishment',
      dataIndex: 'establishment',
      render: (establishment) => establishment?.name || '-',
      sorter: (a, b) =>
        a.establishment?.name
          ? a.establishment?.name.localeCompare(b.establishment?.name || '')
          : 0,
      sortDirections: ['descend', 'ascend'],
      width: '280px',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: (roles) => roles[0].name,
      sorter: (a, b) => a.roles[0].name.localeCompare(b.roles[0].name),
      sortDirections: ['descend', 'ascend'],
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
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      className: 'actions actions-btns',
      fixed: 'right',
      width: '100px',
      render: (text, record, index) => {
        return (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-ap-user/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>

            {record.id != user.id && (
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
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
            route={'/create-users'}
            text={'Create User'}
            prefixIcon={<MdAdd />}
            id={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={users}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{x: 'calc(700px + 50%)'}}
      />
    </ViewCard>
  )
}
