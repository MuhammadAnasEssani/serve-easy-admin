import { api } from './api.service'
import { IAPIResponse } from '../../interfaces/ICommon'
import { IPaymentServiceList } from '../../interfaces/IPlan'

export class PaymentServicesService {
  public static async all(params?: any): Promise<IAPIResponse<IPaymentServiceList[]>> {
    const res = await api.get(`payment-services`, { params: { pagination: false, ...params } })
    return res.data as IAPIResponse<IPaymentServiceList[]>
  }
}
