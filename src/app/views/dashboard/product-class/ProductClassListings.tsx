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
import {Col, Row} from 'react-bootstrap'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {IProductClassList} from '../../../interfaces/IProductClass'
import {ProductClassServices} from '../../../services/api-services/product-class-service'
import ViewCard from '../../../components/dashboard/ViewCard'
import {ExcelIcon} from '../../../../assets/images/icons/menu-icons/performances'
import ImportCsv from '../menu-management/ImportCsv'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import {toast} from 'react-toastify'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'
import AddProductClass from './AddProductClass'
import EditProductClass from './EditProductClass'

export default function ProductClassListing() {
  const {setTitle, establishmentId} = useUserContext()
  const [bulkLoading, setBulkLoading] = useState<boolean>(false)
  const [csv, setCsv] = useState(false)
  useEffect(() => {
    setTitle('Product Class')
  }, [])

  const [productClass, setProductClass] = useState<IProductClassList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await ProductClassServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      {establishment_id: establishmentId}
    )
    if (res.status) {
      setLoading(false)
      setProductClass(res.data.data)
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
  const productClassLoader: any = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  const columns: ColumnsType<IProductClassList> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '100px',
      render: (id) => <SkeletonTableCell loading={loading} value={id} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '300px',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
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
      width: '80px',
      className: 'actions actions-btns',
      fixed: 'right',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              {/*<Link to={`/edit-product-class/${record.id}`} className={"table-icon edit"}><BiEditAlt/></Link>*/}
              <a onClick={() => editProductClassHandler(record.id)} className={'table-icon edit'}>
                <BiEditAlt />
              </a>
            </PermissionIcons>
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
          </>
        )
      },
    },
  ]

  const openCsv = () => {
    setCsv(!csv)
  }

  const handleDelete = async (key: number) => {
    /*todo: call delete api here*/
    await ProductClassServices.destroy(key)
    fetchData({pagination})
  }

  const uploadClasses = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('classes', file)
    const res = await ProductClassServices.uploadBulkClasses(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  //offcanvas
  const [productClassOffcanvas, setProductClassOffcanvas] = useState(false)
  const [editProductClassOffcanvas, setEditProductClassOffcanvas] = useState(false)
  const [editProductClassId, setEditProductClassId] = useState<number>(0)
  const openProductClass = () => {
    setProductClassOffcanvas(true)
  }
  const editProductClassHandler = (id: number) => {
    setEditProductClassOffcanvas(!editProductClassOffcanvas)
    setEditProductClassId(id)
  }

  return (
    <ViewCard>
      <div className={'establishment-listing'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              id={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
              text={'Create Product Class'}
              prefixIcon={<MdAdd />}
              onClick={() => openProductClass()}
            />
            {/* <button onClick={openCsv} className={'excel-btn btn ms-2'}>
              {ExcelIcon} Import CSV
            </button> */}
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          loading={loading}
          dataSource={productClass}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
      </div>
      <DashboardOffCanvas
        state={csv}
        setActive={setCsv}
        children={<ImportCsv uploadCsv={uploadClasses} loading={bulkLoading} />}
        heading={'Import CSV'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={productClassOffcanvas}
        setActive={setProductClassOffcanvas}
        children={<AddProductClass reloadTable={() => fetchData({pagination})} />}
        heading={'Create Product Class'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={editProductClassOffcanvas}
        setActive={setEditProductClassOffcanvas}
        children={
          <EditProductClass
            id={editProductClassId}
            reloadTable={() => fetchData({pagination})}
            handleClose={() => setEditProductClassOffcanvas(false)}
          />
        }
        heading={'Edit Product Class'}
        reloadTable={() => fetchData({pagination})}
      />
    </ViewCard>
  )
}
