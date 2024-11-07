import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {
  IGetUnreadCount,
  INotificationList,
  IPushNotificationFilter,
} from '../../interfaces/INotification'
import {IPushNotifications} from '../../interfaces/ICustomerManagement'
import {PAGINATION} from '../../config/constants'

export class NotificationService {
  public static async index(
    params: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<INotificationList[]>>> {
    const res = await api.get(`notifications`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<INotificationList[]>>
  }

  public static async all(params?: any): Promise<IAPIResponse<INotificationList[]>> {
    const res = await api.get(`notifications`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<INotificationList[]>
  }

  public static async readNotification(id: number): Promise<IAPIResponse<any>> {
    const res = await api.post(`mark-read/${id}`)
    return res.data as IAPIResponse<any>
  }

  public static async markAllRead(): Promise<IAPIResponse<any>> {
    const res = await api.post(`mark-all-read`)
    return res.data as IAPIResponse<any>
  }

  public static async onlineUserNotification(data: IPushNotifications): Promise<IAPIResponse<any>> {
    const res = await api.post(`restaurant-online-user-notification`, data)
    return res.data as IAPIResponse<any>
  }

  public static async getDeviceCount(data: IPushNotificationFilter): Promise<IAPIResponse<any>> {
    const res = await api.post(`get-devices-count`, data)
    return res.data as IAPIResponse<any>
  }

  public static async getUnreadCount(): Promise<IAPIResponse<IGetUnreadCount>> {
    const res = await api.get(`get-unread-count`)
    return res.data as IAPIResponse<IGetUnreadCount>
  }
}
