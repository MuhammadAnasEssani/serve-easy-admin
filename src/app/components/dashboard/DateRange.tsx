import {DatePicker, Space} from 'antd'
import React, {useState} from 'react'
import {FieldError, FieldErrors, Merge} from 'react-hook-form'
import {SizeType} from 'antd/es/config-provider/SizeContext'
import moment from 'moment'
import {BsCalendar2Date} from 'react-icons/bs'
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
  value?: string[]
  fieldName?: string
  label?: string
  size?: SizeType
  disabledPrevDates?: boolean
}
export default function DateRange({setValue, fieldName, label, size, errors, value, disabledPrevDates}: Idatepicker) {
  const {RangePicker} = DatePicker
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
      <Space direction="vertical" size={12}>
        {label && <label>{label}</label>}
        {disabledPrevDates ? 
        <RangePicker
          onChange={onChange}
          size={size}
          value={value && [moment(value?.[0], 'YYYY-MM-DD'), moment(value?.[1], 'YYYY-MM-DD')]}
          disabledDate={(current: any) =>
            current && current < moment().subtract(1, 'days')
          }
          // suffixIcon={<BsCalendar2Date/>}
          // superNextIcon={<BsCalendar2Date/>}
          // superPrevIcon={<BsCalendar2Date/>}
          prevIcon={<BsCalendar2Date />}
        />
        :
        <RangePicker
          onChange={onChange}
          size={size}
          value={value && [moment(value?.[0], 'YYYY-MM-DD'), moment(value?.[1], 'YYYY-MM-DD')]}
          // suffixIcon={<BsCalendar2Date/>}
          // superNextIcon={<BsCalendar2Date/>}
          // superPrevIcon={<BsCalendar2Date/>}
          prevIcon={<BsCalendar2Date />}
          />
        }
        {errors && <span className={'errors d-block p-0 pt-1'}>{errors.message}</span>}
      </Space>
    </>
  )
}
