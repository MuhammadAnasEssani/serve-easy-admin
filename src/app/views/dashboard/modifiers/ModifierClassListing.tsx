import {Popconfirm, Table, Tabs} from 'antd'
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
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {IModifierClassList} from '../../../interfaces/IModifiers'
import {ModifierClassServices} from '../../../services/api-services/modifer-class-services'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useNavigate} from 'react-router-dom'
import {ModifierServices} from '../../../services/api-services/modifer-services'
import {BsPlusSquareDotted} from 'react-icons/bs'
import {ExcelIcon} from '../../../../assets/images/icons/menu-icons/performances'
import ImportCsv from '../menu-management/ImportCsv'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import {toast} from 'react-toastify'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import CreateModifierClass from './CreateModifierClass'
import EditModifierClass from './EditModifierClass'
import EditModifier from './EditModifier'
import CreateModifier from './CreateModifier'

export default function ModifierClassListing() {
  const {setTitle, establishmentId} = useUserContext()
  const navigate = useNavigate()
  useEffect(() => {
    setTitle('Modifiers')
  }, [])

  const [modifierClasses, setModifierClasses] = useState<IModifierClassList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [bulkLoading, setBulkLoading] = useState<boolean>(false)
  const [csv, setCsv] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const appendModifiersAsChildren = (modifierClasses: IModifierClassList[]) => {
    for (const modifierClass of modifierClasses) {
      if (modifierClass?.modifiers) {
        if (modifierClass?.modifiers?.length > 0) {
          modifierClass.children = modifierClass?.modifiers
          modifierClass.children?.unshift({name: 'Add Modifier', type: 20, id: modifierClass.id})
        } else {
          modifierClass.children = []
          modifierClass.children?.unshift({name: 'Add Modifier', type: 20, id: modifierClass.id})
        }
      }
      delete modifierClass.modifiers
    }
    modifierClasses.unshift({
      created_ago: '',
      created_at: '',
      created_by_id: 0,
      deleted_at: '',
      establishment_id: 0,
      id: 0,
      max_amount: 0,
      meta: '',
      min_amount: 0,
      status: 0,
      updated_at: '',
      updated_by_id: 0,
      name: 'Add Modifier Class',
      type: 10,
    })
    return modifierClasses
  }

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await ModifierClassServices.index(
      params.pagination?.pageSize,
      params.pagination?.current,
      true,
      {establishment_id: establishmentId}
    )

    if (res.status) {
      setLoading(false)
      setModifierClasses(appendModifiersAsChildren(res.data.data))
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

  const columns: ColumnsType<IModifierClassList> = [
    {
      className: 'first-col',
      title: 'Name',
      dataIndex: 'name',
      render: (name, row) =>
        row?.type ? (
          row?.type == 10 ? (
            // <span className={"table-add-btn"} onClick={()=>navigate(`/add-modifier-class`)}><BsPlusSquareDotted/> {row.name}</span>
            <span className={'table-add-btn'} onClick={() => openCreateModifierClass()}>
              <BsPlusSquareDotted /> {row.name}
            </span>
          ) : (
            // <span className={"table-add-btn"} onClick={()=>navigate(`/add-modifier/${row.id}`)} ><BsPlusSquareDotted/> {row.name}</span>)
            <span className={'table-add-btn'} onClick={() => openCreateModifier(row.id)}>
              <BsPlusSquareDotted /> {row.name}
            </span>
          )
        ) : (
          <SkeletonTableCell loading={loading} value={name} />
        ),
      // render: (name)=> <SkeletonTableCell loading={loading} value={name}/>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '300px',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id, row) => !row?.type && <SkeletonTableCell loading={loading} value={id} />,
      // render: (name)=> <SkeletonTableCell loading={loading} value={name}/>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Items',
      dataIndex: 'meta',
      render: (meta, row) =>
        !row?.type && <SkeletonTableCell loading={loading} value={meta?.modifiers_count} />,
      sorter: (a, b) => a.meta?.modifiers_count - b.meta?.modifiers_count,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status, row) =>
        !row?.type && (
          <SkeletonTableCell loading={loading} value={status == 10 ? 'Active' : 'In Active'} />
        ),
      filters: [
        {text: 'Active', value: 10},
        {text: 'InActive', value: 20},
      ],
      onFilter: (value, record) => record.status.toString().indexOf(value.toString()) === 0,
      sorter: (a, b) => (a?.status && b?.status ? a?.status - b?.status : 0),
      sortDirections: ['descend', 'ascend'],
      width: '120px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      className: 'actions actions-btns',
      fixed: 'right',
      width: '80px',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          !record?.type && (
            <>
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_update'}
              >
                <a
                  onClick={() => {
                    record.modifier_class_id
                      ? // navigate(`/edit-modifier/${record.id}`)
                        editModifierHandler(record.id)
                      : // navigate(`/edit-modifier-class/${record.id}`)
                        editModifierClassHandler(record.id)
                  }}
                  className={'table-icon edit'}
                >
                  <BiEditAlt />
                </a>
              </PermissionIcons>
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_delete'}
              >
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => {
                    record.modifier_class_id
                      ? handleModifierDelete(record.id)
                      : handleModifierClassDelete(record.id)
                  }}
                >
                  <a className={'table-icon delete'}>
                    <RiDeleteBin4Line />
                  </a>
                </Popconfirm>
              </PermissionIcons>
            </>
          )
        )
      },
    },
  ]

  const handleModifierClassDelete = async (key: number) => {
    /*todo: call delete api here*/
    await ModifierClassServices.destroy(key)
    fetchData({pagination})
  }
  const handleModifierDelete = async (key: number) => {
    /*todo: call delete api here*/
    await ModifierServices.destroy(key)
    fetchData({pagination})
  }

  const openCsv = () => {
    setCsv(!csv)
  }

  const uploadModifierClasses = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('modifier_classes', file)
    formData.append('establishment_id', JSON.stringify(establishmentId))

    const res = await ModifierClassServices.uploadBulkModifierClasses(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  const uploadModifier = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('modifiers', file)
    formData.append('establishment_id', JSON.stringify(establishmentId))

    const res = await ModifierServices.uploadBulkModifiers(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  //Offcanvas Modifier Class
  const [modifierClassOffcanvas, setModifierClassOffcanvas] = useState(false)
  const [editModifierClassOffcanvas, setEditModifierClassOffcanvas] = useState(false)
  const [editModifierClassId, setEditModifierClassId] = useState<number>(0)
  const openCreateModifierClass = () => {
    setModifierClassOffcanvas(true)
  }
  const editModifierClassHandler = (id: number) => {
    setEditModifierClassOffcanvas(!editModifierClassOffcanvas)
    setEditModifierClassId(id)
  }

  //Offcanvas Modifier
  const [modifierOffcanvas, setModifierOffcanvas] = useState(false)
  const [editModifierOffcanvas, setEditModifierOffcanvas] = useState(false)
  const [editModifierId, setEditModifierId] = useState<number>(0)
  const openCreateModifier = (id: number) => {
    setModifierOffcanvas(true)
    setEditModifierId(id)
  }
  const editModifierHandler = (id: number) => {
    setEditModifierOffcanvas(!editModifierOffcanvas)
    setEditModifierId(id)
  }

  return (
    <ViewCard>
      <div>
        <button onClick={openCsv} className={'excel-btn btn mb-2'}>
          {ExcelIcon} Import CSV
        </button>
        <a
          href={require('../../../../assets/files/sample-modifier-classes.csv')}
          download="sample-modifier-classes"
          className="sample-csv"
        >
          Download Sample
        </a>
      </div>
      <div className={'establishment-listing'}>
        <Table
          columns={columns}
          rowKey={(record) => record.id + record.name}
          loading={loading}
          dataSource={modifierClasses}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
      </div>
      <DashboardOffCanvas
        state={csv}
        setActive={setCsv}
        children={
          <>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Import Modifiers" key="1">
                <ImportCsv uploadCsv={uploadModifierClasses} loading={bulkLoading} />
              </Tabs.TabPane>
            </Tabs>
          </>
        }
        heading={'Import CSV'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={modifierClassOffcanvas}
        setActive={setModifierClassOffcanvas}
        children={<CreateModifierClass reloadTable={() => fetchData({pagination})} />}
        heading={'Create Modifier Class'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={editModifierClassOffcanvas}
        setActive={setEditModifierClassOffcanvas}
        children={
          <EditModifierClass
            id={editModifierClassId}
            reloadTable={() => fetchData({pagination})}
            handleClose={() => setEditModifierClassOffcanvas(false)}
          />
        }
        heading={'Edit Modifier Class'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={modifierOffcanvas}
        setActive={setModifierOffcanvas}
        children={
          <CreateModifier id={editModifierId} reloadTable={() => fetchData({pagination})} />
        }
        heading={'Create Modifier'}
        reloadTable={() => fetchData({pagination})}
      />
      <DashboardOffCanvas
        state={editModifierOffcanvas}
        setActive={setEditModifierOffcanvas}
        children={
          <EditModifier
            id={editModifierId}
            reloadTable={() => fetchData({pagination})}
            handleClose={() => setEditModifierOffcanvas(false)}
          />
        }
        heading={'Edit Modifier'}
        reloadTable={() => fetchData({pagination})}
      />
    </ViewCard>
  )
}
