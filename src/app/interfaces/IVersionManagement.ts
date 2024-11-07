import {IListGeneric} from './ICommon'

export interface IVersion {
  version: string
  type: string
  force_update: boolean
  build_no: number
}

export interface IVersionResponse extends IListGeneric {
  version: string
  type: string
  force_update: boolean
  build_no: number
}
