import React, {useEffect, useState} from 'react'
import ThemeSwitch from '../authentication/Switch'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import {Controller, useFormContext} from 'react-hook-form'
import ThemeTimePicker from './ThemeTimePicker'
import '../../../assets/css/components/dashboard/timetable.scss'
import {Required} from '../../utils/patterns'
import {BACKEND_CONSTANTS} from '../../config/constants'
import {ITimetable} from '../../interfaces/IGetEstablishment'
import {TimetableDateRange} from './TimetableDateRange'

export default function TimeTable({
  apiData,
  withDateRange = false,
  dateRangeRequired = false,
}: {
  apiData?: ITimetable[]
  withDateRange?: boolean
  dateRangeRequired?: boolean
}) {
  interface IComponentTimeTable {
    time_tables: ITimetable[]
  }

  const {
    control,
    setValue,
    register,
    watch,
    formState: {errors},
  } = useFormContext<IComponentTimeTable>()

  interface ITimeTableModule {
    id: number
    disable: boolean
    day: string
  }
  let watchTableValues = watch('time_tables')

  const toggleDayCheckBox = (data: ITimeTableModule, index: number) => {
    let filteredData = timeSchedule.map((innerData: ITimeTableModule) => {
      if (innerData.id === data.id) {
        return {
          id: data.id,
          disable: !timeSchedule[index].disable,
          day: data.day,
        }
      } else {
        return innerData
      }
    })
    setValue(
      `time_tables.${index}.status`,
      !filteredData[index].disable
        ? BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.ACTIVE
        : BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.INACTIVE
    )
    if (!watchTableValues[index].start_time) setValue(`time_tables.${index}.start_time`, '09:00:00')

    if (!watchTableValues[index].end_time) setValue(`time_tables.${index}.end_time`, '18:00:00')

    let isDefaultChecked: boolean = filteredData.filter((it) => it.disable).length === 0
    setCheckAll(isDefaultChecked)
    setTimeSchedule(filteredData)
  }

  const timetableDefaults: ITimeTableModule[] = [
    {
      id: 1,
      disable: true,
      day: 'Monday',
    },
    {
      id: 2,
      disable: true,
      day: 'Tuesday',
    },
    {
      id: 3,
      disable: true,
      day: 'Wednesday',
    },
    {
      id: 4,
      disable: true,
      day: 'Thursday',
    },
    {
      id: 5,
      disable: true,
      day: 'Friday',
    },
    {
      id: 6,
      disable: true,
      day: 'Saturday',
    },
    {
      id: 7,
      disable: true,
      day: 'Sunday',
    },
  ]
  const [timeSchedule, setTimeSchedule] = useState<ITimeTableModule[]>(timetableDefaults)

  const [checkAll, setCheckAll] = useState<boolean>(false)

  useEffect(() => {
    timeSchedule.forEach((data, index) => setValue(`time_tables.${index}.day_id`, data.id))
    if (apiData) {
      let filteredData: ITimeTableModule[] = timeSchedule.map((day) => ({
        ...day,
        disable: !!!apiData?.find((row) => row.day_id == day.id),
      }))
      setTimeSchedule(filteredData)
      let isDefaultChecked: boolean = filteredData.filter((it) => it.disable).length === 0
      setCheckAll(isDefaultChecked)
    }
  }, [apiData])

  const handleCheckAll = (status: boolean) => {
    setCheckAll(status)
    let filteredSchedule: ITimeTableModule[] = timeSchedule.map(
      (innerData: ITimeTableModule, index) => {
        setValue(
          `time_tables.${index}.status`,
          status
            ? BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.ACTIVE
            : BACKEND_CONSTANTS.CUSTOM_MENU.TIMETABLE_STATUS.INACTIVE
        )
        setValue(`time_tables.${index}.start_time`, status ? '09:00:00' : '')
        setValue(`time_tables.${index}.end_time`, status ? '18:00:00' : '')
        return {
          id: innerData.id,
          disable: !status,
          day: innerData.day,
        }
      }
    )
    setTimeSchedule(filteredSchedule)
  }

  return (
    <>
      <div className={'timetable'}>
        <h2 className={'dash-heading'}>Time Schedule</h2>
        <div className={'custom-time-avail'}>
          <p>Custom Time Availability</p>
          <h4>Available Every Day?</h4>
          <ThemeSwitch
            checked={checkAll}
            fieldName={'switch'}
            setValue={setValue}
            setSwitchValue={handleCheckAll}
          />
        </div>
        <div className={'establishment-time-slots'}>
          <ul>
            {timeSchedule.map((data: ITimeTableModule, index: number) => {
              // const rowMatched = apiData?.find(row=>row.day_id == data.id)
              return (
                <li key={data.id}>
                  <div className={'days'}>
                    <Checkbox
                      checked={!data.disable}
                      onChange={() => toggleDayCheckBox(data, index)}
                    >
                      <span className={'check-days'}>{data.day}</span>
                    </Checkbox>
                  </div>
                  <div className={'time'}>
                    <Controller
                      control={control}
                      name={`time_tables.${index}.start_time`}
                      // defaultValue={apiData?.[index]?.start_time || ""}
                      rules={data.disable ? {required: false} : {required: Required}}
                      render={({field: {name, value, onChange}}) => (
                        <ThemeTimePicker
                          disabled={data.disable}
                          errors={errors?.time_tables?.[index]?.start_time}
                          setValue={setValue}
                          fieldName={name}
                          value={(watchTableValues && watchTableValues[index]?.start_time) || ''}
                        />
                      )}
                    />

                    <span className={'dash'}>-</span>
                    <Controller
                      control={control}
                      name={`time_tables.${index}.end_time`}
                      // defaultValue={apiData?.[index]?.end_time || ""}
                      rules={data.disable ? {required: false} : {required: Required}}
                      render={({field: {name, value, onChange}}) => (
                        <ThemeTimePicker
                          disabled={data.disable}
                          errors={errors?.time_tables?.[index]?.end_time}
                          setValue={setValue}
                          fieldName={name}
                          value={(watchTableValues && watchTableValues[index]?.end_time) || ''}
                        />
                      )}
                    />
                    <input
                      type="hidden"
                      value={'2029-06-11'}
                      {...register(`time_tables.${index}.from_date`)}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        {withDateRange && (
          <div className={'establishment-date'}>
            <TimetableDateRange required={dateRangeRequired} />
          </div>
        )}
      </div>
    </>
  )
}
