import {Select} from 'antd'
import React from 'react'
import {ISelectField} from '../../interfaces/IFields'
import '../../../assets/css/components/selectfield.scss'
import {SkeletonInput, SkeletonLabel} from '../Skeleton'
import {BsCalendarDate} from 'react-icons/bs'

export default function SelectField(options: ISelectField) {
  return (
    <>
      <div className={'Select-field'}>
        {options.label && <label>{options.loader ? <SkeletonLabel /> : options.label}</label>}
        <div className={`select-field-prefix ${options.prefixIcon ? 'show' : 'hide'}`}>
          {options.prefixIcon && <div className="prefix-icon-wrapper">{options.prefixIcon}</div>}
          {options.loader ? (
            <SkeletonInput />
          ) : (
            <Select
              defaultValue={options.defaultValue}
              disabled={options.disabled}
              showSearch
              value={options.defaultValue}
              placeholder={options.placeholder ? options.placeholder : 'Search To Select'}
              optionFilterProp="children"
              loading={options.loading}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare((optionB!.children as unknown as string).toLowerCase())
              }
              {...options.field}
              onSelect={(value: number) => {
                options.setSelectedEstablishment && options.setSelectedEstablishment(value)
              }}
            >
              {options?.selectOptions?.map((item, index) => {
                return (
                  <Select.Option disabled={item?.disabled} key={item?.id} value={item?.id}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
          {
            <div className="errors">
              {options.errors && <small className="field-success">{options.errors.message}</small>}
            </div>
          }
        </div>
      </div>
    </>
  )
}
