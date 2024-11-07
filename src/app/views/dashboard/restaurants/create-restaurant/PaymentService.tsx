import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {maxLength, minLength, Required} from '../../../../utils/patterns'
import {Controller, useFormContext} from 'react-hook-form'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {IDeliveryServiceList, IPaymentServiceList} from '../../../../interfaces/IPlan'
import SelectField from '../../../../components/dashboard/SelectField'
import {DeliveryServicesService} from '../../../../services/api-services/delivery-services.service'
import TextInput from '../../../../components/authentication/TextInput'
import {PaymentServicesService} from '../../../../services/api-services/payment-services.service'

const paymentFields = [
  {
    provider_id: BACKEND_CONSTANTS.PAYMENT_SERVICES.BYKEA,
    fields: [
      {
        name: 'username',
      },
      {
        name: 'password',
      },
    ],
  },
  {
    provider_id: BACKEND_CONSTANTS.PAYMENT_SERVICES.STRIPE,
    fields: [
      {
        name: 'secret_key',
      },
      {
        name: 'private_key',
      },
    ],
  },
]
export default function RestaurantPaymentService() {
  const [paymentServiceList, setPaymentServiceList] = useState<IPaymentServiceList[]>([])
  const methods = useFormContext<any>()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const selectedPaymentService = methods.watch('restaurant_payment_service')
  const selectedPaymentFields = paymentFields.find(
    (item) => item.provider_id === selectedPaymentService?.payment_gateway
  )?.fields

  useEffect(() => {
    if (isMounted) {
      paymentFields.forEach((paymentField) => {
        paymentField.fields.forEach((field) =>
          methods.setValue(`restaurant_payment_service.${field.name}`, '')
        )
      })
    } else {
      setIsMounted(true)
    }
  }, [selectedPaymentService?.payment_gateway])

  useEffect(() => {
    /*Fetch All Printers*/
    PaymentServicesService.all().then((res) => {
      const unAssingedOption = {
        id: null,
        name: 'Unassigned',
        identifier: null,
      }
      const filteredPaymentServices = res.data.map((item) => ({
        id: item.identifier,
        name: item.name,
        identifier: item.identifier,
      }))
      setPaymentServiceList([unAssingedOption, ...filteredPaymentServices])
    })
  }, [])
  let paymentFieldsErrors: any = methods.formState.errors.restaurant_payment_service

  return (
    <Row>
      <Col md={12}>
        <div className={'settings'}>
          <Row>
            <Col md={12}>
              <h3>Payment Gateway</h3>
            </Col>
          </Row>
          <div>
            <Row>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="restaurant_payment_service.payment_gateway"
                    control={methods.control}
                    defaultValue={null}
                    // rules={{required: Required}}
                    render={({field}) => (
                      <SelectField
                        label={'Select Payment Service'}
                        errors={paymentFieldsErrors?.['payment_gateway']}
                        field={field}
                        selectOptions={paymentServiceList}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              {selectedPaymentFields?.map((item) => (
                <Col md={4}>
                  <div className={'dfields crestaurant-fields'}>
                    <Controller
                      name={`restaurant_payment_service.${item.name}`}
                      control={methods.control}
                      rules={{
                        required: Required,
                      }}
                      render={({field}) => (
                        <TextInput
                          placeholder={''}
                          variant={'field-white'}
                          label={item.name}
                          labelPos={'out'}
                          labelColor={'dark'}
                          field={field}
                          type="text"
                          errors={paymentFieldsErrors?.[item.name]}
                        />
                      )}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  )
}
