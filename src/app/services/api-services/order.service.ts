import {PAGINATION} from '../../config/constants'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {api} from './api.service'
import {IOrderItemList, IOrderList} from '../../interfaces/IOrder'

export class OrderServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IOrderList[]>>> {
    const res = await api.get(`orders`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IOrderList[]>>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IOrderList>> {
    const res = await api.get(`orders/${id}`)
    return res.data as IAPIResponse<IOrderList>
  }
  public static async getOrderItems(
    order_id: string | undefined
  ): Promise<IAPIResponse<IOrderItemList[]>> {
    const res = await api.get(`order-items`, {params: {pagination: false, order_id}})
    return res.data as IAPIResponse<IOrderItemList[]>
  }
}
