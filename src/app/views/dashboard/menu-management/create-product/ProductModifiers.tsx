import React, {Dispatch, useEffect, useState} from 'react'
import type {DataNode} from 'antd/es/tree'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/modifiers.scss'
import {Controller, useFormContext} from 'react-hook-form'
import {ModifierClassServices} from '../../../../services/api-services/modifer-class-services'
import {useUserContext} from '../../../../providers/UserProvider'
import {SkeletonTree} from '../../../../components/Skeleton'
import {Tree} from 'antd'

export default function ProductModifiers({setIsValid}: {setIsValid: Dispatch<boolean>}) {
  const {
    control,
    setValue,
    formState: {isValid, errors, isSubmitting},
  } = useFormContext()
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const {establishmentId} = useUserContext()

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(true)
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(
      checkedKeysValue.filter((checkbox: any) => typeof checkbox === 'number' && checkbox > 0)
    )
  }

  useEffect(() => {
    setValue('modifier_products', checkedKeys)
  }, [checkedKeys])

  useEffect(() => {
    const errorsArray = Object.keys(errors)
    const fields = ['modifiers']
    for (const field of fields) {
      if (errorsArray?.includes(field)) {
        setIsValid(false)
        break
      } else {
        setIsValid(true)
      }
    }
  }, [isSubmitting])

  const getModifiers = () => {
    setLoading(true)
    ModifierClassServices.getAllModifiers(true, undefined, {
      establishment_id: establishmentId,
    }).then((modifierClasses) => {
      /*Create a temporary variable that will hold tree data*/
      setLoading(false)
      const treeData: DataNode[] = []
      const expandKeys = []
      /*Loop through the API data for modifier classes*/
      for (const row of modifierClasses.data) {
        const modifierClassesObject: DataNode = {
          title: row.name,
          key: `parent_${row.id}`,
        }

        /*Loop through modifiers so that we can append children*/
        if (row.modifiers) {
          modifierClassesObject.children = []
          for (const modifier of row?.modifiers) {
            modifierClassesObject.children.push({
              title: modifier.name,
              key: modifier.id,
            })
          }
        }

        treeData.push(modifierClassesObject)
        expandKeys.push(`parent_${row.id}`)
      }
      setTreeData(treeData)
      setExpandedKeys(expandKeys)
    })
  }

  useEffect(() => {
    getModifiers()
  }, [establishmentId])

  return (
    <>
      <div className={'modifiers'}>
        <Row>
          <Col md={12}>
            <div className={'modifiers-section'}>
              {loading ? (
                <SkeletonTree key={'modifier-skeleton'} />
              ) : treeData.length > 0 ? (
                <Controller
                  name={`modifiers`}
                  control={control}
                  rules={{}}
                  render={({field: {name, value}}) => (
                    <Tree
                      className={'modifiers-tree'}
                      checkable
                      onExpand={onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      treeData={treeData}
                    />
                  )}
                />
              ) : (
                <div>Modifiers Not Found</div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
