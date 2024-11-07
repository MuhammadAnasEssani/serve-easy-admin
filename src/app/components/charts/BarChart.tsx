import React from 'react'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

interface IBarChart {
  height?: string | number
  width?: string | number
  dataSets: {
    label: string
    data: number[] | object[] | undefined
    backgroundColor: string | string[]
  }[]
  xLabels?: string[]
  lLabels?: string[]
}

export default function BarChart(option: IBarChart) {
  //Charts
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  const labels = option.xLabels
  const yLabels = ['1pm', '1pm', '2pm', '3pm ', '4pm', '5pm', '650', '1000']
  const data = {
    labels,
    datasets: option.dataSets,
  }
  const options = {
    barThickness: 12,
    barPercentage: 1,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      // title: {
      //     display: true,
      //     text: 'Chart.js Bar Chart',
      // },
    },
    scales: {
      yAxes: {
        // title: {
        //     display: true,
        //     text: 'yAxisTitle',
        //     font: {
        //         size: 15
        //     }
        // },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 800,
          stepSize: 100,
          callback: function (value: any, index: any, values: any) {
            return value
          },
        },
        // grid: {
        //     display:false
        // },
        // gridColumn:false,
      },
      xAxes: {
        // title: {
        //     display: true,
        //     text: 'xAxisTitle',
        //     font: {
        //         size: 15
        //     }
        // }
        // grid: {
        //     display:false
        // },
        // gridColumn:true,
        // gridAutoFlow:true,
      },
    },
  }
  return (
    <>
      <div>
        <Bar
          options={options}
          data={data}
          width={option.width ? option.width : '100%'}
          height={option.height ? option.height : 250}
        />
      </div>
    </>
  )
}
