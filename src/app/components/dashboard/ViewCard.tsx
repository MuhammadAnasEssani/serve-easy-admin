import React from 'react'
import {Card, Container} from 'react-bootstrap'
import {motion} from 'framer-motion'

interface IViewCard {
  children?: JSX.Element | JSX.Element[]
  className?: string
}
export default function ViewCard({children, className}: IViewCard) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      exit={{opacity: 0}}
    >
      <Card className={`viewcard ${className || ''}`}>
        <Container fluid className={'p-0 h-100'}>
          {children}
        </Container>
      </Card>
    </motion.div>
  )
}
