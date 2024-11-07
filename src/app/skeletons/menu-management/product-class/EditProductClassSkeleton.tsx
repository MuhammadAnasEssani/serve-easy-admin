import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import InputFieldSkeleton from '../../../components/skeletons/InputFieldSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../../components/skeletons/SquareSkeleton'
import OvalSkeleton from '../../../components/skeletons/OvalSkeleton'

export default function EditProductClassSkeleton() {
  return (
    <>
      <div className={'add-modifier-class'}>
        <Form>
          <Row>
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
        </Form>
      </div>
    </>
  )
}
