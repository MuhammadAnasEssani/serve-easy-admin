import {Select} from 'antd'
import React from 'react'
import {ISelectField} from '../../interfaces/IFields'
import '../../../assets/css/components/multi-select.scss'
import {SkeletonLabel} from '../Skeleton'
import {GENERIC} from '../../config/constants'
import {useUserContext} from '../../providers/UserProvider'

export default function MultiSelectField(options: ISelectField) {
  const {currencySymbol} = useUserContext()
  return (
    <>
      <div className={'multi-select'}>
        {options.label && <label>{options.loader ? <SkeletonLabel /> : options.label}</label>}
        <div className={`select-field-prefix ${options.prefixIcon ? 'show' : 'hide'}`}>
          {options.prefixIcon && <div className="prefix-icon-wrapper">{options.prefixIcon}</div>}
          <Select
            maxTagCount={options.maxTagCount}
            mode="multiple"
            disabled={options.disabled}
            showSearch
            loading={options.loader}
            value={options?.value}
            placeholder={options.placeholder ? options.placeholder : 'Search to Select'}
            optionFilterProp="children"
            // filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
            // filterSort={(optionA, optionB) =>
            //     (optionA!.children as unknown as string)
            //         .toLowerCase()
            //         .localeCompare((optionB!.children as unknown as string).toLowerCase())
            // }
            {...options.field}
          >
            {options?.selectOptions?.map((item, index) => {
              return (
                <Select.Option key={item.id} value={item?.id}>
                  {item.name}
                  {options?.nameWithPrice && ` - (${currencySymbol + item?.price})`}
                </Select.Option>
              )
            })}
          </Select>

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
