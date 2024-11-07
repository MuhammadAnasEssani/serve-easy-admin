import {TimePicker} from 'antd'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {FieldError, FieldErrors, Merge} from 'react-hook-form'

interface Itimepicker {
  disabled?: boolean
  register?: object
  errors?: FieldError | Merge<FieldError, FieldErrors<any>> | undefined | any
  rest?: object
  message?: any
  onChange?: any
  status?: any
  field?: object
  setValue?: any
  fieldName?: string
  value: string
  isCheckALL?: boolean
}
export default function ThemeTimePicker({
  disabled,
  register,
  errors,
  message,
  onChange,
  rest,
  field,
  setValue,
  fieldName,
  value,
}: Itimepicker) {
  const [time, setTime] = useState<any>()
  useEffect(() => {
    if (setValue && time) setValue(fieldName, moment(time).format('HH:mm:ss'))
  }, [time, value])

  return (
    <div>
      {value ? (
        <TimePicker
          onChange={(e) => {
            setTime(e)
          }}
          disabled={disabled}
          {...register}
          value={moment(value, 'h:mm:a')}
          status={errors && 'error'}
          {...field}
          use12Hours
          format="h:mm a"
        />
      ) : (
        <TimePicker
          onChange={(e) => {
            setTime(e)
          }}
          disabled={disabled}
          value={moment(value || '09:00:00', 'h:mm:a')}
          {...register}
          status={errors && 'error'}
          {...field}
          use12Hours
          format="h:mm a"
        />
      )}
      {errors && <span className={'errors d-block p-0 pt-1'}>{errors.message}</span>}
    </div>
  )
}
