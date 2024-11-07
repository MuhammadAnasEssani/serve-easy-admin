import {Dispatch, SetStateAction} from 'react'
import {IUser} from './IUser'
import {IGetEstablishmentDropdown} from './IGetEstablishment'

export interface IAuth {
  email: string
  password: string
  device_type: string
  device_token: string
  platform: string
}
export interface IVerifyUser {
  email: string
  otp_code: string
}

export interface IUserLogin {
  user: IUser
  access_token: IAccessToken
}

export interface IProfile {
  profile: IUser
  access_token: IAccessToken
}

export interface IAccessToken {
  type: string
  token: string
  expires_at: string
}

export interface IUserProvider {
  loader: boolean
  setLoader: Dispatch<SetStateAction<boolean>>
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  user: IUser
  isRestaurantAdmin: boolean
  matchUserRole: (matchingRole: number, user: IProfile) => Promise<boolean>
  token: string | null | undefined
  setToken: Dispatch<SetStateAction<string | null | undefined>>
  onLogout: () => void
  theme: string
  switchTheme: () => void
  isUserReady: boolean
  establishments: IGetEstablishmentDropdown[]
  establishmentId: number
  setEstablishmentId: Dispatch<SetStateAction<number>>
  newNotification: boolean
  setNewNotification: Dispatch<SetStateAction<boolean>>
  sidebarSwitcher: () => void
  sidebarCollapse: boolean
  setSidebarCollapse: Dispatch<SetStateAction<boolean>>
  isSuperAdmin: boolean
  restaurantId: number
  initialSetupStatus: number | null
  getEstablishments: () => void
  setInitialSetupStatus: (status: number) => void
  currencySymbol: string
}
