import React from 'react'
import {Skeleton} from 'antd'
import '../../../assets/css/skeletons/components/des-field-skeleton.scss'

interface IInputSkeleton {
  labelWidth?: number
}
export default function DesFieldSkeleton(options: IInputSkeleton) {
  return (
    <>
      <div className={'desfields-skeleton'}>
        <div className={'desfields-label'}>
          <Skeleton.Input
            className={'label'}
            active={true}
            style={{maxWidth: options.labelWidth}}
          />
        </div>
        <Skeleton.Input className={'desfields-input'} active={true} />
      </div>
    </>
  )
}
