import React, {Dispatch, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import {Controller, useFormContext} from 'react-hook-form'
import {MaxLength, maxLength, minLength, MinLength, Required} from '../../../../utils/patterns'
import SelectField from '../../../../components/dashboard/SelectField'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import DashCheckbox from '../../../../components/dashboard/DashCheckbox'
import {useUserContext} from '../../../../providers/UserProvider'
import {ICategory} from '../../../../interfaces/IMenu'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {useParams} from 'react-router-dom'
import MultiSelectField from '../../../../components/dashboard/MultiSelectField'
import {ProductClassServices} from '../../../../services/api-services/product-class-service'
import {IProductClassList} from '../../../../interfaces/IProductClass'
import ImageUpload from '../../../../components/dashboard/ImageUpload'

export default function CreateProduct({setIsValid}: {setIsValid: Dispatch<boolean>}) {
  const {setTitle} = useUserContext()
  const [singleCategory, setSingleCategory] = useState<ICategory[]>([])
  const [productClasses, setProductClasses] = useState<IProductClassList[]>([])
  const [change, setChange] = useState<boolean>(false)
  const {id} = useParams()
  const {establishments, establishmentId} = useUserContext()

  useEffect(() => {
    setTitle('Create Product')

    /*Get Single Category*/
    MenuServices.getSingleCategory(id).then((row) => {
      setSingleCategory([row.data])
      setValue('category_id', row.data.id)
    })

    /*Fetch All Product Classes*/
    ProductClassServices.all().then((res) => {
      setProductClasses(res.data)
    })
  }, [])

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])
  useEffect(() => {}, [change])

  const {
    control,
    reset,
    formState: {errors, isValid, isSubmitting},
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useFormContext()

  // useEffect(() => {
  //     setIsValid(isValid);
  // },[isValid]);

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
                rules={{required: Required, minLength: MinLength, maxLength: MaxLength}}
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
                        clearErrors("price")
                        return 'Cost price should be less then product price'
                      } else {
                        clearErrors("cost")
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
                    placeholder={'sku'}
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
                    placeholder={'Stock Quantity'}
                    variant={'field-white'}
                    label={'Stock Quantity'}
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
          <Col md={5}>
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
          {/*<Col md={6}>*/}
          {/*    <div className={"dfields menu-manage-fields"}>*/}
          {/*        <label>Upload Product Images</label>*/}
          {/*        <div className={"uplaod-section"}>*/}
          {/*            <div className="upload">*/}
          {/*                /!*<p> Upload button </p>*!/*/}
          {/*                <label className="upload-area">*/}
          {/*                    <input  required*/}
          {/*                            type="file"*/}
          {/*                            name="productImage"*/}
          {/*                            id="upload-button"*/}
          {/*                            accept="image/*"*/}
          {/*                            onChange={handleProductImage}/>*/}
          {/*                    <span className="upload-button">*/}
          {/*                    <AiOutlineCloudUpload/>*/}
          {/*                </span>*/}
          {/*                </label>*/}
          {/*            </div>*/}
          {/*            {displayProductImage.length > 0*/}
          {/*            && displayProductImage.map((pic:any, index:number) => (*/}
          {/*                <div*/}
          {/*                    className="uploadImage"*/}
          {/*                    key={index}*/}
          {/*                    style={{ position: "relative" }}*/}
          {/*                >*/}
          {/*                    <img*/}
          {/*                        className={"uploded-image"}*/}
          {/*                        src={pic}*/}
          {/*                        alt=""*/}
          {/*                    />*/}
          {/*                    <ImBin*/}
          {/*                        className={"im-bin"}*/}
          {/*                        id={pic}*/}
          {/*                        onClick={() => {*/}
          {/*                            displayProductImage.splice(index, 1);*/}
          {/*                            productImage.splice(index, 1);*/}
          {/*                            setChange(!change)*/}
          {/*                            // console.log(productImage);*/}
          {/*                        }}*/}
          {/*                    />*/}
          {/*                </div>*/}
          {/*            ))}*/}

          {/*        </div>*/}

          {/*    </div>*/}
          {/*</Col>*/}
          <Col md={6}>
            <div className={'dfields menu-manage-fields'}>
              <label>Upload Product Image</label>
              <ImageUpload maxCount={1} setValue={setValue} fieldName={'product_media'} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
