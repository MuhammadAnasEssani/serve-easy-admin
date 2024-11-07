import React from 'react'
import ThemeButton from '../dashboard/ThemeButton'
import SquareSkeleton from './SquareSkeleton'
import CheckboxSkeleton from './CheckboxSkeleton'
import HeadingSkeleton from './HeadingSkeleton'

export default function OrderTypeCheckSkeleton() {
  return (
    <>
      <div className={'mb-2'}>
        <HeadingSkeleton height={15} maxWidth={100} />
      </div>
      <div>
        <CheckboxSkeleton margin={'5px 0'} height={10} />
        <CheckboxSkeleton margin={'5px 0'} height={10} />
        <CheckboxSkeleton margin={'5px 0'} height={10} />
        <CheckboxSkeleton margin={'5px 0'} height={10} />
      </div>
    </>
  )
}
