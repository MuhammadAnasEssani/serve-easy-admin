import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useUserContext} from '../../../providers/UserProvider'
import {Popconfirm, Table} from 'antd'
import '../../../../assets/css/views/dashboard/sales-summary.scss'
import '../../../../assets/css/views/dashboard/item-summary.scss'
import type {ColumnsType} from 'antd/es/table'
import {ITableListing} from '../../../interfaces/ITable'
import ViewCard from '../../../components/dashboard/ViewCard'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {TableService} from '../../../services/api-services/table.service'
import {TablePaginationConfig} from 'antd/lib/table'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {SkeletonTableActionBtn} from '../../../components/Skeleton'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import CreateTable from './CreateTable'
import EditTable from './EditTable'

export default function TableManagementListing() {
  const [tables, setTables] = useState<ITableListing[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const {setTitle, establishmentId} = useUserContext()
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })
  const navigate = useNavigate()
  useEffect(() => {
    setTitle('Table Management')
  }, [])

  useEffect(() => {
    fetchData({pagination})
  }, [establishmentId])

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await TableService.index(
      {
        establishment_id: establishmentId,
      },
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setLoading(false)
      setTables(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
  }

  const columns: ColumnsType<ITableListing> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      className: 'first-col',
      width: '80px',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Table number',
      dataIndex: 'table_number',
      key: 'table_number',
      sorter: (a, b) => a.table_number - b.table_number,
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Capacity',
      dataIndex: 'seating_capacity',
      key: 'seating_capacity',
      sorter: (a, b) => a.seating_capacity - b.seating_capacity,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      key: 'floor',
      sorter: (a, b) => a.floor - b.floor,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },

    {
      title: 'Created By ',
      dataIndex: 'created_by_id',
      render: (created_by_id, row) => row.created_by?.full_name,
      sorter: (a, b) => {
        const fullNameA = a?.created_by?.full_name || ''
        const fullNameB = b?.created_by?.full_name || ''
        return fullNameA.localeCompare(fullNameB)
      },
      sortDirections: ['descend', 'ascend'],
      key: 'created_by_id',
      width: '150px',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (created_at) => convertTimeZone(created_at).formatted,
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '150px',
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
              moduleId={BACKEND_CONSTANTS.MODULES.TABLE}
              permissionName={'pivot_update'}
            >
              {/*<a onClick={()=>{*/}
              {/*    navigate(`/edit-table/${record.id}`)*/}
              {/*}} className={"table-icon edit"}><BiEditAlt/></a>*/}
              <a
                onClick={() => {
                  editTableHandler(record.id)
                }}
                className={'table-icon edit'}
              >
                <BiEditAlt />
              </a>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.TABLE}
              permissionName={'pivot_delete'}
            >
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => {
                  handleDelete(record.id)
                }}
              >
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
    await TableService.destroy(key)
    fetchData({pagination})
  }

  //offcanvas
  const [tableOffcanvas, setTableOffcanvas] = useState(false)
  const [editTableOffcanvas, setEditTableOffcanvas] = useState(false)
  const [editTableId, setEditTableId] = useState<number>(0)
  const openCreateTable = () => {
    setTableOffcanvas(true)
  }
  const editTableHandler = (id: number) => {
    setEditTableOffcanvas(!editTableOffcanvas)
    setEditTableId(id)
  }

  return (
    <>
      <ViewCard>
        <div className={'item-summary'}>
          <Row>
            <Col md={12} className={'d-flex align-items-center mb-3'}>
              {/*<ThemeButton className={"create-listing-btn"} route={"/create-table"} text={"Create Table"} prefixIcon={<MdAdd/>} id={BACKEND_CONSTANTS.MODULES.TABLE}/>*/}
              <ThemeButton
                className={'create-listing-btn'}
                onClick={() => openCreateTable()}
                text={'Create Table'}
                prefixIcon={<MdAdd />}
                id={BACKEND_CONSTANTS.MODULES.TABLE}
              />
            </Col>
          </Row>
          <Row>
            <Table
              columns={columns}
              dataSource={tables}
              loading={loading}
              scroll={{x: 'calc(700px + 50%)'}}
            />
          </Row>
        </div>
        <DashboardOffCanvas
          state={tableOffcanvas}
          setActive={setTableOffcanvas}
          children={<CreateTable reloadTable={() => fetchData({pagination})} />}
          heading={'Create Tables'}
          reloadTable={() => fetchData({pagination})}
        />
        <DashboardOffCanvas
          state={editTableOffcanvas}
          setActive={setEditTableOffcanvas}
          children={
            <EditTable
              id={editTableId}
              reloadTable={() => fetchData({pagination})}
              handleClose={() => setEditTableOffcanvas(false)}
            />
          }
          heading={'Edit Tables'}
          reloadTable={() => fetchData({pagination})}
        />
      </ViewCard>
    </>
  )
}
