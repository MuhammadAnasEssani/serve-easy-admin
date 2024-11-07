import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {ICreateCustomMenu, ICustomMenuList} from '../../interfaces/ICustomMenu'
import {IMenu} from '../../interfaces/IMenu'

export class CustomMenuServices {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<ICustomMenuList[]>>> {
    const res = await api.get(`custom-menus`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<ICustomMenuList[]>>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`custom-menus/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async store(formData: ICreateCustomMenu): Promise<IAPIResponse<any>> {
    const res = await api.post(`custom-menus`, formData)
    return res.data as IAPIResponse<any>
  }
  public static async getById(
    id: string | undefined,
    params?: any
  ): Promise<IAPIResponse<ICustomMenuList>> {
    const res = await api.get(`custom-menus/${id}`, {params: {...params}})
    return res.data as IAPIResponse<ICustomMenuList>
  }
  public static async getAllCategories(
    id: string | undefined,
    props: any
  ): Promise<IAPIResponse<IMenu[]>> {
    const res = await api.get(`custom-menus/${id}`, {params: {...props}})
    return res.data as IAPIResponse<IMenu[]>
  }
  public static async update(
    id: string | undefined,
    data: ICreateCustomMenu
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`custom-menus/${id}`, data)
    return res.data as IAPIResponse<any>
  }
}
