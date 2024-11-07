import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import DashCheckbox from '../../../components/dashboard/DashCheckbox'
import {IModules} from '../../../interfaces/IModules'
import {ModuleService} from '../../../services/api-services/module.service'
import {IPaginated} from '../../../interfaces/ICommon'
import {Controller, useForm} from 'react-hook-form'
import {MaxLength, MinLengthTwo, Required} from '../../../utils/patterns'
import SelectField from '../../../components/dashboard/SelectField'
import {useUserContext} from '../../../providers/UserProvider'
import DashCheckboxWithValue from '../../../components/dashboard/DashCheckboxWithValue'
import {ICreateRoles} from '../../../interfaces/IRole'
import {RoleServices} from '../../../services/api-services/role-services'
import {EstablishmentServices} from '../../../services/api-services/establishment.services'
import {IGetEstablishmentDropdown} from '../../../interfaces/IGetEstablishment'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {BACKEND_CONSTANTS} from '../../../config/constants'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import EditRolesSkeleton from '../../../skeletons/roles/EditRolesSkeleton'


export default function EditAdminRoles() {
  /*
   * Get All Modules From APIs
   * */

  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoader, setSubmitLoader] = useState<boolean>(false)
  const {isRestaurantAdmin, user, isUserReady} = useUserContext()
  const {id} = useParams<any>()
  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: {errors},
    control,
    watch,
    setValue,
    reset,
  } = useForm<ICreateRoles>({
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ICreateRoles) => {
    setSubmitLoader(true)
    data.permissions = data.permissions.filter((row) => row.module_id != null)
    data.display_name = data.name
    const res = await RoleServices.updateRole(id, data)
    if (res.status) {
      toast.success(res.message)
      reset()
      navigate('/roles', {replace: true})
    }
    setSubmitLoader(false)
  }

  const [singleRole, setSingleRole] = useState<ICreateRoles>()
  const [modules, setModules] = useState<IModules[]>([])
  const [establishments, setEstablishments] = useState<IGetEstablishmentDropdown[]>([])
  const getSingleRole = async () => {
    setLoading(true)
    const result = await RoleServices.getById(id)
    if (result) {
      const roleResult: ICreateRoles = {
        name: result.data.name,
        display_name: result.data.display_name,
        establishment_id: result.data.establishment_id,
        permissions: result.data.permissions.map((data) => {
          return {
            module_id: data.id,
            create: data.meta?.pivot_create,
            read: data.meta?.pivot_read,
            update: data.meta?.pivot_update,
            delete: data.meta?.pivot_delete,
          }
        }),
      }
      setSingleRole(roleResult)
      setValue('name', roleResult.name)
      setValue('establishment_id', roleResult.establishment_id)
    }
    setLoading(false)
  }

  const fetchMenuServices = async () => {
    /*Fetch All Modules*/
    setLoading(true)
    ModuleService.index().then((res: IPaginated<IModules[]>) => {
      setModules(res.data)
      setLoading(false)
    })

    /*Fetch All Establishments*/
    EstablishmentServices.all().then((res) => {
      setEstablishments(res.data)
    })
  }

  useEffect(() => {
    fetchMenuServices()
    getSingleRole()
  }, [])

  /*Set establishment in case of restaurant owner or establishment level employee*/
  useLayoutEffect(() => {
    !isRestaurantAdmin && isUserReady && setValue('establishment_id', user.establishment_id)
  }, [user])

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
                    <tbody>
                      {modules.map((row, index) => {
                        const watchModuleId = watch(`permissions.${index}.module_id`, undefined)
                        const moduleSelected = watchModuleId === row.id
                        const rowMatched = singleRole?.permissions.find(
                          (permission) => permission.module_id === row.id
                        )
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
                                    checkedInput={singleRole?.permissions.some(
                                      (permission) => permission.module_id === row.id
                                    )}
                                    setValue={setValue}
                                    name={name}
                                    value={row.id}
                                    fieldValue={row.id}
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
                                      rowMatched && moduleSelected
                                        ? rowMatched?.create === 1
                                        : moduleSelected
                                        ? row.id !==
                                          BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT
                                        : false
                                    }
                                    setValue={setValue}
                                    name={name}
                                    disabled={
                                      moduleSelected
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT ===
                                          row.id
                                        : true
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
                                    checkedInput={
                                      rowMatched && moduleSelected
                                        ? rowMatched?.read === 1
                                        : moduleSelected
                                    }
                                    setValue={setValue}
                                    name={name}
                                    disabled={watchModuleId !== row.id}
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
                                    checkedInput={
                                      rowMatched && moduleSelected
                                        ? rowMatched?.update === 1
                                        : moduleSelected
                                    }
                                    setValue={setValue}
                                    name={name}
                                    disabled={watchModuleId !== row.id}
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
                                    checkedInput={
                                      rowMatched && moduleSelected
                                        ? rowMatched?.delete === 1
                                        : moduleSelected
                                        ? row.id !==
                                            BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT &&
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT !== row.id
                                        : false
                                    }
                                    setValue={setValue}
                                    name={name}
                                    disabled={
                                      moduleSelected
                                        ? BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT ===
                                            row.id ||
                                          BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT === row.id
                                        : true
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
                    text={'Save'}
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
