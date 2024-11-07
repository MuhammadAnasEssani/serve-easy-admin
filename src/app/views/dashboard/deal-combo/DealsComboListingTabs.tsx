import React, {useEffect} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Container, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/deals-combo-listing.scss'
import ComboListing from './ComboListing'
import PermissionBtn from '../../../components/dashboard/PermissionBtn'
import {BACKEND_CONSTANTS} from '../../../config/constants'

export default function DealsComboListingTabs() {
  const {setTitle} = useUserContext()
  const {TabPane} = Tabs

  const onChange = (key: string) => {
    console.log(key)
  }
  useEffect(() => {
    setTitle('Deals & Combo')
  }, [])

  const operations = (
    <PermissionBtn
      route={'/create-deals-combo'}
      id={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
      value={'Create Deal/Combo'}
    />
  )

  return (
    <>
      <ViewCard>
        <div className={'deals-combo-listing'}>
          <Row>
            <Col md={12}>
              <div className={'theme-tabs'}>
                <Tabs defaultActiveKey="1" onChange={onChange} tabBarExtraContent={operations}>
                  <TabPane tab="Deals & Combos" key="1">
                    <ComboListing />
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </ViewCard>
    </>
  )
}
