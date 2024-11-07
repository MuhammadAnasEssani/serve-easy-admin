import React from 'react'
import {Skeleton} from 'antd'

interface ISquareSkeleton {
  height?: number | string
  width?: number | string
  shape?: 'circle' | 'square'
}
export default function SquareSkeleton(options: ISquareSkeleton) {
  return (
    <>
      <div className={'square-skeleton'}>
        <Skeleton.Avatar
          active={true}
          size={'large'}
          shape={options.shape ? options.shape : 'square'}
          style={{
            width: options.width,
            height: options.height,
          }}
        />
      </div>
    </>
  )
}
