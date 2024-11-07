import React from 'react'
import {utils, writeFile} from 'xlsx'
import {ExcelIcon} from '../../../assets/images/icons/menu-icons/performances'

const ExportReportXlsx = ({data}: {data: any}) => {
  const getReportData = () => {
    let dineInIndex = data.findIndex((it: {label: string}) => it.label === 'Dine-in')
    let takeawayIndex = data.findIndex((it: {label: string}) => it.label === 'Takeaway')
    let deliveryIndex = data.findIndex((it: {label: string}) => it.label === 'Delivery')
    let reportData = Array(31)
      .fill({})
      .map((item, index) => {
        return {
          DATE: index + 1,
          DINE_IN: data[dineInIndex]?.data[index]?.y || 0,
          TAKEAWAY: data[takeawayIndex]?.data[index]?.y || 0,
          DELIVERY: data[deliveryIndex]?.data[index]?.y || 0,
        }
      })
    return reportData
  }

  const handleClick = () => {
    var workbook = utils.book_new()
    var worksheet = utils.json_to_sheet(getReportData(), {})
    utils.book_append_sheet(workbook, worksheet, 'Report')
    var createFile = writeFile(workbook, 'ServeEasy_Report.xlsx')
  }

  return (
    <button className={'excel-btn btn'} onClick={handleClick}>
      {ExcelIcon} Export Report
    </button>
  )
}
export default ExportReportXlsx
