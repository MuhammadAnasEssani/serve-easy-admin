export const EmailValidation = {
  value: new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  ),
  message: 'invalid email format',
}

export const PasswordValidation = {
  value: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~^.#$@!%&*=?])[A-Za-z\d`~^.#$@!%&*=?]{8,30}$/
  ),
  message:
    'Password must contain atleast one uppercase letter, one lowercase letter, one number, one symbol.',
}
export const PhoneValidation = {
  value: new RegExp(/^(?!0+$)[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,9}$/im),
  message: 'Please enter valid phone Number.',
}
export const MacAddressValidation = {
  value: new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/),
  message: 'Please enter valid mac address.',
}
export const PercentageValidation = {
  value: new RegExp(/^(100(?:\.0{1,2})?|0*?\.\d{1,2}|\d{1,2}(?:\.\d{1,2})?)$/),
  message: 'Not valid.',
}

export const minLength = (value: number) => {
  return {
    value,
    message: 'min length is ' + value,
  }
}
export const maxLength = (value: number) => {
  return {
    value,
    message: 'max length is ' + value,
  }
}
export const MinLength = {
  value: 8,
  message: 'min length is 8',
}

export const MinLengthTwo = {
  value: 2,
  message: 'min length is 2',
}

export const MaxLength = {
  value: 255,
  message: 'max length is 255',
}
export const Required = {
  value: true,
  message: 'This field is required',
}

export const required = (value: boolean) => {
  return {
    value,
    message: 'This field is required',
  }
}
