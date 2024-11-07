import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {IUser} from '../../interfaces/IUser'
import {useUserContext} from '../../providers/UserProvider'

interface IPermissionIcon {
  children: any
  moduleId: number
  permissionName: 'pivot_create' | 'pivot_update' | 'pivot_delete' | 'pivot_read'
}

export const PermissionProtectedRoutes = ({
  children,
  moduleId,
  permissionName,
}: IPermissionIcon) => {
  const {user, isUserReady}: {user: IUser; isUserReady: boolean} = useUserContext()
  const navigator = useNavigate()
  const [permission, setPermission] = useState<boolean>(false)

  const condition =
    user?.roles[0].permissions.find((data) => moduleId == data.id)?.meta?.[permissionName] != 1

  useEffect(() => {
    if (isUserReady) {
      condition && navigator('/not-found')
    }
  }, [isUserReady])

  return condition ? <></> : children
}
