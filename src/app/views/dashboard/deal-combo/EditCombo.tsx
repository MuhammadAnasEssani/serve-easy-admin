import React, {useEffect, useReducer, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, FormProvider, useFieldArray, useForm} from 'react-hook-form'
import {
  ICreateCombo,
  IDealComboListing,
  IMultiProductInterface,
} from '../../../interfaces/IDealsCombo'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import SelectField from '../../../components/dashboard/SelectField'
import SelectGroup from '../../../components/dashboard/SelectGroup'
import '../../../../assets/css/views/dashboard/combo-deals.scss'
import {GoPlus} from 'react-icons/go'
import {RiDeleteBin3Line} from 'react-icons/ri'
import {Tooltip} from 'antd'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import DashCheckbox from '../../../components/dashboard/DashCheckbox'
import ImageUpload from '../../../components/dashboard/ImageUpload'
import {ICategory, IProductList} from '../../../interfaces/IMenu'
import {BACKEND_CONSTANTS} from '../../../config/constants'
import {useUserContext} from '../../../providers/UserProvider'
import {DealComboServices} from '../../../services/api-services/deal-combo.services'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function EditCombo({categories}: {categories: ICategory[]}) {
  const {establishmentId} = useUserContext()
  const [singleDealCombo, setSingleDealCombo] = useState<IDealComboListing>()
  const [loading, setLoading] = useState<boolean>(false)
  const {id} = useParams<any>()
  const [products, dispatch] = useReducer((products: any, action: IMultiProductInterface) => {
    switch (action.type) {
      case 'remove':
        return products.filter((product: IProductList[], index: number) => {
          return index !== action.index
        })
      default:
        if (products.length > 0 && products?.[action.index]) {
          return products.map((product: IProductList[], index: number) => {
            return index === action.index ? action.data : product
          })
        } else {
          return [...products, action.data]
        }
    }
  }, [])

  const navigator = useNavigate()
  const methods = useForm<ICreateCombo>({
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      items: [
        {
          category_id: undefined,
          products: undefined,
          quantity: undefined,
          sale_price: undefined,
          optional: undefined,
        },
      ],
    },
  })
  const watchType = methods.watch('type', undefined) // you can supply default value as second argument

  // Field Array for Combo Row Append
  const {fields, append, remove, update} = useFieldArray({
    control: methods.control,
    name: 'items',
  })

  const onSubmit = async (data: ICreateCombo) => {
    setLoading(true)
    data.establishment_id = establishmentId

    const media = data.deal_combo_media
    if (media && media.length > 0) {
      data.image_url = media[0].path
    }
    delete data.deal_combo_media

    const res = await DealComboServices.update(id, data)
    if (res.status) {
      toast.success(res.message)
      navigator(`/deals-combo-detail/${res.data.id}`, {replace: true})
    }
    setLoading(false)
  }

  const Deals = [
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL,
      name: 'Deals',
    },
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO,
      name: 'Combo',
    },
  ]
  const getSingleDealCombo = async () => {
    const res = await DealComboServices.getById(id)
    if (res.status) {
      setSingleDealCombo(res.data)
      const updateData: ICreateCombo = {
        name: res.data.name,
        type: res.data.type,
        items: res.data.deal_combo_items.map((item) => {
          return {
            category_id: item.category_id,
            products: item?.products ? item?.products.flatMap((product) => product.product_id) : [],
            quantity: item.quantity,
            regular_price: 0,
            cost_price: 0,
            optional: item.optional,
            sale_price: item.sale_price,
          }
        }),
        establishment_id: res.data.establishment_id,
      }
      methods.reset(updateData)
    }
  }

  useEffect(() => {
    methods.reset()
  }, [establishmentId])

  useEffect(() => {
    getSingleDealCombo()
  }, [])

  const handleRemove = (index: number) => {
    dispatch({index: index, type: 'remove'})
    remove(index)
  }

  return (
    <>
      <div className={'create-combo-deals'}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <Row
                  className={
                    'd-flex flex-column justify-content-between align-items-start h-100 mb-4'
                  }
                >
                  <Col md={12}>
                    <Row>
                      <Col md={4}>
                        <div className={'filter-fields'}>
                          <Controller
                            name="name"
                            defaultValue={''}
                            control={methods.control}
                            rules={{required: Required, maxLength: maxLength(50)}}
                            render={({field}) => (
                              <TextInput
                                placeholder={'Name'}
                                variant={'field-white'}
                                label={'Name'}
                                labelPos={'out'}
                                labelColor={'dark'}
                                type={'text'}
                                field={field}
                                errors={methods.formState.errors.name}
                              />
                            )}
                          />
                        </div>
                        <div className={'filter-fields'}>
                          <Controller
                            name="type"
                            defaultValue={BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL}
                            control={methods.control}
                            render={({field}) => (
                              <SelectField
                                defaultValue={BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL}
                                label={'Select Combo/ Deals'}
                                errors={methods.formState.errors.type}
                                field={field}
                                selectOptions={Deals}
                                // setSelectedEstablishment = {setSelectedEstablishment}
                                disabled={false}
                              />
                            )}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className={'combo-fields dfields'}>
                          <label>Upload Image</label>
                          <ImageUpload
                            maxCount={1}
                            setValue={methods.setValue}
                            fieldName={'deal_combo_media'}
                            value={singleDealCombo?.deal_combo_image?.mediaUrl || null}
                          />
                        </div>
                      </Col>
                      <Col md={12}>
                        <ul className={'combo-field-list'}>
                          {fields.map((item, index: number) => {
                            return (
                              <li key={item.id}>
                                <div className={'field-1'}>
                                  <div className={'filter-fields'}>
                                    <Controller
                                      name={`items.${index}.category_id`}
                                      control={methods.control}
                                      render={({field: {onChange, value, name, ...field}}) => (
                                        <SelectGroup
                                          setValue={methods.setValue}
                                          label={'Combo Category'}
                                          errors={
                                            methods.formState.errors?.items?.[index]?.category_id
                                          }
                                          field={field}
                                          name={name}
                                          selectOptions={categories}
                                          setProducts={dispatch}
                                          index={index}
                                          value={value}
                                          // defaultValue={singleDealCombo?.deal_combo_items?.find(data=> data.category_id == value)?.category?.name}
                                          defaultValue={value}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className={'field-2'}>
                                  <div className={'filter-fields'}>
                                    <Controller
                                      name={`items.${index}.products`}
                                      control={methods.control}
                                      rules={{required: Required}}
                                      defaultValue={[]}
                                      render={({field: {value, ...field}}) => (
                                        <MultiSelectField
                                          value={value}
                                          label={'Combo Items'}
                                          errors={
                                            methods.formState.errors?.items?.[index]?.products
                                          }
                                          field={field}
                                          selectOptions={products[index]}
                                          // setSelectedEstablishment = {setSelectedEstablishment}
                                          // disabled={true}
                                          maxTagCount={1}
                                          nameWithPrice={true}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className={'field-3'}>
                                  <div className={'filter-fields'}>
                                    <Controller
                                      name={`items.${index}.quantity`}
                                      defaultValue={1}
                                      control={methods.control}
                                      rules={{
                                        required: Required,
                                        maxLength: maxLength(4),
                                        min: {value: 1, message: 'Invalid quantity'},
                                      }}
                                      render={({field}) => (
                                        <TextInput
                                          placeholder={'Quantity'}
                                          variant={'field-white'}
                                          label={'Quantity'}
                                          labelPos={'out'}
                                          labelColor={'dark'}
                                          type={'number'}
                                          field={field}
                                          errors={
                                            methods.formState.errors?.items?.[index]?.quantity
                                          }
                                        />
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className={'field-4'}>
                                  <div className={'filter-fields'}>
                                    <Controller
                                      name={`items.${index}.sale_price`}
                                      defaultValue={1}
                                      control={methods.control}
                                      rules={{required: Required, maxLength: maxLength(5)}}
                                      render={({field}) => (
                                        <TextInput
                                          placeholder={'Sale Price'}
                                          variant={'field-white'}
                                          label={'Unit sale price'}
                                          labelPos={'out'}
                                          labelColor={'dark'}
                                          type={'number'}
                                          field={field}
                                          errors={
                                            methods.formState.errors?.items?.[index]?.sale_price
                                          }
                                        />
                                      )}
                                    />
                                  </div>
                                </div>

                                {watchType === BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO && (
                                  <div className={'field-5'}>
                                    <div className={'filter-fields combo-checkbox-field'}>
                                      <label>Optional</label>
                                      <Controller
                                        name={`items.${index}.optional`}
                                        defaultValue={false}
                                        control={methods.control}
                                        render={({field: {name, value}}) => (
                                          <DashCheckbox
                                            checkedInput={value}
                                            setValue={methods.setValue}
                                            name={name}
                                            // disabled={}
                                            fieldValue={value}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className={'field-6'}>
                                  <div className={'edit-btns'}>
                                    {index > 0 && (
                                      <Tooltip title="delete">
                                        <button
                                          className="btn btn-delete"
                                          onClick={() => handleRemove(index)}
                                        >
                                          <RiDeleteBin3Line />
                                        </button>
                                      </Tooltip>
                                    )}
                                    {index + 1 === fields.length && (
                                      <Tooltip title="Add">
                                        <button
                                          onClick={() => {
                                            append({
                                              category_id: undefined,
                                              products: [],
                                              quantity: undefined,
                                              sale_price: undefined,
                                              optional: undefined,
                                            })
                                          }}
                                          className="btn btn-add"
                                        >
                                          <GoPlus />
                                        </button>
                                      </Tooltip>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                        <div className={'combo-list-total'}>
                          {/*<div>*/}
                          {/*    <h5>Total Sale Price</h5>*/}
                          {/*    <p>$150.00</p>*/}
                          {/*</div>*/}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className={'mt-auto mb-4'} md={12}>
                    <div className={'button-section'}>
                      <ThemeButton
                        onClick={() => navigator(-1)}
                        type={'button'}
                        className={'form-cancel'}
                        text={'Cancel'}
                      />
                      <ThemeButton
                        loader={loading}
                        type={'submit'}
                        className={'form-create'}
                        text={'Save'}
                      />
                    </div>
                    {/*<div className={"estab-bts"}>*/}
                    {/*    <ThemeBtn size={"lg"} text={"Submit"} type={"submit"}/>*/}
                    {/*    */}
                    {/*</div>*/}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </FormProvider>
      </div>
    </>
  )
}
