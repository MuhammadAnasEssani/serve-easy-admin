import React from 'react'
import {Form} from 'react-bootstrap'
import {ICheckField} from '../../interfaces/IFields'

export default function CheckField(options: ICheckField) {
  return (
    <div
      className={`check-field ${options.checkedColor} ${options.checkColor} ${options.borderType}`}
    >
      <Form.Check type={options.type} label={options.label} />
    </div>
  )
}
