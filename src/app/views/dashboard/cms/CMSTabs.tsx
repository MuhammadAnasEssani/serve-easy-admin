import React, {useEffect} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import WebsiteManagement from './WebsiteManagement'
import MobileManagement from './MobileManagement'

export default function CMSTabs() {
  const {setTitle} = useUserContext()
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    setTitle('CMS Module')
  }, [])

  return (
    <ViewCard>
      <Row>
        <Col md={12}>
          <div className={'theme-tabs'}>
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Website" key="1">
                <WebsiteManagement />
              </TabPane>
              <TabPane tab="Mobile App" key="2">
                <MobileManagement />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ViewCard>
  )
}
