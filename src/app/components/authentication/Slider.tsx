import React from 'react'
import banner2 from '../../../assets/images/login/banner2.png'
import {Button, Col, Container, Row} from 'react-bootstrap'
import banner from '../../../assets/images/login/banner.png'
// Slick
import Slider from 'react-slick'
// Import css files
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../assets/css/components/authentication/slider.scss'

// Slick Settings
const settings = {
  dots: true,
  infinite: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
}

export default function AuthSlider() {
  return (
    <Slider {...settings}>
      <div>
        <div
          className="login-left-section"
          style={{
            backgroundImage: `url(${banner2})`,
          }}
        >
          <Container className="d-flex align-items-end">
            <Row>
              <Col md={7}>
                <div className="content">
                  <h5>08-09-2021</h5>
                  <h2>Get Access to Fast Funding Through ServeEasy Capital</h2>
                  <p>
                    Whether you are dreaming of expanding your restaurant, investing in new
                    technology, upgrading equipment, or even looking to open that next location,
                    Toast Capital Loans have you covered.
                  </p>
                  <Button className="btn">Learn More...</Button>
                </div>
                <div className="login-footer">
                  <p>Powered by ©ServeEasy Inc. 2021. All Rights Reserved.</p>
                  <ul>
                    <li>
                      <a href="#"> Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">ServeEasy</a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <div
          className="login-left-section"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <Container className="d-flex align-items-center">
            <Row>
              <Col md={7}>
                <div className="content">
                  <h5>08-09-2021</h5>
                  <h2>Introducing: The New Steps of Service</h2>
                  <p>
                    There’s a new service model emerging that’s helping restaurant operators run
                    healthier, more durable businesses. Learn more about The New Steps of Service,
                    the benefits it offers to the restaurant industry, and how to set yourself up
                    for success by utilizing it.
                  </p>
                  <Button className="btn">Learn More...</Button>
                </div>
                <div className="login-footer">
                  <p>Powered by ©ServeEasy Inc. 2021. All Rights Reserved.</p>
                  <ul>
                    <li>
                      <a href="#"> Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">ServeEasy</a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <div
          className="login-left-section"
          style={{
            backgroundImage: `url(${banner2})`,
          }}
        >
          <Container className="d-flex align-items-end">
            <Row>
              <Col md={7}>
                <div className="content">
                  <h5>08-09-2021</h5>
                  <h2>Get Access to Fast Funding Through ServeEasy Capital</h2>
                  <p>
                    Whether you are dreaming of expanding your restaurant, investing in new
                    technology, upgrading equipment, or even looking to open that next location,
                    Toast Capital Loans have you covered.
                  </p>
                  <Button className="btn">Learn More...</Button>
                </div>
                <div className="login-footer">
                  <p>Powered by ©ServeEasy Inc. 2021. All Rights Reserved.</p>
                  <ul>
                    <li>
                      <a href="#"> Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">ServeEasy</a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <div
          className="login-left-section"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <Container className="d-flex align-items-center">
            <Row>
              <Col className="" md={7}>
                <div className="content">
                  <h5>08-09-2021</h5>
                  <h2>Introducing: The New Steps of Service</h2>
                  <p>
                    There’s a new service model emerging that’s helping restaurant operators run
                    healthier, more durable businesses. Learn more about The New Steps of Service,
                    the benefits it offers to the restaurant industry, and how to set yourself up
                    for success by utilizing it.
                  </p>
                  <Button className="btn">Learn More...</Button>
                </div>
                <div className="login-footer">
                  <p>Powered by ©ServeEasy Inc. 2021. All Rights Reserved.</p>
                  <ul>
                    <li>
                      <a href="#"> Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms of Service</a>
                    </li>
                    <li>
                      <a href="#">ServeEasy</a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Slider>
  )
}
