import React, {useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import {useUserContext} from '../../../providers/UserProvider'
import ThemeBtn from '../../../components/authentication/ThemeBtn'
import '../../../../assets/css/views/dashboard/modifiers-module.scss'
import {IProductClassCreate} from '../../../interfaces/IProductClass'
import {ProductClassServices} from '../../../services/api-services/product-class-service'
import {toast} from 'react-toastify'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function AddProductClass({reloadTable, id}: {reloadTable?: any; id?: number}) {
  const [loader, setLoader] = useState<boolean>(false)
  const {setTitle} = useUserContext()
  const navigator = useNavigate()
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
    setLoader(true)
    console.log(data)
    const res = await ProductClassServices.store(data)
    if (res.status) {
      toast.success(res.message)
      reset()
      reloadTable()
    }
    setLoader(false)
  }
  return (
    <>
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
            <Col md={12}>
              <div className={'button-section'}>
                <ThemeButton className={'form-create'} text={'Create'} loader={loader} />
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}
