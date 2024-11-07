import React, {useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import ViewCard from '../../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../../providers/UserProvider'
import PrivacyPolicy from './PrivacyPolicy'
import TermsConditions from './TermsConditions'

export default function PagesTabs() {
  const {setTitle} = useUserContext()
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    setTitle('Pages')
  }, [])

  return (
    <ViewCard>
      <Row>
        <Col md={12}>
          <div className={'theme-tabs'}>
            <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Privacy Policy" key="1">
                <PrivacyPolicy />
              </TabPane>
              <TabPane tab="Terms & Conditions" key="2">
                <TermsConditions />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </ViewCard>
  )
}
