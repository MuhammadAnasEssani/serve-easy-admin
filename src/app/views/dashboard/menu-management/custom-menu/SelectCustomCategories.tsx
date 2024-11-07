import React, {useEffect, useState} from 'react'
import {Tree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import '../../../../../assets/css/views/dashboard/modifiers.scss'
import {Controller, useFormContext} from 'react-hook-form'
import {MenuServices} from '../../../../services/api-services/menu-services'
import {PAGINATION} from '../../../../config/constants'
import {IMenu} from '../../../../interfaces/IMenu'
import {useUserContext} from '../../../../providers/UserProvider'
import {SkeletonTree} from '../../../../components/Skeleton'

export default function SelectCustomCategories() {
  const {control, setValue} = useFormContext()
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(true)
  }

  const {isUserReady, establishmentId} = useUserContext()

  const onCheck = (checkedKeysValue: any) => {
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
    setLoading(true)
    MenuServices.getAllCategories(
      null,
      {establishment_id: establishmentId, relation: 'all'},
      false,
      PAGINATION.perPage,
      1
    )
      .then((categories) => {
        setTreeData(appendSubcategoriesAsChildren(categories.data))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [establishmentId])

  return (
    <>
      <div className={'modifiers'}>
        <div className={'modifiers-section'}>
          {!loading ? (
            <Controller
              name={`products`}
              control={control}
              rules={{}}
              render={({field: {name, value}}) => (
                <Tree
                  className={'modifiers-tree'}
                  checkable
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  treeData={treeData}
                />
              )}
            />
          ) : (
            <SkeletonTree key={'modifier-skeleton'} />
          )}
        </div>
      </div>
    </>
  )
}
