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
import {Col, Container, Row} from 'react-bootstrap'
import {IUser} from '../../../interfaces/IUser'
import {IRolesListing} from '../../../interfaces/IRole'
import {RoleServices} from '../../../services/api-services/role-services'
import ThemeTable from '../../../components/dashboard/ThemeTable'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import {Link} from 'react-router-dom'
import ViewCard from '../../../components/dashboard/ViewCard'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function RoleListing() {
  const {setTitle, establishmentId, user} = useUserContext()
  useEffect(() => {
    setTitle('Roles')
  }, [])

  const [role, setRole] = useState<IRolesListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await RoleServices.index(
      null,
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    console.log(res)
    if (res.status) {
      setLoading(false)
      setRole(res.data.data)
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

  const columns: ColumnsType<IRolesListing> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '280px',
    },
    {
      title: 'Number of Modules ',
      dataIndex: 'permissions',
      render: (permissions) => permissions.length,
      sorter: (a, b) => a.permissions.length - b.permissions.length,
      sortDirections: ['descend', 'ascend'],
      width: '380px',
    },

    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (created_at) => convertTimeZone(created_at).formatted,
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '380px',
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
              moduleId={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-ap-role/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>
            {record.id !== user.roles[0].id && (
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
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
    await RoleServices.destroy(key)
    fetchData({pagination})
  }

  return (
    <ViewCard>
      <Row>
        <Col md={12} className={'d-flex align-items-center mb-3'}>
          <ThemeButton
            className={'create-listing-btn'}
            route={'/create-roles'}
            text={'Create Role'}
            prefixIcon={<MdAdd />}
            id={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
          />
        </Col>
      </Row>
      <Table
        className={'my-ant-table'}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={role}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        expandable={{
          // expandedRowRender: record => record.permissions.map(row => <p style={{ margin: 0 }}>{row.name}</p>),
          expandedRowRender: (record) => <ThemeTable rows={record.permissions} />,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        scroll={{x: 'calc(600px + 50%)'}}
      />
    </ViewCard>
  )
}
