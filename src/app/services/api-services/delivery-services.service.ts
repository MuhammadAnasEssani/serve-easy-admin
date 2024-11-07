import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IDeliveryServiceList} from '../../interfaces/IPlan'

export class DeliveryServicesService {
  public static async all(params?: any): Promise<IAPIResponse<IDeliveryServiceList[]>> {
    const res = await api.get(`delivery-services`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<IDeliveryServiceList[]>
  }
}
