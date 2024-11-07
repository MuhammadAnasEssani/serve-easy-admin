import React, {useEffect, useState} from 'react'
import ViewCard from '../../../components/dashboard/ViewCard'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import ThemeBtn from '../../../components/authentication/ThemeBtn'
import {ICreateTable} from '../../../interfaces/ITable'
import {useUserContext} from '../../../providers/UserProvider'
import '../../../../assets/css/views/dashboard/table-management.scss'
import {TableService} from '../../../services/api-services/table.service'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../components/dashboard/ThemeButton'

export default function CreateTable({reloadTable, id}: {reloadTable?: any; id?: number}) {
  const {setTitle, establishmentId} = useUserContext()
  const [loader, setLoader] = useState<boolean>(false)
  useEffect(() => {
    setTitle('Create Table')
  }, [])
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
    setLoader(true)
    data.establishment_id = establishmentId
    const res = await TableService.store(data)
    if (res.status) {
      if (res.status) {
        reloadTable()
        toast.success(res.message)
        reset()
        navigate('/table-listings')
      }
    }
    setLoader(false)
  }
  return (
    <>
      <div className={'table-management'}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Row>
              <Col md={12}>
                <div className={'table-fields dfields'}>
                  <Controller
                    name="table_number"
                    // defaultValue={1}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(3)}}
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
                    // defaultValue={0}
                    control={control}
                    rules={{required: Required, maxLength: maxLength(3)}}
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
                <div className={'tab    le-fields dfields'}>
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
                <div className={'button-section'}>
                  <ThemeButton
                    className={'form-create'}
                    text={'Create'}
                    type={'submit'}
                    loader={loader}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  )
}
