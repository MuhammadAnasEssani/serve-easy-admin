import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IPages, IPagesResponse} from '../../interfaces/ICMS'

export class PagesServices {
  // public static async store(data: IWebsiteCMS): Promise<IAPIResponse<any>> {
  //   const res = await api.post('themes', data)
  //   return res.data as IAPIResponse<any>
  // }

  // public static async get(params: any): Promise<IAPIResponse<IGetCMS>> {
  //   const res = await api.get('get-restaurant-theme-for-admin', {params: {...params}})
  //   return res.data as IAPIResponse<IGetCMS>
  // }

  public static async store(data: IPages): Promise<IAPIResponse<any>> {
    const res = await api.post('pages', data)
    return res.data as IAPIResponse<any>
  }

  public static async getPageBySlug(slug: string): Promise<IAPIResponse<IPagesResponse>> {
    const res = await api.get(`page-by-slug/${slug}`)
    return res.data as IAPIResponse<IPagesResponse>
  }
}
