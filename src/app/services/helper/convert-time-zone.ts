import moment from 'moment-timezone'

export function convertTimeZone(time: string) {
  const momentObj = moment(time)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return {
    date: momentObj.tz(timeZone).format('MM-DD-YYYY'),
    time: momentObj.tz(timeZone).format('hh:mm:ss'),
    formatted: `${momentObj.tz(timeZone).format('MM-DD-YYYY')} | ${momentObj
      .tz(timeZone)
      .format('hh:mm:ss')}`,
  }
}
