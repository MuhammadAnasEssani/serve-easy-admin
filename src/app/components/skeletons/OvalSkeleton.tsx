import React from 'react'
import {Skeleton} from 'antd'
import '../../../assets/css/skeletons/components/heading-skeleton.scss'

interface IOvalSkeleton {
  height?: number
  maxWidth?: number
  borderRadius: number
}

export default function OvalSkeleton(options: IOvalSkeleton) {
  return (
    <>
      <div className={'heading-skeleton'}>
        <Skeleton.Input
          active={true}
          style={{
            maxWidth: options.maxWidth,
            height: options.height,
            borderRadius: options.borderRadius,
          }}
        />
      </div>
    </>
  )
}
