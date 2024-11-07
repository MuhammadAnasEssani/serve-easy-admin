export interface IWebsiteCMS {
  primary_color: string
  secondary_color: string
  logos?: {
    path: string
  }[]
  logo: string
  type: number
  banners: {
    path: string
  }[]
}

export interface IGetCMS {
  primary_color: string
  secondary_color: string
  web_logo: media
  web_banners: media[]
  app_logo: media
  app_banners: media[]
}

interface media {
  id: number
  path: string
  mediaUrl: string
}

export interface IPages {
  content: string
  title: string
}

export interface IPagesResponse {
  content: any
  title: string
}
