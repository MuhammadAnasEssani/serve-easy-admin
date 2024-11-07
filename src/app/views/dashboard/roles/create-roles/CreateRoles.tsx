import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {Card, Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/create-roles.scss'
import '../../../../../assets/css/components/dashboard/themetabs.scss'
import AdminRoles from './AdminRoles'
import PosRoles from './PosRoles'
import {useUserContext} from '../../../../providers/UserProvider'
import ViewCard from '../../../../components/dashboard/ViewCard'

export default function CreateRoles() {
  const {TabPane} = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Create Roles')
  }, [])
  return (
    <ViewCard>
      <div className={'create-roles'}>
        <Row>
          <Col>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Admin Panel" key="1">
                  <AdminRoles />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
