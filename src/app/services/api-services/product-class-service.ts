import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {IProductClassCreate, IProductClassList} from '../../interfaces/IProductClass'

export class ProductClassServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IProductClassList[]>>> {
    const res = await api.get(`product-classes`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IProductClassList[]>>
  }
  public static async all(): Promise<IAPIResponse<IProductClassList[]>> {
    const res = await api.get(`product-classes`, {params: {pagination: false}})
    return res.data as IAPIResponse<IProductClassList[]>
  }
  public static async store(data: IProductClassCreate): Promise<IAPIResponse<any>> {
    const res = await api.post('classes', data)
    return res.data as IAPIResponse<any>
  }
  public static async update(
    id: string | undefined,
    data: IProductClassCreate
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`classes/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IProductClassList>> {
    const res = await api.get(`classes/${id}`)
    return res.data as IAPIResponse<IProductClassList>
  }

  public static async uploadBulkClasses(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-classes`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }

  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`classes/${id}`)
    return res.data as IAPIResponse<any>
  }
}
