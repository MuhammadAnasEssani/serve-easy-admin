import {IOrdersFilters} from './IOrder'
import {IProductList} from './IMenu'

export interface IReportsFilters extends IOrdersFilters {
  start_date?: string
  end_date?: string
}

export interface IItemSummaryReportsFilters {
  start_date?: string
  end_date?: string
  order_type: number[]
  date_range?: string[]
  establishment_id: number
}

export interface IItemSummaryReport {
  unit_price: number
  product_id: number
  product: IProductList
  meta: IItemSummaryReportMeta
}
interface IItemSummaryReportMeta {
  sold_qty: number
}

export interface IReportList {
  net_amount: IReportBody
  gross_amount: IReportBody
  service_charges: IReportBody
  tip: IReportBody
  promo_discount: IReportBody
  discount: IReportBody
  cash_amount_received: IReportBody
  cash_amount_returned: IReportBody
  card_amount_received: IReportBody
  card_amount_returned: IReportBody
  dinein_net_amount: IReportBody
  dinein_avg_amount: IReportBody
  dinein_check: IReportBody
  takeaway_net_amount: IReportBody
  takeaway_avg_amount: IReportBody
  takeaway_check: IReportBody
  delivery_net_amount: IReportBody
  delivery_avg_amount: IReportBody
  delivery_check: IReportBody
  online_net_amount: IReportBody
  online_avg_amount: IReportBody
  online_check: IReportBody
  open_check_orders: IReportBody
  open_check_amount: IReportBody

  bar_chart_result: IBarChartResult[]
  dinein_result: ITimeGraph[]
  takeaway_result: ITimeGraph[]
  delivery_result: ITimeGraph[]
  online_result: ITimeGraph[]
}

interface IReportBody {
  current: number
  past: number
  diff: string
}

export interface IDashboardAnalyticsParams {
  compare_to: number | undefined
  compare_from: number | undefined
  is_updated?: boolean
}

export interface IDashboardAnalytics extends IReportList {
  net_amount: IReportBody
  android_platform_orders: IReportBody
  pos_platform_orders: IReportBody
  desktop_platform_orders: IReportBody
  ios_platform_orders: IReportBody
  dinein_result: ITimeGraph[]
  takeaway_result: ITimeGraph[]
  delivery_result: ITimeGraph[]
  online_result: ITimeGraph[]
  heat_map_result: IHeatMap[]
  monthly_sales_target: IMonthlySalesTarget
}

export interface IBarChartResult {
  x_label: number
  net_amount: number
  order_type: number
}

export interface IDashboardAnalyticsResponse extends IReportList {
  all_sales_net_amount: IReportBody
  android_platform_orders: IReportBody
  pos_platform_orders: IReportBody
  desktop_platform_orders: IReportBody
  ios_platform_orders: IReportBody
  bar_chart_result: IBarChartResult[]
  heat_map_result: IHeatMap[]
  monthly_sales_target: IMonthlySalesTarget
}

export interface IProductSaleBreakdown {
  product_id: number
  product: IProductList
  meta: {
    sale: number | null
  }
}

export interface ITimeGraph {
  x_label: number
  net_amount: number | null
}

export interface IHeatMap {
  lat: number
  lng: number
}
export interface IMonthlySalesTarget {
  current_month_sale: number | null
  sales_target: number | null
  target_completed_percentage: number
}

// Menu Breakdown Here ...
export interface IMenuBreakdownParams {
  start_date?: string
  end_date?: string
}

export interface IMenuBreakdownResponse {
  category_sale_breakdown: IMenuCategorySaleBreakdown[]
  product_sale_breakdown: IMenuProductSaleBreakdown[]
  modifier_sale_breakdown: IMenuModifierSaleBreakdown[]
}

export interface IMenuCategorySaleBreakdown {
  category_id: number
  category_name: string
  sale_qty: number
  net_sale: number
}
export interface IMenuProductSaleBreakdown {
  product_id: number
  product_name: string
  sale_qty: number
  net_sale: number
}
export interface IMenuModifierSaleBreakdown {
  modifier_id: number
  modifier_name: string
  sale_qty: number
  net_sale: number
}

// Discount Breakdown Here ...
export interface IDiscountBreakdownParams {
  start_date?: string
  end_date?: string
}

export interface IDiscountBreakdownResponse {
  discount_sale_breakdown: IDiscountSaleBreakdown[]
  item_discount_sale_breakdown: IItemDiscountSaleBreakdown[]
}

export interface IDiscountSaleBreakdown {
  discount_name: string
  discount_count: number
  discount_amount: number
  profitability: number
}
export interface IItemDiscountSaleBreakdown {
  item_name: string
  discount_count: number
  discount_amount: number
  item_sold: number
}

// Sales Breakdown Here ...
export interface ISaleBreakdownParams {
  date_range?: string[]
  start_date?: string
  end_date?: string
  compare_to?: number
  compare_from?: number
}

export interface ISaleBreakdownReportItem {
  id: number
  name: string
  report_order_type_children: IReportOrderTypeChildren[]

  // for table column key it will replace from report_order_type_children
  children?: IReportOrderTypeChildren[]

  // if compare from will orderType then receive this keys
  type?: number
  discount_amount?: number
  gross_sale?: number
  net_sale?: number
  sale_qty?: number
  meta?: {
    name: string
  }
}
// Void Item Report
export interface IVoidReportParams {
  date_range?: string[]
  start_date?: string
  end_date?: string
}
export interface IVoidReportResponse {
  top_made_voids_by_user: ITopMadeVoidsByUser[]
  top_unmade_voids_by_user: ITopUnmadeVoidsByUser[]
  voids: {
    data: IVoidsItem[]
  }
}

export interface ITopMadeVoidsByUser {
  meta: {
    user_name: string
    void_amount: number
    void_deal_item_count: number
    void_order_item_count: number
  }
}
export interface ITopUnmadeVoidsByUser {
  meta: {
    user_name: string
    void_amount: number
    void_deal_item_count: number
    void_order_item_count: number
  }
}
export interface IVoidsItem {
  business_date: string
  id: number
  type: number
  amount: number
  qty: number
  void_message: string
}

export interface IAiForcastingChart {
  date: string
  net_sales: number
  is_predicted: boolean
}

export interface IReportOrderTypeChildren {
  sale_qty: number
  net_sale: number
  gross_sale: number
  discount_amount: number
  type?: number
  type_text?: string
  // for table column key it will replace from type_text
  name?: string
}

export interface IReportComponentProps {
  applyFilterLoader: boolean
  clearFilterLoader: boolean
  reloadData?: () => void
}
