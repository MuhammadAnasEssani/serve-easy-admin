import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Table} from 'antd'
import Heading from '../../../../components/dashboard/Heading'
import type {ColumnsType} from 'antd/es/table'
import {IDiscountSaleBreakdown} from '../../../../interfaces/IReports'

export default function DiscountReport({
  data,
  loading,
}: {
  data: IDiscountSaleBreakdown[]
  loading: boolean
}) {
  const columns: ColumnsType<IDiscountSaleBreakdown> = [
    {
      title: 'Discount Name',
      dataIndex: 'discount_name',
      key: ' discount_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Discount Count',
      dataIndex: 'discount_count',
      key: 'discount_count',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
    },
    {
      title: 'Profitability',
      dataIndex: 'profitability',
      key: 'profitability',
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
            <b>{data.reduce((a, b) => a + b.discount_count, 0)}</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <b>{data.reduce((a, b) => a + b.discount_amount, 0)}</b>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}>
            <b>{data.reduce((a, b) => a + b.profitability, 0)}</b>
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
