export interface IPaginated<IData> {
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: number
    last_page_url: number
    next_page_url: number
    previous_page_url: number
  }
  data: IData
}

export interface IAPIResponse<IData = null> {
  status: boolean
  message: string
  data: IData
}

export interface IListGeneric {
  id: number
  status: number
  created_by_id: number
  updated_by_id: number | null
  created_by?: {
    full_name: string
    id: number
    meta: any
  }
  updated_by?: {
    full_name: string | null
    id: number
    meta: any
  }
  created_at: string
  updated_at: string
  deleted_at: string
  created_ago: string
  status_text?: string
  meta: any
}
export interface IUploadImageResponse {
  status: boolean
  message: string
  data: string | null
}
