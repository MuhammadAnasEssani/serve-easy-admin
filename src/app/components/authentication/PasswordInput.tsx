import React from 'react'
import {Form} from 'react-bootstrap'
import '../../../assets/css/components/authentication/fileds.scss'
import {IPasswordField} from '../../interfaces/IFields'
import {SkeletonInput, SkeletonLabel} from '../Skeleton'

export default function PasswordInput(options: IPasswordField) {
  return (
    <>
      {options.labelPos === 'out' && (
        <Form.Label
          className={`label-outside ${
            options.labelColor === 'white' ? 'label-white' : 'label-dark'
          }`}
        >
          {options.loader ? <SkeletonLabel /> : options.label}
        </Form.Label>
      )}
      {options.loader ? (
        <SkeletonInput />
      ) : (
        <div
          className={`field-box ${options.variant} ${options.errors ? 'field-error ' : ''} ${
            options.labelPos === 'in' ? 'label-in' : 'label-out'
          }`}
        >
          {options.fieldIcon && <div className="input-icon">{options.fieldIcon}</div>}
          <Form.Group className="form-group" controlId="formBasicEmail">
            {options.labelPos === 'in' && (
              <Form.Label
                className={`${options.labelColor === 'white' ? 'label-white' : 'label-dark'}`}
              >
                {options.label}
              </Form.Label>
            )}
            <Form.Control
              type={options.showPassword ? 'password' : 'text'}
              placeholder={options.placeholder}
              {...options.field}
              {...options.register}
              {...options.rest}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <div
            className="error-icon"
            onClick={() => options.setShowPassword(!options.showPassword)}
          >
            {options.showPassword ? (
              <div className="field-success" style={{cursor: 'pointer'}}>
                {options.successIcon}
              </div>
            ) : (
              <div className="field-error" style={{cursor: 'pointer'}}>
                {options.errorIcon}
              </div>
            )}
          </div>
        </div>
      )}
      {
        <div className="errors">
          {options.errors && <small className="field-success">{options.errors.message}</small>}
        </div>
      }
    </>
  )
}
