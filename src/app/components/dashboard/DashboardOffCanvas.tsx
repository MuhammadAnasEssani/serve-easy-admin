import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import '../../../assets/css/components/dashboard/dashboard-offcanvas.scss'
import {RiCloseLine} from 'react-icons/ri'

interface IDashboardOffCanvas {
  heading?: string
  state: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  title?: string
  children: JSX.Element | JSX.Element[]
  // formId?:string
  reloadTable?: any
}

export default function DashboardOffCanvas(options: IDashboardOffCanvas) {
  const [canvas, setCanvas] = useState(false)

  const handleClose = () => {
    setCanvas(false)
    options.setActive(false)
    // options.reloadTable()
  }
  // const handleShow = () => setCanvas(true);

  useEffect(() => {
    setCanvas(options.state)
  }, [options.state])

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow} className="me-2">*/}
      {/*    launch*/}
      {/*</Button>*/}
      <Offcanvas show={canvas} onHide={handleClose} placement={'end'} backdrop={false}>
        <Offcanvas.Header>
          <Offcanvas.Title>{options.heading ? options.heading : 'Add Heading'}</Offcanvas.Title>
          <button className={'btn btn--close'} onClick={handleClose}>
            <RiCloseLine />
          </button>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>{options.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
