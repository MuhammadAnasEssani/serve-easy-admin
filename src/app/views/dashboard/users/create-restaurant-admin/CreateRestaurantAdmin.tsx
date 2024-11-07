import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/create-roles.scss'
import '../../../../../assets/css/components/dashboard/themetabs.scss'
import FormData from './FormData'
import {useUserContext} from '../../../../providers/UserProvider'
import ViewCard from '../../../../components/dashboard/ViewCard'

export default function CreateRestaurantAdmin() {
  const {TabPane} = Tabs;

  const {setTitle, isUserReady} = useUserContext()
  useEffect(() => {
    setTitle('Create Restaurant Admin')
  }, [])

  return (
    <ViewCard>
      <div className={'create-users'}>
        <Row>
          <Col>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="Admin Panel" key="1">
                  {isUserReady && <FormData />}
                </TabPane>
                {/*<TabPane tab="POS" key="2">*/}

                {/*    <PosCreateUser/>*/}
                {/*</TabPane>*/}
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
