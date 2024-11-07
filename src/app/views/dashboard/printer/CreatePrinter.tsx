import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {useUserContext} from '../../../providers/UserProvider'
import {ICreatePrinter} from '../../../interfaces/IPrinter'
import '../../../../assets/css/views/dashboard/printers.scss'
import {toast} from 'react-toastify'
import {PrinterServices} from '../../../services/api-services/printer.services'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import SelectField from '../../../components/dashboard/SelectField'
import {BACKEND_CONSTANTS} from '../../../config/constants'

export const printerTypes = [
  {id: BACKEND_CONSTANTS.PRINTER.TYPE.CASHIER, name: 'CASHIER'},
  {id: BACKEND_CONSTANTS.PRINTER.TYPE.KOT, name: 'KOT'},
  {id: BACKEND_CONSTANTS.PRINTER.TYPE.STATION, name: 'STATION'},
  {id: BACKEND_CONSTANTS.PRINTER.TYPE.BACKUP, name: 'BACKUP'},
]

export default function CreatePrinter({reloadTable}: {reloadTable?: any}) {
  const {establishmentId} = useUserContext()
  const navigator = useNavigate()
  const [loader, setLoader] = useState<boolean>(false)

  const {
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
    control,
  } = useForm<ICreatePrinter>({
    mode: 'onChange',
  })
  const onSubmit = async (data: ICreatePrinter) => {
    setLoader(true)
    const res = await PrinterServices.store(data)
    if (res.status) {
      reloadTable()
      toast.success(res.message)
      reset({
        name: '',
        ip: '',
        establishment_id: establishmentId,
      })
      navigator('/printers')
    }
    setLoader(false)
  }

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <div className={'printers-fields dfields'}>
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
          <Col md={12}>
            <div className={'printers-fields dfields'}>
              <Controller
                name="ip"
                defaultValue={''}
                control={control}
                rules={{required: Required, maxLength: maxLength(20)}}
                render={({field}) => (
                  <TextInput
                    placeholder={'0.0.0.0'}
                    variant={'field-white'}
                    label={'Printer IP'}
                    labelPos={'out'}
                    labelColor={'dark'}
                    type={'text'}
                    field={field}
                    errors={errors.ip}
                  />
                )}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="type"
                defaultValue={0}
                control={control}
                rules={{required: Required}}
                render={({field: {name, ...field}}) => {
                  return (
                    <SelectField
                      label={'Select Type'}
                      errors={errors.type}
                      field={field}
                      selectOptions={printerTypes}
                    />
                  )
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={'mt-auto'}>
          <Col className={'mt-3'} md={12}>
            <div className={'button-section'}>
              <ThemeButton className={'form-create'} text={'Create'} loader={loader} />
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
}
