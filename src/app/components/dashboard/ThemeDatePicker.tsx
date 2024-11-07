import {DatePicker} from 'antd'
import React, {useState} from 'react'
import {FieldError, FieldErrors, Merge} from 'react-hook-form'
import {SizeType} from 'antd/es/config-provider/SizeContext'
import { Moment } from 'moment'

interface Idatepicker {
  disabled?: boolean
  register?: object
  errors?: FieldError | Merge<FieldError, FieldErrors<any>> | undefined | any
  rest?: object
  message?: any
  onChange?: any
  status?: any
  field?: object
  setValue?: any
  value?: string
  fieldName?: string
  label?: string
  size?: SizeType
  defaultValue?: any
}
export default function ThemeDatePicker({setValue, fieldName, label, size, errors, defaultValue}: Idatepicker) {
  const [date, setDate] = useState<any>()

  function onChange(date: any, dateString: any) {
    /*
     * If date is cleared, then set it null
     * otherwise it will set empty string in an array
     * */
    if (Array.isArray(dateString) && dateString.includes('')) {
      dateString = null
    }

    if (setValue) {
      setValue(fieldName, dateString)
    }
  }
  return (
    <>
      {/*<Space direction="vertical" size={0}>*/}

      {/*</Space>*/}
      <div className={'Select-field'}>
        <label>{label}</label>
        <div className={`select-field-prefix `}>
          <DatePicker className={'single-date-picker-select'} onChange={onChange} size={size} defaultValue={defaultValue} />
          {errors && <span className={'errors d-block p-0 pt-1'}>{errors.message}</span>}
        </div>
      </div>
    </>
  )
}
