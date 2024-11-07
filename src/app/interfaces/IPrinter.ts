import {IListGeneric} from './ICommon'

export interface ICreatePrinter {
  name: string
  ip: string
  establishment_id: number
  type: number
}
export interface IPrinterList extends IListGeneric {
  name: string
  ip: string
  establishment_id: number
  type: number
}
