import {TablePaginationConfig} from 'antd/lib/table'
import {SorterResult} from 'antd/lib/table/interface'

export interface IDatatableParams {
  pagination?: TablePaginationConfig
  sorter?: SorterResult<any> | SorterResult<any>[]
  total?: number
  sortField?: string
  sortOrder?: string
}
