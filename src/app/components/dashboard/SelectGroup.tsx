import {Select} from 'antd'
import React, {useEffect} from 'react'
import {ISelectField} from '../../interfaces/IFields'
import '../../../assets/css/components/selectfield.scss'
import {SkeletonInput, SkeletonLabel} from '../Skeleton'
import {ICategory} from '../../interfaces/IMenu'
import {MenuServices} from '../../services/api-services/menu-services'

export default function SelectGroup(props: ISelectField) {
  const {Option, OptGroup} = Select

  const handleChange = (value: string, row: any) => {
    props.setValue(props.name, row.key)
    if (props.setProducts) {
      /*
       * First reset the product field, sale_price and quantity
       * And then fetch products of selected category
       * and then set products in that particular index
       * */

      props.setValue(`items.${props.index}.products`, [])
      props.setValue(`items.${props.index}.quantity`, 1)
      props.setValue(`items.${props.index}.sale_price`, 0)

      MenuServices.getAllProducts(row.key).then((res) => {
        // props.setProducts && props.setProducts({[props.index]:  })
        props.setProducts && props.setProducts({index: props.index, data: res.data})
      })
    }
  }
  useEffect(() => {
    if (props.value) {
      MenuServices.getAllProducts(props.value).then((res) => {
        props.setProducts && props.setProducts({index: props.index, data: res.data})
      })
    }
  }, [])

  return (
    <>
      <div className={'Select-field'}>
        <label>{props.loader ? <SkeletonLabel /> : props.label}</label>
        {props.loader ? (
          <SkeletonInput />
        ) : (
          <Select
            showSearch
            onChange={handleChange}
            disabled={props.disabled}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder ? props.placeholder : 'Search To Select'}
          >
            {props.selectOptions?.map((item: ICategory) => {
              return (
                <OptGroup key={item.id} label={item.name}>
                  {item.subCategories?.map((subCategory) => {
                    return (
                      <Option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </Option>
                    )
                  })}
                </OptGroup>
              )
            })}
          </Select>
        )}

        {
          <div className="errors">
            {props.errors && <small className="field-success">{props.errors.message}</small>}
          </div>
        }
      </div>
    </>
  )
}
