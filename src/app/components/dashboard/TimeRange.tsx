import {TimePicker} from 'antd'
import React, {useState} from 'react'
import {FieldError, FieldErrors, Merge} from 'react-hook-form'

interface Itimerange {
  disabled?: boolean
  register?: object
  errors?: FieldError | Merge<FieldError, FieldErrors<any>> | undefined
  rest?: object
  message?: any
  onChange?: any
}
export default function TimeRange({
  disabled,
  register,
  errors,
  message,
  onChange,
  rest,
}: Itimerange) {
  const [time, setTime] = useState<any>()
  function ChangeTime(e: any) {
    console.log(e.target.value)
  }

  // const onChange = (time: Moment, timeString: string) : void => {
  //     console.log("hasdfkasdf")
  //     console.log(time, timeString);
  // };

  return (
    <>
      <TimePicker.RangePicker
        onChange={(e) => onChange}
        disabled={disabled}
        {...register}
        use12Hours
        format="h:mm a"
      />
      {errors && <span> Hello {message}</span>}
    </>
  )
}
