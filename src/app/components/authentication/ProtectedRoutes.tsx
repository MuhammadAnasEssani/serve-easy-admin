import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {UserAuthService} from '../../services/api-services/user-auth-api.service'

export const ProtectedRoutes = ({children}: any) => {
  const isAuthenticated = UserAuthService.isAuthenticated();

  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{from: location}} />
  }

  return children
}
