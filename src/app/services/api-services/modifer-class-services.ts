import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {IModifierClassCreate, IModifierClassList} from '../../interfaces/IModifiers'
import {PAGINATION} from '../../config/constants'

export class ModifierClassServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    with_modifiers = false,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IModifierClassList[]>>> {
    const res = await api.get('modifier-classes', {
      params: {'per-page': perPage, page, with_modifiers, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IModifierClassList[]>>
  }
  public static async getAllModifiers(
    with_modifiers = false,
    product_id?: string | undefined,
    params?: any
  ): Promise<IAPIResponse<IModifierClassList[]>> {
    const res = await api.get(`modifier-classes`, {
      params: {with_modifiers, pagination: false, product_id, ...params},
    })
    return res.data as IAPIResponse<IModifierClassList[]>
  }
  public static async store(formData: IModifierClassCreate): Promise<IAPIResponse<any>> {
    const res = await api.post(`modifier-classes`, formData)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IModifierClassList>> {
    const res = await api.get(`modifier-classes/${id}`)
    return res.data as IAPIResponse<IModifierClassList>
  }
  public static async update(
    id: string | undefined,
    data: IModifierClassCreate
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`modifier-classes/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`modifier-classes/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async uploadBulkModifierClasses(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-modifier-classes`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }
}
