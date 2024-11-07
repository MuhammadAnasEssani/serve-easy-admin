import React, {useEffect} from 'react'
import ViewCard from '../components/dashboard/ViewCard'
import {Col, Container, Form, Row} from 'react-bootstrap'
import '../../assets/css/views/dashboard/dashboard-analytics.scss'
import HeadingSkeleton from '../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../components/skeletons/SquareSkeleton'
import {useUserContext} from '../providers/UserProvider'

export default function DashboardAnalyticsSkeleton() {
  const {setTitle, establishmentId} = useUserContext()
  useEffect(() => {
    setTitle('ServeEasy')
  }, [])
  return (
    <>
      <ViewCard>
        <div className={'dashboard-analytics dashboard-analytics-skeleton'}>
          <Container>
            <Form>
              <Row className={'mb-4'}>
                <Col md={3} lg={2}>
                  <div className={'dfields compare-fields'}>
                    <HeadingSkeleton maxWidth={260} height={30} />
                  </div>
                </Col>
                <Col className={'d-flex'} md={2} lg={1}>
                  <HeadingSkeleton maxWidth={80} height={20} />
                </Col>
                <Col md={3} lg={2}>
                  <div className={'dfields compare-fields'}>
                    <HeadingSkeleton maxWidth={260} height={30} />
                  </div>
                </Col>
                <Col className={'d-flex align-items-end'} md={3} lg={2}>
                  <HeadingSkeleton maxWidth={260} height={30} />
                </Col>
              </Row>
            </Form>
            <hr />
            <Row className={''}>
              <Col md={12}>
                <div className={'mt-4 mb-2'}>
                  <HeadingSkeleton maxWidth={160} height={20} />
                </div>
              </Col>
              <Col md={4}>
                <div className={'sales-overview-box-1'}>
                  <ul>
                    <li>
                      <div className={'box'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h4>
                          <p className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'box'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h4>
                          <p className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'box'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h4>
                          <p className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'box'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h4>
                          <p className={'mt-2'}>
                            {' '}
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={3}>
                <div className={'sales-overview-box-2'}>
                  <ul>
                    <li>
                      <div className={'box up'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            <HeadingSkeleton maxWidth={100} height={10} />{' '}
                            <span>
                              <HeadingSkeleton maxWidth={30} height={10} />
                            </span>
                          </h4>
                          <p className={'mt-2'}>
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'box up'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            <HeadingSkeleton maxWidth={100} height={10} />{' '}
                            <span>
                              <HeadingSkeleton maxWidth={30} height={10} />
                            </span>
                          </h4>
                          <p className={'mt-2'}>
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={3}>
                <div className={'sales-overview-box-3'}>
                  <ul>
                    <li>
                      <div className={'box up'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            <HeadingSkeleton maxWidth={100} height={10} />{' '}
                            <span>
                              <HeadingSkeleton maxWidth={30} height={10} />
                            </span>
                          </h4>
                          <p className={'mt-2'}>
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={'box up'}>
                        <div className={'box-icon'}>
                          <SquareSkeleton width={'100%'} height={'80px'} />
                        </div>
                        <div className={'box-detail'}>
                          <h4 className={'mt-2'}>
                            <HeadingSkeleton maxWidth={100} height={10} />{' '}
                            <span>
                              <HeadingSkeleton maxWidth={30} height={10} />
                            </span>
                          </h4>
                          <p className={'mt-2'}>
                            <HeadingSkeleton maxWidth={60} height={10} />
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={2}>
                <div className={'sales-overview-box-4'}>
                  <h3>
                    <HeadingSkeleton maxWidth={130} height={15} />
                  </h3>
                  <ul className={'mt-2 mb-3'}>
                    <li>
                      <span>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </span>{' '}
                      <span className={'number'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </span>
                    </li>
                    <li>
                      <span>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </span>{' '}
                      <span className={'number'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </span>
                    </li>
                    <li>
                      <span>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </span>{' '}
                      <span className={'number'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </span>
                    </li>
                    <li>
                      <span>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </span>{' '}
                      <span className={'number'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className={'theme-tabs'}>
                  <h3 className={'chart-heading mt-4'}>
                    {' '}
                    <HeadingSkeleton maxWidth={160} height={20} />
                  </h3>
                  <div className={'chart-card'}>
                    <SquareSkeleton width={'100%'} height={'440px'} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <h3 className={'chart-heading'}>
                  {' '}
                  <HeadingSkeleton maxWidth={160} height={20} />
                </h3>
                <div className={'chart-card'}>
                  <SquareSkeleton width={'100%'} height={'410px'} />
                </div>
              </Col>
              <Col md={4}>
                <h3 className={'chart-heading'}>
                  {' '}
                  <HeadingSkeleton maxWidth={160} height={20} />
                </h3>
                <div className={'chart-card'}>
                  <div className={'polar-area d-flex'}>
                    <div className={'m-auto'}>
                      <SquareSkeleton width={'240px'} height={'240px'} shape={'circle'} />
                    </div>
                  </div>
                  <div className={'sales-overview-box-5'}>
                    <ul>
                      <li>
                        <div className={'box'}>
                          <div className={'box-icon'}>
                            <SquareSkeleton width={'100%'} height={'80px'} />
                          </div>
                          <div className={'box-detail'}>
                            <h4 className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={100} height={10} />
                            </h4>
                            <p className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={60} height={10} />
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={'box'}>
                          <div className={'box-icon'}>
                            <SquareSkeleton width={'100%'} height={'80px'} />
                          </div>
                          <div className={'box-detail'}>
                            <h4 className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={100} height={10} />
                            </h4>
                            <p className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={60} height={10} />
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={'box'}>
                          <div className={'box-icon'}>
                            <SquareSkeleton width={'100%'} height={'80px'} />
                          </div>
                          <div className={'box-detail'}>
                            <h4 className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={100} height={10} />
                            </h4>
                            <p className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={60} height={10} />
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={'box'}>
                          <div className={'box-icon'}>
                            <SquareSkeleton width={'100%'} height={'80px'} />
                          </div>
                          <div className={'box-detail'}>
                            <h4 className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={100} height={10} />
                            </h4>
                            <p className={'mt-2'}>
                              {' '}
                              <HeadingSkeleton maxWidth={60} height={10} />
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ViewCard>
    </>
  )
}
