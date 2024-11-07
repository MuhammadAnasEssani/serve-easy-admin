import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/discount-detail.scss'
import {BsCalendarDate, BsCheckCircleFill} from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'
import {useUserContext} from '../../../providers/UserProvider'
import {DiscountServices} from '../../../services/api-services/discount.services'
import {useNavigate, useParams} from 'react-router-dom'
import {IDiscountListing} from '../../../interfaces/IDiscount'
import {DISCOUNT, GENERIC} from '../../../config/constants'
import {ITimetable} from '../../../interfaces/IGetEstablishment'
import DiscountDetailSkeleton from '../../../skeletons/discount/DiscountDetailSkeleton'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'
import moment from 'moment-timezone'

export default function DiscountDetail() {
  const {setTitle, currencySymbol} = useUserContext()
  const [discount, setDiscount] = useState<IDiscountListing>()
  const [loader, setLoader] = useState<boolean>(true)
  const navigator = useNavigate()
  const {id} = useParams()

  const fetchData = () => {
    DiscountServices.getById(id).then((res) => {
      setDiscount(res.data)
      setLoader(false)
    })
  }

  useEffect(() => {
    setTitle('Discount Details')
    fetchData()
  }, [])

  return (
    <>
      <ViewCard>
        {loader ? (
          <DiscountDetailSkeleton />
        ) : (
          <div className={'discount-detail'}>
            <Row>
              <Col md={12} lg={7} xl={8}>
                <Heading>
                  <h2>
                    <span>Discount Details</span>
                  </h2>
                </Heading>
                <Row>
                  <Col md={6} lg={4}>
                    <div className={'left-col'}>
                      <ul>
                        <li>
                          <h4>Name</h4>
                          <p>{discount?.name}</p>
                        </li>
                        <li>
                          <h4>Discount Type</h4>
                          <p>{discount?.type_text}</p>
                        </li>
                        <li>
                          <h4>Discount</h4>
                          <p>{`${
                            discount?.type === DISCOUNT.DISCOUNT_TYPE.FIXED ? currencySymbol : ''
                          }${discount?.discount}${
                            discount?.type === DISCOUNT.DISCOUNT_TYPE.PERCENTAGE ? '%' : ''
                          }`}</p>
                        </li>
                        <li>
                          <h4>Bill Print Name</h4>
                          <p>{discount?.bill_print_name}</p>
                        </li>
                        <li>
                          <h4>Applies To</h4>
                          <p>{discount?.applies_to_text}</p>
                        </li>
                        <li>
                          <h4>Min/Max Bill Amount</h4>
                          <p>{`${currencySymbol}${discount?.min_order_amount} - ${currencySymbol}${discount?.max_order_amount}`}</p>
                        </li>
                        <li>
                          <h4>Manual Discount</h4>
                          <p>{discount?.is_manual ? 'Yes' : 'No'}</p>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6} lg={8}>
                    <div className={'center-col'}>
                      <div className={'row-1'}>
                        <Row>
                          <Col md={6}>
                            <div className={'order-type'}>
                              <h4>Order Type</h4>
                              {discount && discount?.discount_order_types?.length > 0 ? (
                                <ul>
                                  {discount?.discount_order_types.map((row, index) => {
                                    return (
                                      <li key={index}>
                                        <BsCheckCircleFill /> <span>{row.type_text}</span>
                                      </li>
                                    )
                                  })}
                                </ul>
                              ) : (
                                'Not Available'
                              )}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={'applicable-box'}>
                              <h4>Payment Type</h4>
                              {discount && discount?.discount_payment_modes?.length > 0 ? (
                                <ul>
                                  {discount?.discount_payment_modes.map((row, index) => {
                                    return (
                                      <li key={index}>
                                        <BsCheckCircleFill />
                                        <span>{row.type_text}</span>
                                      </li>
                                    )
                                  })}
                                </ul>
                              ) : (
                                'Not Available'
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      {discount && discount?.products?.length > 0 && (
                        <div className={'row-2'}>
                          <Row>
                            <Col md={12}>
                              <h4>Specific Item</h4>
                              <h5 className={'include'}>
                                <BsCheckCircleFill /> Include
                              </h5>
                              <ul>
                                {discount?.products.map((product, index) => {
                                  return <li key={index}>{product?.name}</li>
                                })}
                              </ul>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={5} xl={4}>
                <div className={'right-col h-100'}>
                  <Heading>
                    <h2>
                      <span>Time Schedule</span>
                    </h2>
                  </Heading>
                  <h5>Time Availability:</h5>
                  <ul className={'time-Schedule'}>
                    {discount?.entity_timetables?.timetables?.map((time: ITimetable, index) => {
                      return (
                        <li key={index}>
                          <div className={'days'}>
                            <span>{time.day?.name}</span>
                          </div>
                          <div className={'time'}>
                            <span>
                              <BiTime /> {moment(time.start_time, 'HH:mm').format('hh:mm a')}
                            </span>{' '}
                            -{' '}
                            <span>
                              <BiTime /> {moment(time.end_time, 'HH:mm').format('hh:mm a')}
                            </span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <h5>Date Range:</h5>
                  <ul className={'date-Schedule'}>
                    <li>
                      <div className={'date'}>
                        Start:{' '}
                        <span>
                          <BsCalendarDate />{' '}
                          {discount?.start_date && convertTimeZone(discount?.start_date).date}
                        </span>{' '}
                        - Expiry:{' '}
                        <span>
                          <BsCalendarDate />{' '}
                          {discount?.expiry_date && convertTimeZone(discount?.expiry_date).date}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <div className={'button-section'}>
              <ThemeButton
                onClick={() => navigator(-1)}
                type={'button'}
                className={'form-cancel'}
                text={'Cancel'}
              />
              <ThemeButton
                route={`/edit-discount/${discount?.id}`}
                type={'submit'}
                className={'form-create'}
                text={'Edit'}
              />
            </div>
          </div>
        )}
      </ViewCard>
    </>
  )
}
