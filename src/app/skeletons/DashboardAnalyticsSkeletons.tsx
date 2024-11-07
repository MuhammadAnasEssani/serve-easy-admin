import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import '../../assets/css/views/dashboard/dashboard-analyticsr.scss'
import {Progress, Tabs} from 'antd'
import HeadingSkeleton from '../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../components/skeletons/SquareSkeleton'

export default function DashboardAnalyticsSkeletons() {
  const {TabPane} = Tabs

  return (
    <div className={'dashboard-analyticsr'}>
      <Container fluid>
        <Row>
          <Col className={'order-lg-1 order-md-1'} md={6} lg={4}>
            <div className={'chart-card'}>
              <div className={'progress-chart'}>
                <div className={'mt-3 mb-3'}>
                  <HeadingSkeleton height={12} maxWidth={200} />
                </div>
                <div className={'p-chart'}>
                  <Progress
                    width={250}
                    status="active"
                    strokeColor={{
                      '25%': 'rgba(190, 190, 190, 0.2)',
                      '76%': 'rgba(129, 129, 129, 0.34)',
                      '23%': 'rgba(190, 190, 190, 0.2)',
                    }}
                    type="circle"
                    strokeWidth={8}
                    percent={99.9}
                    format={(percent) => {
                      return (
                        <>
                          <div className={'chart-percent'}>
                            {' '}
                            <HeadingSkeleton height={12} maxWidth={100} />{' '}
                          </div>
                          <div className={'chart-percent'}>
                            {' '}
                            <HeadingSkeleton height={25} maxWidth={50} />{' '}
                          </div>
                        </>
                      )
                    }}
                  />
                </div>
                <div className={'progress-chart-target mt-4'}>
                  <ul>
                    <li>
                      <div className={'mt-3 mb-3'}>
                        {' '}
                        <HeadingSkeleton height={15} maxWidth={120} />{' '}
                      </div>
                    </li>
                    <li>
                      <div className={'mt-3 mb-3'}>
                        {' '}
                        <HeadingSkeleton height={15} maxWidth={120} />{' '}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
          <Col className={'order-lg-1 order-md-2'} md={6} lg={4}>
            <div className={'stats-card-2'}>
              <div className={'stats-icon  dine-in'}>
                <SquareSkeleton shape={'circle'} width={55} height={55} />
              </div>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
            </div>
            <div className={'stats-card-2'}>
              <div className={'stats-icon  dine-in'}>
                <SquareSkeleton shape={'circle'} width={55} height={55} />
              </div>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
            </div>
            <div className={'stats-card'}>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
              <div className={'stats-icon'}>
                <SquareSkeleton width={55} height={55} />
              </div>
            </div>
            <div className={'stats-card'}>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
              <div className={'stats-icon'}>
                <SquareSkeleton width={55} height={55} />
              </div>
            </div>
          </Col>
          <Col className={'order-lg-3 order-md-3'} md={6} lg={4}>
            <div className={'stats-card-2'}>
              <div className={'stats-icon  dine-in'}>
                <SquareSkeleton shape={'circle'} width={55} height={55} />
              </div>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
            </div>
            <div className={'stats-card-2'}>
              <div className={'stats-icon  dine-in'}>
                <SquareSkeleton shape={'circle'} width={55} height={55} />
              </div>
              <div className={'stats-content'}>
                <div>
                  <HeadingSkeleton height={20} maxWidth={80} />
                </div>
                <div>
                  <HeadingSkeleton height={12} maxWidth={120} />
                </div>
              </div>
            </div>
            <div className={'visitor-count'}>
              <h3>Visitors Comparison</h3>
              <ul>
                <li>
                  <div>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>{' '}
                  <div className={'number'}>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>
                </li>
                <li>
                  <div>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>{' '}
                  <div className={'number'}>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>
                </li>
                <li>
                  <div>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={80} />
                  </div>{' '}
                  <div className={'number'}>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>
                </li>
                <li>
                  <div>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>{' '}
                  <div className={'number'}>
                    {' '}
                    <HeadingSkeleton height={12} maxWidth={50} />
                  </div>
                </li>
              </ul>
            </div>
          </Col>
          <Col className={'order-lg-4 order-md-5'} md={12} lg={8}>
            <div className={'theme-tabs'}>
              <div className={'guest-card'}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<HeadingSkeleton height={14} maxWidth={60} />} key="1">
                    <Row>
                      <Col md={12}>
                        <div className={'mapdiv'}>
                          <SquareSkeleton width={'100%'} height={260} />
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={<HeadingSkeleton height={14} maxWidth={120} />} key="2">
                    <Row>
                      <Col md={12}>
                        <SquareSkeleton width={'100%'} height={260} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={<HeadingSkeleton height={14} maxWidth={120} />} key="3">
                    <Row>
                      <Col md={12}>
                        <SquareSkeleton width={'100%'} height={260} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={<HeadingSkeleton height={14} maxWidth={120} />} key="4">
                    <Row>
                      <Col md={12}>
                        <SquareSkeleton width={'100%'} height={260} />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Col>

          <Col className={'order-lg-5 order-md-4'} md={6} lg={4}>
            <div className={'category-chart'} style={{height: 'auto'}}>
              <SquareSkeleton width={'100%'} height={325} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
