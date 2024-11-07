import {Controller, useFormContext} from 'react-hook-form'
import {required} from '../../utils/patterns'
import DateRange from './DateRange'
import React from 'react'
import {IDateRange} from '../../interfaces/ITimetable'

export const TimetableDateRange = (data: IDateRange) => {
  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<IDateRange>()

  return (
    <div className={'custom-date-avail'}>
      <h4>Date Range</h4>
      <ul>
        <li>
          <div>
            <Controller
              control={control}
              name={'date_range'}
              rules={{required: required(data.required)}}
              render={({field: {name, value, onChange}}) => (
                <DateRange
                  setValue={setValue}
                  fieldName={name}
                  label={'Start & Expiry date'}
                  errors={errors.date_range}
                  value={value}
                  disabledPrevDates={true}
                />
              )}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}
