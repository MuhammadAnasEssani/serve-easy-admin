import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import '../../../assets/css/views/dashboard/establishment.scss'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import OrderTypeCheckSkeleton from '../../components/skeletons/OrderTypeCheckSkeleton'
import TimeTableSkeleton from '../../components/skeletons/TimeTableSkeleton'
import ButtonSectionSkeleton from '../../components/skeletons/ButtonSectionSkeleton'

export default function EditEstablishmentSkeleton() {
  return (
    <>
      <div className={'establishment-section'}>
        <Form>
          <Row className={'h-100'}>
            <Col sm={12} md={6} lg={5}>
              <div className={'lef-col'}>
                <h2 className={'dash-heading'}>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </h2>
                <div className={'dfields mt-4 mb-4'}>
                  <InputFieldSkeleton />
                </div>
                <div className={'dfields mt-4 mb-4'}>
                  <InputFieldSkeleton />
                </div>
                <div className={'dfields mt-4 mb-4'}>
                  <InputFieldSkeleton />
                </div>

                <div className={'dfields mt-4 mb-4'}>
                  <div className={'delivery_type'}>
                    <OrderTypeCheckSkeleton />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} lg={7}>
              <div className={'right-col'}>
                <TimeTableSkeleton />
              </div>
            </Col>
            <Col className={'mb-4'} md={12}>
              <ButtonSectionSkeleton />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}
