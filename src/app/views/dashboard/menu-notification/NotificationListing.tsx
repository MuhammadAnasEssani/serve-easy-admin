import {Table} from 'antd'
import type {ColumnsType, TablePaginationConfig} from 'antd/lib/table'
import React, {useEffect, useState} from 'react'
import {useUserContext} from '../../../providers/UserProvider'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import '../../../../assets/css/views/dashboard/establishment-listings.scss'
import {Col, Row} from 'react-bootstrap'
import {SkeletonTableActionBtn, SkeletonTableCell} from '../../../components/Skeleton'
import ViewCard from '../../../components/dashboard/ViewCard'
import {INotificationList} from '../../../interfaces/INotification'
import {NotificationService} from '../../../services/api-services/notification.service'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {useNavigate} from 'react-router-dom'
import {AiOutlineEye} from 'react-icons/ai'
import {FilterValue, SorterResult} from 'antd/lib/table/interface'
import {IPrinterList} from '../../../interfaces/IPrinter'

export default function NotificationListing() {
  const {setTitle, user, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('Notifications')
  }, [])
  const navigator = useNavigate()
  const [notList, setNotList] = useState<INotificationList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATION.perPage,
    showSizeChanger: true,
    defaultPageSize: PAGINATION.perPage,
  })

  const fetchNotification = async (params: IDatatableParams = {}) => {
    const res = await NotificationService.index(
      {establishment_id: establishmentId},
      params.pagination?.pageSize,
      params.pagination?.current
    )
    if (res.status) {
      setNotList(res.data.data)
      setPagination({
        ...params.pagination,
        total: res.data.meta.total,
      })
    }
  }

  const navigationSwitch = async (notification: INotificationList) => {
    const {type, read_at, ref_id, id} = notification
    if (!read_at) {
      const res = await NotificationService.readNotification(id)
      if (res.status) {
        //todo: update unreadCount
        fetchNotification()
      }
    }
    switch (type) {
      case BACKEND_CONSTANTS.NOTIFICATION_TYPE.MENU_MANAGEMENT:
        navigator('/menu')
        break
      case BACKEND_CONSTANTS.NOTIFICATION_TYPE.MODIFIERS:
        navigator('/modifiers')
        break
    }
  }

  useEffect(() => {
    fetchNotification({pagination})
  }, [])

  const handleTableChange: any = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IPrinterList>
  ) => {
    fetchNotification({
      sortField: sorter.field as string,
      sortOrder: sorter.order as string,
      pagination: newPagination,
      ...filters,
    })
  }

  const columns: ColumnsType<INotificationList> = [
    {
      className: 'first-col',
      title: 'Notification',
      dataIndex: 'title',
      width: '200px',
      render: (title) => <SkeletonTableCell loading={loading} value={title} />,
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['descend', 'ascend'],
    },
    {
      className: 'first-col',
      title: 'Details',
      dataIndex: 'message',
      width: '300px',
      render: (message) => <SkeletonTableCell loading={loading} value={message} />,
      sorter: (a, b) => a.message.localeCompare(b.message),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      render: (created_at) => (
        <SkeletonTableCell loading={loading} value={convertTimeZone(created_at).formatted} />
      ),
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
    },
    {
      title: 'Read status',
      dataIndex: 'read_at',
      render: (created_at) => {
        return created_at ? (
          <SkeletonTableCell loading={loading} value={convertTimeZone(created_at).formatted} />
        ) : (
          <span className={'ant-tag ant-tag-green'}>Unread Message</span>
        )
      },
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      sortDirections: ['descend', 'ascend'],
      width: '250px',
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
            <a
              onClick={() => {
                navigationSwitch(record)
              }}
              className={'table-icon edit'}
            >
              <AiOutlineEye />
            </a>
          </>
        )
      },
    },
  ]

  return (
    <ViewCard>
      <div className={'establishment-listing'}>
        <Row>
          <Col md={12}>
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={notList}
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
