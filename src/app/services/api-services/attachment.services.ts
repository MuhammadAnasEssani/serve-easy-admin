import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {ICreateDiscount, IDiscountListing} from '../../interfaces/IDiscount'
import {PAGINATION} from '../../config/constants'
import {IAttachmentListing, ICreateAttachment} from '../../interfaces/IAttachement'

export class AttachmentServices {
  public static async index(
    params?: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IAttachmentListing[]>>> {
    const res = await api.get(`attachments`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IAttachmentListing[]>>
  }
  public static async store(data: ICreateAttachment): Promise<IAPIResponse<any>> {
    const res = await api.post('attachments', data)
    return res.data as IAPIResponse<any>
  }
  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`attachments/${id}`)
    return res.data as IAPIResponse<any>
  }
}
