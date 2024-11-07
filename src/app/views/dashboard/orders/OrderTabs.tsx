import React from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Container, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import DineIn from './DineIn'
import '../../../../assets/css/views/dashboard/order.scss'
import TakeAway from './TakeAway'
import Online from './Online'
import Delivery from './Delivery'

export default function OrderTabs() {
  const {TabPane} = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <>
      <ViewCard>
        <div className={'order'}>
          <Row>
            <Col md={12}>
              <div className={'theme-tabs'}>
                <Tabs defaultActiveKey="1" onChange={onChange}>
                  <TabPane tab="Dine-In" key="1">
                    <DineIn />
                  </TabPane>
                  <TabPane tab="Takeaway" key="2">
                    <TakeAway />
                  </TabPane>
                  <TabPane tab="Online" key="3">
                    <Online />
                  </TabPane>
                  <TabPane tab="Delivery" key="4">
                    <Delivery />
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
