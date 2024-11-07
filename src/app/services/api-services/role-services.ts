// import {ITokenResponse, IVerifyLoginResponse} from '../../interfaces/IAuth.interfaces';
import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {ICreateRoles, IRolesListing} from '../../interfaces/IRole'
import {PAGINATION} from '../../config/constants'

export class RoleServices {
  public static async store(data: ICreateRoles): Promise<IAPIResponse<any>> {
    const res = await api.post('roles', data)
    return res.data as IAPIResponse<any>
  }

  public static async index(
    establishment: number | null,
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IRolesListing[]>>> {
    const res = await api.get(`roles`, {params: {establishment_id: establishment, ...params}})
    return res.data as IAPIResponse<IPaginated<IRolesListing[]>>
  }

  /*To get all resources without pagination usually for dropdowns*/
  public static async all(establishment: number | null): Promise<IAPIResponse<IRolesListing[]>> {
    const res = await api.get(`roles`, {
      params: {establishment_id: establishment, pagination: false},
    })
    return res.data as IAPIResponse<IRolesListing[]>
  }

  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`roles/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IRolesListing>> {
    const res = await api.get(`roles/${id}`)
    return res.data as IAPIResponse<IRolesListing>
  }
  public static async updateRole(
    id: string | undefined,
    data: ICreateRoles
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`roles/${id}`, data)
    return res.data as IAPIResponse<any>
  }
}
