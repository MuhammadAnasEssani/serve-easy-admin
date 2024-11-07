import {PAGINATION} from '../../config/constants'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {api} from './api.service'
import {ITransactionListing} from '../../interfaces/ITransactions'

export class TransactionService {
  public static async index(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<ITransactionListing[]>>> {
    const res = await api.get(`transactions`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<ITransactionListing[]>>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<ITransactionListing>> {
    const res = await api.get(`transactions/${id}`)
    return res.data as IAPIResponse<ITransactionListing>
  }
}
