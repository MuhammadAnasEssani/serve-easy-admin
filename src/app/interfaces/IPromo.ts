import {IListGeneric} from './ICommon'
import {IProductList} from './IMenu'

export interface IPromoList extends IListGeneric {
  code: string
  type: number
  discount: number
  establishment_id: number
  min_order_amount: number
  type_text: string
  applies_to_text: string
  start_date: string
  expiry_date: string
  products: IPromoProducts[]
  applies_to: number
}

interface IPromoProducts extends IProductList {
  meta: {
    pivot_promo_code_id: number
    pivot_type: number
    pivot_product_id: number
  }
}

export interface ICreatePromo {
  code: string
  discount: number
  type: number
  min_order_amount: number
  establishment_id: number
  promo_products: promo_products[]
  products: number[] //to hold temporary data
  include_exclude: number //to hold temporary data
  applies_to: number
  date_range?: string[] // hold temp data
  expiry_date?: string
  start_date?: string
}

interface promo_products {
  product_id: number
  type: number
}
