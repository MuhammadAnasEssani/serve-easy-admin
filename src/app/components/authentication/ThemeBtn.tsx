import React from 'react'
import {Button} from 'react-bootstrap'
import '../../../assets/css/components/authentication/button.scss'
import {IBtn} from '../../interfaces/IFields'
import {SkeletonButton} from '../Skeleton'

export default function ThemeBtn({variant, size, text, type, loader, disabled}: IBtn) {
  return (
    <>
      <div className={`ThemeBtn`}>
        {loader ? (
          <SkeletonButton />
        ) : (
          <Button type={type} size={size} variant={variant} disabled={disabled}>
            {text}
          </Button>
        )}
      </div>
    </>
  )
}
