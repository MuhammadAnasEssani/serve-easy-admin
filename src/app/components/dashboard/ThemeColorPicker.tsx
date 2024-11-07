import React, {useEffect, useState} from 'react'
import {AnyColorFormat, Colorpicker, ColorPickerTypes} from 'antd-colorpicker'
import {UseFormSetValue} from 'react-hook-form/dist/types/form'

interface IThemeColorPicker {
  popup: boolean
  picker: ColorPickerTypes
  setValue: UseFormSetValue<any>
  fieldName: string
  value?: string | undefined
  errors?: any
}
export default function ThemeColorPicker(options: IThemeColorPicker) {
  const [color, setColor] = useState<AnyColorFormat>()

  const onChange = (color: AnyColorFormat) => {
    // console.log(`options`, options)
    setColor(color)
    console.log(color, 'theme color picker')
    options.setValue(options.fieldName, color.hex)
  }

  useEffect(() => {
    console.log(`options`, options.value)
    options.value && setColor(options.value)
  }, [options.value])

  return (
    <>
      <div className={'theme-color-picker'}>
        <small>Select Color</small>
        <Colorpicker
          popup={options.popup}
          picker={options.picker}
          value={color}
          onChange={onChange}
        />
      </div>
      {
        <div className="errors">
          {options.errors && <small className="field-success">{options.errors.message}</small>}
        </div>
      }
    </>
  )
}
