import React, {Dispatch, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'

import {useUserContext} from '../../../providers/UserProvider'
import InputFieldSkeleton from '../../../components/skeletons/InputFieldSkeleton'
import HeadingSkeleton from '../../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../../components/skeletons/SquareSkeleton'
import CheckboxSkeleton from '../../../components/skeletons/CheckboxSkeleton'

export default function EditProductSkeleton() {
  const {setTitle, establishments} = useUserContext()

  useEffect(() => {
    setTitle('Edit Product')
    /*Fetch All Product Classes*/
  }, [])

  return (
    <>
      <div className={'product-detail'}>
        <Row>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={'dfields mt-3 mb-3'}>
              <InputFieldSkeleton />
            </div>
          </Col>
          <Col md={6}>
            <div className={'dfields mt-3 mb-3'}>
              <HeadingSkeleton maxWidth={120} height={12} />
              <SquareSkeleton height={90} width={90} />
              <div className={'d-flex gap-4'}>
                <CheckboxSkeleton height={12} />
                <CheckboxSkeleton height={12} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
