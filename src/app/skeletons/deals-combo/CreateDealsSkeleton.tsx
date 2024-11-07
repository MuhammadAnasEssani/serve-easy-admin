import React from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Tooltip} from 'antd'
import TimeTableSkeleton from '../../components/skeletons/TimeTableSkeleton'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'

export default function CreateDealsSkeleton() {
  return (
    <>
      <div className={'create-combo-deals'}>
        <Form>
          <Container fluid className={'p-0 mt-3'}>
            <Row>
              <Col md={7}>
                <h2 style={{padding: '10px 0'}} className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={200} height={15} />
                </h2>
                <Row className={'h-100'}>
                  <Row
                    className={
                      'd-flex flex-column justify-content-between align-items-start h-100 mb-4'
                    }
                  >
                    <Col md={12}>
                      <Row>
                        <Col md={6}>
                          <div className={'dfields combo-fields'}>
                            <InputFieldSkeleton />
                          </div>
                          <div className={'combo-fields dfields'}>
                            <InputFieldSkeleton />
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className={'combo-fields dfields'}>
                            <label>
                              <HeadingSkeleton maxWidth={60} height={10} />
                            </label>
                            <SquareSkeleton height={100} width={100} />
                          </div>
                        </Col>
                        <Col md={12}>
                          <ul className={'combo-field-list'}>
                            <li className={'mt-0'}>
                              <div className={'field-1'}>
                                <div className={'combo-fields dfields'}>
                                  <InputFieldSkeleton labelWidth={50} />
                                </div>
                              </div>

                              <div className={'field-2'}>
                                <div className={'combo-fields dfields'}>
                                  <InputFieldSkeleton labelWidth={50} />
                                </div>
                              </div>

                              <div className={'field-3'}>
                                <div className={'dfields combo-fields'}>
                                  <InputFieldSkeleton labelWidth={50} />
                                </div>
                              </div>

                              <div className={'field-4'}>
                                <div className={'dfields combo-fields'}>
                                  <InputFieldSkeleton labelWidth={50} />
                                </div>
                              </div>

                              <div className={'field-6'}>
                                <div className={'edit-btns'}>
                                  <Tooltip title="Add">
                                    <SquareSkeleton shape={'circle'} />
                                  </Tooltip>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div className={'combo-list-total'}>
                            <div>
                              <h5>
                                <HeadingSkeleton maxWidth={100} height={10} />
                              </h5>
                              <p>
                                <HeadingSkeleton maxWidth={60} height={10} />
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={'mt-auto mb-4'} md={12}>
                      <div className={'estab-bts'}>
                        <HeadingSkeleton maxWidth={150} height={50} />
                        <HeadingSkeleton maxWidth={150} height={50} />
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col md={5}>
                <TimeTableSkeleton />
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  )
}
