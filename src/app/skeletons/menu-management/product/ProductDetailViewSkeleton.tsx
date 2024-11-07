import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import ViewCard from '../../../components/dashboard/ViewCard'
import '../../../../assets/css/views/dashboard/product-details.scss'
import SquareSkeleton from '../../../components/skeletons/SquareSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import OrderTypeCheckSkeleton from '../../../components/skeletons/OrderTypeCheckSkeleton'
import ButtonSectionSkeleton from '../../../components/skeletons/ButtonSectionSkeleton'

export default function ProductDetailView() {
  return (
    <>
      <div className={'product-detail'}>
        <Row>
          <Col sm={12} md={12} lg={8} xl={8}>
            <ViewCard>
              <Row>
                <Col>
                  <div className={'dash-heading'}>
                    <HeadingSkeleton maxWidth={180} height={15} />
                  </div>
                </Col>
              </Row>
              <div className={'product-header'}>
                <Row>
                  <Col md={3} lg={4} xl={4} xxl={3}>
                    <div className={'product-img'}>
                      <SquareSkeleton height={170} width={'100%'} />
                    </div>
                  </Col>
                  <Col md={9} lg={8} xl={8} xxl={9}>
                    <div className={'product-info'}>
                      <div>
                        <HeadingSkeleton maxWidth={100} height={12} />
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={350} height={15} />{' '}
                      </div>
                      <div>
                        <HeadingSkeleton maxWidth={100} height={12} />
                      </div>
                      <ul>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={80} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={12} />
                          </div>
                        </li>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={80} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={12} />
                          </div>
                        </li>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={80} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={12} />
                          </div>
                        </li>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={80} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={120} height={12} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={'product-content'}>
                <Row>
                  <Col md={12}>
                    <div className={'further-detail'}>
                      <ul>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={100} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={150} height={15} />
                          </div>
                        </li>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={100} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={150} height={15} />
                          </div>
                        </li>
                        <li>
                          <div>
                            <HeadingSkeleton maxWidth={100} height={12} />
                          </div>
                          <div>
                            <HeadingSkeleton maxWidth={150} height={15} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className={'product-description pb-3'}>
                      <div>
                        {' '}
                        <HeadingSkeleton maxWidth={120} height={12} />
                      </div>
                      <div>
                        {' '}
                        <HeadingSkeleton maxWidth={450} height={12} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={'products-list'}>
                      <OrderTypeCheckSkeleton />
                    </div>
                  </Col>
                  <Col>
                    <div className={'products-list'}>
                      <OrderTypeCheckSkeleton />
                    </div>
                  </Col>
                </Row>
              </div>
              <ButtonSectionSkeleton />
            </ViewCard>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4}>
            <div className={'modifier-section'}>
              <div className={'modifier-card'}>
                <div className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={120} height={15} />
                </div>
                <div className={'product-modifiers'}>
                  <div className={'mt-3 mb-3'}>
                    <HeadingSkeleton maxWidth={100} height={12} />
                  </div>
                  <ul>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                  </ul>
                  <div className={'mt-3 mb-3'}>
                    <HeadingSkeleton maxWidth={100} height={12} />
                  </div>
                  <ul>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                    <li>
                      <div className={'modifier-name d-inline'}>
                        <HeadingSkeleton maxWidth={100} height={10} />
                      </div>{' '}
                      <div className={' d-inline modifier-price'}>
                        <HeadingSkeleton maxWidth={30} height={10} />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
