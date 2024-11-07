import React from 'react'
import {Tabs} from 'antd'
import {Card, Col, Container, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/menu-management.scss'
import ButtonSectionSkeleton from '../../../components/skeletons/ButtonSectionSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import EditProductSkeleton from './EditProductSkeleton'

export default function EditMenuTabs() {
  const {TabPane} = Tabs
  return (
    <>
      <div className={'menu-management'}>
        <form>
          <Row>
            <Col>
              <div className={'theme-tabs'}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<HeadingSkeleton maxWidth={150} height={15} />} key="1">
                    <EditProductSkeleton />
                  </TabPane>

                  <TabPane tab={<HeadingSkeleton maxWidth={150} height={15} />} key="2"></TabPane>

                  <TabPane tab={<HeadingSkeleton maxWidth={150} height={15} />} key="3"></TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={'mb-4'} md={12}>
              <ButtonSectionSkeleton />
            </Col>
          </Row>
        </form>
      </div>
    </>
  )
}
