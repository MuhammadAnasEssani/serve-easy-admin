import React, {useEffect, useState} from 'react'
import '../../../assets/css/views/dashboard/order-detail.scss'
import {Col, Container, Row} from 'react-bootstrap'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'

export default function TransactionDetailSkeleton() {
  return (
    <>
      <div className={'order-detail'}>
        <Row>
          <Col md={12}>
            <div className={'order-status'}>
              <h2 className={'dash-heading mb-4'}>
                {' '}
                <HeadingSkeleton maxWidth={180} height={15} />
              </h2>
              <ul className={'mt-4'}>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
                <li>
                  <div>
                    <HeadingSkeleton maxWidth={80} height={10} />
                  </div>
                  <div>
                    <HeadingSkeleton maxWidth={120} height={15} />
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <div className={''}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">
                      <HeadingSkeleton maxWidth={80} height={15} />
                    </th>
                    <th scope="col" style={{width: '50%'}}>
                      <HeadingSkeleton maxWidth={80} height={15} />
                    </th>
                    <th scope="col">
                      <HeadingSkeleton maxWidth={80} height={15} />
                    </th>
                    <th scope="col">
                      <HeadingSkeleton maxWidth={80} height={15} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>

                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      <div className={'cal-title'}>
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>

                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                  <tr className={'calculation total'}>
                    <td colSpan={2}></td>
                    <td>
                      {' '}
                      <div className={'cal-title'}>
                        {' '}
                        <HeadingSkeleton maxWidth={80} height={10} />
                      </div>
                    </td>
                    <td>
                      {' '}
                      <HeadingSkeleton maxWidth={80} height={10} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
