import React, {useEffect, useState} from 'react'
import {Tabs} from 'antd'
import {Col, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/menu-management.scss'
import {FormProvider, useForm} from 'react-hook-form'
import {IMenuCreateProduct, IProductList} from '../../../../interfaces/IMenu'
import {useNavigate, useParams} from 'react-router-dom'
import {MenuServices} from '../../../../services/api-services/menu-services'
import EditProduct from './EditProduct'
import EditProductModifiers from './EditProductModifiers'
import DisplayPrintOption from '../create-product/DisplayPrintOption'
import ViewCard from '../../../../components/dashboard/ViewCard'
import ProductTabSkeleton from '../../../../skeletons/menu-management/product/ProductTabSkeleton'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function EditMenuTabs() {
  const {TabPane} = Tabs
  const navigate = useNavigate()
  const {id} = useParams()
  const methods = useForm<IMenuCreateProduct>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const [isProductTabValid, setIsProductTabValid] = useState<boolean>(true)
  const [isModifierTabValid, setIsModifierTabValid] = useState<boolean>(false)
  const [isPrinterTabValid, setIsPrinterTabValid] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const onSubmit = async (formData: IMenuCreateProduct) => {
    setSubmitLoading(true)
    const res = await MenuServices.updateProduct(id, formData)
    if (res.status) {
      navigate(`/single-product/${res?.data.id}`)
    }
    setSubmitLoading(false)
  }

  const [activeKey, setActiveKey] = useState(1)
  const [product, setProduct] = useState<IProductList>()
  const tabSize = ['1', '2', '3', '4']
  const [tabKey, setTabKey] = useState(1)
  const onKeyChange = (key: any) => setActiveKey(key)
  const onChange = (key: string) => {
    console.log(key)
    setTabKey(Number(key))
  }

  const next = () => {
    setTabKey(tabKey + 1)
  }

  const prev = () => {
    setTabKey(tabKey - 1)
  }

  const getSingleProduct = async () => {
    setLoading(true)
    const res = await MenuServices.getSingleProduct(id)
    if (res.status) {
      // console.log(row.data)
      methods.reset(res.data)
      setProduct(res.data)
      let classes = []
      let printers = []
      for (const printerData of res.data.printers) {
        printers.push(printerData.id)
      }
      for (const classData of res.data.classes) {
        classes.push(classData.id)
      }
      methods.setValue('product_classes', classes)
      methods.setValue('product_printers', printers)
    }
    setLoading(false)
  }

  useEffect(() => {
    getSingleProduct()
  }, [])

  return (
    <>
      <ViewCard>
        {!loading ? (
          <div className={'menu-management'}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <div className={'theme-tabs'}>
                      <Tabs
                        className={`${!isProductTabValid ? 'error-product' : ''} ${
                          !isModifierTabValid ? 'error-modifier' : ''
                        } ${!isPrinterTabValid ? 'error-printer' : ''}`}
                        defaultActiveKey="1"
                        activeKey={tabKey.toString()}
                        onChange={onChange}
                      >
                        <TabPane
                          forceRender
                          className={`${!isProductTabValid ? 'error' : ''}`}
                          tab="Product Details"
                          key="1"
                        >
                          {product && (
                            <EditProduct
                              product={product}
                              categoryId={product.category_id}
                              setIsValid={setIsProductTabValid}
                            />
                          )}
                        </TabPane>

                        <TabPane
                          forceRender
                          className={`${!isModifierTabValid ? 'error' : ''}`}
                          tab="Product Modifiers"
                          key="2"
                        >
                          {product?.modifiers && (
                            <EditProductModifiers
                              establishmentId={product.establishment_id}
                              modifiers={product.modifiers}
                              setIsValid={setIsModifierTabValid}
                            />
                          )}
                        </TabPane>

                        <TabPane
                          forceRender
                          className={`${!isPrinterTabValid ? 'error' : ''}`}
                          tab="Display/Print Options"
                          key="3"
                        >
                          <DisplayPrintOption setIsValid={setIsPrinterTabValid} />
                        </TabPane>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className={'mt-4 mb-4'} md={12}>
                    <div className={'estab-bts'}>
                      {tabKey > 1 && (
                        <ThemeButton
                          className={'form-create'}
                          text={'Previous'}
                          type={'button'}
                          onClick={() => prev()}
                        />
                      )}
                      {tabKey < tabSize.length - 1 && (
                        <ThemeButton
                          className={'form-create'}
                          text={'Next'}
                          type={'button'}
                          onClick={() => next()}
                        />
                      )}
                      <ThemeButton
                        loader={submitLoading}
                        className={'form-create'}
                        text={'Submit'}
                        type={'submit'}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
            </FormProvider>
          </div>
        ) : (
          <ProductTabSkeleton />
        )}
      </ViewCard>
    </>
  )
}
