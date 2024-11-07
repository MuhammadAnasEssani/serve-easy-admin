import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {SkeletonTree} from '../../components/Skeleton'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import ButtonSectionSkeleton from '../../components/skeletons/ButtonSectionSkeleton'

export default function DealsComboDetailSkeleton() {
  return (
    <div className={'deals-detail'}>
      <Container>
        <Row className={'h-100'}>
          <Col className={'h-100'} md={6} lg={4}>
            <div className={'left-col h-100'}>
              <div className={'dash-heading'}>
                <HeadingSkeleton maxWidth={100} height={15} />
              </div>
              <div className={'product-img-box'}>
                <SquareSkeleton width={'100%'} height={'300px'} />
                <div className={'mt-3'}>
                  <HeadingSkeleton maxWidth={180} height={20} />
                </div>
              </div>
              <ButtonSectionSkeleton />
            </div>
          </Col>
          <Col className={'h-100'} md={6} lg={4}>
            <div className={'center-col h-100'}>
              <div className={'dash-heading'}>
                <HeadingSkeleton maxWidth={100} height={15} />
              </div>
              <SkeletonTree />
            </div>
          </Col>
          <Col className={'h-100'} md={6} lg={4}>
            <div className={'center-col h-100'}>
              <div className={'dash-heading'}>
                <HeadingSkeleton maxWidth={100} height={15} />
              </div>
              <div className={'deals-detail-box'}>
                <ul>
                  {Array(7)
                    .fill({})
                    .map((data, index) => {
                      return (
                        <li className={'mb-3'} key={index}>
                          <div
                            className={'mt-2 mb-2'}
                            style={{paddingBottom: 5, borderBottom: '1px solid #EDEDED'}}
                          >
                            <HeadingSkeleton maxWidth={100} height={13} />
                          </div>
                          <div className={'mt-2 mb-2'} style={{paddingTop: 5}}>
                            <HeadingSkeleton maxWidth={150} height={10} />
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
