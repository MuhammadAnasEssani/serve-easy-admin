export interface ICreateEstablishment {
  name: string
  address: string
  latitude: number
  longitude: number
  status?: number
  time_tables: ITimetable[]
  establishment_order_types: types[]
  establishment_online_order_types: {
    online_order_type: number | undefined
  }[]
  pos_devices: number
  timezone: string
  phone: string
  establishment_settings?: {
    est_delivery_time: number
  }
}
interface types {
  order_type: number | undefined
}
export interface ITimetable {
  day_id: number
  start_time: string
  end_time: string
  from_date: string
  status?: number
  day?: IDay
  date_range?: string
}

export interface IDay {
  id: number
  name: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
  created_ago: string
  meta: any
}

export interface IGetEstablishment {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone: string
  status?: number
  timezone: string
  restaurant_id: number
  created_at: string
  updated_at: string
  deleted_at: null | string
  created_by_id: number
  updated_by_id: null | number
  created_ago: string
  establishment_order_types: types[]
  establishment_online_order_types: {
    online_order_type: number
  }[]
  time_tables: ITimetable[]
  pos_devices: number
}

export interface IGetEstablishmentDropdown {
  id: number
  name: string
  latitude: number
  longitude: number
}
