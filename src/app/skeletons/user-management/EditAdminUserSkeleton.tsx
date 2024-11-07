import React from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import '../../../assets/css/views/dashboard/create-users.scss'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import ButtonSectionSkeleton from '../../components/skeletons/ButtonSectionSkeleton'

export default function EditAdminUserSkeleton() {
  return (
    <div className={'pos-create-users'}>
      <Form>
        <Row className={'mt-2'}>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row className={'mt-2'}>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row className={'mt-2'}>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col className={'mt-3 mb-3'} md={6}>
            <div className={'dfields'}>
              <HeadingSkeleton height={12} maxWidth={120} />
              <SquareSkeleton width={90} height={90} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mb-4 mt-4'} md={12}>
            <ButtonSectionSkeleton />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
