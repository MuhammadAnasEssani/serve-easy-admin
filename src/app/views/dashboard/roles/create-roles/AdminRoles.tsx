import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../../components/authentication/TextInput'
import DashCheckbox from '../../../../components/dashboard/DashCheckbox'
import {IModules} from '../../../../interfaces/IModules'
import {ModuleService} from '../../../../services/api-services/module.service'
import {Controller, useForm} from 'react-hook-form'
import {MaxLength, MinLengthTwo, Required} from '../../../../utils/patterns'
import SelectField from '../../../../components/dashboard/SelectField'
import {useUserContext} from '../../../../providers/UserProvider'
import DashCheckboxWithValue from '../../../../components/dashboard/DashCheckboxWithValue'
import {ICreateRoles} from '../../../../interfaces/IRole'
import {toast} from 'react-toastify'
import {RoleServices} from '../../../../services/api-services/role-services'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {useNavigate} from 'react-router-dom'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import EditRolesSkeleton from '../../../../skeletons/roles/EditRolesSkeleton'

export default function AdminRoles() {
  /*
   * Get All Modules From APIs
   * */
  const {establishments, establishmentId} = useUserContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)

  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: {errors},
    control,
    setValue,
    watch,
    reset,
  } = useForm<ICreateRoles>({
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ICreateRoles) => {
    setSubmitLoader(true)
    data.permissions = data.permissions.filter((row) => row.module_id != null)
    data.display_name = data.name
    const res = await RoleServices.store(data)
    if (res.status) {
      toast.success(res.message)
      reset()
      navigate(`/roles`)
    }
    setSubmitLoader(false)
  }

  const [modules, setModules] = useState<IModules[]>([])

  const fetchMenuServices = async () => {
    /*Fetch All Modules*/
    setLoading(true)
    ModuleService.index().then((res) => {
      setModules(res.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    fetchMenuServices()
  }, [])

  useEffect(() => {
    setValue('establishment_id', establishmentId)
  }, [establishmentId])

  return (
    <>
      {!loading ? (
        <div className={'create-admin-roles'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className={'mt-3'}>
              <Col md={4}>
                <div className={'dfields createrole-fields'}>
                  <Controller
                    name="name"
                    defaultValue={''}
                    control={control}
                    rules={{required: Required, minLength: MinLengthTwo, maxLength: MaxLength}}
                    render={({field}) => (
                      <TextInput
                        placeholder={'Role Name'}
                        variant={'field-white'}
                        label={'Role Name'}
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
              <Col md={4}>
                <div className={'dfields createrole-fields'}>
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
              <Col col={12}>
                <div className={'role-table'}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Module</th>
                        <th scope="col">Create</th>
                        <th scope="col">Read</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((row, index) => {
                        const watchModuleId = watch(`permissions.${index}.module_id`, undefined)
                        return (
                          <tr key={index}>
                            <td data-label={row.name}>
                              <Controller
                                name={`permissions.${index}.module_id`}
                                control={control}
                                defaultValue={null}
                                rules={{}}
                                render={({field: {name, value}}) => (
                                  <DashCheckboxWithValue
                                    label={row.name}
                                    checkedInput={false}
                                    setValue={setValue}
                                    name={name}
                                    value={row.id}
                                    fieldValue={value}
                                  />
                                )}
                              />
                            </td>
                            <td data-label="Create">
                              <Controller
                                name={`permissions.${index}.create`}
                                defaultValue={false}
                                control={control}
                                rules={{}}
                                render={({field: {name, value}}) => (
                                  <DashCheckbox
                                    label={'Create'}
                                    checkedInput={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                          row.id
                                        : false
                                    }
                                    // checkedInput={false}
                                    setValue={setValue}
                                    name={name}
                                    disabled={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT ===
                                          row.id
                                        : true
                                    }
                                    // fieldValue={value}
                                    value={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                          row.id
                                        : false
                                    }
                                    fieldValue={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                          row.id
                                        : false
                                    }
                                  />
                                )}
                              />
                            </td>
                            <td data-label="Read">
                              <Controller
                                name={`permissions.${index}.read`}
                                defaultValue={false}
                                control={control}
                                rules={{}}
                                render={({field: {name, value}}) => (
                                  <DashCheckbox
                                    label={'Read'}
                                    // checkedInput={false}
                                    checkedInput={watchModuleId === row.id}
                                    setValue={setValue}
                                    name={name}
                                    disabled={watchModuleId !== row.id}
                                    // fieldValue={value}
                                    value={watchModuleId === row.id}
                                    fieldValue={watchModuleId === row.id}
                                  />
                                )}
                              />
                            </td>
                            <td data-label="Update">
                              <Controller
                                name={`permissions.${index}.update`}
                                defaultValue={false}
                                control={control}
                                rules={{}}
                                render={({field: {name, value}}) => (
                                  <DashCheckbox
                                    label={'Update'}
                                    // checkedInput={false}
                                    checkedInput={watchModuleId === row.id}
                                    setValue={setValue}
                                    name={name}
                                    disabled={watchModuleId !== row.id}
                                    // fieldValue={value}
                                    value={watchModuleId === row.id}
                                    fieldValue={watchModuleId === row.id}
                                  />
                                )}
                              />
                            </td>
                            <td data-label="Delete">
                              <Controller
                                name={`permissions.${index}.delete`}
                                defaultValue={false}
                                control={control}
                                rules={{}}
                                render={({field: {name, value}}) => (
                                  <DashCheckbox
                                    label={'Delete'}
                                    // checkedInput={false}
                                    checkedInput={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                            row.id &&
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT !== row.id
                                        : false
                                    }
                                    // checkedInput={false}setValue={setValue}
                                    name={name}
                                    setValue={setValue}
                                    disabled={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT ===
                                            row.id ||
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT === row.id
                                        : true
                                    }
                                    // fieldValue={value}
                                    value={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                            row.id &&
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT !== row.id
                                        : false
                                    }
                                    fieldValue={
                                      watchModuleId === row.id
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT !==
                                            row.id &&
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT !== row.id
                                        : false
                                    }
                                  />
                                )}
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={'mb-4 mt-4'} md={12}>
                <div className={'button-section'}>
                  <ThemeButton
                    onClick={() => navigate(-1)}
                    type={'button'}
                    className={'form-cancel'}
                    text={'Cancel'}
                  />
                  <ThemeButton
                    loader={submitLoader}
                    type={'submit'}
                    className={'form-create'}
                    text={'Create'}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <EditRolesSkeleton />
      )}
    </>
  )
}
