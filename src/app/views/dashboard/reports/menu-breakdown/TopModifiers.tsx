import React from 'react'
import {Col} from 'react-bootstrap'
import Heading from '../../../../components/dashboard/Heading'
import {IMenuModifierSaleBreakdown} from '../../../../interfaces/IReports'

export default function TopModifiers({data}: {data: IMenuModifierSaleBreakdown[]}) {
  return (
    <Col md={4}>
      <Heading>
        <h2>
          <span>Top Modifiers</span>
        </h2>
      </Heading>
      <div className={'scroll-inner fix-width'}>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Net Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reportItem) => (
              <tr>
                <td>{reportItem.modifier_name}</td>
                <td>{reportItem.sale_qty}</td>
                <td>{reportItem.net_sale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Col>
  )
}
