import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import InputFieldSkeleton from '../../components/skeletons/InputFieldSkeleton'
import ButtonSectionSkeleton from '../../components/skeletons/ButtonSectionSkeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'

export default function EditPromoSkeleton() {
  return (
    <>
      <div className={'promo'}>
        <Form>
          <Row>
            <Col md={12}>
              <h2 className={'dash-heading'}>
                <HeadingSkeleton height={15} maxWidth={150} />
              </h2>
            </Col>
          </Row>
          <Row className={'mt-4 mb-3'}>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
              </div>
            </Col>
            <Col md={4}>
              <div className={'dfields'}>
                <InputFieldSkeleton />
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
    </>
  )
}
