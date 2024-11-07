import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {maxLength, minLength, Required} from '../../../../utils/patterns'
import {Controller, useFormContext} from 'react-hook-form'
import {BACKEND_CONSTANTS} from '../../../../config/constants'
import {IDeliveryServiceList} from '../../../../interfaces/IPlan'
import SelectField from '../../../../components/dashboard/SelectField'
import {DeliveryServicesService} from '../../../../services/api-services/delivery-services.service'
import TextInput from '../../../../components/authentication/TextInput'

const deliveryFields = [
  {
    provider_id: BACKEND_CONSTANTS.DELIVERY_SERVICES.BYKEA,
    fields: [
      {
        name: 'username',
      },
      {
        name: 'password',
      },
    ],
  },
]
export default function RestaurantDeliveryService() {
  const [deliveryServiceList, setDeliveryServiceList] = useState<IDeliveryServiceList[]>([])
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const methods = useFormContext<any>()

  const selectedDeliveryService = methods.watch('restaurant_delivery_service')
  const selectedDeliveryServiceIdentifier = deliveryServiceList.find(
    (item) => item.id === selectedDeliveryService?.delivery_service_id
  )?.identifier
  const selectedDeliveryFields = deliveryFields.find(
    (item) => item.provider_id === selectedDeliveryServiceIdentifier
  )?.fields

  useEffect(() => {
    if (isMounted) {
      deliveryFields.forEach((paymentField) => {
        paymentField.fields.forEach((field) =>
          methods.setValue(`restaurant_delivery_service.${field.name}`, '')
        )
      })
    } else {
      setIsMounted(true)
    }
  }, [selectedDeliveryService?.delivery_service_id])

  useEffect(() => {
    /*Fetch All Printers*/
    DeliveryServicesService.all().then((res) => {
      const unAssingedOption = {
        id: null,
        name: 'Unassigned',
        identifier: null,
      }
      setDeliveryServiceList([unAssingedOption, ...res.data])
    })
  }, [])
  let deliveryFieldsErrors: any = methods.formState.errors.restaurant_delivery_service

  return (
    <Row>
      <Col md={12}>
        <div className={'settings'}>
          <Row>
            <Col md={12}>
              <h3>Delivery</h3>
            </Col>
          </Row>
          <div>
            <Row>
              <Col md={4}>
                <div className={'dfields crestaurant-fields'}>
                  <Controller
                    name="restaurant_delivery_service.delivery_service_id"
                    control={methods.control}
                    defaultValue={null}
                    // rules={{required: Required}}
                    render={({field}) => (
                      <SelectField
                        label={'Select Delivery Service'}
                        errors={deliveryFieldsErrors?.['delivery_service_id']}
                        field={field}
                        selectOptions={deliveryServiceList}
                        disabled={false}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              {selectedDeliveryFields?.map((item) => (
                <Col md={4}>
                  <div className={'dfields crestaurant-fields'}>
                    <Controller
                      name={`restaurant_delivery_service.${item.name}`}
                      control={methods.control}
                      rules={{required: Required}}
                      render={({field}) => (
                        <TextInput
                          placeholder={''}
                          variant={'field-white'}
                          label={item.name}
                          labelPos={'out'}
                          labelColor={'dark'}
                          field={field}
                          type="text"
                          errors={deliveryFieldsErrors?.[item.name]}
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
