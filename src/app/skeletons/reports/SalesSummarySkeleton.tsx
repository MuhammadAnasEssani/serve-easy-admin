import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import '../../../assets/css/views/dashboard/sales-summary.scss'
import '../../../assets/css/views/dashboard/reports.scss'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import OvalSkeleton from '../../components/skeletons/OvalSkeleton'

// Charts js

export default function SalesSummarySkeleton() {
  const {TabPane} = Tabs
  return (
    <div className={'sales-summary reports'}>
      {/*<Form>*/}
      {/*    <Row>*/}
      {/*          <Col md={12}>*/}
      {/*              <FiltersSkeleton/>*/}
      {/*          </Col>*/}
      {/*    </Row>*/}
      {/*</Form>*/}

      <Row>
        <Col md={12}>
          <div className={'report-section'}>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<HeadingSkeleton maxWidth={60} height={14} />} key="1">
                  <Row>
                    <Col md={12}>
                      <SquareSkeleton height={300} width={'100%'} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab={<HeadingSkeleton maxWidth={120} height={14} />} key="2">
                  <Row>
                    <Col md={12}>
                      <SquareSkeleton height={300} width={'100%'} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab={<HeadingSkeleton maxWidth={120} height={14} />} key="3">
                  <Row>
                    <Col md={12}>
                      <SquareSkeleton height={300} width={'100%'} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab={<HeadingSkeleton maxWidth={120} height={14} />} key="4">
                  <Row>
                    <Col md={12}>
                      <SquareSkeleton height={300} width={'100%'} />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Col>
      </Row>
      <Row className={'mt-2'}>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-box'}>
                    <div className={'report-details'}>
                      <div>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={15} />
                      </div>
                      <div className={'report-stats ps-0'}>
                        <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <h3 className={'report-heading mt-4'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <h3 className={'report-heading mt-4'}>
              <span>
                <HeadingSkeleton maxWidth={120} height={14} />
              </span>
            </h3>
            <ul className={''}>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={'report-box'}>
                  <div className={'report-details'}>
                    <div>
                      <HeadingSkeleton maxWidth={100} height={10} />
                    </div>
                    <div>
                      <HeadingSkeleton maxWidth={150} height={15} />
                    </div>
                    <div className={'report-stats ps-0'}>
                      <OvalSkeleton borderRadius={30} maxWidth={50} height={25} />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Col>

        <Col md={6}>
          <div className={'report-section'}>
            <h3 className={'report-heading'}>
              <HeadingSkeleton maxWidth={120} height={14} />
            </h3>
            <div className={'category-box'}>
              <div className={'icon-box'}>
                <SquareSkeleton width={50} height={50} />
              </div>
              <div className={'content'}>
                <div>
                  <HeadingSkeleton maxWidth={80} height={14} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={120} height={16} />{' '}
                </div>
              </div>
            </div>
            <div className={'category-box'}>
              <div className={'icon-box'}>
                <SquareSkeleton width={50} height={50} />
              </div>
              <div className={'content'}>
                <div>
                  <HeadingSkeleton maxWidth={80} height={14} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={120} height={16} />{' '}
                </div>
              </div>
            </div>
            <div className={'category-box'}>
              <div className={'icon-box'}>
                <SquareSkeleton width={50} height={50} />
              </div>
              <div className={'content'}>
                <div>
                  <HeadingSkeleton maxWidth={80} height={14} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={120} height={16} />{' '}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
