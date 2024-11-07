import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {ICreatePrinter} from '../../../interfaces/IPrinter'
import '../../../../assets/css/views/dashboard/printers.scss'
import {toast} from 'react-toastify'
import {PrinterServices} from '../../../services/api-services/printer.services'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import SelectField from '../../../components/dashboard/SelectField'
import {printerTypes} from './CreatePrinter'
import EditPrinterSkeleton from '../../../skeletons/printers/EditPrintersSkeleton'

export default function EditPrinter({
  reloadTable,
  id,
  handleClose,
}: {
  reloadTable?: any
  id?: number
  handleClose?: () => void
}) {
  const navigator = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

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
    setSubmitLoader(true)
    const res = await PrinterServices.update(id?.toString(), data)
    if (res.status) {
      toast.success(res.message)
      navigator('/printers')
      if (reloadTable) {
        reloadTable()
      }
      if (handleClose) {
        handleClose()
      }
    }
    setSubmitLoader(false)
  }

  const getPrinter = async () => {
    setLoading(true)
    const res = await PrinterServices.getById(id?.toString())
    if (res.status) {
      reset(res.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getPrinter()
  }, [])
  return (
    <>
      {!loading ? (
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
                      placeholder={'ip'}
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
                <ThemeButton
                  className={'form-create'}
                  type={'submit'}
                  text={'Save'}
                  loader={submitLoader}
                />
              </div>
            </Col>
          </Row>
        </Form>
      ) : (
        <EditPrinterSkeleton />
      )}
    </>
  )
}
