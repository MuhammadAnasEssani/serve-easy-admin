import React from 'react'
import '../../../assets/css/components/dashboard/themetable.scss'
import {Tag} from 'antd'
import {IRolePermission} from '../../interfaces/IRole'

export default function ThemeTable({rows}: {rows: IRolePermission[]}) {
  return (
    <div className={'theme-table inner-table '}>
      <table>
        <thead>
          <tr>
            <th scope="col">Module</th>
            <th scope="col">Create</th>
            <th scope="col">Read</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              <td data-label="Module">{row.name}</td>
              <td data-label="Create">
                {row.meta?.pivot_create === 1 ? (
                  <Tag color={'green'}>YES</Tag>
                ) : (
                  <Tag color={'red'}>NO</Tag>
                )}
              </td>
              <td data-label="Read">
                {row.meta?.pivot_read === 1 ? (
                  <Tag color={'green'}>YES</Tag>
                ) : (
                  <Tag color={'red'}>NO</Tag>
                )}
              </td>
              <td data-label="Update">
                {row.meta?.pivot_update === 1 ? (
                  <Tag color={'green'}>YES</Tag>
                ) : (
                  <Tag color={'red'}>NO</Tag>
                )}
              </td>
              <td data-label="Delete">
                {row.meta?.pivot_delete === 1 ? (
                  <Tag color={'green'}>YES</Tag>
                ) : (
                  <Tag color={'red'}>NO</Tag>
                )}
              </td>
            </tr>
            // <tr>
            //     <td data-label="Module">{row.name}</td>
            //     <td data-label="Create">
            //         {row.meta?.pivot_create === 1 ? <Tag color={"green"}>Create</Tag> : <Tag color={"red"}>N/A</Tag>}
            //     </td>
            //     <td data-label="Read">
            //         {row.meta?.pivot_read === 1 ? <Tag color={"green"}>Read</Tag> : <Tag color={"red"}>N/A</Tag>}
            //     </td>
            //     <td data-label="Update">
            //         {row.meta?.pivot_update === 1 ? <Tag color={"green"}>Update</Tag> : <Tag color={"red"}>N/A</Tag>}
            //     </td>
            //     <td data-label="Delete">
            //         {row.meta?.pivot_delete === 1 ? <Tag color={"green"}>Delete</Tag> : <Tag color={"red"}>N/A</Tag>}
            //     </td>
            // </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
