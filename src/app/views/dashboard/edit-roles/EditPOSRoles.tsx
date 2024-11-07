import React, {useEffect} from 'react'
import {Tabs} from 'antd'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/create-roles.scss'
import '../../../../assets/css/components/dashboard/themetabs.scss'
import {useUserContext} from '../../../providers/UserProvider'
import PosRoles from '../roles/create-roles/PosRoles'
import ViewCard from '../../../components/dashboard/ViewCard'

export default function EditPOSRoles() {
  const {TabPane} = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }
  const {setTitle} = useUserContext()
  useEffect(() => {
    setTitle('Edit Roles')
  }, [])
  return (
    <ViewCard>
      <div className={'create-roles'}>
        <Row>
          <Col>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="POS" key="2">
                  <PosRoles />
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
