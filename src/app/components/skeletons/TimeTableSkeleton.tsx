import React from 'react'
import HeadingSkeleton from './HeadingSkeleton'
import CheckboxSkeleton from './CheckboxSkeleton'
import OvalSkeleton from './OvalSkeleton'
import '../../../assets/css/skeletons/components/timetable-skeleton.scss'

export default function TimeTableSkeleton() {
  return (
    <>
      <div className={'timetable skeleton'}>
        <div style={{padding: '10px 0 10px 0'}} className={'dash-heading'}>
          <HeadingSkeleton maxWidth={250} height={15} />
        </div>
        <div className={'custom-time-avail'}>
          <div>
            <HeadingSkeleton maxWidth={120} height={10} />
          </div>
          <div className={'mt-2'}>
            <HeadingSkeleton maxWidth={350} height={20} />
          </div>
          <OvalSkeleton borderRadius={30} maxWidth={45} height={22} />
        </div>
        <div className={'establishment-time-slots'}>
          <ul>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
            <li>
              <div style={{minWidth: 180}} className={'days'}>
                <CheckboxSkeleton height={10} maxWidth={100} margin={'2px 0'} />
              </div>
              <div className={'time'}>
                <HeadingSkeleton maxWidth={120} height={30} />
                <span className={'dash'}>-</span>
                <HeadingSkeleton maxWidth={120} height={30} />
              </div>
            </li>
          </ul>
        </div>
        <div className={'establishment-date'}>
          <div className={'custom-date-avail'}>
            <div>
              <HeadingSkeleton maxWidth={100} height={15} />
            </div>
            <OvalSkeleton borderRadius={30} maxWidth={45} height={22} />
            <ul>
              <li className={'d-flex align-item-center'}>
                <div>
                  {' '}
                  <HeadingSkeleton maxWidth={60} height={10} />
                </div>
                <div>
                  <HeadingSkeleton maxWidth={250} height={30} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
