import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ViewCard from '../../../components/dashboard/ViewCard'
import '../../../../assets/css/views/dashboard/restaurant-details.scss'
import Accordion from 'react-bootstrap/Accordion'
import {AiOutlineEdit, AiOutlineGlobal} from 'react-icons/ai'
import {useUserContext} from '../../../providers/UserProvider'
import {BsCreditCard2Front} from 'react-icons/bs'
import {SiAmazonaws} from 'react-icons/si'
import {IoMailUnreadOutline} from 'react-icons/io5'
import {IRestaurantListing} from '../../../interfaces/IRestaurant'
import {RestaurantService} from '../../../services/api-services/restaurant.service'
import {useParams} from 'react-router-dom'
import Heading from '../../../components/dashboard/Heading'

export default function RestaurantDetails() {
  const {setTitle} = useUserContext()
  const {id} = useParams<any>()
  const [restaurant, setRestaurant] = useState<IRestaurantListing>()

  useEffect(() => {
    setTitle('Restaurant Details')
    RestaurantService.getById(id).then((res) => {
      setRestaurant(res.data)
    })
  }, [])
  return (
    <>
      <ViewCard>
        <div className={'restaurant-details'}>
          <Row>
            <Col md={12}>
              <div className={'rd-header'}>
                <h2>
                  {restaurant?.name || '-'}
                  <span>
                    Edit <AiOutlineEdit />
                  </span>
                </h2>
                <small>Created at : {restaurant?.created_ago || '-'}</small>
              </div>
            </Col>
            <Col md={12}>
              <ul className={'rd-detail'}>
                <li>
                  <div className={'rd-box'}>
                    <h3>Owner Name</h3>
                    <p>{restaurant?.owner_name || '-'}</p>
                  </div>
                </li>
                <li>
                  <div className={'rd-box'}>
                    <h3>Number of Employees</h3>
                    <p>{restaurant?.no_of_employees || '-'}</p>
                  </div>
                </li>
                <li>
                  <div className={'rd-box'}>
                    <h3>No of Establishment</h3>
                    <p>{restaurant?.no_of_employees || '-'}</p>
                  </div>
                </li>
                <li>
                  <div className={'rd-box'}>
                    <h3>Subscription</h3>
                    <p>{restaurant?.plan.name || '-'}</p>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Heading>
                <h2>
                  <span>Other Details</span>
                </h2>
              </Heading>
              <div className={'other-detail-box'}>
                <p>
                  Email: <span>{restaurant?.email || '-'}</span>
                </p>
                <p>
                  Phone: <span>{restaurant?.phone || '-'}</span>
                </p>
                <p>
                  Address: <span>{restaurant?.address || '-'}</span>
                </p>
                <p>
                  Website: <span>{restaurant?.website || '-'}</span>
                </p>
              </div>
            </Col>
            <Col md={7}>
              <Heading>
                <h2>
                  <span>Settings</span>
                </h2>
              </Heading>
              <div className={'setting-box'}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      {' '}
                      <h4>
                        <BsCreditCard2Front /> Payment Gateways
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <h5>Service Name</h5>
                          <p>
                            {restaurant?.restaurant_payment_service?.payment_service?.name || '-'}
                          </p>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <h4>
                        <SiAmazonaws /> S3
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <h5>S3 End Point</h5>
                          <p>{restaurant?.setting?.s3_end_point || '-'}</p>
                        </li>
                        <li>
                          <h5>S3 Secret Key</h5>
                          <p>{restaurant?.setting?.s3_secret_key || '-'}</p>
                        </li>
                        <li>
                          <h5>S3 Bucket Name</h5>
                          <p>{restaurant?.setting?.s3_bucket_name || '-'}</p>
                        </li>
                        <li>
                          <h5>S3 Region</h5>
                          <p>{restaurant?.setting?.s3_region || '-'}</p>
                        </li>
                        <li>
                          <h5>S3 Access Key Id</h5>
                          <p>{restaurant?.setting?.s3_access_key_id || '-'}</p>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <h4>
                        <AiOutlineGlobal /> Social Integration
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <h5>FCM Key</h5>
                          <p>{restaurant?.setting?.fcm_key || '-'}</p>
                        </li>
                        <li>
                          <h5>Social Google Key</h5>
                          <p>{restaurant?.setting?.social_google_key || '-'}</p>
                        </li>
                        <li>
                          <h5>Social Facebook Key</h5>
                          <p>{restaurant?.setting?.social_facebook_key || '-'}</p>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      <h4>
                        <IoMailUnreadOutline /> SMTP
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <h5>SMTP USER</h5>
                          <p>{restaurant?.setting?.smtp_user || '-'}</p>
                        </li>
                        <li>
                          <h5>Smtp Password</h5>
                          <p>{restaurant?.setting?.smtp_password || '-'}</p>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item> */}

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      <h4>
                        <IoMailUnreadOutline /> Delivery Service
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>
                          <h5>Service Name</h5>
                          <p>
                            {restaurant?.restaurant_delivery_service?.delivery_service?.name || '-'}
                          </p>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
          </Row>
        </div>
      </ViewCard>
    </>
  )
}
