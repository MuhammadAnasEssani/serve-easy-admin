import React, {Dispatch, useEffect, useState} from 'react'
import {Tree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import {Col, Container, Row} from 'react-bootstrap'
import '../../../../../assets/css/views/dashboard/modifiers.scss'
import {Controller, useFormContext} from 'react-hook-form'
import {ModifierClassServices} from '../../../../services/api-services/modifer-class-services'
import {IModifiers} from '../../../../interfaces/IModifiers'
import {SkeletonTree} from '../../../../components/Skeleton'

export default function EditProductModifiers({
  establishmentId,
  modifiers,
  setIsValid,
}: {
  establishmentId: number
  modifiers: IModifiers[]
  setIsValid: Dispatch<boolean>
}) {
  const {
    control,
    setValue,
    formState: {isValid, isSubmitting, errors},
  } = useFormContext()
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<DataNode[]>([])

  const onExpand = (expandedKeysValue: React.Key[]) => {
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
    ModifierClassServices.getAllModifiers(true, undefined, {
      establishment_id: establishmentId,
    }).then((modifierClasses) => {
      /*Create a temporary variable that will hold tree data*/
      const treeData: DataNode[] = []

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
      }
      setTreeData(treeData)
    })
  }, [establishmentId])
  useEffect(() => {
    let modifiers_ids: number[] = []
    for (const row of modifiers) {
      modifiers_ids.push(row.id)
    }
    setCheckedKeys(
      modifiers_ids.filter((checkbox: any) => typeof checkbox === 'number' && checkbox > 0)
    )
  }, [])

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

  return (
    <>
      <div className={'modifiers'}>
        <Row>
          <Col md={12}>
            <div className={'modifiers-section'}>
              {treeData.length > 0 ? (
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
                <SkeletonTree key={'modifier-skeleton'} />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
