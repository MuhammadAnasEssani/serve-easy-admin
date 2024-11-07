import {IListGeneric} from './ICommon'

export interface INotificationList extends IListGeneric {
  notifiable_id: number
  title: string
  message: string
  ref_id: null | number
  type: number
  read_at: null | string
  extra: any
  extra_parsed: {
    status: boolean
  } | null
}

export interface IPushNotificationFilter {
  date_range?: string[]
  min_order_amount?: number
  max_order_amount?: number
  min_order_count?: number
  max_order_count?: number
}
export interface IGetUnreadCount {
  unread_count: number
}
