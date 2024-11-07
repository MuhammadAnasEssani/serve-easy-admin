import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {Table} from 'antd'
import {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import {BACKEND_CONSTANTS, GENERIC, PAGINATION} from '../../../config/constants'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import {Link} from 'react-router-dom'
import {BsEye} from 'react-icons/bs'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IGetEstablishment} from '../../../interfaces/IGetEstablishment'
import {useUserContext} from '../../../providers/UserProvider'
import {DealComboServices} from '../../../services/api-services/deal-combo.services'
import {IDealComboFilters, IDealComboListing} from '../../../interfaces/IDealsCombo'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {BiEditAlt} from 'react-icons/bi'
import {PermissionIcons} from '../../../components/dashboard/PermissionIcons'
import {MdAdd} from 'react-icons/md'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {FaFilter} from 'react-icons/fa'
import ComboListingFilters from './ComboListingFilters'
import ThemeModal from '../../../components/Modal'
import '../../../../assets/css/views/dashboard/deals-combo-listing.scss'
import ViewCard from '../../../components/dashboard/ViewCard'

export default function ComboListing() {
  const {setTitle, establishmentId, currencySymbol} = useUserContext()
  const [combos, setCombos] = useState<IDealComboListing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filterLoading, setFilterLoading] = useState<boolean>(false)
  const [filterPopup, setFilterPopup] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })
  useEffect(() => {
    setTitle('Deals / Combo')
  }, [])
  const types = [
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL,
      name: 'Deal',
    },
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO,
      name: 'Combo',
    },
  ]

  const status = [
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.STATUS.ACTIVE,
      name: 'Active',
    },
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.STATUS.INACTIVE,
      name: 'Inactive',
    },
  ]

  const fetchData = async (params: IDatatableParams = {}, data?: IDealComboFilters) => {
    setLoading(true)
    const defaultQueryParams = {
      establishment_id: establishmentId,
      // type: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO
    }
    const res = await DealComboServices.index(
      {...defaultQueryParams, ...data},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setCombos(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
    setLoading(false)
    setFilterLoading(false)
  }

  const columns: ColumnsType<IDealComboListing> = [
    {
      className: 'first-col',
      title: 'Combo Id',
      dataIndex: 'id',
      render: (id) => <SkeletonTableCell loading={loading} value={id} />,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      className: 'first-col',
      title: 'Combo Name',
      dataIndex: 'name',
      render: (name) => <SkeletonTableCell loading={loading} value={name} />,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      width: '200px',
    },
    {
      title: 'No.of items',
      dataIndex: 'meta',
      render: (meta) => (
        <SkeletonTableCell loading={loading} value={meta?.deal_combo_items_count} />
      ),
      sorter: (a, b) => a.meta?.deal_combo_items_count - b.meta?.deal_combo_items_count,
      sortDirections: ['descend', 'ascend'],
      width: '180px',
    },
    {
      title: 'Status',
      dataIndex: 'status_text',
      render: (status_text) => <SkeletonTableCell loading={loading} value={status_text} />,
      sorter: (a, b) => (a?.status_text ? a?.status_text?.localeCompare(b?.status_text || '') : 0),
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      render: (created_by) => <SkeletonTableCell loading={loading} value={created_by?.full_name} />,
      sorter: (a, b) =>
        a?.created_by ? a?.created_by?.full_name?.localeCompare(b?.created_by?.full_name || '') : 0,
      sortDirections: ['descend', 'ascend'],
      width: '150px',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      render: (created_at) => (
        <SkeletonTableCell loading={loading} value={convertTimeZone(created_at).formatted} />
      ),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
    },

    {
      title: 'Amount',
      dataIndex: 'total_sale_price',
      render: (total_sale_price) => (
        <SkeletonTableCell loading={loading} value={`${currencySymbol}${total_sale_price}`} />
      ),
      sorter: (a, b) => a.total_sale_price - b.total_sale_price,
      sortDirections: ['descend', 'ascend'],
      width: '100px',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      width: '100px',
      className: 'actions actions-btns',
      fixed: 'right',
      render: (text, record, index) => {
        return loading ? (
          <SkeletonTableActionBtn />
        ) : (
          <>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
              permissionName={'pivot_read'}
            >
              <Link to={`/deals-combo-detail/${record.id}`} className={'table-icon edit'}>
                <BsEye />
              </Link>
            </PermissionIcons>
            <PermissionIcons
              moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
              permissionName={'pivot_update'}
            >
              <Link to={`/edit-deals-combo/${record.id}`} className={'table-icon edit'}>
                <BiEditAlt />
              </Link>
            </PermissionIcons>
          </>
        )
      },
    },
  ]

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

  useEffect(() => {
    fetchData({pagination})
  }, [establishmentId])

  // const {
  //     handleSubmit,
  //     setValue,
  //     formState: { errors },
  //     control
  // } = useForm<IDealComboFilters>({
  //     mode: "onChange",
  // });

  const methods = useForm<IDealComboFilters>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  /*
   * On Filter Submission
   * */
  const onSubmit = async (data: IDealComboFilters) => {
    console.log(data, 'data here...')
    setFilterLoading(true)
    fetchData({pagination}, data)
  }

  const filterModal = () => {
    setFilterPopup(true)
  }

  return (
    <ViewCard>
      <div className={'deals-listings'}>
        <Row>
          <Col md={12} className={'d-flex align-items-center mb-3'}>
            <ThemeButton
              className={'create-listing-btn'}
              route={'/create-deals-combo'}
              text={'Create Deals/Combo'}
              prefixIcon={<MdAdd />}
              id={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
            />
          </Col>
        </Row>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row>
              <div className={'d-block d-md-none'}>
                <div className={'filter-sec'}>
                  <ThemeButton
                    onClick={() => {
                      filterModal()
                    }}
                    className={'filter-popup-btn'}
                    text={'Apply Filter'}
                    type={'submit'}
                    suffixIcon={<FaFilter />}
                  />
                </div>
              </div>
              <div className={'d-none d-md-block'}>
                <ComboListingFilters loading={filterLoading} />
              </div>
            </Row>
            <Row>
              <Col md={12}>
                <Table
                  columns={columns}
                  rowKey={(record) => record.id}
                  dataSource={combos}
                  loading={loading}
                  pagination={pagination}
                  onChange={handleTableChange}
                  scroll={{x: 'calc(600px + 50%)'}}
                />
              </Col>
            </Row>
            <ThemeModal
              title={'Filters'}
              active={filterPopup}
              setActive={setFilterPopup}
              children={<ComboListingFilters loading={filterLoading} />}
            />
          </Form>
        </FormProvider>
      </div>
    </ViewCard>
  )
}
