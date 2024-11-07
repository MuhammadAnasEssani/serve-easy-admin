import React from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Container, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import Transactions from './Transactions'
import '../../../../assets/css/views/dashboard/order.scss'

export default function PaymentsTab() {
  const {TabPane} = Tabs
  return (
    <>
      <ViewCard>
        <div className={'order'}>
          <Row>
            <Col md={12}>
              <div className={'theme-tabs'}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Transactions" key="1">
                    <Transactions />
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </ViewCard>
    </>
  )
}
