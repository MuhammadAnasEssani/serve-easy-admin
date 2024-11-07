import React, {useEffect, useState} from 'react'
import '../../../../assets/css/views/dashboard/transaction-detail.scss'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Row} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {TransactionService} from '../../../services/api-services/transaction.service'
import {ITransactionListing} from '../../../interfaces/ITransactions'
import {BACKEND_CONSTANTS, GENERIC} from '../../../config/constants'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import {useUserContext} from '../../../providers/UserProvider'
import TransactionDetailSkeleton from '../../../skeletons/payments/TransactionDetailSkeleton'
import Heading from '../../../components/dashboard/Heading'

export default function TransactionDetail() {
  const [singleTransaction, setSingleTransaction] = useState<ITransactionListing>()
  const {id} = useParams<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const {setTitle, currencySymbol} = useUserContext()
  useEffect(() => {
    setTitle('Transaction Details')
  }, [])
  const getSingleTransaction = async () => {
    setLoading(true)
    const res = await TransactionService.getById(id)
    if (res.status) {
      setSingleTransaction(res.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getSingleTransaction()
  }, [id])
  return (
    <>
      <ViewCard>
        {!loading ? (
          <div className={'transaction-detail'}>
            {/*<Row>*/}
            {/*    <Col md={12}>*/}
            {/*        <div className={"order-detail-header"}>*/}
            {/*            <div className={"user-detail-box"}>*/}
            {/*                <span> <FiUser/> </span>*/}
            {/*                <p> M.Martin</p>*/}

            {/*            </div>*/}
            {/*            <div className={"user-detail-box"}>*/}
            {/*                <span> <VscDeviceMobile/> </span>*/}
            {/*                <p> +1 123 456 78</p>*/}
            {/*            </div>*/}
            {/*            <div className={"user-detail-box"}>*/}
            {/*                <span><BsEnvelope/></span>*/}
            {/*                <p> m.martin@gmail.com</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*/!*</Row>*!/*/}
            {/*<hr/>*/}
            <Row>
              <Col md={12}>
                <div className={'transaction-status'}>
                  <Heading>
                    <h2>
                      <span> Transaction Detail</span>
                    </h2>
                  </Heading>
                  <ul>
                    <li>
                      <span>ID</span>
                      <p>#{singleTransaction?.id}</p>
                    </li>
                    <li>
                      <span>Type</span>
                      <p>{singleTransaction?.source_type_text}</p>
                    </li>
                    {singleTransaction?.source_type ===
                      BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CARD && (
                      <li>
                        <span>Gateway ID</span>
                        <p>{singleTransaction?.gateway_transaction?.gateway_transaction_id}</p>
                      </li>
                    )}

                    <li>
                      <span>Establishment</span>
                      <p>{singleTransaction?.establishment.name}</p>
                    </li>
                    <li>
                      <span>Order Status</span>
                      <p>{singleTransaction?.order.status_text}</p>
                    </li>
                    <li>
                      <span>Order Type</span>
                      <p>{singleTransaction?.order.type_text}</p>
                    </li>
                    <li>
                      <span>Order ID</span>
                      <p>{singleTransaction?.order.id}</p>
                    </li>

                    <li>
                      <span>Created Date</span>
                      <p>
                        {singleTransaction?.created_at &&
                          convertTimeZone(singleTransaction?.created_at).formatted}
                      </p>
                    </li>
                    <li>
                      <span>Order Taker</span>
                      <p>{singleTransaction?.order?.order_taker?.full_name || '-'}</p>
                    </li>
                    <li>
                      <span>Platform</span>
                      <p>{singleTransaction?.order.platform || '-'}</p>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={12}>
                <div className={'scroll-inner fix-width'}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col" style={{width: '50%'}}>
                          Special Instruction
                        </th>
                        <th scope="col">QTY</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleTransaction?.order.order_items &&
                        singleTransaction?.order.order_items.map((item) => {
                          return (
                            <tr>
                              <td>{item.product.name}</td>
                              <td>{item.instruction || '-'}</td>
                              <td>{item.purchased_qty}</td>
                              <td>{item.payable_price}</td>
                            </tr>
                          )
                        })}
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          <div className={'cal-title'}>Sub Total:</div>
                        </td>
                        <td>{singleTransaction?.order?.gross_amount}</td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          <div className={'cal-title'}>Manual Discount:</div>
                        </td>
                        <td>
                          {singleTransaction?.order.discount_type ===
                          BACKEND_CONSTANTS.ORDERS.ORDER_DISCOUNT_TYPE.DISCOUNT
                            ? singleTransaction.order.total_discount
                            : 0}
                        </td>
                      </tr>

                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Service Charges:</div>
                        </td>
                        <td>{singleTransaction?.order.service_charges}</td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          <div className={'cal-title'}>Delivery Charges:</div>
                        </td>
                        <td>0</td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Promo Code Discount:</div>
                        </td>
                        <td>
                          {singleTransaction?.order.discount_type ===
                          BACKEND_CONSTANTS.ORDERS.ORDER_DISCOUNT_TYPE.PROMO
                            ? singleTransaction.order.total_discount
                            : 0}
                        </td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Sales Tax:</div>
                        </td>
                        <td>0</td>
                      </tr>
                      <tr className={'calculation'}>
                        <td colSpan={2}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Total:</div>
                        </td>
                        <td className={'total-count'}>{singleTransaction?.order?.net_amount}</td>
                      </tr>
                      {singleTransaction?.order?.transactions.map((transaction) => {
                        if (transaction.id !== singleTransaction.id) {
                          return (
                            <>
                              <tr className={'calculation'}>
                                <td colSpan={2}></td>
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
                        <td colSpan={2}></td>
                        <td>
                          {' '}
                          <div className={'cal-title'}>Transaction Amount</div>
                        </td>
                        {
                          <td className={'total-count'}>
                            {currencySymbol}
                            {singleTransaction?.net_amount_received}
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
