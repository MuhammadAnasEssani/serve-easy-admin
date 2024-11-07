import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/esm/Button'
import {Link} from 'react-router-dom'
import {Spin} from 'antd'
import {IUser} from '../../interfaces/IUser'
import {useUserContext} from '../../providers/UserProvider'
import '../../../assets/css/components/authentication/button.scss'

interface ThemeButton {
  route?: string
  id?: number
  text?: string
  className?: string
  suffixIcon?: JSX.Element
  prefixIcon?: JSX.Element
  height?: string | number
  width?: string | number
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  variant?: string
  size?: 'sm' | 'lg' | undefined
  loader?: boolean
  onClick?: React.MouseEventHandler
  isHide?: boolean
}

export default function ThemeButton(options: ThemeButton) {

  const {user, isUserReady}: {user: IUser; isUserReady: boolean} = useUserContext()
  // const [meta,setMeta] = useState<IRolePermissionPivot>()
  const [permission, setPermission] = useState<boolean>(false)
  useEffect(() => {
    /*
     * ID is required to check the permission
     * */
    if (options.id) {
      user?.roles[0].permissions.find((data) => options.id == data.id)?.meta?.pivot_create == 1 &&
        setPermission(true)
    } else {
      setPermission(true)
    }
  }, [isUserReady])

  if (options.isHide) {
    return <></>
  }

  return (
    <>
      {options.route ? (
        <Link to={permission ? options.route : '#'}>
          <Button
            type={options.type || 'button'}
            variant={options.variant}
            className={`theme-button ${(options.className && options.className) || ''}`}
            disabled={permission ? options.disabled : options.loader || true}
            onClick={options.onClick}
          >
            {options.loader ? (
              <Spin />
            ) : (
              <>
                {options.prefixIcon && <span className={'prefix-icon'}> {options.prefixIcon}</span>}
                {options.text ? options.text : 'Add Button Text'}
                {options.suffixIcon && <span className={'suffix-icon'}>{options.suffixIcon}</span>}
              </>
            )}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={options.onClick}
          type={options.type}
          variant={options.variant}
          className={`theme-button ${options.className || ''}`}
          disabled={options.loader ? true : options.disabled}
        >
          {options.loader ? (
            <Spin />
          ) : (
            <>
              {options.prefixIcon && <span className={'prefix-icon'}> {options.prefixIcon}</span>}
              {options.text ? options.text : 'Add Button Text'}
              {options.suffixIcon && <span className={'suffix-icon'}>{options.suffixIcon}</span>}
            </>
          )}
        </Button>
      )}
    </>
  )
}
