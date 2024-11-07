import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {api} from './api.service'
import {ICreateTable, ITableListing} from '../../interfaces/ITable'
import {PAGINATION} from '../../config/constants'
import {ICreatePromo, IPromoList} from '../../interfaces/IPromo'

export class TableService {
  public static async index(
    params?: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<ITableListing[]>>> {
    const res = await api.get(`tables`, {params: {...params}})
    return res.data as IAPIResponse<IPaginated<ITableListing[]>>
  }
  public static async store(data: ICreateTable): Promise<IAPIResponse<any>> {
    const res = await api.post('tables', data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`tables/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async update(
    id: string | undefined,
    data: ICreateTable
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`tables/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<ITableListing>> {
    const res = await api.get(`tables/${id}`)
    return res.data as IAPIResponse<ITableListing>
  }
}
