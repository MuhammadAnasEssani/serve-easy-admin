import {IListGeneric} from './ICommon'
import {ITimetable} from './IGetEstablishment'

export interface IEntityTimetable extends IListGeneric {
  entity_id: number
  entity_type: number
  timetables: ITimetable[]
}

export interface IDateRange {
  date_range?: string[]
  switchDisable?: boolean
  required: boolean
}
