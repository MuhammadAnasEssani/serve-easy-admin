import {Popconfirm, Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {BiEditAlt} from 'react-icons/bi'
import '../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import ViewCard from '../../../components/dashboard/ViewCard'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeBtn from '../../../components/authentication/ThemeBtn'
import {MdAdd} from 'react-icons/md'

export default function EstablishmentListing() {
  const {setTitle, user} = useUserContext()
  useEffect(() => {
    setTitle('Establishments')
  }, [])

  const [establishment, setEstablishment] = useState<IGetEstablishment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await EstablishmentServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      {type: 'table-listing'}
    )
    if (res.status) {
      setLoading(false)
      setEstablishment(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
  }

  useEffect(() => {
    fetchData({pagination})
  }, [])

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

  const columns: ColumnsType<IGetEstablishment> = [
    {
      className: 'first-col',
      title: 'Name',
      dataIndex: 'name',
      width: '200px',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <SkeletonTableCell loading={loading} value={status == 10 ? 'Active' : 'In Active'} />
      ),
      sorter: (a, b) => (a?.status && b?.status ? a?.status - b?.status : 0),
      sortDirections: ['descend', 'ascend'],
      filters: [
        {text: 'Active', value: 10},
        {text: 'InActive', value: 20},
      ],
      width: '120px',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address) => <SkeletonTableCell loading={loading} value={address} />,
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ['descend', 'ascend'],
      width: '300px',
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
              moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-establishment/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>
            {record.id !== user.establishment_id && (
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
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
    await EstablishmentServices.destroy(key)
    fetchData({pagination})
  }

  return (
    <ViewCard>
      <div className={'establishment-listing'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              route={'/create-establishment'}
              text={'Create Establishment'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={establishment}
              loading={loading}
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
