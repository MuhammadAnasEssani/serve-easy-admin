import {IListGeneric} from './ICommon'

export interface ICreateTable {
  table_number: number
  seating_capacity: number
  floor: number
  establishment_id: number
}

export interface ITableListing extends IListGeneric {
  table_number: number
  establishment_id?: number
  seating_capacity: number
  floor: number
}
