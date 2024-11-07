import React from 'react'
import {Form} from 'react-bootstrap'
import {ITextField} from '../../interfaces/IFields'
import {SkeletonInput, SkeletonLabel} from '../Skeleton'
import '../../../assets/css/components/authentication/fileds.scss'

export default function TextInput(options: ITextField) {
  return (
    <>
      <div className={`text-field-area ${options.labelPos === 'out' && 'field-area-out'}`}>
        {options.labelPos === 'out' && (
          <Form.Label
            className={` ${options.labelColor === 'light' ? 'label-light' : 'label-dark'}`}
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

            <Form.Group className="form-group">
              {options.labelPos === 'in' && (
                <>
                  {options.label && (
                    <>
                      <Form.Label
                        className={`${
                          options.labelColor === 'white' ? 'label-white' : 'label-dark'
                        }`}
                      >
                        {options.label}
                      </Form.Label>
                    </>
                  )}
                </>
              )}
              <Form.Control
                disabled={options.disabled}
                type={options.type}
                min={0}
                placeholder={options.placeholder}
                {...options.rest}
                {...options.field}
              />

              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            {options.successIcon && (
              <div className="error-icon">
                {!options.errors ? (
                  <div className="field-success">{options.successIcon} </div>
                ) : (
                  <div className="field-error">{options.errorIcon}</div>
                )}
              </div>
            )}
          </div>
        )}
        {
          <div className="errors">
            {options.errors && <small className="field-success">{options.errors.message}</small>}
          </div>
        }
      </div>
    </>
  )
}
