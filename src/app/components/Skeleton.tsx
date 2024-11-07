import {Skeleton, Space} from 'antd'
import React from 'react'
import '../../assets/css/components/skeleton.scss'

export function SkeletonTableCell({loading, value}: {loading: boolean; value: any}) {
  // return
  // loading ? <Skeleton.Input
  //     style={{
  //         // flexBasis: "70px",
  //         borderRadius: 3,
  //         width: "100%",
  //         maxWidth: 150,
  //         height: 10,
  //         verticalAlign: 'middle',
  //     }}
  //     // className={"productDetailLoader"}
  //     active={true}
  // />:
  return value
}

export function SkeletonTableActionBtn() {
  return (
    <>
      <div className={'skeleton-action-btns'}>
        <Skeleton.Input
          style={{
            // flexBasis: "70px",
            borderRadius: '100%',
            width: 15,
            height: 15,
            verticalAlign: 'middle',
          }}
          // className={"productDetailLoader"}
          active={true}
        />
        <Skeleton.Input
          style={{
            // flexBasis: "70px",
            borderRadius: '100%',
            width: 15,
            height: 15,
            verticalAlign: 'middle',
          }}
          // className={"productDetailLoader"}
          active={true}
        />
        <Skeleton.Input
          style={{
            // flexBasis: "70px",
            borderRadius: '100%',
            width: 15,
            height: 15,
            verticalAlign: 'middle',
          }}
          // className={"productDetailLoader"}
          active={true}
        />
      </div>
    </>
  )
}

export function SkeletonSidebarListing() {
  return (
    <>
      <Skeleton.Input
        style={{
          borderRadius: 3,
          width: 150,
          height: 10,
          verticalAlign: 'middle',
        }}
        // className={"productDetailLoader"}
        active={true}
      />
    </>
  )
}

export function SkeletonSidebarListingIcon() {
  return (
    <>
      <Skeleton.Input
        style={{
          // flexBasis: "70px",
          borderRadius: '50%',
          width: 20,
          height: 20,
          verticalAlign: 'middle',
          margin: 'auto',
          display: 'block',
        }}
        // className={"productDetailLoader"}
        active={true}
      />
    </>
  )
}

export function SkeletonLabel() {
  return (
    <>
      <Skeleton.Input
        style={{
          borderRadius: 3,
          width: 80,
          height: 10,
          verticalAlign: 'middle',
        }}
        // className={"productDetailLoader"}
        active={true}
      />
    </>
  )
}

export function SkeletonInput() {
  return (
    <>
      <Skeleton.Input
        style={{
          borderRadius: 3,
          width: '50%',
          height: 15,
          verticalAlign: 'middle',
        }}
        // className={"inputLoader"}
        active={true}
      />
    </>
  )
}

export function SkeletonButton() {
  return (
    <>
      <Skeleton.Input
        style={{
          height: 15,
          width: 130,
          borderRadius: 5,
        }}
        // className={"inputLoader"}
        active={true}
      />
    </>
  )
}

export function SkeletonTree() {
  const skeletonTree = []
  for (let i = 1; i <= 3; i++) {
    skeletonTree.push(
      <div className={'skeleton-tree'} key={i}>
        <div className={'tree-node-1'}>
          <Space>
            <Skeleton.Avatar
              style={{
                height: 15,
                width: 15,
              }}
              shape={'square'}
              // className={"inputLoader"}
              active={true}
            />
            <Skeleton.Button
              style={{
                height: 8,
                borderRadius: 5,
                marginTop: '3px',
                width: '150px',
              }}
              // className={"inputLoader"}
              active={true}
              block={true}
            />
            <br />
          </Space>
        </div>
        <div className={'tree-node-2'}>
          <Space>
            <Skeleton.Avatar
              style={{
                height: 15,
                width: 15,
              }}
              shape={'square'}
              // className={"inputLoader"}
              active={true}
            />
            <Skeleton.Button
              style={{
                height: 8,
                borderRadius: 5,
                marginTop: '3px',
                width: '180px',
              }}
              // className={"inputLoader"}
              active={true}
              block={true}
            />
            <br />
          </Space>
        </div>
        <div className={'tree-node-3'}>
          <Space>
            <Skeleton.Avatar
              style={{
                height: 15,
                width: 15,
              }}
              shape={'square'}
              // className={"inputLoader"}
              active={true}
            />
            <Skeleton.Button
              style={{
                height: 8,
                borderRadius: 5,
                marginTop: '3px',
                width: '180px',
              }}
              // className={"inputLoader"}
              active={true}
              block={true}
            />
            <br />
          </Space>
        </div>
        <div className={'tree-node-3'}>
          <Space>
            <Skeleton.Avatar
              style={{
                height: 15,
                width: 15,
              }}
              shape={'square'}
              // className={"inputLoader"}
              active={true}
            />
            <Skeleton.Button
              style={{
                height: 8,
                borderRadius: 5,
                marginTop: '3px',
                width: '180px',
              }}
              // className={"inputLoader"}
              active={true}
              block={true}
            />
            <br />
          </Space>
        </div>
        <hr />
      </div>
    )
  }
  return (
    <>
      <div className={'skeleton-tree-section'}>{skeletonTree}</div>
    </>
  )
}
