import React from 'react'
import {Form} from 'react-bootstrap'
import {IPhoneField} from '../../interfaces/IFields'
import {Skeleton} from 'antd'
import {SkeletonInput, SkeletonLabel} from '../Skeleton'
import '../../../assets/css/components/authentication/fileds.scss'
import 'react-phone-number-input/style.css'
import CountryPhoneInput from 'react-phone-number-input'

export default function PhoneInput(options: IPhoneField) {
  return (
    <>
      <div className={`text-field-area ${options.labelPos === 'out' && 'field-area-out'}`}>
        {options.labelPos === 'out' && (
          <Form.Label
            className={` ${options.labelColor == 'white' ? 'label-white' : 'label-dark'}`}
          >
            {options.loader ? <SkeletonLabel /> : options.label}
          </Form.Label>
        )}
        {options.loader ? (
          <SkeletonInput />
        ) : (
          <div
            className={`field-box ${options.variant} ${options.errors ? 'field-error ' : ''} ${
              options.labelPos == 'in' ? 'label-in' : 'label-out'
            }`}
          >
            {options.fieldIcon && <div className="input-icon">{options.fieldIcon}</div>}

            <Form.Group className="form-group">
              {options.labelPos === 'in' && (
                <Form.Label
                  className={`${options.labelColor == 'white' ? 'label-white' : 'label-dark'}`}
                >
                  {options.label}
                </Form.Label>
              )}
              {/* <Form.Control
                type={options.type}
                placeholder={options.placeholder}
                {...options.rest}
                {...options.field}
              /> */}
              <CountryPhoneInput
                placeholder={options.placeholder}
                className="country-phone-input"
                onChange={() => {}}
                disabled={options.disabled}
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
