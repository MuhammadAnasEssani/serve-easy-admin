import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {Outlet} from 'react-router-dom'
// Css
import '../../assets/css/layouts/authentication.scss'
import AuthSlider from '../components/authentication/Slider'
// Images

// console.log(dots)

export default function AuthenticationLayout() {
  return (
    <>
      <div className="Auth-Layout">
        <div className={'slider-section d-none d-md-block'}>
          <AuthSlider />
        </div>
        <div className="login-section">
          <Container>
            <Row>
              <Col className="d-flex justify-content-center flex-column" md={12} lg={12}>
                <Outlet />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}
