import React, {useState} from 'react'
import {Tabs} from 'antd'
import {Col, Row} from 'react-bootstrap'
import CreateProduct from './CreateProduct'
import '../../../../../assets/css/views/dashboard/menu-management.scss'
import {FormProvider, useForm} from 'react-hook-form'
import {IMenuCreateProduct} from '../../../../interfaces/IMenu'
import {useNavigate} from 'react-router-dom'
import {MenuServices} from '../../../../services/api-services/menu-services'
import DisplayPrintOption from './DisplayPrintOption'
import ViewCard from '../../../../components/dashboard/ViewCard'
import ProductModifiers from './ProductModifiers'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function MenuTabs() {
  const {TabPane} = Tabs
  const navigate = useNavigate()
  const [displayProductImage, setDisplayProductImage] = useState([])
  const [productImage, setProductImage] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const methods = useForm<IMenuCreateProduct>({
    shouldUnregister: false,
    mode: 'onChange',
  })

  const onSubmit = async (formData: IMenuCreateProduct) => {
    setLoading(true)
    const res = await MenuServices.createProduct(formData)
    if (res.status) {
      setProductImage([])
      setDisplayProductImage([])
      navigate(`/single-product/${res?.data.id}`)
    }
    setLoading(false)
  }

  const [activeKey, setActiveKey] = useState(1)
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

  //Tab Valdiation
  const [isProductTabValid, setIsProductTabValid] = useState<boolean>(false)
  const [isModifierTabValid, setIsModifierTabValid] = useState<boolean>(false)
  const [isPrinterTabValid, setIsPrinterTabValid] = useState<boolean>(false)

  return (
    <>
      <ViewCard>
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
                        className={`${!isProductTabValid ? 'error' : ''}`}
                        tab={`Product Details`}
                        key="1"
                      >
                        <CreateProduct setIsValid={setIsProductTabValid} />
                      </TabPane>
                      <TabPane
                        forceRender
                        className={`${!isModifierTabValid ? 'error' : ''}`}
                        tab="Product Modifiers"
                        key="2"
                      >
                        <ProductModifiers setIsValid={setIsModifierTabValid} />
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
                {/*<div className={"button-section"}>*/}
                {/*    <ThemeButton className={"form-create"} text={"Create"} onClick={() => next()}/>*/}
                {/*    <ThemeButton className={"form-cancel"} text={"Cancel"}/>*/}
                {/*</div>*/}
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
                      // disabled={!methods.formState.isValid}
                      // <button  type={"button"} className={"btn btn-primary"} onClick={() => next()}>
                      //     Next
                      // </button>
                      <ThemeButton
                        className={'form-create'}
                        text={'Next'}
                        type={'button'}
                        onClick={() => next()}
                      />
                    )}
                    <ThemeButton
                      loader={loading}
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
      </ViewCard>
    </>
  )
}
