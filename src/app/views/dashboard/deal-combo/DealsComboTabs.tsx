import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {Tabs} from 'antd'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import {ICategory} from '../../../interfaces/IMenu'
import {MenuServices} from '../../../services/api-services/menu-services'
import CreateCombo from './CreateCombo'
import CreateComboSkeleton from '../../../skeletons/deals-combo/CreateComboSkeleton'
import '../../../../assets/css/skeletons/views/combo-deals-skeleton.scss'

export default function DealsComboTabs() {
  const {setTitle, establishmentId, isUserReady} = useUserContext()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loader, setLoader] = useState<boolean>(true)
  const {TabPane} = Tabs
  const onChange = (key: string) => {
    console.log(key)
  }

  const getCategories = async () => {
    MenuServices.getAllCategories(
      null,
      {relation: 'sub-category', establishment_id: establishmentId},
      false
    ).then((res) => {
      setCategories(res.data)
      setLoader(false)
    })
  }

  useEffect(() => {
    setTitle('Create Deals / Combo')
    getCategories()
  }, [isUserReady, establishmentId])

  return (
    <ViewCard>
      <div className={'deals-combo'}>
        <Row>
          <Col md={12}>
            <div className={'theme-tabs'}>
              <Tabs defaultActiveKey="1" onChange={onChange}>
                <TabPane tab="Deals & Combos" key="1">
                  {loader ? <CreateComboSkeleton /> : <CreateCombo categories={categories} />}
                </TabPane>
                {/*<TabPane tab="Deals" key="2">*/}
                {/*    {loader ? <CreateDealsSkeleton/> : <CreateDeals categories={categories}/>}*/}
                {/*</TabPane>*/}
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </ViewCard>
  )
}
