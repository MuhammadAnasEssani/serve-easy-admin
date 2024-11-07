import React, {Dispatch, useEffect} from 'react'
import {ISettings} from '../../../interfaces/ISettings'
import {Col, Row} from 'react-bootstrap/'
import {Controller, useFieldArray, useFormContext} from 'react-hook-form'
import {maxLength, Required} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import {Tooltip} from 'antd'
import {RiDeleteBin3Line} from 'react-icons/ri'
import {GoPlus} from 'react-icons/go'

interface ITax {
  setIsValid: Dispatch<boolean>
}
export default function TaxSetting({setIsValid}: ITax) {
  const {
    control,
    reset,
    formState: {errors, isSubmitting},
    watch,
    setError,
    clearErrors,
    setValue,
  } = useFormContext<ISettings>()
  const {fields, append, remove, update} = useFieldArray({
    control,
    name: 'taxes',
  })
  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = ['taxes']
    for (const field of fields) {
      if (errorsArray?.includes(field)) {
        setIsValid(false)
        break
      } else {
        setIsValid(true)
      }
    }
  }, [isSubmitting])

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <>
      <div className={'online-setting'}>
        <Row>
          <Col md={12}>
            <ul className={'tax-field-list'}>
              {fields.map((item, index: number) => {
                return (
                  <li key={index} className="tax-setting-list">
                    <div className={'field-1'}>
                      <div className={'filter-fields'}>
                        <Controller
                          name={`taxes.${index}.tax_name`}
                          defaultValue={''}
                          control={control}
                          rules={{required: Required, maxLength: maxLength(100)}}
                          render={({field}) => (
                            <TextInput
                              placeholder={'General Sales Tax'}
                              variant={'field-white'}
                              label={'Tax Name'}
                              labelPos={'out'}
                              labelColor={'dark'}
                              type={'text'}
                              field={field}
                              errors={errors?.taxes?.[index]?.tax_name}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className={'field-1'}>
                      <div className={'filter-fields'}>
                        <Controller
                          name={`taxes.${index}.tax_rate`}
                          control={control}
                          defaultValue={0}
                          rules={{required: Required, maxLength: maxLength(500)}}
                          render={({field}) => (
                            <TextInput
                              placeholder={'rate in percent'}
                              variant={'field-white'}
                              label={'Tax Rate(%)'}
                              labelPos={'out'}
                              labelColor={'dark'}
                              type={'number'}
                              field={field}
                              errors={errors?.taxes?.[index]?.tax_rate}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className={'field-6'}>
                      <div className={'edit-btns'}>
                        {index > 0 && (
                          <Tooltip title="delete">
                            <button className="btn btn-delete" onClick={() => handleRemove(index)}>
                              <RiDeleteBin3Line />
                            </button>
                          </Tooltip>
                        )}
                        {index + 1 === fields.length && (
                          <Tooltip title="Add">
                            <button
                              onClick={() => {
                                append({tax_name: '', tax_rate: 0})
                              }}
                              className="btn btn-add"
                            >
                              <GoPlus />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Col>
        </Row>
      </div>
    </>
  )
}
