import React from 'react'
import {Col, Row} from 'react-bootstrap'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'

export default function EditPrinterSkeleton() {
  return (
    <>
      <div className={''}>
        <Row>
          <Col md={12}>
            <div className={'dfields mt-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={12}>
            <div className={'dfields mt-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={12}>
            <div className={'dfields mt-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={12}>
            <div className={'dfields mt-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={''} md={12}>
            <div className={'mt-4'}>
              <SquareSkeleton width={300} height={50} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
