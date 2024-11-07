import React, {useRef} from 'react'
import '../../../assets/css/views/dashboard/pos-device.scss'
import {Col, Row} from 'react-bootstrap'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import PostCardSkeleton from './PosCardSkeleton'

export default function PosListingSkeleton() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div>
      <Row>
        <Col md={12} className={'d-flex align-items-center mb-3'}>
          <SquareSkeleton width={150} height={50} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
        <Col sm={12} md={6} lg={4} xl={3} xxl={3}>
          <PostCardSkeleton />
        </Col>
      </Row>
    </div>
  )
}
