import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'

import InputFieldSkeleton from '../../../components/skeletons/InputFieldSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../../components/skeletons/SquareSkeleton'
import ButtonSectionSkeleton from '../../../components/skeletons/ButtonSectionSkeleton'
import DesFieldSkeleton from '../../../components/skeletons/DesFieldSkeleton'

export default function EditCategorySkeleton() {
  return (
    <div key={'edit-category'} className={'create-category'}>
      <Form>
        <Row>
          <Col md={12}>
            <div className={'dfields mt-4 mb-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={'dfields mt-4 mb-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={12}>
            <div className={'dfields mt-4 mb-4'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={'dfields mt-4 mb-4'}>
              <DesFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={'dfields mt-4 mb-4'}>
              <HeadingSkeleton height={12} maxWidth={200} />
              <div className={'mt-2'}>
                <SquareSkeleton width={100} height={100} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mt-4'} md={12}>
            <HeadingSkeleton height={50} maxWidth={300} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
