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
}

export default function DashCheckboxWithValue({
  label,
  checkedInput,
  setValue,
  name,
  value,
  fieldValue,
}: IDashCheckbox) {
  const [checked, setChecked] = useState<boolean | undefined>(checkedInput)
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked)
  }
  useEffect(() => {
    setValue(name, checked ? value : null)
  }, [checked])

  /*For Edit Scenario*/
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
      <Checkbox checked={checked} onChange={onChange}>
        {label}{' '}
      </Checkbox>
    </>
  )
}
