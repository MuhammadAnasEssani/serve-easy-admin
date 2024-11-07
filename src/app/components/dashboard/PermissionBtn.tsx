import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {IUser} from '../../interfaces/IUser'
import {useUserContext} from '../../providers/UserProvider'
import {Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'

interface PermissionBtn {
  route: string
  id: number
  value: string
}

export default function PermissionBtn({route, id, value}: PermissionBtn) {
  const {user, isUserReady}: {user: IUser; isUserReady: boolean} = useUserContext()
  // const [meta,setMeta] = useState<IRolePermissionPivot>()
  const [permission, setPermission] = useState<boolean>(false)
  useEffect(() => {
    user?.roles[0].permissions.find((data) => id == data.id)?.meta?.pivot_create == 1 &&
      setPermission(true)
  }, [isUserReady])
  return (
    <>
      {isUserReady && permission ? (
        <Button className={'create-btn'} variant="primary">
          <Link to={route}>
            {value} <BsArrowRight />
          </Link>
        </Button>
      ) : (
        <Button disabled={true} className={'create-btn'} variant="primary">
          <span>
            {value} <BsArrowRight />
          </span>
        </Button>
      )}
    </>
  )
}
