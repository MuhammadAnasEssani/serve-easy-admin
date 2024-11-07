import {IListGeneric} from './ICommon'

export interface IPlanList extends IListGeneric {
  name: string
  amount: number
}
export interface IDeliveryServiceList {
  name: string
  id: number | null
  identifier: number | null
}
export interface IPaymentServiceList {
  name: string
  id: number | null
  identifier: number | null
}
