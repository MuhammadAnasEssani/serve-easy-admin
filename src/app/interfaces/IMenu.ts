import {IListGeneric} from './ICommon'
import {IGetEstablishment} from './IGetEstablishment'
import {IModifiers} from './IModifiers'
import {IProductClassList} from './IProductClass'
import {IPrinterList} from './IPrinter'

export interface ICategory {
  id: number
  name: any
  parent_id?: null | number
  parent_sort?: number
  description?: string
  status: number
  establishment_id: number
  created_by_id: number
  updated_by_id: number | null
  created_by: {
    full_name: string
    id: number
    meta: any
  }
  updated_by: {
    full_name: string | null
    id: number
    meta: any
  }
  created_at: string
  updated_at: string
  deleted_at: string
  created_ago: string
  status_text: string
  is_category: boolean
  is_subcategory: boolean
  products?: IProductList[]
  subCategories?: ICategory[]
  children?: any
  category_image?: {
    mediaUrl: string
  } | null
}
export interface IMenu extends ICategory {
  meta: {
    products_count: number
    subCategories_count: number
  }
  sold_by_weight?: number
  is_shipping?: boolean
  sku?: number
  barcode?: number
  stock_amount?: number
  cost?: number
  price?: number
  is_product: boolean
  children?: any[]
  type?: number
}
export interface IProductTableColumns {
  id: number
  name: any
  status: number
  category_id: number
}

export interface IMenuProductDetail {
  name: string
  barcode: number
  category_id: number
  price: number
  cost: number
  description: string
  sku: number
  is_shipping: boolean | number
  sold_by_weight: boolean | number
  stock_amount: number
  product_media?: {
    path: string
  }[]
}

export interface IMenuCreateProduct extends IMenuProductDetail {
  modifier_products: number[]
  product_classes: number[]
  product_printers: number[]
  main_category: number
  printer: string
  additional_category: number
  kitchen_desc: string
  price_tag: boolean
  product_media?: IProductMedia[]
}

export interface IProductMedia {
  path: string
}

export interface IUploadBulkCategories {
  establishment_id: number
  categories: File
}

export interface ICategoryCreate {
  name: string
  parent_id: number | null
  description?: string
  establishment_id?: number
  parent_sort?: number
  category_media?: IProductMedia[]
  image_url?: string
}

export interface IProductList extends IListGeneric {
  name: string
  description: string
  sold_by_weight: number
  is_shipping: number
  sku: number
  category_id: number
  establishment_id: number
  barcode: number
  stock_amount: number
  cost: number
  price: number
  is_product: boolean
  meta: any
  category: ICategory
  establishment: IGetEstablishment
  modifiers?: IModifiers[]
  printers: IPrinterList[]
  classes: IProductClassList[]
  product_single_image: {
    mediaUrl: string
  } | null
}
