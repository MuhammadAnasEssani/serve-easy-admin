import React from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import {Controller} from 'react-hook-form'
import DateRange from '../dashboard/DateRange'
import MultiSelectField from '../dashboard/MultiSelectField'
import {IoRestaurantOutline} from 'react-icons/io5'
import {MdOutlinePayment, MdOutlineWeb} from 'react-icons/md'
import ThemeButton from '../dashboard/ThemeButton'
import HeadingSkeleton from './HeadingSkeleton'
import SquareSkeleton from './SquareSkeleton'

export default function FiltersSkeleton() {
  return (
    <div className={'filter-sec'}>
      <Row>
        <Col className={'d-none d-md-block'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100%'} height={40} />
          </div>
        </Col>
        <Col className={'d-none d-md-block'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100%'} height={40} />
          </div>
        </Col>
        <Col className={'d-none d-md-block'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100%'} height={40} />
          </div>
        </Col>
        <Col className={'d-none d-md-block'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100%'} height={40} />
          </div>
        </Col>
        <Col className={'gap-2 d-flex align-items-end d-none d-md-flex'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100px'} height={40} />
          </div>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'50px'} height={40} />
          </div>
        </Col>
        <Col className={'d-block d-md-none'} md={3} lg={2}>
          <div className={'filter-fields'}>
            <SquareSkeleton width={'100px'} height={40} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
