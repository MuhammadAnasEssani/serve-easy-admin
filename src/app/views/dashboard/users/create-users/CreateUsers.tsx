import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/create-roles.scss'
import '../../../../../assets/css/components/dashboard/themetabs.scss'
import AdminCreateUser from './AdminCreateUser'
import {useUserContext} from '../../../../providers/UserProvider'
import ViewCard from '../../../../components/dashboard/ViewCard'

export default function CreateUsers() {
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }

  const {setTitle, isUserReady} = useUserContext()
  useEffect(() => {
    setTitle('Create User')
  }, [])

  return (
    <ViewCard>
      <div className={'create-users'}>
        <Row>
          <Col>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Admin Panel" key="1">
                  {isUserReady && <AdminCreateUser />}
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
