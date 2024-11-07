import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/deals-detail.scss'
import {BsCircleFill} from 'react-icons/bs'
import {CaretDownOutlined} from '@ant-design/icons'
// Tree Structure
import {Tree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import {useUserContext} from '../../../providers/UserProvider'
import {DealComboServices} from '../../../services/api-services/deal-combo.services'
import {useNavigate, useParams} from 'react-router-dom'
import {IDealComboListing} from '../../../interfaces/IDealsCombo'
import DealsComboDetailSkeleton from '../../../skeletons/deals-combo/DealsComboDetailSkeleton'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import Heading from '../../../components/dashboard/Heading'
import {GENERIC} from '../../../config/constants'

export default function DealsComboDetail() {
  const {setTitle, currencySymbol} = useUserContext()
  const navigator = useNavigate()
  const [singleRecord, setSingleRecord] = useState<IDealComboListing>()
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const [showLine, setShowLine] = useState<boolean | {showLeafIcon: boolean}>({showLeafIcon: false})
  const [showIcon, setShowIcon] = useState<boolean>(true)
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(true)
  const [expandedKeys, setExpandedKeys] = useState<any>([])
  const [loader, setLoader] = useState<boolean>(true)
  const {id} = useParams()

  /*
   * Fetch data from the api
   * */
  const fetchData = () => {
    DealComboServices.getById(id).then((res) => {
      setSingleRecord(res.data)
      createTreeData(res.data)
      setLoader(false)
    })
  }

  /*
   * Create a DataNode structure from api response
   * Add categories
   * Add products
   * */
  const createTreeData = (data: IDealComboListing) => {
    let tree: DataNode[] = []
    let ek = []

    for (const item of data?.deal_combo_items) {
      tree.push({
        title: item?.category?.name,
        key: `sub-${item.id}`,
        icon: <BsCircleFill />,
        children: item.products?.map((productItem) => {
          return {
            title: productItem.product.name,
            key: `${item.id}-${productItem.product.id}`,
            icon: <BsCircleFill />,
          }
        }),
      })
      ek.push(`sub-${item.id}`)
    }

    setExpandedKeys(ek)
    setTreeData(tree)
  }

  /*
   * Set dynamic title
   * */
  useEffect(() => {
    setTitle(`${singleRecord?.type_text || ''} Details`)
  }, [singleRecord])

  useEffect(() => {
    fetchData()
  }, [])

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    return true

    // console.log('selected', selectedKeys, info);
  }

  const onSetLeafIcon = (checked: boolean) => {
    setShowLeafIcon(checked)
    // setShowLine({ showLeafIcon: checked });
  }

  const onSetShowLine = (checked: boolean) => {
    setShowLine(checked ? {showLeafIcon} : false)
  }

  return (
    <>
      <ViewCard>
        {loader ? (
          <DealsComboDetailSkeleton />
        ) : (
          <div className={'deals-detail'}>
            <Row className={'h-100'}>
              <Col className={'h-100'} md={6} lg={4}>
                <div className={'left-col h-100'}>
                  <Heading>
                    <h2>
                      <span>Thumbnail</span>
                    </h2>
                  </Heading>
                  <div className={'product-img-box'}>
                    <img
                      src={
                        singleRecord?.deal_combo_image?.mediaUrl ||
                        'https://via.placeholder.com/350'
                      }
                      className={'img-fluid'}
                    />
                    <h4>{singleRecord?.name}</h4>
                  </div>
                  <div className={'button-section'}>
                    <ThemeButton
                      onClick={() => navigator(-1)}
                      type={'button'}
                      className={'form-cancel'}
                      text={'Cancel'}
                    />
                    <ThemeButton
                      route={`/edit-deals-combo/${singleRecord?.id}`}
                      type={'submit'}
                      className={'form-create'}
                      text={'Edit'}
                    />
                  </div>
                </div>
              </Col>
              <Col className={'h-100'} md={6} lg={4}>
                <div className={'center-col h-100'}>
                  <Heading>
                    <h2>
                      <span>Products</span>
                    </h2>
                  </Heading>
                  <div className={'deals-detail-tree'}>
                    <Tree
                      showLine={showLine}
                      showIcon={showIcon}
                      expandedKeys={expandedKeys}
                      onSelect={onSelect}
                      treeData={treeData}
                      switcherIcon={<CaretDownOutlined />}
                      defaultExpandAll={true}
                    />
                  </div>
                </div>
              </Col>
              <Col className={'h-100'} md={6} lg={4}>
                <div className={'center-col h-100'}>
                  <div className={'deals-detail-box'}>
                    <Heading>
                      <h2>
                        <span>Details</span>
                      </h2>
                    </Heading>
                    <ul>
                      <li>
                        <h5>ID</h5>
                        <p>{singleRecord?.id}</p>
                      </li>
                      <li>
                        <h5>Name</h5>
                        <p>{singleRecord?.name}</p>
                      </li>
                      <li>
                        <h5>Sale Price</h5>
                        <p>
                          {currencySymbol}
                          {singleRecord?.total_sale_price}
                        </p>
                      </li>
                      <li>
                        <h5>Type</h5>
                        <p>{singleRecord?.type_text}</p>
                      </li>
                      <li>
                        <h5>Status</h5>
                        <p>{singleRecord?.status_text}</p>
                      </li>

                      <li>
                        <h5>Created By</h5>
                        <p>{singleRecord?.created_by?.full_name}</p>
                      </li>

                      <li>
                        <h5>Created Date</h5>
                        <p>
                          {singleRecord?.created_at &&
                            convertTimeZone(singleRecord?.created_at).formatted}
                        </p>
                      </li>
                      {/*<li>*/}
                      {/*    <h5>Linked with Custom Menu</h5>*/}
                      {/*    <p>Online</p>*/}
                      {/*    <p> Dine-in</p>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </ViewCard>
    </>
  )
}
