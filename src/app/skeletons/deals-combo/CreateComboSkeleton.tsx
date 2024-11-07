import React from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Tooltip} from 'antd'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import ButtonSectionSkeleton from '../../components/skeletons/ButtonSectionSkeleton'

export default function CreateComboSkeleton() {
  return (
    <>
      <div className={'create-combo-deals'}>
        <Form>
          <Container fluid className={'p-0 mt-3'}>
            <Row>
              <Col md={12}>
                <div style={{padding: '10px 0'}} className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={200} height={15} />
                </div>
                <Row className={'h-100'}>
                  <Row
                    className={
                      'd-flex flex-column justify-content-between align-items-start h-100 mb-4'
                    }
                  >
                    <Col md={12}>
                      <Row>
                        <Col md={4}>
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

                              <div className={'field-5'}>
                                <div
                                  className={'d-flex flex-column combo-fields'}
                                  style={{marginLeft: '10px'}}
                                >
                                  <label style={{marginTop: 16}}>
                                    <HeadingSkeleton maxWidth={40} height={10} />
                                  </label>
                                  <SquareSkeleton height={20} width={20} />
                                </div>
                              </div>

                              <div className={'field-6'}>
                                <div
                                  className={'edit-btns'}
                                  style={{marginTop: '40px', marginLeft: '10px'}}
                                >
                                  <Tooltip title="Add">
                                    <SquareSkeleton shape={'circle'} />
                                  </Tooltip>
                                </div>
                              </div>
                            </li>
                          </ul>
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

                              <div className={'field-5'}>
                                <div
                                  className={'d-flex flex-column combo-fields'}
                                  style={{marginLeft: '10px'}}
                                >
                                  <label style={{marginTop: 16}}>
                                    <HeadingSkeleton maxWidth={40} height={10} />
                                  </label>
                                  <SquareSkeleton height={20} width={20} />
                                </div>
                              </div>

                              <div className={'field-6'}>
                                <div
                                  className={'edit-btns'}
                                  style={{marginTop: '40px', marginLeft: '10px'}}
                                >
                                  <Tooltip title="Add">
                                    <SquareSkeleton shape={'circle'} />
                                  </Tooltip>
                                </div>
                              </div>
                            </li>
                          </ul>
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

                              <div className={'field-5'}>
                                <div
                                  className={'d-flex flex-column combo-fields'}
                                  style={{marginLeft: '10px'}}
                                >
                                  <label style={{marginTop: 16}}>
                                    <HeadingSkeleton maxWidth={40} height={10} />
                                  </label>
                                  <SquareSkeleton height={20} width={20} />
                                </div>
                              </div>

                              <div className={'field-6'}>
                                <div
                                  className={'edit-btns'}
                                  style={{marginTop: '40px', marginLeft: '10px'}}
                                >
                                  <Tooltip title="Add">
                                    <SquareSkeleton shape={'circle'} />
                                  </Tooltip>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                    <Col className={'mt-auto mb-4'} md={12}>
                      <ButtonSectionSkeleton />
                    </Col>
                  </Row>
                </Row>
              </Col>
              {/*<Col md={5}>*/}
              {/*    <TimeTableSkeleton/>*/}
              {/*</Col>*/}
            </Row>
          </Container>
        </Form>
      </div>
    </>
  )
}
