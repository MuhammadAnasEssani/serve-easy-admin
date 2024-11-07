import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm, useFormContext} from 'react-hook-form'
import DateRange from '../../../components/dashboard/DateRange'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import {TbLayoutDashboard} from 'react-icons/tb'
import {MdOutlineFastfood} from 'react-icons/md'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {IDealComboFilters, IDealComboListing} from '../../../interfaces/IDealsCombo'
import {IDatatableParams} from '../../../interfaces/IDatatable'
import {DealComboServices} from '../../../services/api-services/deal-combo.services'
import {BACKEND_CONSTANTS, PAGINATION} from '../../../config/constants'
import {useUserContext} from '../../../providers/UserProvider'
import {TablePaginationConfig} from 'antd/lib/table'

export default function ComboListingFilters({loading}: {loading: boolean}) {
  const types = [
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.DEAL,
      name: 'Deal',
    },
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.TYPES.COMBO,
      name: 'Combo',
    },
  ]

  const status = [
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.STATUS.ACTIVE,
      name: 'Active',
    },
    {
      id: BACKEND_CONSTANTS.DEAL_COMBO.STATUS.INACTIVE,
      name: 'Inactive',
    },
  ]

  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<IDealComboFilters>()

  return (
    <div className={'filter-sec'}>
      <Row>
        <Col sm={12} md={3} lg={3} xl={3} xxl={2}>
          <div className={'filter-fields'}>
            <Controller
              name="date_range"
              control={control}
              render={({field: {name}}) => <DateRange setValue={setValue} fieldName={name} />}
            />
          </div>
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} xxl={2}>
          <div className={'filter-fields'}>
            <Controller
              name="status"
              control={control}
              render={({field}) => (
                <MultiSelectField
                  errors={errors.status}
                  field={field}
                  selectOptions={status}
                  maxTagCount={1}
                  prefixIcon={<TbLayoutDashboard />}
                />
              )}
            />
          </div>
        </Col>
        <Col sm={12} md={3} lg={3} xl={3} xxl={2}>
          <div className={'dfields menu-manage-fields filter-fields'}>
            <Controller
              name="type"
              control={control}
              render={({field}) => (
                <MultiSelectField
                  errors={errors.type}
                  field={field}
                  selectOptions={types}
                  maxTagCount={1}
                  prefixIcon={<MdOutlineFastfood />}
                />
              )}
            />
          </div>
        </Col>
        <Col className={'d-flex'} sm={12} md={3} lg={3} xl={3} xxl={2}>
          <ThemeButton
            className={'filter-btn'}
            text={'Apply Filter'}
            type={'submit'}
            loader={loading}
          />
        </Col>
      </Row>
    </div>
  )
}
