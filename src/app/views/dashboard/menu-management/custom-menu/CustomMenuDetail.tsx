import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/custom-menu-detail.scss'
import {CustomMenuServices} from '../../../../services/api-services/custom-menu-service'
import {useNavigate, useParams} from 'react-router-dom'
import {ICustomMenuList} from '../../../../interfaces/ICustomMenu'
import {ITimetable} from '../../../../interfaces/IGetEstablishment'
import CustomMenuDetailCategories from '../../../../components/dashboard/CustomMenuDetailCategories'
import ViewCard from '../../../../components/dashboard/ViewCard'
import {BiTime} from 'react-icons/bi'
import {Tabs} from 'antd'
import {BsFillCircleFill} from 'react-icons/bs'
import {convertTimeZone} from '../../../../services/helper/convert-time-zone'
import {IDealComboListing} from '../../../../interfaces/IDealsCombo'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import CustomMenuDetailSkeleton from '../../../../skeletons/menu-management/custom-menu/CustomMenuDetailSkeleton'
import Heading from '../../../../components/dashboard/Heading'
import moment from 'moment-timezone'

export default function CustomMenuDetail() {
  const {TabPane} = Tabs
  const [singleCustomMenu, setSingleCustomMenu] = useState<ICustomMenuList>()
  const {id} = useParams<any>()
  const navigator = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const getSingleCustomMenu = async () => {
    setLoading(true)
    const res = await CustomMenuServices.getById(id, {relations: ['deals_combos', 'order_types']})
    if (res.status) {
      setSingleCustomMenu(res.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getSingleCustomMenu()
  }, [])

  const filterDealCombos = (type: number) => {
    return singleCustomMenu?.deals_combos?.filter((data: IDealComboListing) => data.type == type)
  }

  return (
    <>
      <ViewCard>
        {!loading ? (
          <div className={'create-custom-detail'}>
            <Row className={'h-100'}>
              <Col md={12} lg={6} xl={6} xxl={4}>
                <div className={'left-col'}>
                  <Heading>
                    <h2>
                      <span>Custom Menu</span>
                    </h2>
                  </Heading>
                  <div className={'detail-box'}>
                    <h3>Custom Menu Name</h3>
                    <h4>{singleCustomMenu?.name}</h4>
                  </div>
                  <div className={'detail-box'}>
                    <h3>No# Of Products</h3>
                    <h4>{singleCustomMenu?.meta.products_count}</h4>
                  </div>
                  <div className={'detail-box'}>
                    <h3>Created By</h3>
                    <h4>{singleCustomMenu?.created_by?.full_name}</h4>
                  </div>
                  <div className={'detail-box'}>
                    <h3>Created Date</h3>
                    <h4>
                      {singleCustomMenu?.created_at &&
                        convertTimeZone(singleCustomMenu?.created_at).formatted}
                    </h4>
                  </div>
                  <div className={'detail-box'}>
                    <h3>Dining Options</h3>
                    {singleCustomMenu?.order_types.map((orderType) => {
                      return <h4>{orderType.type_text}</h4>
                    })}
                  </div>
                  <div className={'button-section'}>
                    <ThemeButton
                      onClick={() => navigator(-1)}
                      type={'button'}
                      className={'form-cancel'}
                      text={'Cancel'}
                    />
                    <ThemeButton
                      route={`/edit-custom-menu/${singleCustomMenu?.id}`}
                      type={'submit'}
                      className={'form-create'}
                      text={'Edit'}
                    />
                  </div>
                </div>
              </Col>
              <Col md={12} lg={6} xl={6} xxl={4}>
                <div className={'center-col'}>
                  <div className={'theme-tabs'}>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="Products" key="1">
                        <CustomMenuDetailCategories />
                      </TabPane>
                      <TabPane tab="Combo" key="2">
                        <div className={'combo-list'}>
                          <ul>
                            {filterDealCombos(BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO)?.map(
                              (combo: IDealComboListing) => {
                                return (
                                  <li>
                                    <BsFillCircleFill />
                                    {combo.name}
                                  </li>
                                )
                              }
                            )}
                          </ul>
                        </div>
                      </TabPane>
                      <TabPane tab="Deals" key="3">
                        <div className={'combo-list'}>
                          <ul>
                            {filterDealCombos(BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL)?.map(
                              (deal: IDealComboListing) => {
                                return (
                                  <li>
                                    <BsFillCircleFill />
                                    {deal.name}
                                  </li>
                                )
                              }
                            )}
                          </ul>
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Col>
              <Col md={12} lg={6} xl={6} xxl={4}>
                <div className={'right-col'}>
                  <Heading>
                    <h2>
                      <span>Time Schedule</span>
                    </h2>
                  </Heading>
                  <h5>Time Availability:</h5>
                  <ul className={'time-Schedule'}>
                    {singleCustomMenu?.time_tables?.map((time: ITimetable) => {
                      return (
                        <li>
                          <div className={'days'}>
                            <span>{time.day?.name}</span>
                          </div>
                          <div className={'time'}>
                            <span>
                              <BiTime /> {moment(time.start_time, 'HH:mm').format('hh:mm a')}
                            </span>{' '}
                            -{' '}
                            <span>
                              <BiTime /> {moment(time.end_time, 'HH:mm').format('hh:mm a')}
                            </span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <CustomMenuDetailSkeleton />
        )}
      </ViewCard>
    </>
  )
}
