import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Row} from 'react-bootstrap'
import {Popconfirm, Table} from 'antd'
import {useUserContext} from '../../../providers/UserProvider'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {PrinterServices} from '../../../services/api-services/printer.services'
import {IPrinterList} from '../../../interfaces/IPrinter'
import {ExcelIcon} from '../../../../assets/images/icons/menu-icons/performances'
import ImportCsv from '../menu-management/ImportCsv'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import {MdAdd} from 'react-icons/md'
import CreatePrinter, {printerTypes} from './CreatePrinter'
import EditPrinter from './EditPrinter'

export default function PrinterListings() {
  const {setTitle, establishmentId} = useUserContext()
  const [csv, setCsv] = useState(false)
  useEffect(() => {
    setTitle('Printers')
  }, [])

  const [printer, setPrinter] = useState<IPrinterList[]>([])
  const [bulkLoading, setBulkLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await PrinterServices.index(
      {establishment_id: establishmentId},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setPrinter(res.data.data)
      console.log('asdasd', res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData({pagination})
  }, [establishmentId])

  const handleTableChange: any = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IPrinterList>
  ) => {
    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }
  const printerLoader: any = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  const columns: ColumnsType<IPrinterList> = [
    {
      className: 'first-col',
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '200px',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Printer IP',
      dataIndex: 'ip',
      width: '150px',
      // render: (name)=> <SkeletonTableCell loading={loading} value={name}/>,
      sorter: (a, b) => a.ip.localeCompare(b.ip),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type) => (
        <SkeletonTableCell
          loading={loading}
          value={printerTypes.find((printerType) => printerType.id === type)?.name}
        />
      ),
      sorter: (a, b) => a.type.toString().localeCompare(b.type.toString()),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <SkeletonTableCell loading={loading} value={status == 10 ? 'Active' : 'In Active'} />
      ),
      filters: [
        {text: 'Active', value: 10},
        {text: 'InActive', value: 20},
      ],
      sorter: (a, b) => (a?.status && b?.status ? a?.status - b?.status : 0),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
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
              moduleId={BACKEND_CONSTANTS.MODULES.PRINTER}
              permissionName={'pivot_update'}
            >
              {/*<Link to={`/edit-printer/${record.id}`} className={"table-icon edit"}><BiEditAlt/></Link>*/}
              <a
                onClick={() => {
                  editPrinterHandler(record.id)
                }}
                className={'table-icon edit'}
              >
                <BiEditAlt />
              </a>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.PRINTER}
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
    await PrinterServices.destroy(key)
    fetchData({pagination})
  }
  const openCsv = () => {
    setCsv(!csv)
  }
  const uploadPrinters = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('printers', file)
    formData.append('establishment_id', JSON.stringify(establishmentId))

    const res = await PrinterServices.uploadBulkPrinters(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  //offcanvas
  const [printerOffcanvas, setPrinterOffcanvas] = useState(false)
  const [editPrinterOffcanvas, setEditPrinterOffcanvas] = useState(false)
  const [editPrinterId, setEditPrinterId] = useState<number>(0)
  const openCreatePrinter = () => {
    setPrinterOffcanvas(true)
  }
  const editPrinterHandler = (id: number) => {
    setEditPrinterOffcanvas(!editPrinterOffcanvas)
    setEditPrinterId(id)
    console.log(id, 'printer id ')
    console.log(typeof id, 'printer id type ')
  }

  return (
    <>
      <ViewCard>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            {/*<ThemeButton className={"create-listing-btn"} route={"/create-printer"} text={"Create Printers"} prefixIcon={<MdAdd/>} id={BACKEND_CONSTANTS.MODULES.PRINTER}/>*/}
            <ThemeButton
              className={'create-listing-btn'}
              onClick={() => openCreatePrinter()}
              text={'Create Printers'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.PRINTER}
            />
            {/* <button onClick={openCsv} className={'excel-btn btn ms-2'}>
              {ExcelIcon} Import CSV
            </button> */}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              loading={loading}
              dataSource={printer}
              pagination={pagination}
              onChange={handleTableChange}
              scroll={{x: 'calc(600px + 50%)'}}
            />
          </Col>
        </Row>
        <DashboardOffCanvas
          state={csv}
          setActive={setCsv}
          children={<ImportCsv uploadCsv={uploadPrinters} loading={bulkLoading} />}
          heading={'Import CSV'}
          reloadTable={() => fetchData({pagination})}
        />
        <DashboardOffCanvas
          state={printerOffcanvas}
          setActive={setPrinterOffcanvas}
          children={<CreatePrinter reloadTable={() => fetchData({pagination})} />}
          heading={'Create Printers'}
          reloadTable={() => fetchData({pagination})}
        />
        <DashboardOffCanvas
          state={editPrinterOffcanvas}
          setActive={setEditPrinterOffcanvas}
          children={
            <EditPrinter
              id={editPrinterId}
              reloadTable={() => fetchData({pagination})}
              handleClose={() => setEditPrinterOffcanvas(false)}
            />
          }
          heading={'Edit Printer'}
          reloadTable={() => fetchData({pagination})}
        />
      </ViewCard>
    </>
  )
}
