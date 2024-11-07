import React from 'react'
import {Col, Row} from 'react-bootstrap'
import '../../../assets/css/views/dashboard/customer-detail.scss'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'

export default function CustomerDetailSkeleton() {
  return (
    <div className={'customer-detail'}>
      <Row>
        <Col md={12}>
          <h2 className={'dash-heading'}>
            <HeadingSkeleton maxWidth={150} height={15} />
          </h2>
          <div className={'user-detail'}>
            <ul>
              <li>
                <HeadingSkeleton maxWidth={150} height={15} />
              </li>
              <li>
                <HeadingSkeleton maxWidth={150} height={15} />
              </li>
              <li>
                <HeadingSkeleton maxWidth={150} height={15} />{' '}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h2 className={'dash-heading'}>
            {' '}
            <HeadingSkeleton maxWidth={150} height={15} />
          </h2>
          <ul className={'cd-detail'}>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
          </ul>
        </Col>
        <Col md={12}>
          <div className={'dash-heading'}>
            {' '}
            <HeadingSkeleton maxWidth={150} height={15} />
          </div>
          <ul className={'cd-detail'}>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
            <li>
              <div className={'rd-box'}>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={150} height={15} />
                </div>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col lg={12} xl={6}>
          <div className={'dash-heading'}>
            {' '}
            <HeadingSkeleton maxWidth={150} height={15} />
          </div>
          <div>
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
                {Array(5)
                  .fill(0)
                  .map((items) => {
                    return (
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
                    )
                  })}
              </tbody>
            </table>
          </div>
        </Col>
        <Col lg={12} xl={6}>
          <div className={'dash-heading'}>
            {' '}
            <HeadingSkeleton maxWidth={150} height={15} />
          </div>
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
              {Array(5)
                .fill(0)
                .map((items) => {
                  return (
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
                  )
                })}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}
