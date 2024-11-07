import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {useUserContext} from '../../../providers/UserProvider'
import {ICreateDevice} from '../../../interfaces/IPosDevice'
import {PosDeviceServices} from '../../../services/api-services/posDevice.services'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function EditPosDevice({
  reloadTable,
  id,
  handleClose,
}: {
  reloadTable: any
  id?: number
  handleClose: () => void
}) {
  const {establishmentId} = useUserContext()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors},
    control,
  } = useForm<ICreateDevice>({
    mode: 'onChange',
  })

  const getDevice = async () => {
    setLoading(true)
    const response = await PosDeviceServices.getById(id?.toString())
    if (response.status) {
      reset(response.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getDevice()
  }, [])

  const onSubmit = async (data: ICreateDevice) => {
    setSubmitLoading(true)
    const response = await PosDeviceServices.update(id?.toString(), data)
    if (response.status) {
      reloadTable()
      toast.success(response.message)
      reloadTable()
      handleClose()
    }
    setSubmitLoading(false)
  }

  return (
    <div className={'create-device'}>
      <Form id="create-device" onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder={'Device Name'}
                    variant={'field-white'}
                    label={'Device Name'}
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
          <Col className={'mt-4'} md={12}>
            <ThemeButton loader={submitLoading} size={'lg'} text={'Save'} type={'submit'} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
