import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {ICategory, ICategoryCreate} from '../../../../interfaces/IMenu'
import {maxLength, Required} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import SelectField from '../../../../components/dashboard/SelectField'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {useUserContext} from '../../../../providers/UserProvider'
import DescriptionField from '../../../../components/authentication/DescriptionField'
import {PAGINATION} from '../../../../config/constants'
import ImageUpload from '../../../../components/dashboard/ImageUpload'
import {toast} from 'react-toastify'
import ThemeButton from '../../../../components/dashboard/ThemeButton'

export default function CreateCategory({
  id,
  setActive,
  reloadTable,
}: {
  id: number | null
  setActive: Dispatch<SetStateAction<boolean>>
  reloadTable: any
}) {
  const [categories, setCategories] = useState<ICategory[]>()
  const {isRestaurantAdmin, user, isUserReady, establishmentId, establishments} = useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
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
    setLoading(true)
    const media = formData.category_media
    if (media && media.length > 0) {
      formData.image_url = media[0].path
    }
    delete formData.category_media
    /*Save Category*/
    formData.parent_sort = 1
    formData.description = formData.name
    const res = await MenuServices.createCategory(formData)
    if (res.status) {
      toast.success(res.message)
      reloadTable()
      setActive(false)
      reset({establishment_id: establishmentId})
      await fetchCategories()
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    MenuServices.getAllCategories(
      null,
      {establishment_id: establishmentId},
      false,
      PAGINATION.perPage,
      1
    ).then((res) => {
      setCategories(res.data)
    })
  }
  useEffect(() => {
    /*Get All Categories*/
    fetchCategories()
  }, [])
  useEffect(() => {
    setValue('parent_id', id)
  }, [id])

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  return (
    <div key={'dsfdsfdsf'} className={'create-category'}>
      <Form id="create-category" onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={null}
                rules={{}}
                render={({field}) => (
                  <SelectField
                    label={'Parent Category'}
                    errors={errors.parent_id}
                    field={field}
                    selectOptions={categories}
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
          <Col md={6}>
            <div className={'dfields menu-manage-fields mt-2'}>
              <label>Upload Category Image</label>
              <div className={'mt-2'}>
                <ImageUpload maxCount={1} setValue={setValue} fieldName={'category_media'} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'mt-4'} md={12}>
            <ThemeButton loader={loading} size={'lg'} text={'Create'} type={'submit'} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
