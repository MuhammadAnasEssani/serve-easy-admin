import React from 'react'
import {Button} from 'antd'
import CheckImg from '../../../../assets/images/check-green.gif'

const FinishScreen = ({
  handleSubmit,
  handleNext,
}: {
  handleSubmit: () => void
  handleNext?: () => void
}) => {
  return (
    <div className="finish-screen">
      <img src={CheckImg} />
      <h3 className="title-1">Lets Getting Start</h3>
      <Button
        className="action-button"
        onClick={() => {
          handleSubmit()
          handleNext?.()
        }}
      >
        Continue
      </Button>
    </div>
  )
}
export default FinishScreen
