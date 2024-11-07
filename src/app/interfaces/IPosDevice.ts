import {IListGeneric} from './ICommon'

export interface ICreateDevice {
  name: string
  establishment_id: number
}
export interface IDeviceList extends IListGeneric {
  name: string
  establishment_id: number
  device_id: string | null
  verification_code: number
}
