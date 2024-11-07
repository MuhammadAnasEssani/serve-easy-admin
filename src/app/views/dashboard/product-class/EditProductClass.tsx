import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import {IProductClassCreate} from '../../../interfaces/IProductClass'
import {ProductClassServices} from '../../../services/api-services/product-class-service'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import EditModifierClassSkeleton from '../../../skeletons/menu-management/modifiers/EditModifiersClassSkeleton'
import EditProductClassSkeleton from '../../../skeletons/menu-management/product-class/EditProductClassSkeleton'

export default function EditProductClass({
  reloadTable,
  id,
  handleClose,
}: {
  reloadTable?: any
  id?: number
  handleClose?: () => void
}) {
  const [loader, setLoader] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  const {setTitle} = useUserContext()
  // const {id} = useParams<any>()
  const navigator = useNavigate()
  const [change, setChange] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Product Class')
  }, [])
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<IProductClassCreate>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IProductClassCreate) => {
    setSubmitLoader(true)
    console.log(data)
    const res = await ProductClassServices.update(id?.toString(), data)
    if (res.status) {
      toast.success(res.message)
      setChange(!change)
      reset()
      navigator(`/product-classes`)
      if (reloadTable) {
        reloadTable()
      }
      if (handleClose) {
        handleClose()
      }
    }
    setSubmitLoader(false)
  }
  const getSingleProductClass = async () => {
    setLoader(true)
    const res = await ProductClassServices.getById(id?.toString())
    // console.log(res)
    if (res.status) {
      reset(res.data)
    }
    setLoader(false)
  }
  useEffect(() => {
    getSingleProductClass()
  }, [change])
  return (
    <>
      {!loader ? (
        <div className={'add-modifier-class'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className={'modifier-fields dfields'}>
                  <Controller
                    name="name"
                    defaultValue={''}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(100)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'name'}
                        variant={'field-white'}
                        label={'Name'}
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
              <Col className={'mb-4 mt-1'} md={12}>
                <div className={'button-section'}>
                  <ThemeButton className={'form-create'} text={'Update'} loader={loader} />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditProductClassSkeleton />
      )}
    </>
  )
}
