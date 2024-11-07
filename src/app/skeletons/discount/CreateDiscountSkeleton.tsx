import React from 'react'
import ViewCard from '../../components/dashboard/ViewCard'
import {Col, Container, Form, Row} from 'react-bootstrap'
import '../../../assets/css/views/dashboard/create-discount.scss'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import CheckboxSkeleton from '../../components/skeletons/CheckboxSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import TimeTableSkeleton from '../../components/skeletons/TimeTableSkeleton'

export default function CreateDiscountSkeleton() {
  return (
    <Form>
      <Container>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <h2 className={'dash-heading'}>
                  <HeadingSkeleton height={15} maxWidth={200} />
                </h2>
              </Col>
            </Row>
            <Row className={'h-100'}>
              <Col className={'h-100'} md={6}>
                <div className={'left-col h-100'}>
                  <InputFieldSkeleton />
                  <InputFieldSkeleton />
                  <InputFieldSkeleton />
                  <InputFieldSkeleton />
                  <InputFieldSkeleton />

                  <div className={'max-min-amount'}>
                    <h5 className={'mt-2'}>
                      <HeadingSkeleton maxWidth={150} height={13} />{' '}
                    </h5>
                    <div className={'d-flex mt-4'}>
                      <div className={'d-flex align-items-center'}>
                        <div className={'me-3'}>
                          <HeadingSkeleton maxWidth={60} height={10} />
                        </div>
                        <div className={'me-3'}>
                          <HeadingSkeleton maxWidth={120} height={30} />
                        </div>
                      </div>
                      <div className={'d-flex align-items-center'}>
                        <div className={'me-3'}>
                          <HeadingSkeleton maxWidth={60} height={10} />
                        </div>
                        <div className={'me-3'}>
                          <HeadingSkeleton maxWidth={120} height={30} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} className={'h-100'}>
                <div className={'center-col h-100'}>
                  <div className={'center-col-1'}>
                    <Row className={'h-100'}>
                      <Col md={6}>
                        <div className={'discount-detail-check'}>
                          <h5>
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h5>
                          <ul>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className={'discount-detail-check'}>
                          <h5>
                            <HeadingSkeleton maxWidth={100} height={10} />
                          </h5>
                          <ul>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                            <li>
                              <CheckboxSkeleton height={10} maxWidth={100} margin={'20px 0'} />
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={'4'}>
            <TimeTableSkeleton />
          </Col>
        </Row>
        <Row>
          <Col className={'mt-5 mb-4'} md={12}>
            <div className={'estab-bts'}>
              <HeadingSkeleton maxWidth={150} height={50} />
              <HeadingSkeleton maxWidth={150} height={50} />
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}
