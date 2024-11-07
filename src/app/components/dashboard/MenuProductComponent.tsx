import React, {useEffect, useState} from 'react'
import '../../../assets/css/components/dashboard/themetable.scss'
import {IProductTableColumns} from '../../interfaces/IMenu'
import {Popconfirm, Table} from 'antd'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IUser} from '../../interfaces/IUser'
import {IDatatableParams} from '../../interfaces/IDatatable'
import {PAGINATION} from '../../config/constants'

export default function MenuSubCategoryComponent({id}: {id: number}) {
  const defaultSubCategoryData: IProductTableColumns[] = [
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 1,
      name: 'Zinger Burger',
      status: 10,
      category_id: 1,
    },
    {
      id: 2,
      name: 'Double Patty Burger',
      status: 10,
      category_id: 1,
    },
  ]
  const [subCategories, setSubCategories] = useState<IProductTableColumns[]>(defaultSubCategoryData)
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const columns: ColumnsType<IProductTableColumns> = [
    {
      title: 'Menu',
      dataIndex: 'name',
      width: '23%',
      className: 'product-name',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '5%',
      render: (text, record, index) => {
        return (
          <>
            <a className={'table-icon edit'}>
              <BiEditAlt />
            </a>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <a className={'table-icon delete'}>
                <RiDeleteBin4Line />
              </a>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(false)
    // const res = await RoleServices.index(null,params.pagination?.pageSize, params.pagination?.current)
    // console.log(res)
    // if(res.status){
    //     setLoading(false);
    //     setRole(res.data.data)
    //     setPagination({
    //         ...params.pagination,
    //         total: res.data.meta.total,
    //     });
    // }
  }

  const handleDelete = async (key: number) => {
    /*todo: call delete api here*/
    // await RoleServices.destroy(key)
    // fetchData({ pagination });
  }

  useEffect(() => {
    fetchData({pagination})
  }, [])

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

  return (
    <div>
      {/*<div className={"CategoryWrapper"}>*/}
      {/*    <p className={"subcat-title"}>+ Add New Sub Category</p>*/}
      {/*    <form action="">*/}
      {/*        <div className={"add-sub-category-form"}>*/}
      {/*            <div className={"add-subcategory-fields"}>*/}
      {/*                <div className={"dfields"}>*/}
      {/*                    <TextInput variant={"field-white"} label={"Sub Category Name"} labelColor={"dark"} labelPos={"out"} type={"text"}/>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*            <div>*/}
      {/*                <ThemeBtn text={"Create"} type={"submit"}/>*/}
      {/*            </div>*/}

      {/*        </div>*/}
      {/*    </form>*/}
      {/*</div>*/}
      <Table
        className={'product-table'}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={subCategories}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}
