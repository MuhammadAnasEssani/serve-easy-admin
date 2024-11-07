import {api} from './api.service'
import {IAPIResponse} from '../../interfaces/ICommon'
import {IVersion, IVersionResponse} from '../../interfaces/IVersionManagement'

export class VersionService {
  public static async store(data: IVersion): Promise<IAPIResponse> {
    const res = await api.post('api-versions', data)
    return res.data as IAPIResponse
  }

  public static async get(): Promise<IAPIResponse<IVersionResponse>> {
    const res = await api.get('get-api-version')
    return res.data as IAPIResponse<IVersionResponse>
  }

  public static async getByType(type: string): Promise<IAPIResponse<IVersionResponse>> {
    const res = await api.get(`get-api-version-by-type/${type}`)
    return res.data as IAPIResponse<IVersionResponse>
  }
}
