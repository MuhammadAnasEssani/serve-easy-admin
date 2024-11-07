import {FormCheckType} from 'react-bootstrap/FormCheck'
import {Dispatch, SetStateAction} from 'react'
import {ControllerRenderProps} from 'react-hook-form'

export interface ICheckField {
  label: string
  type: FormCheckType
  checkColor: string
  checkedColor: string
  borderType: string
}

export interface IEmailField {
  fieldIcon?: JSX.Element
  label: string
  labelColor: string
  type: string
  labelPos: string
  successIcon?: JSX.Element
  errorIcon?: JSX.Element
  placeholder: string
  register?: object
  errors?: any
  variant: string
  rest?: object
  message?: any
  field?: ControllerRenderProps<any, any>
  disabled?: boolean
  loader?: boolean
}

export interface IFormCard {
  bgColor?: string
  children?: JSX.Element | JSX.Element[]
}

export interface IPasswordField {
  fieldIcon?: JSX.Element
  variant: any
  labelPos: any
  label: string
  labelColor: string
  type: string
  successIcon?: JSX.Element
  errorIcon?: JSX.Element
  placeholder: string
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
  register?: object
  errors?: any
  message?: string
  rest?: object
  field?: object
  loader?: boolean
}

export interface IPhoneField {
  fieldIcon?: JSX.Element
  variant: string
  label: string
  labelColor: string
  labelPos: string
  type: string
  successIcon?: JSX.Element
  errorIcon?: JSX.Element
  placeholder?: string
  register?: object
  errors?: any
  message?: string
  rest?: object
  field?: object
  loader?: boolean
  disabled?: boolean
}

export interface ITextField {
  fieldIcon?: JSX.Element
  variant: string
  label?: string
  labelColor: string
  labelPos: string
  type: string
  successIcon?: JSX.Element
  errorIcon?: JSX.Element
  placeholder?: string
  register?: object
  errors?: any
  message?: string
  rest?: object
  field?: object
  loader?: boolean
  disabled?: boolean
}

export interface IDescriptionField {
  fieldIcon?: JSX.Element
  variant: string
  label: string
  labelColor: string
  labelPos: string
  type: string
  successIcon?: JSX.Element
  errorIcon?: JSX.Element
  placeholder?: string
  register?: object
  errors?: any
  message?: string
  rest?: object
  field?: object
  loader?: boolean
  disabled?: boolean
}

export interface ISelectField {
  label?: string
  onChange?: any
  handleChange?: any
  defaultValue?: any
  value?: any
  register?: object
  errors?: any
  message?: string
  rest?: object
  field?: object
  selectOptions?: any[]
  disabled?: boolean
  setSelectedEstablishment?: (value: number) => void
  loader?: boolean
  placeholder?: string
  maxTagCount?: number
  setValue?: any
  name?: string
  setProducts?: Dispatch<SetStateAction<any>>
  index?: number
  nameWithPrice?: boolean
  prefixIcon?: JSX.Element
  loading?: boolean
}
export interface IBtn {
  variant?: string
  size?: 'sm' | 'lg' | undefined
  text: string
  type?: 'button' | 'submit' | 'reset' | undefined
  to?: 'string'
  loader?: boolean
  disabled?: boolean
}
