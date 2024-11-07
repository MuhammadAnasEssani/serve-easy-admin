import React from 'react'
import HeadingSkeleton from '../../components/skeletons/HeadingSkeleton'
import SquareSkeleton from '../../components/skeletons/SquareSkeleton'
import OvalSkeleton from '../../components/skeletons/OvalSkeleton'

export default function PostCardSkeleton() {
  return (
    <div className={`pos-card-item`}>
      <div className={'pos-status'}>
        <HeadingSkeleton maxWidth={120} height={12} />
      </div>
      <div className={'pos-edit-icon'}>
        <SquareSkeleton height={20} width={20} />
      </div>

      <div className={'pos-img'}>
        <SquareSkeleton height={120} width={'70%'} />
      </div>

      <div>
        <div className={'detail-item'}>
          <div>
            {' '}
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
          <div>
            <OvalSkeleton borderRadius={30} maxWidth={60} />
          </div>
        </div>
        <div className={'detail-item'}>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
        </div>
        <div className={'detail-item'}>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
        </div>
        <div className={'detail-item'}>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
        </div>
        <div className={'detail-item'}>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
          <div>
            <HeadingSkeleton maxWidth={120} height={12} />
          </div>
        </div>
      </div>
    </div>
  )
}
