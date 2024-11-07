import {IGetEstablishment, ITimetable} from './IGetEstablishment'
import {ICategory, IProductList} from './IMenu'
import {IListGeneric} from './ICommon'

export interface ICreateDeals {
  deal_combo_media?: {
    path: string
  }[]
  image_url?: string
  name: string
  type: number | null
  items: items[]
  establishment_id: number
}
export interface ICreateCombo extends ICreateDeals {}

interface items {
  category_id: number | undefined
  products: number[] | undefined
  quantity: number | undefined
  optional?: boolean
  sale_price?: number | undefined
}

export interface IMultiProductInterface {
  index: number
  type?: string
  data?: IProductList[]
}

export interface IDealComboListing extends IListGeneric {
  establishment_id: number
  name: string
  type: number
  establishment: IGetEstablishment
  deal_combo_items: IDealComboItems[]
  type_text: string
  total_sale_price: number
  meta: {
    deal_combo_items_count: number
  }
  deal_combo_image: {
    mediaUrl: string
  } | null
}

interface IDealComboItems {
  id: number
  deal_combo_id: number
  category_id: number
  category?: ICategory
  products?: IDealComboItemProduct[]
  quantity: number
  sale_price: number
  created_at: string
  updated_at: string
  deleted_at: string
  optional: boolean
  created_ago: string
  meta: any
}

export interface IDealComboFilters {
  establishment_id: number
  date_range?: string[]
  status?: number[]
  type?: number[]
}

interface IDealComboItemProduct {
  product_id: number
  deal_combo_item_id: number
  created_at: string
  updated_at: string
  deleted_at: string
  id: number
  product: IProductList
  created_ago: string
  meta: any
}
