import React, {useEffect, useState} from 'react'
import '../../../assets/css/components/dashboard/themetable.scss'
import {IMenu} from '../../interfaces/IMenu'
import {Popconfirm, Table} from 'antd'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin4Line} from 'react-icons/ri'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IUser} from '../../interfaces/IUser'
import {IDatatableParams} from '../../interfaces/IDatatable'
import {PAGINATION} from '../../config/constants'
import TextInput from '../authentication/TextInput'
import ThemeBtn from '../authentication/ThemeBtn'
import MenuProductComponent from './MenuProductComponent'

export default function MenuSubCategoryComponent({id}: {id: number}) {
  const [subCategories, setSubCategories] = useState<IMenu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const columns: ColumnsType<IMenu> = [
    {
      title: 'Menu',
      dataIndex: 'name',
      width: '20%',
      className: 'subcategory-name',
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
            {/*<a onClick={handleAdd} className={"table-icon edit"}><AiOutlinePlusCircle/></a>*/}
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

  const handleAdd = () => {
    // const newData: IMenu = {
    //     id: subCategories.length+1,
    //     name: "",
    //     status: 10,
    //     parent_id: id
    // };
    // setSubCategories([...subCategories, newData]);
  }

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

    const defaultSubCategoryData: IMenu[] = [
      // {
      //     id: 1,
      //     name: "Chicken",
      //     status: 10,
      //     parent_id: 1
      // },
      // {
      //     id: 2,
      //     name: "Beef",
      //     status: 10,
      //     parent_id: 1
      // }
    ]

    setTimeout(function () {
      setSubCategories(defaultSubCategoryData)
    }, 1000)
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
      <div className={'subCategoryWrapper'}>
        {/*<p className={"subcat-title"}>+ Add New Sub Category</p>*/}
        {/*<Col md={12} className={"d-flex align-items-center mb-3"}>*/}
        {/*    <Button className={"create-btn"} variant="primary">*/}
        {/*        <a onClick={()=>handleAdd()}>Create Sub Category <BsArrowRight/></a>*/}
        {/*    </Button>*/}
        {/*</Col>*/}
        <form action="" className={'d-none'}>
          <div className={'add-sub-category-form'}>
            <div className={'add-subcategory-fields'}>
              <div className={'dfields'}>
                <TextInput
                  variant={'field-white'}
                  label={'Sub Category Name'}
                  labelColor={'dark'}
                  labelPos={'out'}
                  type={'text'}
                />
              </div>
              <div className={'dfields'}>
                <TextInput
                  variant={'field-white'}
                  label={'Parent'}
                  labelColor={'dark'}
                  labelPos={'out'}
                  type={'text'}
                />
              </div>
            </div>
            <div>
              <ThemeBtn text={'Create'} type={'submit'} />
            </div>
          </div>
        </form>
      </div>
      <Table
        className={'subcategory-table'}
        showHeader={false}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={subCategories}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        expandable={{
          // expandedRowRender: record => record.permissions.map(row => <p style={{ margin: 0 }}>{row.name}</p>),
          expandedRowRender: (record) => <MenuProductComponent id={record.id} />,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
      />
    </div>
  )
}
