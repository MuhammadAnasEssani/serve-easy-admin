import {Layout} from 'antd'
import React from 'react'
import {useUserContext} from '../../providers/UserProvider'

const {Footer} = Layout

export default function DashboardFooter() {
  const {setLoader} = useUserContext()
  // useEffect(()=>{
  //     setTimeout(()=>{
  //         setLoader(false)
  //     },1000)
  //
  // },[])
  return (
    <Footer style={{textAlign: 'center'}}>
      Serve-Easy ©2022 - Powered by{' '}
      <a target={'blank'} href="https://www.revolventures.com/">
        Revol Ventures
      </a>
    </Footer>
  )
}
