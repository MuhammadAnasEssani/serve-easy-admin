import React from 'react'
import ThemeButton from '../dashboard/ThemeButton'
import SquareSkeleton from './SquareSkeleton'

export default function ButtonSectionSkeleton() {
  return (
    <>
      <div className={'button-section'}>
        <SquareSkeleton width={120} height={50} />
        <SquareSkeleton width={120} height={50} />
      </div>
    </>
  )
}
