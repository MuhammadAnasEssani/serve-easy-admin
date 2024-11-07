import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {ICreatePromo, IPromoList} from '../../interfaces/IPromo'

export class PromoCodeServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IPromoList[]>>> {
    const res = await api.get(`promo-codes`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IPromoList[]>>
  }
  public static async store(data: ICreatePromo): Promise<IAPIResponse<any>> {
    const res = await api.post('promo-codes', data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IPromoList>> {
    const res = await api.get(`promo-codes/${id}`)
    return res.data as IAPIResponse<IPromoList>
  }
  public static async update(
    id: string | undefined,
    data: ICreatePromo
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`promo-codes/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`promo-codes/${id}`)
    return res.data as IAPIResponse<any>
  }
}
