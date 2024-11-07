import React, {useEffect} from 'react'
import ViewCard from '../../components/dashboard/ViewCard'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../assets/css/views/dashboard/discount-detail.scss'
import {useUserContext} from '../../providers/UserProvider'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import OvalSkeleton from '../../components/skeletons/OvalSkeleton'

export default function DiscountDetailSkeleton() {
  const {setTitle} = useUserContext()

  useEffect(() => {
    setTitle('Discount Details')
  }, [])
  return (
    <div className={'discount-detail'}>
      <Container>
        <Row>
          <Col md={8}>
            <h2 className={'dash-heading'}>
              {' '}
              <HeadingSkeleton maxWidth={150} height={15} />
            </h2>
            <Row>
              <Col md={4}>
                <div className={'left-col'}>
                  <ul>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                    <li>
                      <div>
                        <HeadingSkeleton maxWidth={120} height={8} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={150} height={10} />
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={8}>
                <div className={'center-col'}>
                  <div className={'row-1'} style={{paddingBottom: 20}}>
                    <Row>
                      <Col md={6}>
                        <div className={'order-type'}>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={8} />
                          </div>
                          <ul>
                            <li className={'pt-2'}>
                              <div className={'me-3'}>
                                <SquareSkeleton shape={'circle'} width={15} height={15} />{' '}
                              </div>
                              <div className={'mt-1'}>
                                <HeadingSkeleton maxWidth={120} height={10} />
                              </div>
                            </li>
                            <li className={''}>
                              <div className={'me-3'}>
                                <SquareSkeleton shape={'circle'} width={15} height={15} />{' '}
                              </div>
                              <div className={'mt-1'}>
                                <HeadingSkeleton maxWidth={120} height={10} />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className={'applicable-box'}>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={8} />
                          </div>
                          <ul>
                            <li className={'pt-2'}>
                              <div className={'me-3'}>
                                <SquareSkeleton shape={'circle'} width={15} height={15} />{' '}
                              </div>
                              <div className={'mt-1'}>
                                <HeadingSkeleton maxWidth={120} height={10} />
                              </div>
                            </li>
                            <li className={''}>
                              <div className={'me-3'}>
                                <SquareSkeleton shape={'circle'} width={15} height={15} />{' '}
                              </div>
                              <div className={'mt-1'}>
                                <HeadingSkeleton maxWidth={120} height={10} />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className={'row-2'}>
                    <Row>
                      <Col md={12}>
                        <div>
                          <HeadingSkeleton maxWidth={120} height={10} />
                        </div>
                        <div className={'include'}>
                          <HeadingSkeleton maxWidth={120} height={13} />
                        </div>
                        <ul>
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                        </ul>
                      </Col>
                      <Col md={12}>
                        <div>
                          <HeadingSkeleton maxWidth={120} height={10} />
                        </div>
                        <div className={'include'}>
                          <HeadingSkeleton maxWidth={120} height={13} />
                        </div>
                        <ul>
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                          <OvalSkeleton maxWidth={70} height={24} borderRadius={20} />
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <div className={'right-col h-100'}>
              <div className={'dash-heading'}>
                <HeadingSkeleton maxWidth={100} height={15} />
              </div>
              <div>
                <HeadingSkeleton maxWidth={150} height={15} />
              </div>
              <ul className={'time-Schedule'}>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'time d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
              </ul>
              <h5>
                <HeadingSkeleton maxWidth={150} height={15} />
              </h5>
              <ul className={'date-Schedule'}>
                <li>
                  <div className={'days d-flex'}>
                    <span>
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                  <div className={'date d-flex align-items-center'} style={{lineHeight: '23px'}}>
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                    -
                    <span className={'d-flex align-items-center'}>
                      <SquareSkeleton shape={'circle'} width={15} height={15} />
                      <HeadingSkeleton maxWidth={60} height={10} />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
