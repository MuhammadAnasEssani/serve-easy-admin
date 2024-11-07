import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import DateRange from '../../../components/dashboard/DateRange'
import MultiSelectField from '../../../components/dashboard/MultiSelectField'
import Dropdown from 'react-bootstrap/Dropdown'
import {maxLength} from '../../../utils/patterns'
import TextInput from '../../../components/authentication/TextInput'
import ThemeButton from '../../../components/dashboard/ThemeButton'
import {ICustomerManagementFilter} from '../../../interfaces/ICustomerManagement'
import {BACKEND_CONSTANTS} from '../../../config/constants'

export default function CustomerListingFilters({loading}: {loading: boolean}) {
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
  } = useForm<ICustomerManagementFilter>({
    mode: 'onChange',
  })
  const orderType = [
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DELIVERY,
      name: 'Delivery',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.DINE,
      name: 'Dine In',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.ONLINE,
      name: 'Online',
    },
    {
      id: BACKEND_CONSTANTS.ORDERS.TYPES.TAKEAWAY,
      name: 'Take away',
    },
  ]
  return (
    <Row className={'mb-4'}>
      <Col md={3} lg={2}>
        <div className={'filter-fields'}>
          <Controller
            name="date_range"
            control={control}
            rules={{}}
            render={({field: {name}}) => (
              <DateRange setValue={setValue} fieldName={name} errors={errors.date_range} />
            )}
          />
        </div>
      </Col>
      <Col md={3} lg={2}>
        <div className={'filter-fields'}>
          <Controller
            name="order_type"
            control={control}
            rules={{}}
            render={({field}) => (
              <MultiSelectField
                errors={errors.order_type}
                field={field}
                selectOptions={orderType}
                maxTagCount={1}
              />
            )}
          />
        </div>
      </Col>
      <Col md={3} lg={2}>
        <div className={'dropdown-field'}>
          <Dropdown>
            <Dropdown.Toggle variant={'dropdown'} id="dropdown-basic">
              Order Amount
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className={'max-min-amount'}>
                <h5>Min / Max Bill Amount </h5>
                <div className={'h-fields'}>
                  <div className={'discount-fields dfields'}>
                    <Controller
                      name="min_order_amount"
                      defaultValue={0}
                      control={control}
                      rules={{maxLength: maxLength(50000)}}
                      render={({field}) => (
                        <TextInput
                          placeholder={'minimum'}
                          variant={'field-white'}
                          label={'Min'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.min_order_amount}
                        />
                      )}
                    />
                  </div>
                  <div className={'discount-fields dfields'}>
                    <Controller
                      name="max_order_amount"
                      defaultValue={0}
                      control={control}
                      rules={{maxLength: maxLength(50000)}}
                      render={({field}) => (
                        <TextInput
                          placeholder={'maximum'}
                          variant={'field-white'}
                          label={'Max'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.max_order_amount}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
      <Col md={3} lg={2}>
        <div className={'dropdown-field'}>
          <Dropdown>
            <Dropdown.Toggle variant={'dropdown'} id="dropdown-basic">
              Order Range
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className={'max-min-amount'}>
                <h5>Min / Max Order Range </h5>
                <div className={'h-fields'}>
                  <div className={'discount-fields dfields'}>
                    <Controller
                      name="min_order_count"
                      defaultValue={0}
                      control={control}
                      rules={{maxLength: maxLength(50000)}}
                      render={({field}) => (
                        <TextInput
                          placeholder={'minimum'}
                          variant={'field-white'}
                          label={'Min'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.min_order_count}
                        />
                      )}
                    />
                  </div>
                  <div className={'discount-fields dfields'}>
                    <Controller
                      name="max_order_count"
                      defaultValue={0}
                      control={control}
                      rules={{maxLength: maxLength(50000)}}
                      render={({field}) => (
                        <TextInput
                          placeholder={'maximum'}
                          variant={'field-white'}
                          label={'Max'}
                          labelPos={'out'}
                          labelColor={'dark'}
                          type={'number'}
                          field={field}
                          errors={errors.max_order_count}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
      <Col className={'d-flex align-items-end'} md={3} lg={2}>
        <ThemeButton
          className={'filter-btn'}
          text={'Apply Filter'}
          type={'submit'}
          loader={loading}
        />
      </Col>
    </Row>
  )
}
