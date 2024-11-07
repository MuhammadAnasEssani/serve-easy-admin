import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import ViewCard from '../../../../components/dashboard/ViewCard'
import '../../../../../assets/css/views/dashboard/product-details.scss'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {useNavigate, useParams} from 'react-router-dom'
import {GiPlainCircle} from 'react-icons/gi'
import {useUserContext} from '../../../../providers/UserProvider'
import {IProductList} from '../../../../interfaces/IMenu'
import {IModifierClassList, IModifiers} from '../../../../interfaces/IModifiers'
import {ModifierClassServices} from '../../../../services/api-services/modifer-class-services'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {convertTimeZone} from '../../../../services/helper/convert-time-zone'
import ProductDetailViewSkeleton from '../../../../skeletons/menu-management/product/ProductDetailViewSkeleton'
import {toast} from 'react-toastify'
import ImgNotFound from '../../../../../assets/images/image-not-found.webp'
import Heading from '../../../../components/dashboard/Heading'

export default function ProductDetailView() {
  const [product, setProduct] = useState<IProductList>()
  const [modifierClasses, setModifierClasses] = useState<IModifierClassList[]>([])
  const [loader, setLoader] = useState(true)
  const {id} = useParams<any>()
  const navigator = useNavigate()
  const {setTitle, currencySymbol} = useUserContext()
  useEffect(() => {
    setTitle('Product Detail')
  }, [])

  const getSingleProductModifier = () => {
    return ModifierClassServices.getAllModifiers(true, id)
  }
  const getMenuService = () => {
    return MenuServices.getSingleProduct(id)
  }

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    setLoader(true)
    const singleProductResponse = await getSingleProductModifier()
    const menuResponse = await getMenuService()
    if (singleProductResponse.status && menuResponse.status) {
      setModifierClasses(singleProductResponse.data)
      setProduct(menuResponse.data)
    } else {
      toast.error('something went wring')
    }
    setLoader(false)
  }

  if (loader) {
    return <ProductDetailViewSkeleton />
  }
  return (
    <>
      <div className={'product-detail'}>
        <Row>
          <Col sm={12} md={12} lg={8} xl={8}>
            <ViewCard>
              <Row>
                <Col>
                  <Heading>
                    <h2>
                      <span>Product Details</span>
                    </h2>
                  </Heading>
                </Col>
              </Row>
              <div className={'product-header'}>
                <Row>
                  <Col md={3} lg={4} xl={4} xxl={3}>
                    <div className={'product-img'}>
                      <img
                        src={product?.product_single_image?.mediaUrl || ''}
                        onError={({currentTarget}) => (currentTarget.src = ImgNotFound)}
                        className={'img-fluid'}
                      />
                    </div>
                  </Col>
                  <Col md={9} lg={8} xl={8} xxl={9}>
                    <div className={'product-info'}>
                      <h3>Establishment: {product?.establishment?.name || '-'}</h3>
                      <h2>
                        {product?.name}{' '}
                        <span className={`${product?.status == 10 ? 'active' : 'unactive'}`}>
                          {product?.status_text}
                        </span>{' '}
                      </h2>
                      <h5>Created By: {product?.created_by?.full_name || '-'}</h5>
                      <ul>
                        <li>
                          <h4>Price</h4>
                          <h5>
                            {currencySymbol}
                            {product?.price}
                          </h5>
                        </li>
                        <li>
                          <h4>Cost</h4>
                          <h5>
                            {currencySymbol}
                            {product?.cost}
                          </h5>
                        </li>
                        <li>
                          <h4>Status</h4>
                          <h5>{product?.status_text}</h5>
                        </li>
                        <li>
                          <h4>SKU</h4>
                          <h5>{product?.sku}</h5>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={'product-content'}>
                <Row>
                  <Col md={12}>
                    <div className={'further-detail'}>
                      <ul>
                        <li>
                          <h4>Category</h4>
                          <h5>{product?.category.name}</h5>
                        </li>
                        <li>
                          <h4>Barcode</h4>
                          <h5>{product?.barcode}</h5>
                        </li>
                        <li>
                          <h4>Created At</h4>
                          <h5>
                            {product?.created_at && convertTimeZone(product?.created_at).formatted}
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  {product?.description && (
                    <Col md={12}>
                      <div className={'product-description'}>
                        <h3>Description</h3>
                        <p>{product?.description}</p>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <div className={'products-list'}>
                      <h4>Product Classes</h4>
                      {product?.classes.map((items) => {
                        return (
                          <p>
                            <GiPlainCircle /> {items.name}
                          </p>
                        )
                      })}
                    </div>
                  </Col>
                  <Col>
                    <div className={'products-list'}>
                      <h4>Printers</h4>
                      {product?.printers.map((printer) => {
                        return (
                          <p>
                            <GiPlainCircle /> {printer.name}
                          </p>
                        )
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={'button-section'}>
                <ThemeButton
                  onClick={() => navigator(-1)}
                  type={'button'}
                  className={'form-cancel'}
                  text={'Back'}
                />
                <ThemeButton
                  route={`/edit-product/${product?.id}`}
                  type={'button'}
                  className={'form-create'}
                  text={'Edit'}
                />
              </div>
            </ViewCard>
          </Col>
          <Col sm={12} md={12} lg={4} xl={4}>
            <div className={'modifier-section'}>
              <div className={'modifier-card'}>
                <Heading>
                  <h2>
                    <span>Modifiers</span>
                  </h2>
                </Heading>
                <div className={'product-modifiers'}>
                  {modifierClasses.map((modifierClass) => {
                    return (
                      <>
                        <h3>{modifierClass.name}</h3>
                        <ul>
                          {modifierClass.modifiers &&
                            modifierClass.modifiers?.map((modifier: IModifiers) => {
                              return (
                                <li>
                                  <span className={'modifier-name'}>{modifier.name}</span>{' '}
                                  <span className={'modifier-price'}>
                                    {currencySymbol}
                                    {modifier.price}
                                  </span>
                                </li>
                              )
                            })}
                        </ul>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
