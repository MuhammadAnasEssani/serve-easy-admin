import React, {useEffect, useState} from 'react'
import '../../../assets/css/views/dashboard/modifiers.scss'
import {Tree} from 'antd'
import {CustomMenuServices} from '../../services/api-services/custom-menu-service'
import {useParams} from 'react-router-dom'
import {DataNode} from 'antd/lib/tree'
import {BACKEND_CONSTANTS} from '../../config/constants'
import {IProductList} from '../../interfaces/IMenu'

export default function CustomMenuDetailCategories() {
  const {id} = useParams<any>()
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [treeData, setTreeData] = useState<DataNode[]>([])

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
  }

  const attachProducts = (products?: IProductList[]) => {
    const productTree = []
    if (products) {
      for (const product of products) {
        productTree.push({
          title: product.name,
          key: `product${product.id}`,
        })
      }
    }
    return productTree
  }

  useEffect(() => {
    CustomMenuServices.getAllCategories(id, {
      type: BACKEND_CONSTANTS.CUSTOM_MENU.TYPE.CHECKED_CATEGORIES,
    }).then((category) => {
      /*Create a temporary variable that will hold tree data*/
      const treeData: DataNode[] = []

      /*Loop through the API data for modifier classes*/
      for (const row of category.data) {
        const parentCategoryObj: any = {
          title: row.name,
          key: `parent_${row.id}`,
          data: row,
        }

        if (row.subCategories) {
          parentCategoryObj.children = []
          for (const subCategory of row?.subCategories) {
            parentCategoryObj.children.push({
              title: subCategory.name,
              key: `sub_category${subCategory.id}`,
              children: attachProducts(subCategory.products),
            })
          }
        }

        treeData.push(parentCategoryObj)
      }
      setTreeData(treeData)
    })
  }, [])

  return (
    <>
      <div className={'custom-menu-section'}>
        <Tree
          className={'custom-menu-tree'}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      </div>
    </>
  )
}
