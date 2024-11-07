import React from 'react'
import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip} from 'chart.js'
import {PolarArea} from 'react-chartjs-2'

interface IPolarAreaChart {
  height?: string | number
  width?: string | number
  dataSets: {label: string; data: number[] | object[]; backgroundColor: string[]}[]
  xLabels?: string[]
  lLabels?: string[]
}

export default function PolarAreaChart(option: IPolarAreaChart) {
  //Charts
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

  const labels = option.xLabels
  const yLabels = ['1pm', '1pm', '2pm', '3pm ', '4pm', '5pm', '650', '1000']
  const data = {
    labels,
    datasets: option.dataSets,
  }
  const options = {
    // barThickness: 12,
    // barPercentage:1,
    // responsive: true,
    // borderColor:'red',
    // borderWidth:0,
    scale: {
      display: false,
    },
    options: {
      scales: {
        x: {
          grid: {
            borderColor: 'red',
          },
        },
      },
    },

    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
    },
    // interaction:{
    //     intersect: false,
    // },
    scales: {
      r: {
        ticks: {
          display: false, // Remove vertical numbers
        },
        grid: {
          display: false, // Removes the circulair lines
        },
      },
      yAxes: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        visible: false,
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
          lineWidth: 0,
        },
        grid: {
          display: false,
        },
      },
      xAxes: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        visible: false,
        minorTickLength: 0,
        tickLength: 0,
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
          lineWidth: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  }
  return (
    <>
      <div
        className={'d-flex justify-content-center m-auto'}
        style={{height: '274px', width: '274px'}}
      >
        <PolarArea options={options} data={data} width={option.width ? option.width : '100%'} />
      </div>
    </>
  )
}
