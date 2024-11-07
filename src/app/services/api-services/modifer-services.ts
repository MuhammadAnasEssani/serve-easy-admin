// import {ITokenResponse, IVerifyLoginResponse} from '../../interfaces/IAuth.interfaces';
import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {IModifierCreate, IModifiers} from '../../interfaces/IModifiers'
import {PAGINATION} from '../../config/constants'

export class ModifierServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    modifier_class_id: string | undefined
  ): Promise<IAPIResponse<IPaginated<IModifiers[]>>> {
    const res = await api.get(`modifiers`, {
      params: {'per-page': perPage, page, 'pagination': true, modifier_class_id},
    })
    return res.data as IAPIResponse<IPaginated<IModifiers[]>>
  }
  public static async store(data: IModifierCreate): Promise<IAPIResponse<any>> {
    const res = await api.post('modifiers', data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IModifiers>> {
    const res = await api.get(`modifiers/${id}`)
    return res.data as IAPIResponse<IModifiers>
  }
  public static async update(
    id: string | undefined,
    data: IModifierCreate
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`modifiers/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`modifiers/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async uploadBulkModifiers(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-modifiers`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }
}
