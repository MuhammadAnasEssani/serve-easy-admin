import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Row} from 'react-bootstrap'
import {BiUser} from 'react-icons/bi'
import {BsEnvelope, BsPhone} from 'react-icons/bs'
import '../../../../assets/css/views/dashboard/transaction-details.scss'
import {Link, useParams} from 'react-router-dom'
import {useUserContext} from '../../../providers/UserProvider'
import {IOrderList} from '../../../interfaces/IOrder'
import {OrderServices} from '../../../services/api-services/order.service'
import {BACKEND_CONSTANTS} from '../../../config/constants'
import TransactionDetailSkeleton from '../../../skeletons/payments/TransactionDetailSkeleton'
import Heading from '../../../components/dashboard/Heading'

export default function TransactionDetails() {
  const {setTitle, currencySymbol} = useUserContext()
  const [order, setOrder] = useState<IOrderList>()
  const {id} = useParams<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const getSingleTransaction = async () => {
    setLoading(true)
    const res = await OrderServices.getById(id)
    if (res.status) {
      setOrder(res.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    setTitle('Transaction Detail')
  }, [])

  useEffect(() => {
    getSingleTransaction()
  }, [id])
  return (
    <>
      <ViewCard>
        {!loading ? (
          <div className={'transaction-details'}>
            {order?.customer && (
              <Row>
                <Col md={12}>
                  <Heading>
                    <h2>
                      <span>Customer Detail</span>
                    </h2>
                  </Heading>
                  <div className={'user-detail'}>
                    <ul>
                      <li>
                        <BiUser />
                        {order?.customer?.full_name}
                      </li>
                      <li>
                        <BsPhone />
                        {order?.customer?.phone}
                      </li>
                      <li>
                        <BsEnvelope /> {order?.customer?.email}
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            )}
            <Row>
              <Col md={6}>
                <Heading>
                  <h2>
                    <span>Payment Status</span>
                  </h2>
                </Heading>
                {order?.transactions && order?.transactions.length > 0 && (
                  <div className={'payment-detail-table'}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col" />
                          <th scope="col">Mode</th>
                          <th scope="col" />
                          <th scope="col">Amount</th>
                          <th scope="col" />
                          <th scope="col">Change due</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.transactions.map((transaction) => {
                          return (
                            <tr>
                              <td data-label="Account">{transaction.id}</td>
                              <td data-label="Due Date">
                                <hr />
                              </td>
                              <td data-label="Amount">{transaction.source_type_text}</td>
                              <td data-label="Due Date">
                                <hr />
                              </td>
                              <td data-label="Period">{transaction.amount_received}</td>
                              <td data-label="Due Date">
                                <hr />
                              </td>
                              <td data-label="Period">{transaction.amount_returned}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className={'order-details'}>
                  <ul>
                    <li>
                      <h5>Order Type</h5>
                      <p>{order?.type_text}</p>
                    </li>
                    <li>
                      <h5>Payment Status</h5>
                      <p>{order?.payment_status_text}</p>
                    </li>
                    <li>
                      <h5>Created At</h5>
                      <p>{order?.created_ago}</p>
                    </li>
                    <li>
                      <h5>Promo Code</h5>
                      <p>birthdaybash</p>
                    </li>
                    <li>
                      <h5>Amount</h5>
                      <p>
                        {currencySymbol}
                        {order?.gross_amount}
                      </p>
                    </li>
                    <li>
                      <h5>Source</h5>
                      <p>{order?.platform}</p>
                    </li>
                    <li>
                      <h5>Order Taker</h5>
                      <p>{order?.order_taker?.full_name || '-'}</p>
                    </li>
                    <li>
                      <h5>Tip</h5>
                      <p>
                        {currencySymbol}
                        {order?.tip || 0}
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <Heading>
                  <h2>
                    <span>Order Detail</span>
                  </h2>
                </Heading>
                <div className={'order-detail-table'}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" style={{width: '50%'}}>
                          Description
                        </th>
                        <th scope="col">QTY</th>
                        <th scope="col">Gross</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.order_items &&
                        order?.order_items.map((item) => {
                          return (
                            <tr>
                              <td>{item.product.name || '-'}</td>
                              <td>{item.purchased_qty}</td>
                              <td>
                                {currencySymbol}
                                {item.payable_price}
                              </td>
                            </tr>
                          )
                        })}

                      <tr className={'tr-hr p-4'}>
                        <td colSpan={1}></td>
                        <td>
                          <hr style={{margin: '10px', backgroundColor: 'transparent'}} />
                        </td>
                        <td></td>
                      </tr>

                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          <div className={'cal-title'}>Sub Total:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.gross_amount}
                        </td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          <div className={'cal-title'}>Manual Discount:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.discount_type ===
                          BACKEND_CONSTANTS.ORDERS.ORDER_DISCOUNT_TYPE.DISCOUNT
                            ? order.total_discount
                            : 0}
                        </td>
                      </tr>

                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Service Charges:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.service_charges}
                        </td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          <div className={'cal-title'}>Delivery Charges:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.delivery_charges || 0}
                        </td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Promo Code Discount:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.discount_type ===
                          BACKEND_CONSTANTS.ORDERS.ORDER_DISCOUNT_TYPE.PROMO
                            ? order.total_discount
                            : 0}
                        </td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={1}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Sales Tax:</div>
                        </td>
                        <td>
                          {currencySymbol}
                          {order?.tax || 0}
                        </td>
                      </tr>

                      {order?.transactions.map((transaction) => {
                        if (transaction.id !== order.id) {
                          return (
                            <>
                              <tr className={'calculation'}>
                                <td colSpan={1}></td>

                                <td>
                                  {' '}
                                  <div className={'cal-title'}>{transaction.source_type_text}:</div>
                                </td>
                                <td>
                                  <Link to={'/transaction-detail/' + transaction?.id}>
                                    <span className={'other-transactions'}>
                                      {transaction.net_amount_received}
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          )
                        }
                      })}
                      <tr className={'calculation total'}>
                        <td colSpan={1}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Total</div>
                        </td>
                        {
                          <td className={'total-count'}>
                            {currencySymbol}
                            {order?.net_amount}
                          </td>
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <TransactionDetailSkeleton />
        )}
      </ViewCard>
    </>
  )
}
