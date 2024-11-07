import React from 'react'
import {Skeleton} from 'antd'
import '../../../assets/css/skeletons/components/input-field-skeleton.scss'

interface IInputSkeleton {
  labelWidth?: number
}
export default function InputFieldSkeleton(options: IInputSkeleton) {
  return (
    <>
      <div className={'dfields-skeleton'}>
        <div className={'dfields-label'}>
          <Skeleton.Input
            className={'label'}
            active={true}
            style={{maxWidth: options.labelWidth}}
          />
        </div>
        <Skeleton.Input className={'dfields-input'} active={true} />
      </div>
    </>
  )
}
