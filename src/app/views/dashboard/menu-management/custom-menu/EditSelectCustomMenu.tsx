import React, {useEffect, useState} from 'react'
import {Tree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import '../../../../../assets/css/views/dashboard/modifiers.scss'
import {Controller, useFormContext} from 'react-hook-form'
import {IMenu} from '../../../../interfaces/IMenu'
import {useParams} from 'react-router-dom'

export default function EditSelectCustomCategories({
  establishmentId,
  menuCategories,
  customMenuCategories,
}: {
  establishmentId: number
  menuCategories: IMenu[]
  customMenuCategories: IMenu[]
}) {
  const {control, setValue} = useFormContext()
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const {id} = useParams<any>()
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(true)
  }

  const onCheck = (checkedKeysValue: any) => {
    console.log(checkedKeysValue)
    setCheckedKeys(
      checkedKeysValue.filter((checkbox: any) => typeof checkbox === 'number' && checkbox > 0)
    )
  }

  useEffect(() => {
    setValue('products', checkedKeys)
  }, [checkedKeys])

  const appendProductsAsChildren = (products: any) => {
    const productDataNodeArray = []
    for (const product of products) {
      productDataNodeArray.push({
        title: product.name,
        key: product.id,
      })
    }
    return productDataNodeArray
  }

  const appendSubcategoriesAsChildren = (categories: IMenu[]): DataNode[] => {
    /*Loop through the API data for modifier classes*/
    const treeData: DataNode[] = []
    for (const category of categories) {
      const categoriesObj: any = {
        title: category.name,
        key: `parent_category_${category.id}`,
      }

      /*Loop through modifiers so that we can append children*/
      if (category?.subCategories) {
        categoriesObj.children = []
        for (const subCategory of category?.subCategories) {
          categoriesObj.children.push({
            title: subCategory.name,
            key: `parent_subcategory_${subCategory.id}`,
            children: appendProductsAsChildren(subCategory?.products),
          })
        }
      }
      treeData.push(categoriesObj)
    }

    return treeData
  }

  useEffect(() => {
    if (menuCategories.length > 0) {
      setTreeData(appendSubcategoriesAsChildren(menuCategories))
    }
  }, [menuCategories])
  useEffect(() => {
    if (customMenuCategories.length > 0) {
      /*Loop through the API data for modifier classes*/
      let products_ids = []
      for (const row of customMenuCategories) {
        products_ids.push(row.id)
        // setCheckedKeys(products.data.filter((checkbox:any)=> typeof checkbox === 'number' && checkbox > 0));
      }
      setCheckedKeys(
        products_ids.filter((checkbox: any) => typeof checkbox === 'number' && checkbox > 0)
      )
    }
  }, [customMenuCategories])

  return (
    <>
      <div className={'modifiers'}>
        <div className={'modifiers-section'}>
          {/*<h2 className={"dash-heading"}>Select Products</h2>*/}
          {
            <Controller
              name={`products`}
              control={control}
              rules={{}}
              render={({field: {name, value}}) => (
                <Tree
                  className={'modifiers-tree'}
                  checkable
                  expandedKeys={checkedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  treeData={treeData}
                />
              )}
            />
          }
        </div>
      </div>
    </>
  )
}
