import {Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import type {FilterValue, SorterResult} from 'antd/lib/table/interface'
import React, {useEffect, useState} from 'react'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {BiEditAlt} from 'react-icons/bi'
import '../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Col, Container, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import ViewCard from '../../../components/dashboard/ViewCard'
import {RestaurantService} from '../../../services/api-services/restaurant.service'
import {IRestaurantListing} from '../../../interfaces/IRestaurant'
import {BsEye} from 'react-icons/bs'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {MdAdd} from 'react-icons/md'

export default function RestaurantListing() {
  const {setTitle, user} = useUserContext()
  useEffect(() => {
    setTitle('Restaurants')
  }, [])

  const [restaurants, setRestaurants] = useState<IRestaurantListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchData = async (params: IDatatableParams = {}) => {
    setLoading(true)
    const res = await RestaurantService.index(
      {},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    // console.log(res)
    if (res.status) {
      setLoading(false)
      setRestaurants(res.data.data)
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
    sorter: SorterResult<IRestaurantListing>
  ) => {
    fetchData({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }

  const columns: ColumnsType<IRestaurantListing> = [
    {
      className: 'first-col',
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
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
      width: '20%',
    },
    {
      title: 'Subscription',
      dataIndex: 'plan',
      render: (plan) => <SkeletonTableCell loading={loading} value={plan.name} />,
      sorter: (a, b) => a.plan.name.localeCompare(b.plan.name),
      sortDirections: ['descend', 'ascend'],
      width: '30%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '10%',
      className: 'actions-btns',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/restaurant-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-restaurant/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>

            {/*{*/}
            {/*    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>*/}
            {/*        <a className={"table-icon delete"}><RiDeleteBin4Line/></a>*/}
            {/*    </Popconfirm>*/}
            {/*}*/}
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
              route={'/create-restaurant'}
              text={'Create Restaurant'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={restaurants}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </ViewCard>
  )
}
