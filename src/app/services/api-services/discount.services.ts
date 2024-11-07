import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {ICreateDiscount, ICreateManualDiscount, IDiscountListing} from '../../interfaces/IDiscount'
import {PAGINATION} from '../../config/constants'

export class DiscountServices {
  public static async index(
    params?: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IDiscountListing[]>>> {
    const res = await api.get(`discounts`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IDiscountListing[]>>
  }
  public static async store(
    data: ICreateDiscount | ICreateManualDiscount
  ): Promise<IAPIResponse<any>> {
    const res = await api.post('discounts', data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IDiscountListing>> {
    const res = await api.get(`discounts/${id}`)
    return res.data as IAPIResponse<IDiscountListing>
  }
  public static async update(
    id: string | undefined,
    data: ICreateDiscount | ICreateManualDiscount
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`discounts/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`discounts/${id}`)
    return res.data as IAPIResponse<any>
  }
}
