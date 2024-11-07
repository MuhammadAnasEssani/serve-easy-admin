import React from 'react'
import {useNavigate} from 'react-router'

export function InterceptorComponent() {
  const navigate = useNavigate()
  const checkStatus = (statusCode: number) => {
    switch (statusCode) {
      case 401:
        navigate('/', {replace: true})
    }
  }
  return <></>
}
