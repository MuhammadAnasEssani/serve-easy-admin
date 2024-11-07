import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {useUserContext} from '../../../providers/UserProvider'
import {useNavigate} from 'react-router-dom'
import {Controller, useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import {Required} from '../../../utils/patterns'
import SelectField from '../../../components/dashboard/SelectField'
import {IVersion} from '../../../interfaces/IVersionManagement'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import TextInput from '../../../components/authentication/TextInput'
import {VersionService} from '../../../services/api-services/version.service'
import {toast} from 'react-toastify'

export default function VersionManagement() {
  const navigator = useNavigate()
  const [loader, setLoader] = useState<boolean>(false)
  const {setTitle} = useUserContext()

  useEffect(() => {
    setTitle('Version Management')
  }, [])

  const {
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
    control,
    watch,
  } = useForm<IVersion>({
    mode: 'onChange',
  })

  const watchType = watch('type')

  const onSubmit = async (data: IVersion) => {
    setLoader(true)
    const res = await VersionService.store(data)
    if (res.status) {
      toast.success(res.message)
    }
    setLoader(false)
  }

  const fetchVersion = async () => {
    const res = await VersionService.getByType(watchType)
    if (res.data) {
      reset(res.data)
    } else {
      let resetData = {
        type: watchType,
      }
      reset(resetData)
    }
  }

  useEffect(() => {
    if (watchType) {
      fetchVersion()
    }
  }, [watchType])

  const updateTypes = [
    {id: 'pos', name: 'POS'},
    {id: 'mobile', name: 'Mobile App'},
  ]
  const forceUpdate = [
    {id: 1, name: 'Yes'},
    {id: 0, name: 'No'},
  ]
  return (
    <ViewCard>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="type"
                control={control}
                rules={{required: Required}}
                render={({field: {name, ...field}}) => {
                  return (
                    <SelectField
                      label={'Select Type'}
                      errors={errors.type}
                      field={field}
                      placeholder={'Select Type'}
                      selectOptions={updateTypes}
                    />
                  )
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'printers-fields dfields'}>
              <Controller
                name="version"
                control={control}
                defaultValue={''}
                rules={{required: Required}}
                render={({field: {name, ...field}}) => {
                  return (
                    <TextInput
                      label={'Version'}
                      errors={errors.version}
                      field={field}
                      placeholder={'Enter Version'}
                      variant={'field-white'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                    />
                  )
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={'printers-fields dfields'}>
              <Controller
                name="build_no"
                control={control}
                defaultValue={0}
                rules={{required: Required}}
                render={({field: {name, ...field}}) => {
                  return (
                    <TextInput
                      label={'Build no.'}
                      errors={errors.version}
                      field={field}
                      placeholder={'Enter build no.'}
                      variant={'field-white'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'text'}
                    />
                  )
                }}
              />
            </div>
          </Col>

          <Col md={4}>
            <div className={'dfields menu-manage-fields'}>
              <Controller
                name="force_update"
                control={control}
                defaultValue={false}
                render={({field: {name, ...field}}) => {
                  return (
                    <SelectField
                      label={'Force Update'}
                      errors={errors.force_update}
                      field={field}
                      placeholder={'Yes or No'}
                      selectOptions={forceUpdate}
                    />
                  )
                }}
              />
            </div>
          </Col>
        </Row>
        <div className={'button-section'}>
          <ThemeButton
            onClick={() => navigator(-1)}
            type={'button'}
            className={'form-cancel'}
            text={'Cancel'}
          />
          <ThemeButton loader={loader} type={'submit'} className={'form-create'} text={'Save'} />
        </div>
      </Form>
    </ViewCard>
  )
}
