import {defaultRoleListing, IRolesListing} from './IRole'
import {IGetEstablishment} from './IGetEstablishment'

export interface IUserAdminPanelRegistration {
  email: string
  password: string
  full_name: string
  image: string
  device_type: string
  device_token: string
  phone: string
  role_id: number | null
  establishment_id: number
  pin: number
  user_media?: {
    path: string
  }[]
  image_url?: string
}

export interface IGetRestaurantOwner {
  full_name: string
  user_image: {mediaUrl: string}
  email: string
  phone: string
  restaurant_id: number
}
export interface IUpdateRestaurantOwner {
  full_name: string
  user_image: string | undefined
  user_image_input?: {path: string}[]
  password?: string | undefined
  phone?: string
  email?: string
  restaurant_id?: number
}
export interface IRegisterRestaurantOwner {
  email: string
  password: string
  full_name: string
  image: string
  device_type: string
  device_token: string
  phone: string
  restaurant_id: any
}

export interface IUserAdminPanelUpdate {
  email: string
  password?: string | null
  full_name: string
  image: string
  device_type: string
  device_token: string
  phone: string
  role_id: number | null
  establishment_id: number
  pin: number
  user_media?: {
    path: string
  }[]
  image_url?: string
}

export interface IUserRestaurant {
  name: string
  phone: string
  address: string
  currency: string
}
export interface IUser {
  id: number
  email: string
  pin: number
  full_name: string
  establishment_id: number
  is_verified: boolean
  phone: string
  image: string
  address: string
  is_completed: number
  is_social_login: number
  is_approved: number
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
  deleted_at: string
  push_notification: number
  restaurantOfOwner?: object
  roles: IRolesListing[]
  created_ago: string
  meta: object
  establishment?: IGetEstablishment | null
  user_image: {
    mediaUrl: string
  } | null
  restaurant_stepper: {
    restaurant_status: number
  } | null
  restaurant: IUserRestaurant
}

export const defaultUser: IUser = {
  id: 0,
  email: '',
  pin: 0,
  full_name: '',
  establishment_id: 0,
  is_verified: false,
  phone: '',
  image: '',
  address: '',
  is_completed: 0,
  is_social_login: 0,
  is_approved: 0,
  created_by: 0,
  updated_by: 0,
  created_at: '',
  updated_at: '',
  deleted_at: '',
  push_notification: 0,
  restaurantOfOwner: {},
  roles: defaultRoleListing,
  created_ago: '',
  meta: {},
  user_image: null,
  restaurant_stepper: null,
  restaurant: {
    name: '',
    phone: '',
    address: '',
    currency: '',
  },
}
