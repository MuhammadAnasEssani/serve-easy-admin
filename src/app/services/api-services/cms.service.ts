import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IGetCMS, IWebsiteCMS} from '../../interfaces/ICMS'

export class CmsServices {
  public static async store(data: IWebsiteCMS): Promise<IAPIResponse<any>> {
    const res = await api.post('themes', data)
    return res.data as IAPIResponse<any>
  }

  public static async get(params: any): Promise<IAPIResponse<IGetCMS>> {
    const res = await api.get('get-restaurant-theme-for-admin', {params: {...params}})
    return res.data as IAPIResponse<IGetCMS>
  }
}
