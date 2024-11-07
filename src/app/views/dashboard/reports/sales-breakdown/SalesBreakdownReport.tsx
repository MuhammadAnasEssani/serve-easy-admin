import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Heading from '../../../../components/dashboard/Heading'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {ExcelIcon} from '../../../../../assets/images/icons/menu-icons/performances'
import {ISaleBreakdownReportItem} from '../../../../interfaces/IReports'

export default function SalesBreakdownReport({
  data,
  loading,
}: {
  data: ISaleBreakdownReportItem[]
  loading: boolean
}) {
  // Menu Table Data
  const columns: ColumnsType<ISaleBreakdownReportItem> = [
    {
      title: 'Sales Category, Dining Option',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Item Qty',
      dataIndex: 'sale_qty',
      key: 'sale_qty',
    },
    {
      title: 'Net Sales',
      dataIndex: 'net_sale',
      key: 'net_sale',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
    },
    {
      title: 'Gross Sales',
      dataIndex: 'gross_sale',
      key: 'gross_sale',
    },
  ]

  return (
    <Col className={'mt-3'} md={12}>
      <Table
        columns={columns}
        dataSource={data}
        className={'main-table'}
        loading={loading}
        scroll={{x: 'calc(600px + 50%)'}}
      />
    </Col>
  )
}
