import React from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import {Line} from 'react-chartjs-2'

interface ILineChart {
  height?: string | number
  width?: string | number
  dataSets: {label: string; data: number[] | object[]; backgroundColor: string}[]
  xLabels?: string[]
  lLabels?: string[]
}

export default function LineChart(option: ILineChart) {
  //Charts
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
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
    tension: 0.4,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      // title: {
      //     display: true,
      //     text: 'Chart.js Bar Chart',
      // },
    },
    interaction: {
      intersect: false,
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
          stepSize: 200,
          callback: function (value: any, index: any, values: any) {
            return value + 'k'
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
      <Line
        options={options}
        data={data}
        width={option.width ? option.width : '100%'}
        height={option.height ? option.height : 46}
      />
    </>
  )
}
