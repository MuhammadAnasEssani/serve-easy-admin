import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {ICreateDevice, IDeviceList} from '../../interfaces/IPosDevice'

export class PosDeviceServices {
  public static async index(
    params: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IDeviceList[]>>> {
    const res = await api.get(`establishment-pos-devices`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IDeviceList[]>>
  }

  public static async store(data: ICreateDevice): Promise<IAPIResponse<IDeviceList>> {
    const res = await api.post('establishment-pos-devices', data)
    return res.data as IAPIResponse<IDeviceList>
  }

  public static async update(
    id: string | undefined,
    data: ICreateDevice
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`establishment-pos-devices/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IDeviceList>> {
    const res = await api.get(`establishment-pos-devices/${id}`)
    return res.data as IAPIResponse<IDeviceList>
  }

  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`establishment-pos-devices/${id}`)
    return res.data as IAPIResponse<any>
  }
  public static async updateStatus(id: number, status: number): Promise<IAPIResponse<any>> {
    const res = await api.patch(`update-pos-status/${id}`, {status})
    return res.data as IAPIResponse<any>
  }
}
