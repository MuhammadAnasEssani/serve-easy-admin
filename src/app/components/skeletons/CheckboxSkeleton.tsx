import React from 'react'
import {Skeleton} from 'antd'
import '../../../assets/css/skeletons/components/checkbox-skeleton.scss'
import HeadingSkeleton from './HeadingSkeleton'

interface ICheckboxSkeleton {
  height?: number
  maxWidth?: number
  margin?: string
}
export default function CheckboxSkeleton(options: ICheckboxSkeleton) {
  return (
    <>
      <div className={'check-box-skeleton'} style={{margin: options.margin}}>
        <div>
          <Skeleton.Avatar
            className={'check'}
            active={true}
            shape={'square'}
            style={{
              width: 18,
              height: 18,
            }}
          />
        </div>
        <div className={'check-label'}>
          <HeadingSkeleton maxWidth={options.maxWidth} height={options.height} />
          {/*<Skeleton.Input className={"check-label"} active={true} />*/}
        </div>
      </div>
    </>
  )
}
