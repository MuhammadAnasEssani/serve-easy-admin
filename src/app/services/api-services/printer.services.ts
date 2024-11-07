import {api} from './api.service'
import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {PAGINATION} from '../../config/constants'
import {ICreatePrinter, IPrinterList} from '../../interfaces/IPrinter'

export class PrinterServices {
  public static async index(
    params: any,
    perPage: number = PAGINATION.perPage,
    page: number = 1
  ): Promise<IAPIResponse<IPaginated<IPrinterList[]>>> {
    const res = await api.get(`printers`, {
      params: {'per-page': perPage, page, 'pagination': true, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IPrinterList[]>>
  }
  public static async all(params?: any): Promise<IAPIResponse<IPrinterList[]>> {
    const res = await api.get(`printers`, {params: {pagination: false, ...params}})
    return res.data as IAPIResponse<IPrinterList[]>
  }
  public static async store(data: ICreatePrinter): Promise<IAPIResponse<any>> {
    const res = await api.post('printers', data)
    return res.data as IAPIResponse<any>
  }
  public static async uploadBulkPrinters(data: FormData): Promise<IAPIResponse<any>> {
    const res = await api.post(`upload-bulk-printers`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data as IAPIResponse<any>
  }
  public static async update(
    id: string | undefined,
    data: ICreatePrinter
  ): Promise<IAPIResponse<any>> {
    const res = await api.put(`printers/${id}`, data)
    return res.data as IAPIResponse<any>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<IPrinterList>> {
    const res = await api.get(`printers/${id}`)
    return res.data as IAPIResponse<IPrinterList>
  }

  public static async destroy(id: number): Promise<IAPIResponse<any>> {
    const res = await api.delete(`printers/${id}`)
    return res.data as IAPIResponse<any>
  }
}
