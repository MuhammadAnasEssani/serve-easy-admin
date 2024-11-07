import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import Heading from '../../../../components/dashboard/Heading'
import {Table} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {ExcelIcon} from '../../../../../assets/images/icons/menu-icons/performances'

interface DataType {
  key: React.ReactNode
  menu_item: string
  avg_price: number
  qty: number
  gross_amount: number
  discount_amount: number
  net_amount: number
  children?: DataType[]
}

export default function ProductMixBreakdown() {
  // Menu Table Data
  const columns: ColumnsType<DataType> = [
    {
      title: 'Menu Item',
      dataIndex: 'menu_item',
      key: 'menu_item',
    },
    {
      title: 'Avg Price',
      dataIndex: 'avg_price',
      key: 'avg_price',
    },
    {
      title: 'Item Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Gross Amount',
      dataIndex: 'gross_amount',
      key: 'gross_amount',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount_amount',
      key: 'discount_amount',
    },
    {
      title: 'Net Amount',
      dataIndex: 'net_amount',
      key: 'net_amount',
    },
  ]

  const data: DataType[] = [
    {
      key: 1,
      menu_item: 'FOOD',
      avg_price: 60,
      qty: 33,
      gross_amount: 80,
      discount_amount: 70,
      net_amount: 75,
      children: [
        {
          key: 11,
          menu_item: 'Enchilada de Pollo',
          avg_price: 70,
          qty: 344,
          gross_amount: 80,
          discount_amount: 20,
          net_amount: 76,
        },
        {
          key: 12,
          menu_item: 'Classicos - Quesadilla & Enchilladas',
          avg_price: 222,
          qty: 333,
          gross_amount: 20,
          discount_amount: 30,
          net_amount: 65,
          children: [
            {
              key: 121,
              menu_item: 'No Avo',
              avg_price: 156,
              qty: 1133,
              gross_amount: 330,
              discount_amount: 740,
              net_amount: 715,
            },
          ],
        },
        {
          key: 13,
          menu_item: 'No Crema',
          avg_price: 1160,
          qty: 333,
          gross_amount: 40,
          discount_amount: 30,
          net_amount: 15,
          children: [
            {
              key: 131,
              menu_item: 'No Cheese',
              avg_price: 60,
              qty: 33,
              gross_amount: 80,
              discount_amount: 70,
              net_amount: 75,
              children: [
                {
                  key: 1311,
                  menu_item: 'Sub Charro Beans (With Rice)',
                  avg_price: 60,
                  qty: 33,
                  gross_amount: 80,
                  discount_amount: 70,
                  net_amount: 75,
                },
                {
                  key: 1312,
                  menu_item: 'Sub Charro Beans (With Rice)',
                  avg_price: 60,
                  qty: 33,
                  gross_amount: 80,
                  discount_amount: 70,
                  net_amount: 75,
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  return (
    <Col className={'mt-3'} md={12}>
      <Heading>
        <h2 className={'d-flex'} style={{paddingBottom: 0}}>
          <span>Product Mix Breakdown by Menu</span>
          <i className={'ms-auto'}>
            {' '}
            <button className={'excel-btn btn'}>{ExcelIcon} Export CSV</button>
          </i>
        </h2>
      </Heading>
      <Table
        columns={columns}
        dataSource={data}
        className={'main-table'}
        // rowKey={(record) => record.key}
        // pagination={pagination}
        loading={false}
        // onChange={handleTableChange}
        scroll={{x: 'calc(600px + 50%)'}}
      />
    </Col>
  )
}
