import React, {Dispatch, useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap/'
import type {RadioChangeEvent} from 'antd'
import {Radio, Space} from 'antd'
import {Controller, useFormContext} from 'react-hook-form'
import {maxLength, PercentageValidation, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import '../../../../assets/css/views/dashboard/pos-setting.scss'
import {ISettings} from '../../../interfaces/ISettings'
import {BsPercent} from 'react-icons/bs'
import ThemeSwitch from '../../../components/authentication/Switch'

interface IPOS {
  setIsValid: Dispatch<boolean>
}
export default function PosSetting({setIsValid}: IPOS) {
  const {
    control,
    reset,
    formState: {errors, isValid, isSubmitting},
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useFormContext<ISettings>()
  const [logoutOption, setLogoutOption] = useState(1)
  const [tipInput, setTipInput] = useState<boolean>(false)
  const posIdleTimeDefaultValue = 5
  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 1) {
      setValue('pos_idle_time', null)
    } else if (e.target.value === 2) {
      setValue('pos_idle_time', posIdleTimeDefaultValue) //setting 5 minutes default time
    }
    setLogoutOption(e.target.value)
  }
  const tips = ['1', '2', '3', '4']

  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = ['pos_idle_time', 'tips']
    for (const field of fields) {
      if (errorsArray?.includes(field)) {
        setIsValid(false)
        break
      } else {
        setIsValid(true)
      }
    }
  }, [isSubmitting])

  useEffect(() => {
    const posIdleTimeValue = getValues('pos_idle_time')
    if (posIdleTimeValue && posIdleTimeValue > 0) {
      setLogoutOption(2)
    }
  }, [getValues('pos_idle_time')])
  useEffect(() => {
    let tipsValue = getValues('tips')
    if (tipsValue && tipsValue.length === 4 && !tipsValue.some((tip) => !tip.percentage)) {
      setTipInput(true)
    }
  }, [getValues('tips')])

  const handleChangeTipStatus = (status: boolean) => {
    if (!status) {
      tips.forEach((tip, index) => setValue(`tips.${index}.percentage`, 0))
    }
    setTipInput(status)
  }
  return (
    <>
      <div className={'pos-setting'}>
        <Row>
          <Col md={4}>
            <div className={''}>
              <div className={'dfields pos-logout-field'}>
                <h3 className={'pos-heading'}>No Activity Log out</h3>
                <Radio.Group onChange={onChange} value={logoutOption}>
                  <Space direction="vertical">
                    <Radio value={1}>Never automatically log out</Radio>
                    <Radio value={2}>
                      <div className={'radio-min'}>
                        <small>Log out after</small>
                        <div className={'dfields'}>
                          <Controller
                            name="pos_idle_time"
                            control={control}
                            defaultValue={posIdleTimeDefaultValue || ''}
                            rules={{
                              maxLength: maxLength(50000),
                              validate: {
                                required: (value) => {
                                  if (!value && logoutOption === 2) {
                                    return 'field is required'
                                  } else {
                                    return true
                                  }
                                },
                              },
                            }}
                            render={({field}) => (
                              <div className={'minutes-input'}>
                                <TextInput
                                  placeholder={'add minutes'}
                                  variant={'field-white'}
                                  // label={""}
                                  disabled={logoutOption === 1}
                                  labelPos={''}
                                  labelColor={'dark'}
                                  type={'number'}
                                  field={field}
                                  errors={errors.pos_idle_time}
                                />
                                <div>Minutes</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
              <div className={'dfields'}>
                <Controller
                  name="service_charges"
                  control={control}
                  rules={{required: Required, pattern: PercentageValidation}}
                  defaultValue={0}
                  render={({field}) => (
                    <TextInput
                      placeholder={'add charges'}
                      variant={'field-white'}
                      label={'Service Charges (%)'}
                      labelPos={'out'}
                      labelColor={'dark'}
                      type={'number'}
                      field={field}
                      errors={errors.service_charges}
                    />
                  )}
                />
              </div>
              <div className={"dfields"}>
                                <Controller
                                    name="delivery_charges"
                                    control={control}
                                    rules={{required:Required}}
                                    defaultValue={0}
                                    render={({ field }) => (
                                        <TextInput
                                            placeholder={"add charges"}
                                            variant={"field-white"}
                                            label={"Delivery Charges"}
                                            labelPos={"out"}
                                            labelColor={"dark"}
                                            type={"number"}
                                            field={field}
                                            errors ={errors.delivery_charges}
                                        />
                                    )}
                                />
                            </div>
                            <div className={'tip-field'}>
                <h3 className={'pos-heading'}>
                  Tip <span> (Add the tip to both credit and cash payments)</span>
                </h3>
                <div className={'tip-switch'}>
                  <div className={'dfields'}>
                    <Controller
                      name="tip_status"
                      control={control}
                      defaultValue={false}
                      // rules = {{required : Required}}
                      render={({field: {name, ...field}}) => {
                        return (
                          <>
                            <label>Status</label>
                            <ThemeSwitch
                              checked={tipInput}
                              fieldName={'tip_status'}
                              setValue={setValue}
                              setSwitchValue={handleChangeTipStatus}
                            />
                          </>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className={'tip-fields-section'}>
                  {tips.map((tip, index: number) => {
                    return (
                      <div key={index} className={'dfields'}>
                        <Controller
                          name={`tips.${index}.percentage`}
                          control={control}
                          rules={{
                            validate: {
                              required: (value) => {
                                if (!value && tipInput) return 'Required'
                                return true
                              },
                            },
                            pattern: PercentageValidation,
                          }}
                          defaultValue={0}
                          render={({field}) => (
                            <TextInput
                              placeholder={''}
                              variant={'field-white'}
                              label={''}
                              labelPos={'out'}
                              labelColor={'dark'}
                              type={'number'}
                              field={field}
                              disabled={!tipInput}
                              errorIcon={<BsPercent />}
                              successIcon={<BsPercent />}
                              errors={
                                Array.isArray(errors?.tips) && errors?.tips?.[index]?.percentage
                              }
                            />
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
