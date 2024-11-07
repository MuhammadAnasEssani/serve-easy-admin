import React, {useEffect} from 'react'
import {Col, Row, TabPane} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/custom-menu-detail.scss'
import {Tabs} from 'antd'
import ButtonSectionSkeleton from '../../../components/skeletons/ButtonSectionSkeleton'
import TimeTableSkeleton from '../../../components/skeletons/TimeTableSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import {SkeletonTree} from '../../../components/Skeleton'
import {useUserContext} from '../../../providers/UserProvider'

export default function CustomMenuDetailSkeleton() {
  const {TabPane} = Tabs
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Custom Menu')
  })
  return (
    <>
      <form>
        <div className={'create-custom-detail'}>
          <Row className={'h-100'}>
            <Col md={12} lg={6} xl={6} xxl={3}>
              <div className={'left-col'}>
                <div className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={170} height={15} />
                </div>
                <div className={'detail-box'}>
                  <div>
                    <HeadingSkeleton maxWidth={200} height={15} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
                </div>
                <div className={'detail-box'}>
                  <div>
                    <HeadingSkeleton maxWidth={200} height={15} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
                </div>
                <div className={'detail-box'}>
                  <div>
                    <HeadingSkeleton maxWidth={200} height={15} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
                </div>
                <div className={'detail-box'}>
                  <div>
                    <HeadingSkeleton maxWidth={200} height={15} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
                </div>
                <div className={'detail-box'}>
                  <div>
                    <HeadingSkeleton maxWidth={200} height={15} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={100} height={10} />
                  </div>
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
