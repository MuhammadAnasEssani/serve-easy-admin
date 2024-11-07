import {Checkbox} from 'antd'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import React, {useEffect, useState} from 'react'

interface IDashCheckbox {
  label?: string
  onChange?: any
  checkedInput?: boolean
  field?: object
  setValue?: any
  name?: any
  value?: any
  fieldValue?: any
  disabled?: boolean
}

export default function DashCheckbox({
  label,
  checkedInput,
  setValue,
  name,
  value,
  fieldValue,
  disabled,
}: IDashCheckbox) {
  const [checked, setChecked] = useState<boolean | undefined>(checkedInput)
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(!checked)
  }
  useEffect(() => {
    setValue(name, checked ? checked : false)
  }, [checked])

  useEffect(() => {
    setChecked(checkedInput)
  }, [checkedInput])

  /*To reset data, we check if the checkbox is checked and fieldValue has been set to null due to reset() then simply uncheck it.*/
  useEffect(() => {
    if (checked && !fieldValue) {
      setChecked(false)
    }
  }, [fieldValue])

  return (
    <>
      <Checkbox disabled={disabled} checked={checked} value={checked} onChange={onChange}>
        {label}{' '}
      </Checkbox>
    </>
  )
}
