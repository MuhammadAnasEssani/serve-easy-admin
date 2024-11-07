import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IGetRestaurantSetting, ISettings} from '../../interfaces/ISettings'
import {IGetCMS} from '../../interfaces/ICMS'

export class RestaurantSettingService {
  public static async store(data: ISettings): Promise<IAPIResponse> {
    const res = await api.post('restaurant-settings', data)
    return res.data as IAPIResponse
  }

  public static async get(): Promise<IAPIResponse<IGetRestaurantSetting>> {
    const res = await api.get('get-restaurant-setting')
    return res.data as IAPIResponse<IGetRestaurantSetting>
  }
}
