import {IListGeneric} from './ICommon'
import {IProductList} from './IMenu'
import {ITransactionListing} from './ITransactions'
import {IDealComboListing} from './IDealsCombo'
import {ICustomerListing} from './ICustomerManagement'

export interface IOrdersFilters {
  order_id?: number
  date_range?: string[]
  status?: number[]
  platform?: string[]
  payment_type?: number[]
  order_type?: number
  establishment_id: number
}
export interface IOrderDealCombo {
  id: number
  purchased_qty: number
  payable_price: number
  deal_combo: IDealComboListing
  deal_combo_items: {
    purchased_qty: number
    payable_price: number
    product: IProductList
  }[]
}

export interface IOrderList extends IListGeneric {
  user_id: null | number
  table_id: null | number
  employee_id: null | number
  establishment_id: number
  user_address_id: null | number
  type: number
  delivery_customer_id: null | number
  rider_id: null | number
  payment_status: number
  payment_type: number
  promo_code_id: null | number
  discount_id: null | number
  type_text: string
  payment_status_text: string
  platform: string
  order_taker: {
    full_name: string
    id: number
    meta: any
  } | null
  delivery_customer: {
    name: string
    id: number
    meta: any
  } | null
  mobile_customer: {
    full_name: string
    id: number
    meta: any
  } | null
  order_items: IOrderItemList[]
  deal_combos: IOrderDealCombo[]
  summary: {
    netAmount: number
    serviceCharges: number
    discount: number
    grossAmount: number
  }
  transactions: ITransactionListing[]
  discount_type: number | null
  tip: number
  gross_amount: number
  total_discount: number
  service_charges: number
  delivery_charges: number
  tax: number
  total_guests: number
  promo_code: string
  cart_id: number
  net_amount: number
  customer: ICustomerListing | null
  table: {
    table_number: number
    id: number
    is_reserved: boolean
  } | null
  order_delivery?: {
    rider_name: string | null
    rider_mobile: string | null
  }
}

export interface IOrderItemModifier {
  modifier: {
    name: string
  }
  payable_price: number
  qty: number
}
export interface IOrderItemList extends IListGeneric {
  product_id: number
  order_id: number
  payable_price: number
  unit_price: number
  purchased_qty: number
  instruction: null | string
  product: IProductList
  orderItemModifiers: IOrderItemModifier[]
}
