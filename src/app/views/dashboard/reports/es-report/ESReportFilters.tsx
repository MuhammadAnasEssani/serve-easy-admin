import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {Controller, useFormContext} from 'react-hook-form'
import DateRange from '../../../../components/dashboard/DateRange'
import MultiSelectField from '../../../../components/dashboard/MultiSelectField'
import {MdOutlineFastfood} from 'react-icons/md'
import ThemeButton from '../../../../components/dashboard/ThemeButton'
import {IReportsFilters} from '../../../../interfaces/IReports'
import {BACKEND_CONSTANTS} from '../../../../config/constants'

export default function ESReportFilters({loading}: {loading: boolean}) {
    const paymentType = [
        {
            id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CARD,
            name: 'Card',
        },
        {
            id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.CASH,
            name: 'Cash',
        },
        {
            id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.EASY_PAISA,
            name: 'Easy Paisa',
        },
        {
            id: BACKEND_CONSTANTS.TRANSACTION.PAYMENT_TYPE.KEENU,
            name: 'Keenu',
        },
    ]
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
    const orderPlatforms = [
        {
            id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.IOS,
            name: 'iOS',
        },
        {
            id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.ANDROID,
            name: 'Android',
        },
        {
            id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.WEB,
            name: 'Web',
        },
        {
            id: BACKEND_CONSTANTS.ORDERS.ORDER_PLATFORMS.POS,
            name: 'POS',
        },
    ]
    const {
        control,
        setValue,
        register,
        formState: {errors},
    } = useFormContext<IReportsFilters>()

    return (
        <>
            <div className={'filter-sec'}>
                <Row>
                    <Col md={3} lg={2}>
                        <div className={'filter-fields'}>
                            <Controller
                                name="date_range"
                                control={control}
                                render={({field: {name}}) => <DateRange setValue={setValue} fieldName={name} />}
                            />
                        </div>
                    </Col>
                    <Col md={3} lg={2}>
                        <div className={'filter-fields'}>
                            <Controller
                                name="order_type"
                                control={control}
                                render={({field}) => (
                                    <MultiSelectField
                                        errors={errors.order_type}
                                        field={field}
                                        selectOptions={orderType}
                                        placeholder={'Order type'}
                                        maxTagCount={1}
                                        prefixIcon={<MdOutlineFastfood />}
                                    />
                                )}
                            />
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
            </div>
        </>
    )
}
