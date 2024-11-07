import React, {useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
import DateRange from '../../../../components/dashboard/DateRange'
import Dropdown from 'react-bootstrap/Dropdown'
import {maxLength} from '../../../../utils/patterns'
import TextInput from '../../../../components/authentication/TextInput'
import ThemeBtn from '../../../../components/authentication/ThemeBtn'
import {IDealComboFilters} from '../../../../interfaces/IDealsCombo'
import {IPushNotificationFilter} from '../../../../interfaces/INotification'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import '../../../../../assets/css/views/dashboard/push-notifications.scss'

export default function PushFilters({loading}: {loading: boolean}) {
  const [maxOrderAmount, setMaxOrderAmount] = useState<number | undefined | null>(0)
  const [minOrderAmount, setMinOrderAmount] = useState<number | undefined | null>(0)

  const {
    control,
    setValue,
    register,
    formState: {errors},
  } = useFormContext<IPushNotificationFilter>()
  return (
    <Row className={'mb-4 push-filter'}>
      <Col md={3} lg={3} xl={2}>
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
      {/*<Col md={3} lg={2}>*/}
      {/*    <div className={"dfields"}>*/}
      {/*        <Controller*/}
      {/*            name="order_type"*/}
      {/*            control={pushFilter.control}*/}
      {/*            rules = {{}}*/}
      {/*            render={({ field }) => (*/}
      {/*                <MultiSelectField*/}
      {/*                    label={"Order Type"}*/}
      {/*                    errors={pushFilter.formState.errors.order_type}*/}
      {/*                    field = {field}*/}
      {/*                    selectOptions={orderType}*/}
      {/*                    maxTagCount={1}*/}
      {/*                />*/}
      {/*            )}*/}
      {/*        />*/}
      {/*    </div>*/}
      {/*</Col>*/}
      <Col className={'d-none d-md-block'} md={3} lg={3} xl={2}>
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
                  <div className={'dfields'}>
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
      <Col className={'d-block d-md-none'} md={3} lg={3} xl={2}>
        <div className={'max-min-amount'}>
          <h5>Min / Max Order Amount </h5>
          <div className={'h-fields'}>
            <div className={'filter-fields'}>
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
            <div className={'filter-fields'}>
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
      </Col>
      <Col className={'d-none d-md-block'} md={3} lg={3} xl={2}>
        <div className={'dropdown-field'}>
          <Dropdown>
            <Dropdown.Toggle variant={'dropdown'} id="dropdown-basic">
              Order Range
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className={'max-min-amount'}>
                <h5>Min / Max Order Range </h5>
                <div className={'h-fields'}>
                  <div className={'dfields'}>
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
      <Col className={'d-block d-md-none'} md={3} lg={3} xl={2}>
        <div className={'max-min-amount'}>
          <h5>Min / Max Order Range </h5>
          <div className={'h-fields'}>
            <div className={'filter-fields'}>
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
            <div className={'filter-fields'}>
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
      </Col>

      <Col className={'d-flex align-items-end'} md={3} lg={2} xl={2}>
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
