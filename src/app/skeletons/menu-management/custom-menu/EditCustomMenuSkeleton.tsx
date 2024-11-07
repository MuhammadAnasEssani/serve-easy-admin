import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row, TabPane} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-custom-menu.scss'
import DashCheckboxWithValue from '../../../components/dashboard/DashCheckboxWithValue'
import {Tabs} from 'antd'
import ViewCard from '../../../components/dashboard/ViewCard'
import InputFieldSkeleton from '../../../components/skeletons/InputFieldSkeleton'
import ButtonSectionSkeleton from '../../../components/skeletons/ButtonSectionSkeleton'
import OrderTypeCheckSkeleton from '../../../components/skeletons/OrderTypeCheckSkeleton'
import TimeTableSkeleton from '../../../components/skeletons/TimeTableSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import {SkeletonTree} from '../../../components/Skeleton'
import {useUserContext} from '../../../providers/UserProvider'

export default function EditCustomMenu() {
  const {TabPane} = Tabs
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Edit Custom Menu')
  })
  return (
    <>
      <form>
        <div className={'create-custom-menu'}>
          <Row className={'h-100'}>
            <Col md={12} lg={6} xl={6} xxl={3}>
              <div className={'left-col'}>
                <h2 className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={170} height={15} />
                </h2>
                <div className={'dfields mt-5 mb-4'}>
                  <InputFieldSkeleton />
                </div>

                <div className={'dfields mt-4 mb-4'}>
                  <InputFieldSkeleton />
                </div>

                <div className={'dfields mt-4 mb-4'}>
                  <InputFieldSkeleton />
                </div>
                <div className={'discount-detail-check mt-4 mb-4'}>
                  <OrderTypeCheckSkeleton />
                </div>

                <ButtonSectionSkeleton />
              </div>
            </Col>
            <Col md={12} lg={6} xl={6} xxl={4}>
              <div className={'center-col'}>
                <div className={'theme-tabs'}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab={<HeadingSkeleton maxWidth={100} height={15} />} key="1">
                      <SkeletonTree />
                    </TabPane>
                    <TabPane tab={<HeadingSkeleton maxWidth={100} height={15} />} key="2">
                      <div className={'custom-menu-deals-combo-select'}></div>
                    </TabPane>
                    <TabPane tab={<HeadingSkeleton maxWidth={100} height={15} />} key="3">
                      <div className={'custom-menu-deals-combo-select'}></div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Col>
            <Col md={12} lg={6} xl={6} xxl={5}>
              <div className={'right-col'}>
                <TimeTableSkeleton />
              </div>
            </Col>
          </Row>
        </div>
      </form>
    </>
  )
}
