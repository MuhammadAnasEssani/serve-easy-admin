import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {ICreateRestaurant, IRestaurantListing} from '../../interfaces/IRestaurant'
import {PAGINATION} from '../../config/constants'

export class RestaurantService {
  public static async store(data: ICreateRestaurant): Promise<IAPIResponse> {
    const res = await api.post('restaurants', data)
    return res.data as IAPIResponse
  }
  public static async update(id: string, data: ICreateRestaurant): Promise<IAPIResponse> {
    const res = await api.put(`restaurants/${id}`, data)
    return res.data as IAPIResponse
  }

  public static async index(
    params: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IRestaurantListing[]>>> {
    const res = await api.get(`restaurants`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IRestaurantListing[]>>
  }

  public static async all(params?: any): Promise<IAPIResponse<IRestaurantListing[]>> {
    const res = await api.get(`restaurants`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<IRestaurantListing[]>
  }

  public static async getById(id: string | undefined): Promise<IAPIResponse<IRestaurantListing>> {
    const res = await api.get(`restaurants/${id}`)
    return res.data as IAPIResponse<IRestaurantListing>
  }
}
