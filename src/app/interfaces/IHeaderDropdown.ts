import {Dispatch, SetStateAction} from 'react'

export interface IDropdown {
  notification: boolean
  profile: boolean
}

export interface IHeaderDropdown {
  dropdown: boolean
  setDropdown: Dispatch<SetStateAction<IDropdown>>
}
export interface IHeaderDropdownList {
  handleLogout: () => void
  handleClose: () => void
}
