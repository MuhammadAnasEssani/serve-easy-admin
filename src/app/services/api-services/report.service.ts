import {IAPIResponse, IPaginated} from '../../interfaces/ICommon'
import {api} from './api.service'
import {ITransactionListing} from '../../interfaces/ITransactions'
import {
  IAiForcastingChart,
  IDashboardAnalyticsParams,
  IDashboardAnalyticsResponse,
  IDiscountBreakdownParams,
  IDiscountBreakdownResponse,
  IItemSummaryReport,
  IMenuBreakdownParams,
  IMenuBreakdownResponse,
  IReportList,
  ISaleBreakdownParams,
  ISaleBreakdownReportItem,
  IVoidReportParams,
  IVoidReportResponse,
} from '../../interfaces/IReports'
import {PAGINATION} from '../../config/constants'

export class ReportService {
  public static async index(params?: any): Promise<IAPIResponse<IReportList>> {
    const res = await api.get(`reports`, {params: {...params}})
    return res.data as IAPIResponse<IReportList>
  }
  public static async getItemSummaryReport(
    perPage: number = PAGINATION.perPage,
    page: number = 1,
    params?: any
  ): Promise<IAPIResponse<IPaginated<IItemSummaryReport[]>>> {
    const res = await api.get(`item-summary-report`, {
      params: {'per-page': perPage, page, ...params},
    })
    return res.data as IAPIResponse<IPaginated<IItemSummaryReport[]>>
  }
  public static async getById(id: string | undefined): Promise<IAPIResponse<ITransactionListing>> {
    const res = await api.get(`transactions/${id}`)
    return res.data as IAPIResponse<ITransactionListing>
  }
  public static async dashboardAnalytics(
    params?: IDashboardAnalyticsParams
  ): Promise<IAPIResponse<IDashboardAnalyticsResponse>> {
    const res = await api.get(`dashboard-analytics`, {params: {...params}})
    return res.data as IAPIResponse<IDashboardAnalyticsResponse>
  }

  public static async getMenuBreakdown(
    params?: IMenuBreakdownParams
  ): Promise<IAPIResponse<IMenuBreakdownResponse>> {
    const res = await api.get(`menu-breakdown-report`, {params: {...params}})
    return res.data as IAPIResponse<IMenuBreakdownResponse>
  }

  public static async getDiscountBreakdown(
    params?: IDiscountBreakdownParams
  ): Promise<IAPIResponse<IDiscountBreakdownResponse>> {
    const res = await api.get(`report-discount-reports`, {params: {...params}})
    return res.data as IAPIResponse<IDiscountBreakdownResponse>
  }

  public static async getSaleBreakdown(
    params?: ISaleBreakdownParams
  ): Promise<IAPIResponse<IPaginated<ISaleBreakdownReportItem[]>>> {
    const res = await api.get(`sale-breakdown-report`, {params: {...params}})
    return res.data as IAPIResponse<IPaginated<ISaleBreakdownReportItem[]>>
  }

  public static async getVoidBreakdown(
    params?: IVoidReportParams
  ): Promise<IAPIResponse<IVoidReportResponse>> {
    const res = await api.get(`void-report`, {params: {...params}})
    return res.data as IAPIResponse<IVoidReportResponse>
  }

  public static async getAiForcasting(params?: {}): Promise<IAPIResponse<IAiForcastingChart[]>> {
    const res = await api.get(`get-predicted-sales`, {params: {...params}})
    return res.data as IAPIResponse<IAiForcastingChart[]>
  }
}
