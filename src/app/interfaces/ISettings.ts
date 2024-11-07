export interface ISettings {
  pos_idle_time?: number | null
  tips?: {
    percentage: number
  }[]
  tip_status?: boolean
  delivery_radius: number
  pickup_radius: number
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  google_plus_url?: string
  service_charges?: number
  delivery_charges?: number
  monthly_sales_target?: number
  taxes: {
    tax_name: string
    tax_rate: number
  }[]
  restaurant_business_profile: {
    name: string
    address: string
    phone: string,
    // monthly_sales_target?: number
  }
}

export interface IGetRestaurantSetting {
  pos_idle_time: number | null
  tips: {
    percentage: number
  }[]
  delivery_radius: number
  pickup_radius: number
  facebook_url: string | null
  instagram_url: string | null
  twitter_url: string | null
  google_plus_url: string | null
  monthly_sales_target?: number
  taxes: {
    tax_name: string
    tax_rate: number
  }[]
  restaurant: {
    name: string
    address: string
    phone: string
  }
  service_charges?: number
  delivery_charges?: number
}

export interface IPOSSettings {
  minutes: number
  tip: {
    amount: number
  }[]
  tip_status: boolean
}

export interface IRestaurantStepper {
  restaurant_status: number
}
