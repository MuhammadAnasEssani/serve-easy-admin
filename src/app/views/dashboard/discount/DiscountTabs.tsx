import React, {useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import CreateDiscount from './CreateDiscount'
import MobileManagement from '../cms/MobileManagement'
import CreateManualDiscount from './CreateManualDiscount'

export default function DiscountTabs() {
  const {setTitle} = useUserContext()
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    setTitle('Create Discount')
  }, [])

  return (
    <ViewCard>
      <Row>
        <Col md={12}>
          <div className={'theme-tabs'}>
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Discount" key="1">
                <CreateDiscount />
              </TabPane>
              <TabPane tab="Manual Discount" key="2">
                <CreateManualDiscount />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ViewCard>
  )
}
