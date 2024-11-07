import React, {Dispatch, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import {Controller, useFormContext} from 'react-hook-form'
import {maxLength, minLength, Required} from '../../../../utils/patterns'
import SelectField from '../../../../components/dashboard/SelectField'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import DashCheckbox from '../../../../components/dashboard/DashCheckbox'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {useUserContext} from '../../../../providers/UserProvider'
import {ICategory, IProductList} from '../../../../interfaces/IMenu'
import {MenuServices} from '../../../../services/api-services/menu-services'
import MultiSelectField from '../../../../components/dashboard/MultiSelectField'
import {ProductClassServices} from '../../../../services/api-services/product-class-service'
import {IProductClassList} from '../../../../interfaces/IProductClass'

export default function EditProduct({
  categoryId,
  product,
  setIsValid,
}: {
  categoryId: number
  product: IProductList
  setIsValid: Dispatch<boolean>
}) {
  const {setTitle, establishments} = useUserContext()
  const [singleCategory, setSingleCategory] = useState<ICategory[]>([])
  const [productClasses, setProductClasses] = useState<IProductClassList[]>([])

  useEffect(() => {
    setTitle('Edit Product')
    /*Fetch All Product Classes*/
    ProductClassServices.all().then((res) => {
      setProductClasses(res.data)
    })
  }, [])

  const fetchSingleCategory = async () => {
    const res = await MenuServices.getSingleCategory(categoryId)
    if (res.status) {
      setSingleCategory([res.data])
      setValue('category_id', res.data.id)
    }
  }

  useEffect(() => {
    /*Get Single Category*/
    fetchSingleCategory()
  }, [])

  const {
    control,
    reset,
    formState: {errors, isValid, isSubmitting},
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useFormContext()

  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = [
      'name',
      'barcode',
      'category_id',
      'cost',
      'price',
      'sku',
      'stock_amount',
      'product_classes',
    ]
    for (const field of fields) {
      if (errorsArray?.includes(field)) {
        setIsValid(false)
        break
      } else {
        setIsValid(true)
      }
    }
  }, [isSubmitting])

  return (
    <>
      <div className={'product-detail'}>
        <Row>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="name"
                defaultValue={''}
                control={control}
                rules={{required: Required, minLength: minLength(3), maxLength: maxLength(20)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'Display Name'}
                    variant={'field-white'}
                    label={'Display Name'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors.name}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="barcode"
                defaultValue={''}
                control={control}
                rules={{required: Required, maxLength: maxLength(8)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'barcode'}
                    variant={'field-white'}
                    label={'Barcode'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    errors={errors.barcode}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="category_id"
                control={control}
                rules={{required: Required}}
                render={({field}) => (
                  <SelectField
                    label={'Product Category'}
                    errors={errors.category_id}
                    field={field}
                    selectOptions={singleCategory}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="cost"
                defaultValue={''}
                control={control}
                rules={{
                  required: Required,
                  maxLength: maxLength(8),
                  validate: {
                    validate: (value) => {
                      if (Number(value) > Number(getValues().price)) {
                        return 'Cost price should be less then product price'
                      } else {
                        clearErrors("price")
                        return true
                      }
                    },
                  },
                }}
                render={({field}) => (
                  <TextInput
                    placeholder={'cost'}
                    variant={'field-white'}
                    label={'Product Cost'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    errors={errors.cost}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="price"
                defaultValue={''}
                control={control}
                rules={{
                  required: Required,
                  maxLength: maxLength(8),
                  validate: {
                    validate: (value) => {
                      if (Number(value) < Number(getValues().cost)) {
                        return 'Product price should be greater then cost price'
                      } else {
                        clearErrors("cost")
                        return true
                      }
                    },
                  },
                }}
                render={({field}) => (
                  <TextInput
                    placeholder={'price'}
                    variant={'field-white'}
                    label={'Product Price'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    errors={errors.price}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="sku"
                defaultValue={0}
                control={control}
                rules={{required: Required, maxLength: maxLength(8)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'price'}
                    variant={'field-white'}
                    label={'SKU'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    errors={errors.sku}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="establishment_id"
                control={control}
                rules={{required: Required}}
                render={({field: {name, ...field}}) => {
                  return (
                    <SelectField
                      label={'Select Establishment'}
                      errors={errors.establishment_id}
                      field={field}
                      selectOptions={establishments}
                      disabled={true}
                    />
                  )
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="stock_amount"
                defaultValue={0}
                control={control}
                rules={{required: Required, minLength: minLength(1), maxLength: maxLength(8)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'Stock Amount'}
                    variant={'field-white'}
                    label={'Stock Amount'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'number'}
                    field={field}
                    errors={errors.stock_amount}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="product_classes"
                control={control}
                rules={{}}
                render={({field: {name, ...field}}) => {
                  return (
                    <MultiSelectField
                      label={'Select Product Classes'}
                      errors={errors.product_classes}
                      field={field}
                      selectOptions={productClasses}
                    />
                  )
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="description"
                defaultValue={''}
                control={control}
                rules={{maxLength: maxLength(500)}}
                render={({field}) => (
                  <DescriptionField
                    variant={'field-white'}
                    label={'Product Description'}
                    labelPos={'out'}
                    placeholder={'Add Description'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors.description}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={'dfields menu-manage-fields'}>
              <label>Upload Product Image</label>
              <ImageUpload
                maxCount={1}
                setValue={setValue}
                fieldName={'product_media'}
                value={product.product_single_image?.mediaUrl || null}
              />
              <Controller
                name={`is_shipping`}
                defaultValue={false}
                control={control}
                rules={{}}
                render={({field: {name, value}}) => (
                  <DashCheckbox
                    label={'Shipping'}
                    checkedInput={false}
                    setValue={setValue}
                    name={name}
                    fieldValue={value}
                  />
                )}
              />
              <Controller
                name={`sold_by_weight`}
                defaultValue={false}
                control={control}
                rules={{}}
                render={({field: {name, value}}) => (
                  <DashCheckbox
                    label={'Sold by weight'}
                    checkedInput={false}
                    setValue={setValue}
                    name={name}
                    fieldValue={value}
                  />
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
