import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
import DateRange from '../../../../components/dashboard/DateRange'
import MultiSelectField from '../../../../components/dashboard/MultiSelectField'
import {MdOutlineFastfood} from 'react-icons/md'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {IReportsFilters} from '../../../../interfaces/IReports'
import {BACKEND_CONSTANTS} from '../../../../config/constants'

export default function MenuBreakdownFilters({loading}: {loading: boolean}) {
  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<IReportsFilters>()

  return (
    <>
      <div className={'filter-sec'}>
        <Row>
          <Col md={3} lg={2}>
            <div className={'filter-fields'}>
              <Controller
                name="date_range"
                control={control}
                render={({field: {name}}) => <DateRange setValue={setValue} fieldName={name} />}
              />
            </div>
          </Col>

          <Col className={'d-flex align-items-end'} md={3} lg={2}>
            <ThemeButton
              className={'filter-btn'}
              text={'Apply Filter'}
              type={'submit'}
              loader={loading}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
