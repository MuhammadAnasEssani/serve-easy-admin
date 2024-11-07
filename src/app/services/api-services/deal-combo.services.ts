import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {ICreateDeals, IDealComboFilters, IDealComboListing} from '../../interfaces/IDealsCombo'
import {PAGINATION} from '../../config/constants'

export class DealComboServices {
  public static async index(
    params?: IDealComboFilters,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IDealComboListing[]>>> {
    const res = await api.get(`deal-combos`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IDealComboListing[]>>
  }
  public static async all(params?: IDealComboFilters): Promise<IAPIResponse<IDealComboListing[]>> {
    const res = await api.get(`deal-combos`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<IDealComboListing[]>
  }
  public static async store(data: ICreateDeals): Promise<IAPIResponse<any>> {
    const res = await api.post('deal-combos', data)
    return res.data as IAPIResponse<any>
  }
  public static async update(
    id: string | undefined,
    data: ICreateDeals
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`deal-combos/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IDealComboListing>> {
    const res = await api.get(`deal-combos/${id}`)
    return res.data as IAPIResponse<IDealComboListing>
  }
  //
  // public static async destroy(id:number): Promise<IAPIResponse<any>> {
  //     const res = await api.delete(`printers/${id}`)
  //     return res.data as IAPIResponse<any>;
  // }
}
