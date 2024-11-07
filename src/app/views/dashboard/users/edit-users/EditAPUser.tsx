import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {Col, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/create-roles.scss'
import AdminUser from './AdminUser'
import {useUserContext} from '../../../../providers/UserProvider'
import ViewCard from '../../../../components/dashboard/ViewCard'

export default function EditAPUser() {
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }

  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Edit User')
  }, [])

  return (
    <ViewCard>
      <div className={'create-users'}>
        <Row>
          <Col>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane forceRender tab="Admin Panel" key="1">
                  <AdminUser />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
