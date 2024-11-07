import {IListGeneric} from './ICommon'
import {IProductMedia} from './IMenu'

export interface IModifierClassCreate {
  name: string
  max_amount: number
  min_amount: number
  multi_select: boolean
}
export interface IModifierCreate {
  name: string
  price: number
  barcode: number
  cost: number
  modifier_class_id: number
  modifier_media?: IProductMedia[]
  image_url?: string
}

export interface IModifierClassList extends IListGeneric {
  name: string
  establishment_id: number
  max_amount: number
  min_amount: number
  modifiers?: IModifiers[]
  children?: any[]
  modifier_class_id?: number
  type?: number
}

export interface IModifierClassCreate {
  name: string
  establishment_id: number
  max_amount: number
  min_amount: number
}

export interface IModifierCreate {
  name: string
  price: number
  barcode: number
  establishment_id: number
  cost: number
  modifier_class_id: number
}

export interface IModifiers extends IListGeneric {
  name: string
  modifier_class_id: number
  establishment_id: number
  price: number
  barcode: number
  cost: number
  modifier_class?: IModifierClassList
  modifier_image?: {
    mediaUrl: string
  } | null
}
