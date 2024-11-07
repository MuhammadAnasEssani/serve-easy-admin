import {IListGeneric} from './ICommon'
import {ITimetable} from './IGetEstablishment'
import {IDealComboListing} from './IDealsCombo'

export interface ICustomMenuList extends IListGeneric {
  name: string
  establishment_id: number
  description: string
  deals_combos: IDealComboListing[]
  order_types: ICustomMenuOrderType[]
  time_tables: ITimetable[]
}

interface ICustomMenuOrderType extends IListGeneric {
  type: number
  custom_menu_id: number
  type_text: string
}

export interface ICreateCustomMenu {
  name: string
  description: string
  establishment_id: number
  product: number[]
  time_tables: ITimetable[]
  deals_combos: number[]
  custom_menu_order_types: types[]
  combos?: number[]
  deals?: number[]
}

interface types {
  type: number | undefined
}
