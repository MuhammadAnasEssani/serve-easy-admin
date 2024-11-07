import React from 'react'
import {Skeleton} from 'antd'
import '../../../assets/css/skeletons/components/heading-skeleton.scss'

interface IHeadingSkeleton {
  height?: number
  maxWidth?: number
}

export default function HeadingSkeleton(options: IHeadingSkeleton) {
  return (
    <>
      <div className={'heading-skeleton'}>
        <Skeleton.Input
          active={true}
          style={{
            maxWidth: options.maxWidth,
            height: options.height,
          }}
        />
      </div>
    </>
  )
}
