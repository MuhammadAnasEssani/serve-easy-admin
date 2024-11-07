import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {ICategory, ICategoryCreate} from '../../../../interfaces/IMenu'
import {maxLength, Required} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import SelectField from '../../../../components/dashboard/SelectField'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {useUserContext} from '../../../../providers/UserProvider'
import {toast} from 'react-toastify'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import EditCategorySkeleton from '../../../../skeletons/menu-management/category/EditCategorySkeleton'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function EditCategory({
  id,
  setActive,
  reloadTable,
}: {
  id: number
  setActive: Dispatch<SetStateAction<boolean>>
  reloadTable: any
}) {
  const [parentCategories, setParentCategories] = useState<ICategory[]>()
  const {establishments} = useUserContext()
  const [imageUrl, setImageUrl] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<ICategoryCreate>({
    mode: 'onChange',
  })

  const onSubmit = async (formData: any) => {
    setSubmitLoading(true)
    const media = formData.category_media
    if (media && media.length > 0) {
      formData.image_url = media[0].path
    }
    delete formData.category_media
    /*Save Category*/
    formData.parent_sort = 1
    formData.description = formData.name
    const res = await MenuServices.updateCategory(id, formData)
    if (res.status) {
      reloadTable()
      setActive(false)
      toast.success(res.message)
    }
    setSubmitLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    /*Get All Categories*/
    MenuServices.getAllCategories(null, {}, false).then((res) => {
      setParentCategories(res.data)
    })
    setLoading(false)
  }, [])

  const getSingleCategory = async () => {
    setLoading(true)
    const res = await MenuServices.getSingleCategory(id).then((row) => {
      reset(row.data)
      setImageUrl(row.data.category_image?.mediaUrl)
    })
    setLoading(false)
  }

  useEffect(() => {
    /*Get Single Category*/
    getSingleCategory()
    MenuServices.getSingleCategory(id).then((row) => {
      reset(row.data)
      setImageUrl(row.data.category_image?.mediaUrl)
    })
  }, [id])

  return (
    <>
      {!loading ? (
        <div key={'edit-category'} className={'create-category'}>
          <Form id="edit-category" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className={'dfields menu-manage-fields'}>
                  <Controller
                    name="name"
                    defaultValue={''}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(100)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'Category Name'}
                        variant={'field-white'}
                        label={'Category Name'}
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
            </Row>
            <Row>
              <Col md={12}>
                <div className={'dfields menu-manage-fields'}>
                  <Controller
                    name="parent_id"
                    control={control}
                    rules={{}}
                    render={({field}) => (
                      <SelectField
                        label={'Parent Category'}
                        errors={errors.parent_id}
                        field={field}
                        selectOptions={parentCategories}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
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
            </Row>
            <Row>
              <Col md={12}>
                <div className={'dfields menu-manage-fields mt-2'}>
                  <Controller
                    name="description"
                    defaultValue={''}
                    control={control}
                    rules={{maxLength: maxLength(500)}}
                    render={({field}) => (
                      <DescriptionField
                        variant={'field-white'}
                        label={'Category Description (Optional)'}
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
            </Row>
            <Row>
              <Col md={12}>
                <div className={'dfields'}>
                  <ImageUpload
                    maxCount={1}
                    setValue={setValue}
                    fieldName={'category_media'}
                    value={imageUrl || null}
                    label={'Upload Category Image'}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mt-4'} md={12}>
                <ThemeButton loader={submitLoading} size={'lg'} text={'Save'} type={'submit'} />
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditCategorySkeleton />
      )}
    </>
  )
}
