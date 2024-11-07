import React from 'react'
import {Container, Row, Col, Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import {Required} from '../../utils/patterns'
import MultiSelectField from '../../components/dashboard/MultiSelectField'
import {MdOutlineFastfood} from 'react-icons/md'
import {BACKEND_CONSTANTS, DISCOUNT} from '../../config/constants'
import {IItemSummaryReportsFilters} from '../../interfaces/IReports'
import ViewCard from '../../components/dashboard/ViewCard'
import {Select} from 'antd'
import type {SelectProps} from 'antd'
import SelectField from '../../components/dashboard/SelectField'

export default function Testing() {
  const options: SelectProps['options'] = []

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    })
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
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
  interface Testing {
    order_type?: any
    mui_type1?: any
    mui_type2?: any
    select_type1?: any
    select_type2?: any
  }
  const {
    handleSubmit,
    setValue,
    formState: {errors},
    control,
  } = useForm<Testing>({
    mode: 'onChange',
  })
  const onSubmit = async (data: Testing) => {
    console.log(data)
  }
  return (
    <Form>
      <ViewCard>
        <Container>
          <Row>
            <Col md={12}>
              <h2>MULTI SELECT</h2>
            </Col>
          </Row>
          <Row className={'mb-5'}>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="mui_type1"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      errors={errors.mui_type1}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      prefixIcon={<MdOutlineFastfood />}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="mui_type1"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      label={'With Label'}
                      errors={errors.mui_type1}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      prefixIcon={<MdOutlineFastfood />}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="mui_type2"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      errors={errors.mui_type2}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="mui_type2"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      label={'With Label'}
                      errors={errors.mui_type2}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row className={'mt-5 mb-5'}>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="mui_type1"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      errors={errors.mui_type1}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      prefixIcon={<MdOutlineFastfood />}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="mui_type1"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      label={'With Label'}
                      errors={errors.mui_type1}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      prefixIcon={<MdOutlineFastfood />}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="mui_type2"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      errors={errors.mui_type2}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="mui_type2"
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <MultiSelectField
                      label={'With Label'}
                      errors={errors.mui_type2}
                      field={field}
                      selectOptions={orderType}
                      maxTagCount={1}
                      placeholder={'Order type'}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>SELECT FIELD</h2>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      prefixIcon={<MdOutlineFastfood />}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      label={'Discount Type'}
                      prefixIcon={<MdOutlineFastfood />}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'filter-fields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      label={'Discount Type'}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row className={'mt-5'}>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      prefixIcon={<MdOutlineFastfood />}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      label={'Discount Type'}
                      prefixIcon={<MdOutlineFastfood />}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className={'dfields'}>
                <Controller
                  name="select_type1"
                  defaultValue={DISCOUNT.DISCOUNT_TYPE.PERCENTAGE}
                  control={control}
                  rules={{required: Required}}
                  render={({field}) => (
                    <SelectField
                      label={'Discount Type'}
                      errors={errors.select_type1}
                      field={field}
                      selectOptions={orderType}
                      // disabled={!isRestaurantAdmin}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </ViewCard>
    </Form>
  )
}
