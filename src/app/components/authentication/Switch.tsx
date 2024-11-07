import {Switch} from 'antd'
import React from 'react'
import {UseFormSetValue} from 'react-hook-form/dist/types/form'

interface IThemeSwitch {
  disabled?: boolean
  setValue?: UseFormSetValue<any>
  fieldName: string
  defaultChecked?: boolean
  setSwitchValue?: (checked: boolean) => void
  checked?: boolean
}
export default function ThemeSwitch(options: IThemeSwitch) {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
    options.setValue && options.setValue(options.fieldName, checked)
    options.setSwitchValue && options.setSwitchValue(checked)
  }

  return (
    <>
      <Switch
        disabled={options.disabled}
        defaultChecked={options.defaultChecked}
        checked={options.checked || undefined}
        onChange={onChange}
      />
    </>
  )
}
