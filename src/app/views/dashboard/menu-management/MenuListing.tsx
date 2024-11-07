import React, {useEffect, useState} from 'react'
import {useUserContext} from '../../../providers/UserProvider'
import {IMenu} from '../../../interfaces/IMenu'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IUser} from '../../../interfaces/IUser'
import {BiEditAlt} from 'react-icons/bi'
import {Popconfirm, Table, Tabs, Tag} from 'antd'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom'
import {BsEye, BsPlusSquareDotted} from 'react-icons/bs'
import '../../../../assets/css/views/dashboard/create-category.scss'
import {MenuServices} from '../../../services/api-services/menu-services'
import {IAPIResponse} from '../../../interfaces/ICommon'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import CreateCategory from './category/CreateCategory'
import ViewCard from '../../../components/dashboard/ViewCard'
import EditCategory from './category/EditCategory'
import DashboardOffCanvas from '../../../components/dashboard/DashboardOffCanvas'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {SkeletonTableCell} from '../../../components/Skeleton'
import {ExcelIcon} from '../../../../assets/images/icons/menu-icons/performances'
import ImportCsv from './ImportCsv'
import {toast} from 'react-toastify'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'

export default function MenuListing() {
  const navigate = useNavigate()
  const {setTitle, establishmentId} = useUserContext()
  const [bulkLoading, setBulkLoading] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Menus')
  }, [])

  const [menu, setMenu] = useState<IMenu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const [category, setCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(false)
  const [csv, setCsv] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<number | null>(null)

  function categoryHandler(id: number | null) {
    setCategory(!category)
    if (id == 0) {
      setCategoryId(null)
    } else {
      setCategoryId(id)
    }
  }

  const editCategoryHandler = (id: number) => {
    setEditCategory(!editCategory)
    setEditCategoryId(id)
  }

  const appendSubcategoriesAsChildren = (categories: IMenu[]) => {
    /*
     * This will replace subCategories key with children also the same with products key with children inside subcategories
     * */
    for (const category of categories) {
      if (category?.subCategories) {
        category.children = category?.subCategories
        for (const subCategory of category?.subCategories) {
          if (subCategory?.products) {
            subCategory.children = subCategory?.products
            subCategory?.children?.unshift({name: 'Add Product', type: 10, id: subCategory.id})
          }
          delete subCategory.products
        }
        category?.children?.unshift({name: 'Add SubCategory', type: 20, id: category.id})
      }
      delete category.subCategories
    }
    categories.unshift({
      created_ago: '',
      created_at: '',
      created_by: {full_name: '', id: 0, meta: undefined},
      created_by_id: 0,
      deleted_at: '',
      establishment_id: 0,
      id: 0,
      is_category: false,
      is_product: false,
      is_subcategory: false,
      meta: {products_count: 0, subCategories_count: 0},
      status: 0,
      status_text: '',
      updated_at: '',
      updated_by: {full_name: '', id: 0, meta: null},
      updated_by_id: null,
      name: 'Add Category',
      type: 20,
    })
    return categories
  }

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res: IAPIResponse<IMenu[]> = await MenuServices.getAllCategories(
      null,
      {establishment_id: establishmentId, relation: 'all'},
      false,
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setLoading(false)
      setMenu(appendSubcategoriesAsChildren(res.data))
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
  const handleProductDelete = async (key: number) => {
    /*todo: call delete api here*/
    // await MenuServices.deleteCategory(key)
    await MenuServices.deleteProduct(key)
    fetchData({pagination})
  }
  const handleCategoryDelete = async (key: number) => {
    /*todo: call delete api here*/
    await MenuServices.deleteCategory(key)
    fetchData({pagination})
  }

  const columns: ColumnsType<IMenu> = [
    {
      className: 'first-col',
      title: 'Menu',
      dataIndex: 'name',
      render: (name, row) =>
        row?.type ? (
          row?.type == 10 ? (
            <span className={'table-add-btn'} onClick={() => navigate(`/create-product/${row.id}`)}>
              <BsPlusSquareDotted /> {row.name}
            </span>
          ) : (
            <span className={'table-add-btn'} onClick={() => categoryHandler(row.id)}>
              <BsPlusSquareDotted /> {row.name}
            </span>
          )
        ) : (
          name
        ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '550px',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id, row) => !row?.type && <SkeletonTableCell loading={loading} value={id} />,
      // render: (name)=> <SkeletonTableCell loading={loading} value={name}/>,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Items',
      dataIndex: 'meta',
      render: (meta, row) =>
        !row?.type && (!row?.parent_id ? meta?.subCategories_count : meta?.products_count),
      sorter: (a, b) =>
        a.meta?.products_count
          ? a.meta?.products_count - b.meta?.products_count
          : a.meta?.subCategories_count - b.meta?.subCategories_count,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (created_at, row) => !row?.type && convertTimeZone(created_at).formatted,
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      render: (created_by, row) => !row?.type && created_by?.full_name,
      sorter: (a, b) =>
        a?.created_by ? a?.created_by?.full_name?.localeCompare(b?.created_by?.full_name || '') : 0,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Updated By',
      dataIndex: 'updated_by',
      render: (updated_by, row) => !row?.type && (updated_by?.full_name || '-'),
      width: '150px',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      render: (status_text, row) => {
        return (
          !row?.type &&
          (row.status === 10 ? (
            <Tag color={'green'}>{status_text}</Tag>
          ) : (
            <Tag color={'red'}>{status_text}</Tag>
          ))
        )
      },
      sorter: (a, b) => (a?.status_text ? a?.status_text?.localeCompare(b?.status_text || '') : 0),
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'right',
      width: '150px',
      fixed: 'right',
      className: 'actions',
      render: (text, record, index) => {
        return (
          !record?.type && (
            <>
              {record.is_product && (
                <PermissionIcons
                  moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                  permissionName={'pivot_read'}
                >
                  <Link to={`/single-product/${record.id}`} className={'table-icon edit'}>
                    <BsEye />
                  </Link>
                </PermissionIcons>
              )}
              {/*{record.is_product && <a title={"Add New Product"} onClick={()=>navigate(`/single-product/${record.id}`)} className={"table-icon edit"}><BsEye/></a>}*/}
              {/*{record.is_subcategory && <a title={"Add New Product"} onClick={()=>handleAdd(record.id)} className={"table-icon edit"}><AiOutlinePlusCircle/></a>}*/}
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <a
                  onClick={() => {
                    record.is_product
                      ? navigate(`/edit-product/${record.id}`)
                      : editCategoryHandler(record.id)
                  }}
                  className={'table-icon edit'}
                >
                  <BiEditAlt />
                </a>
              </PermissionIcons>

              {/*<a onClick={()=>{*/}
              {/*    record.is_product ? navigate(`/edit-product/${record.id}`) :*/}
              {/*        editCategoryHandler(record.id)*/}

              {/*}} className={"table-icon edit"}><BiEditAlt/></a>*/}
              <PermissionIcons
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_delete'}
              >
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => {
                    record.is_product
                      ? handleProductDelete(record.id)
                      : handleCategoryDelete(record.id)
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

  const handleAdd = (id: any) => {
    navigate(`/create-product/${id}`)
  }

  const uploadCategories = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('categories', file)
    formData.append('establishment_id', JSON.stringify(establishmentId))

    const res = await MenuServices.uploadBulkCategories(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  const uploadProducts = async (file: File) => {
    setBulkLoading(true)
    const formData = new FormData()
    formData.append('products', file)
    formData.append('establishment_id', JSON.stringify(establishmentId))

    const res = await MenuServices.uploadBulkProducts(formData)
    if (res.status) {
      toast.success(res.message)
      fetchData({pagination})
      setCsv(false)
    }
    setBulkLoading(false)
  }

  const openCsv = () => {
    setCsv(!csv)
  }

  return (
    <div className={'menu-listing'}>
      <ViewCard>
        <div>
          <button onClick={openCsv} className={'excel-btn btn mb-2'}>
            {ExcelIcon} Import CSV
          </button>
          <a
            href={require('../../../../assets/files/sample-product.csv')}
            download="sample-menu"
            className="sample-csv"
          >
            Download Sample
          </a>
        </div>

        <Table
          className={'main-table'}
          columns={columns}
          rowKey={(record) => record.id + record.name}
          dataSource={menu}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{x: 'calc(600px + 50%)'}}
        />
        <DashboardOffCanvas
          state={category}
          setActive={setCategory}
          children={
            <CreateCategory
              setActive={setCategory}
              id={categoryId}
              reloadTable={() => fetchData({pagination})}
            />
          }
          heading={'Create Category'}
          reloadTable={() => fetchData({pagination})}
        />
        {/*<div>*/}
        {/*    {editCategoryId > 0 && <ThemeModal*/}
        {/*        setActive={setEditCategory}*/}
        {/*        active={editCategory}*/}
        {/*        children={<EditCategory id={editCategoryId}/>}*/}
        {/*        formId={"edit-category"}*/}
        {/*        title={"Edit Category"}*/}
        {/*        reloadTable={()=>fetchData({ pagination })}*/}
        {/*    />}*/}
        {/*</div>*/}
        <div>
          {editCategoryId > 0 && (
            <DashboardOffCanvas
              state={editCategory}
              setActive={setEditCategory}
              children={
                <EditCategory
                  setActive={setEditCategory}
                  id={editCategoryId}
                  reloadTable={() => fetchData({pagination})}
                />
              }
              heading={'Edit Category'}
              reloadTable={() => fetchData({pagination})}
            />
          )}
          <DashboardOffCanvas
            state={csv}
            setActive={setCsv}
            children={
              <>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Import Products" key="2">
                    <ImportCsv uploadCsv={uploadProducts} loading={bulkLoading} />
                  </Tabs.TabPane>
                </Tabs>
              </>
            }
            heading={'Import CSV'}
            reloadTable={() => fetchData({pagination})}
          />
        </div>
      </ViewCard>
    </div>
  )
}
