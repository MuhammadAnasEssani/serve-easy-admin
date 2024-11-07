import {IListGeneric} from './ICommon'

export interface IAttachmentListing extends IListGeneric {
  path: string
  instance_type: number
  instance_id: number
  mime_type: string
  thumbnail: string | null
  duration: string | null
  mediaUrl: string | null
  smallImage: string | null
  mediumImage: string | null
  meta: any
}

export interface ICreateAttachment {
  path: string
  establishment_id?: number
}
