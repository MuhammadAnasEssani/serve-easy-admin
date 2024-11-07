import React, {useEffect, useState} from 'react'
import {IUser} from '../../interfaces/IUser'
import {useUserContext} from '../../providers/UserProvider'

interface IPermissionIcon {
  children: any
  moduleId: number
  permissionName: 'pivot_create' | 'pivot_update' | 'pivot_delete' | 'pivot_read'
}

export const PermissionIcons = ({children, moduleId, permissionName}: IPermissionIcon) => {
  const {user, isUserReady}: {user: IUser; isUserReady: boolean} = useUserContext()
  const [permission, setPermission] = useState<boolean>(false)
  useEffect(() => {
    user?.roles[0].permissions.find((data) => moduleId == data.id)?.meta?.[permissionName] == 1 &&
      setPermission(true)
  }, [isUserReady])

  if (permission) {
    return children
  }
}
