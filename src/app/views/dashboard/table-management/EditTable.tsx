import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {ICreateTable} from '../../../interfaces/ITable'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/table-management.scss'
import {TableService} from '../../../services/api-services/table.service'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import EditTableSkeleton from '../../../skeletons/table-management/EditTableSkeleton'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function CreateTable({
  reloadTable,
  id,
  handleClose,
}: {
  reloadTable?: any
  id?: number
  handleClose?: () => void
}) {
  const {setTitle, establishmentId} = useUserContext()
  // const {id} = useParams<any>()
  const navigator = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Create Table')
  })

  const getSingleTable = async () => {
    setLoading(true)
    const res = await TableService.getById(id?.toString())
    if (res.status) {
      reset(res.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getSingleTable()
  }, [])

  /*testing*/

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
    control,
    watch,
  } = useForm<ICreateTable>({
    mode: 'onChange',
  })
  const onSubmit = async (data: ICreateTable) => {
    setSubmitLoading(true)
    data.establishment_id = establishmentId
    const res = await TableService.update(id?.toString(), data)
    if (res.status) {
      reloadTable()
      toast.success(res.message)
      reset()
      navigate('/table-listings')
      if (reloadTable) {
        reloadTable()
      }
      if (handleClose) {
        handleClose()
      }
    }
    setSubmitLoading(false)
  }
  return (
    <>
      {!loading ? (
        <div className={'table-management'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={12}>
                <div className={'table-fields dfields'}>
                  <Controller
                    name="table_number"
                    // defaultValue={null}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(20)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'Table Number'}
                        variant={'field-white'}
                        label={'Table Number'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.table_number}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className={'table-fields dfields'}>
                  <Controller
                    name="seating_capacity"
                    defaultValue={0}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(10)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'Seating Capacity'}
                        variant={'field-white'}
                        label={'Seating Capacity'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.seating_capacity}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className={'table-fields dfields'}>
                  <Controller
                    name="floor"
                    // defaultValue={0}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(10)}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'Floor'}
                        variant={'field-white'}
                        label={'Floor'}
                        labelPos={'out'}
                        labelColor={'dark'}
                        type={'number'}
                        field={field}
                        errors={errors.floor}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mt-3'} md={12}>
                <div className={'estab-bts'}>
                  <ThemeButton loader={submitLoading} size={'lg'} text={'Save'} type={'submit'} />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditTableSkeleton />
      )}
    </>
  )
}
