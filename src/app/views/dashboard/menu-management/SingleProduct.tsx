import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import '../../../../assets/css/views/dashboard/single-product.scss'
import {useParams} from 'react-router-dom'
import {MenuServices} from '../../../services/api-services/menu-services'
import {IProductList} from '../../../interfaces/IMenu'
import {GiPlainCircle} from 'react-icons/gi'
import {IModifierClassList, IModifiers} from '../../../interfaces/IModifiers'
import {BsChevronRight} from 'react-icons/bs'
import {ModifierClassServices} from '../../../services/api-services/modifer-class-services'
import ViewCard from '../../../components/dashboard/ViewCard'
import {convertTimeZone} from '../../../services/helper/convert-time-zone'
import Heading from '../../../components/dashboard/Heading'

export default function SingleProduct() {
  const [product, setProduct] = useState<IProductList>()
  const [modifierClasses, setModifierClasses] = useState<IModifierClassList[]>([])
  const {id} = useParams<any>()
  const getSingleProductModifier = async () => {
    const res = await ModifierClassServices.getAllModifiers(true, id)
    if (res.status) {
      setModifierClasses(res.data)
    }
  }

  useEffect(() => {
    MenuServices.getSingleProduct(id).then((row) => {
      setProduct(row.data)
    })
    getSingleProductModifier()
  }, [])

  return (
    <>
      <ViewCard>
        <div className={'single-product'}>
          <Row>
            <Col md={12} className={'mb-3'}>
              <Heading>
                <h2>
                  <span> Product Details</span>
                </h2>
              </Heading>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className={'image-wrapper'}>
                <img src={product?.product_single_image?.mediaUrl || ''} className={'img-fluid'} />
              </div>

              <h4>{product?.name}</h4>
            </Col>
            <Col md={4}>
              <div className={'product-att'}>
                <ul>
                  <li>
                    <h6>Name</h6>
                    <hr />
                    <p>{product?.name}</p>
                  </li>
                  <li>
                    <h6>Category</h6>
                    <hr />
                    <p>{product?.category.name}</p>
                  </li>
                  <li>
                    <h6>Establishment</h6>
                    <hr />
                    <p>{product?.establishment.name}</p>
                  </li>
                  <li>
                    <h6>Cost</h6>
                    <hr />
                    <p>{product?.cost}</p>
                  </li>
                  <li>
                    <h6>Price</h6>
                    <hr />
                    <p>{product?.price}</p>
                  </li>

                  <li>
                    <h6>Stock Amount</h6>
                    <hr />
                    <p>{product?.stock_amount}</p>
                  </li>
                  <li>
                    <h6>Barcode</h6>
                    <hr />
                    <p>{product?.barcode}</p>
                  </li>
                  <li>
                    <h6>Created By</h6>
                    <hr />
                    <p>{product?.created_by?.full_name}</p>
                  </li>
                  {/*<li>*/}
                  {/*    <h6>Updated By</h6>*/}
                  {/*    <hr/>*/}
                  {/*    <p>{product?.updated_by?.full_name || '-'}</p>*/}
                  {/*</li>*/}
                  <li>
                    <h6>Created At</h6>
                    <hr />
                    <p>{product?.created_at && convertTimeZone(product?.created_at).formatted}</p>
                  </li>
                  <li>
                    <h6>Status</h6>
                    <hr />
                    <p>{product?.status_text}</p>
                  </li>

                  <li>
                    <h6>Product Classes</h6>
                    <hr />
                    <ul>
                      {product?.classes.map((singleClass) => {
                        return <li className={'extra-color'}>{singleClass.name}</li>
                      })}
                    </ul>
                  </li>
                  <li>
                    <h6>Printers</h6>
                    <hr />
                    <ul>
                      {product?.printers.map((printer) => {
                        return <li className={'extra-color'}>{printer.name}</li>
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </Col>
            {modifierClasses.length > 0 && (
              <Col md={4}>
                <h3>Modifiers</h3>
                <div className={'modifiers'}>
                  <ul>
                    {modifierClasses.map((modifierClass: IModifierClassList) => {
                      return (
                        <li>
                          <GiPlainCircle />
                          <span>{modifierClass.name}</span>
                          {modifierClass.modifiers &&
                            modifierClass.modifiers?.map((modifier: IModifiers) => {
                              return (
                                <li>
                                  <BsChevronRight /> {modifier.name}
                                </li>
                              )
                            })}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </ViewCard>
    </>
  )
}
