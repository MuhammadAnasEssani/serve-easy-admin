import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import TextInput from '../../../components/authentication/TextInput'
import DashCheckbox from '../../../components/dashboard/DashCheckbox'
import ThemeBtn from '../../../components/authentication/ThemeBtn'

export default function EditPosRoles() {
  return (
    <div className={'create-admin-roles'}>
      <Row className={'mt-3'}>
        <Col md={4}>
          <div className={'createrole-fields dfields'}>
            <TextInput
              placeholder={'Select Role'}
              variant={'field-white'}
              label={'Role Name'}
              labelPos={'out'}
              labelColor={'dark'}
              type={'text'}
            />
          </div>
        </Col>
        <Col md={4}>
          <div className={'createrole-fields dfields'}>
            <TextInput
              placeholder={'Select Establishment'}
              variant={'field-white'}
              label={'Establishment Name'}
              labelPos={'out'}
              labelColor={'dark'}
              type={'text'}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col col={12}>
          <div className={'role-table'}>
            <table>
              <tbody>
                <tr>
                  <td data-label="User Management">
                    <DashCheckbox label={'Menu Management'} />
                  </td>
                  <td data-label="Create">
                    <DashCheckbox label={'Create'} />
                  </td>
                  <td data-label="Read">
                    <DashCheckbox label={'Read'} />
                  </td>
                  <td data-label="Update">
                    <DashCheckbox label={'Update'} />
                  </td>
                  <td data-label="Delete">
                    <DashCheckbox label={'Delete'} />
                  </td>
                </tr>
                <tr>
                  <td data-label="Order Management">
                    <DashCheckbox label={'Order Management'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Create'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Read'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Update'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Delete'} />
                  </td>
                </tr>
                <tr>
                  <td data-label="Menu Management">
                    <DashCheckbox label={'Menu Management'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Create'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Read'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Update'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Delete'} />
                  </td>
                </tr>
                <tr>
                  <td data-label="Reports">
                    <DashCheckbox label={'Reports'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Create'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Read'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Update'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Delete'} />
                  </td>
                </tr>
                <tr>
                  <td data-label="CreateEstablishment Management">
                    <DashCheckbox label={'Establishment Management'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Create'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Read'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Update'} />
                  </td>
                  <td data-label="Order Managment">
                    <DashCheckbox label={'Delete'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className={'mb-4'} md={12}>
          <div className={'estab-bts'}>
            <ThemeBtn size={'lg'} text={'Cancel'} type={'button'} />
            <ThemeBtn size={'lg'} text={'Create'} type={'button'} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
