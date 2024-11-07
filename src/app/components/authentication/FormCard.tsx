import React from 'react'
import {Card} from 'react-bootstrap'
import {IFormCard} from '../../interfaces/IFields'

export default function FormCard({children, bgColor}: IFormCard) {
  return (
    <>
      <Card className={`field-card ${bgColor}`}>{children}</Card>
    </>
  )
}
