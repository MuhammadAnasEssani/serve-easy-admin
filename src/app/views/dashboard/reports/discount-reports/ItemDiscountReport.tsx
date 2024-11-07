import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Table} from 'antd'
import Heading from '../../../../components/dashboard/Heading'
import type {ColumnsType} from 'antd/es/table'
import {IItemDiscountSaleBreakdown} from '../../../../interfaces/IReports'

export default function ItemDiscountReport({
  data,
  loading,
}: {
  data: IItemDiscountSaleBreakdown[]
  loading: boolean
}) {
  const columns: ColumnsType<IItemDiscountSaleBreakdown> = [
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount_amount',
      key: ' discount_amount',
    },
    {
      title: 'Discount Count',
      dataIndex: 'discount_count',
      key: 'discount_count',
    },
    {
      title: 'Item Sold',
      dataIndex: 'item_sold',
      key: 'item_sold',
    },
  ]
  const renderFooter = () => {
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <b>Total</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <b>{data.reduce((a, b) => a + b.discount_amount, 0)}</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <b>{data.reduce((a, b) => a + b.discount_count, 0)}</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            <b>{data.reduce((a, b) => a + b.item_sold, 0)}</b>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )
  }
  return (
    <Row>
      <Col className={'mt-3'} md={12}>
        <Heading>
          <h2 className={'d-flex'} style={{paddingBottom: 0}}>
            <span>Discount Summary</span>
          </h2>
        </Heading>
        <Table
          columns={columns}
          dataSource={data}
          className={'main-table'}
          // rowKey={(record) => record.key}
          // pagination={pagination}
          loading={loading}
          summary={renderFooter}
          scroll={{x: 'calc(600px + 50%)', y: 400}}
        />
      </Col>
    </Row>
  )
}
