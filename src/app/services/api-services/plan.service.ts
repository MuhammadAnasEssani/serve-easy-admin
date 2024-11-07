import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IPlanList} from '../../interfaces/IPlan'

export class PlanService {
  public static async all(params?: any): Promise<IAPIResponse<IPlanList[]>> {
    const res = await api.get(`plans`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<IPlanList[]>
  }
}
