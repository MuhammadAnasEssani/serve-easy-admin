import {IListGeneric} from './ICommon'
import {IOrderList, IOrdersFilters} from './IOrder'
import {IGetEstablishment} from './IGetEstablishment'

export interface ITransactionListing extends IListGeneric {
  id: number
  ref_id: number
  establishment_id: number
  ref_type: number
  amount_received: number
  amount_returned: number
  source_type: number
  created_by_id: number
  updated_by_id: number | null
  created_at: string
  updated_at: string
  deleted_at: string
  order: IOrderList
  gateway_transaction: IGatewayTransaction
  created_ago: string
  ref_type_text: string
  source_type_text: string
  meta: any
  establishment: IGetEstablishment
  net_amount_received: number
}

export interface ITransactionsFilters extends IOrdersFilters {}

export interface IGatewayTransaction {
  id: number
  transaction_id: number
  gateway_transaction_id: string
  payment_method_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  created_ago: string
  meta: any
}
