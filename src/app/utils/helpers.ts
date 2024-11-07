import { BACKEND_CONSTANTS } from "../config/constants"
import { IBarChartResult, ITimeGraph } from "../interfaces/IReports"

export function GroupByHour(data: IBarChartResult[], compareFrom: number) {
  // create a map of all possible hours
  let loopNumber = 0

  switch (compareFrom) {
    case BACKEND_CONSTANTS.COMPARED.FROM.TODAY:
      loopNumber = 24
      break
    case BACKEND_CONSTANTS.COMPARED.FROM.THIS_WEEK:
      loopNumber = 7
      break
    case BACKEND_CONSTANTS.COMPARED.FROM.THIS_MONTH:
      loopNumber = 31
      break
    case BACKEND_CONSTANTS.COMPARED.FROM.THIS_YEAR:
      loopNumber = 12
      break
  }

  const hourMap: {[label: number]: number} = {}
  for (let i = 1; i < loopNumber + 1; i++) {
    hourMap[i] = 0
  }

  // group the data by hour
  data.forEach((item: IBarChartResult) => {
    hourMap[item.x_label] = item.net_amount
  })

  // convert the map to an array
  const result: ITimeGraph[] = []
  for (let hour in hourMap) {
    result.push({
      x_label: parseInt(hour),
      net_amount: hourMap[hour],
    })
  }

  return result
}