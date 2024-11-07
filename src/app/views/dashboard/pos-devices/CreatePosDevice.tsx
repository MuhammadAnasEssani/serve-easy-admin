import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {useUserContext} from '../../../providers/UserProvider'
import {ICreateDevice} from '../../../interfaces/IPosDevice'
import {PosDeviceServices} from '../../../services/api-services/posDevice.services'
import {toast} from 'react-toastify'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function CreatePosDevice({
  setActive,
  reloadTable,
}: {
  setActive: Dispatch<SetStateAction<boolean>>
  reloadTable: any
}) {
  const {establishmentId} = useUserContext()
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  const onSubmit = async (data: ICreateDevice) => {
    setLoading(true)
    const response = await PosDeviceServices.store(data)
    if (response.status) {
      reloadTable()
      toast.success(response.message)
      reset({
        name: '',
        establishment_id: establishmentId,
      })
    }
    setLoading(false)
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
            <ThemeButton loader={loading} size={'lg'} text={'Create'} type={'submit'} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
