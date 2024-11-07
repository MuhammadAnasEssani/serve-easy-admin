import {ITimetable} from './IGetEstablishment'
import {IListGeneric} from './ICommon'
import {IProductList} from './IMenu'
import {IEntityTimetable} from './ITimetable'

export interface ICreateDiscount {
  type: number
  applies_to: number
  discount: number
  min_order_amount: number
  max_order_amount: number
  discount_order_types: types[]
  discount_payment_modes: types[]
  bill_print_name: string
  name: string
  time_tables: ITimetable[]
  discount_products: discount_products[]
  products: number[] //to hold temporary data
  include_exclude: number //to hold temporary data
  establishment_id: number
  start_date: string
  expiry_date: string
  date_range?: string[]
}

export interface ICreateManualDiscount {
  type: number
  applies_to: number
  discount: number
  bill_print_name: string
  name: string
  time_tables: ITimetable[]
  establishment_id: number
  start_date: string
  expiry_date: string
  is_manual: boolean
  date_range?: string[]
}

interface discount_products {
  product_id: number
  type: number
}
interface types {
  type: number | undefined
}

export interface IDiscountListing extends IListGeneric {
  name: string
  bill_print_name: string
  description: string
  discount: number
  applies_to: number
  min_order_amount: number
  max_order_amount: number
  type: number
  establishment_id: number
  discount_order_types: IDiscountOrderType[]
  discount_payment_modes: IDiscountPaymentTypes[]
  products: IProductList[]
  applies_to_text: string
  type_text: string
  entity_timetables: IEntityTimetable
  start_date: string
  expiry_date: string
  is_manual: boolean
}

interface IDiscountOrderType extends IListGeneric {
  type: number
  discount_id: number
  type_text: string
}
interface IDiscountPaymentTypes extends IDiscountOrderType {}
