import React, {useEffect, useState} from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  registerables as registerablesJS,
  Tooltip,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {useForm} from 'react-hook-form'
import '../.././../assets/css/components/dashboard/forcasting-chart.scss'
import {IAiForcastingChart} from '../../interfaces/IReports'
import {ReportService} from '../../services/api-services/report.service'
import {convertTimeZone} from '../../services/helper/convert-time-zone'

ChartJS.register(...registerablesJS)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)
interface IForecastingChart {
  forcasting: number
  interval: number
}
export default function ForcastingChart() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)
  const [loader, setLoader] = useState<boolean>(false)

  const {
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
    control,
  } = useForm<IForecastingChart>({
    mode: 'onChange',
  })
  const onSubmit = async (data: IForecastingChart) => {
    setLoader(true)
    // if (res.status) {
    //
    // }
    setLoader(false)
  }

  const day = [
    {id: 1, name: 'Monday'},
    {id: 2, name: 'Tuesday'},
    {id: 3, name: 'Wednessday'},
    {id: 4, name: 'Thursday'},
  ]

  const number = [
    {id: 1, name: '10'},
    {id: 2, name: '20'},
    {id: 3, name: '30'},
    {id: 4, name: '40'},
  ]

  const [aiChart, setAiChart] = useState<IAiForcastingChart[]>()

  const fetchAiForcasting = async () => {
    const res = await ReportService.getAiForcasting()
    if (res.status) {
      setAiChart(res.data)
    }
  }

  useEffect(() => {
    fetchAiForcasting()
  }, [])

  const AiChart = [
    {
      label: 'Restaurant Sales',
      data: aiChart?.map((data: IAiForcastingChart) => {
        return {
          x: convertTimeZone(data.date).date,
          y: data.net_sales,
          is_predicted: data.is_predicted,
        }
      }),
      backgroundColor: 'white',
      tension: 0.4,
    },
  ]

  const data = {
    // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: AiChart,
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
    },
    segment: {
      borderColor(ctx: any) {
        return ctx.p0.raw.is_predicted ? '#0178E5' : '#6EC9A8'
      },
    },
  }
  const chartConfig = {
    type: 'line',
    data: {
      // your data here
    },
    options,
  }
  return (
    <>
      <div className={'forcasting-chart'}>
        {/*<Form onSubmit={handleSubmit(onSubmit)}>*/}
        {/*  <Row className={'d-flex justify-content-between'}>*/}
        {/*    <Col md={12} lg={4} xl={4} xxl={4}>*/}
        {/*      <div className={'forcasting-heading'}>*/}
        {/*        <Heading>*/}
        {/*          <h2>*/}
        {/*            <span>Sales Forcasting</span>*/}
        {/*          </h2>*/}
        {/*        </Heading>*/}
        {/*      </div>*/}
        {/*    </Col>*/}
        {/*    <Col md={12} lg={7} xl={8} xxl={6}>*/}
        {/*      <div className={'forcasting-filters'}>*/}
        {/*        <div className={'dfields filter-fields'}>*/}
        {/*          <Controller*/}
        {/*            name="forcasting"*/}
        {/*            defaultValue={0}*/}
        {/*            control={control}*/}
        {/*            rules={{required: Required}}*/}
        {/*            render={({field: {name, ...field}}) => {*/}
        {/*              return (*/}
        {/*                <SelectField*/}
        {/*                  label={'Forcasting'}*/}
        {/*                  errors={errors.forcasting}*/}
        {/*                  field={field}*/}
        {/*                  selectOptions={day}*/}
        {/*                />*/}
        {/*              )*/}
        {/*            }}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <div className={'dfields filter-fields'}>*/}
        {/*          <Controller*/}
        {/*            name="interval"*/}
        {/*            defaultValue={0}*/}
        {/*            control={control}*/}
        {/*            rules={{required: Required}}*/}
        {/*            render={({field: {name, ...field}}) => {*/}
        {/*              return (*/}
        {/*                <SelectField*/}
        {/*                  label={'Interval of Forcasting'}*/}
        {/*                  errors={errors.interval}*/}
        {/*                  field={field}*/}
        {/*                  selectOptions={number}*/}
        {/*                />*/}
        {/*              )*/}
        {/*            }}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <ThemeButton*/}
        {/*          className={'filter-btn'}*/}
        {/*          text={'Apply'}*/}
        {/*          loader={loader}*/}
        {/*          type={'submit'}*/}
        {/*        />*/}
        {/*        <ThemeButton*/}
        {/*          className={'filter-btn'}*/}
        {/*          text={'Download'}*/}
        {/*          loader={loader}*/}
        {/*          type={'button'}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </Col>*/}
        {/*  </Row>*/}
        {/*</Form>*/}
        {/*<Chart ref={chartRef} type='line' data={data} height={60} />;*/}
        <h3>Sales Forecasting</h3>
        <Line data={data} options={options} height={65} />
      </div>
    </>
  )
}
