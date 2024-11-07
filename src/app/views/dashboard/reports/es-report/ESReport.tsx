import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Col, Form, Row} from "react-bootstrap";
import {IReportList, IReportsFilters} from "../../../../interfaces/IReports";
import Heading from "../../../../components/dashboard/Heading";
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import ThemeButton from "../../../../components/dashboard/ThemeButton";
import {FaFilter} from "react-icons/fa";
import ESReportFilters from "./ESReportFilters";


interface DataType {
    key: string;
    category: string;
    item_name: string;
    qty:number
}
export default function ESReport() {
    const [reports, setReports] = useState<IReportList>()
    const [filterPopup, setFilterPopup] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [filterLoading, setFilterLoading] = useState<boolean>(false)
    const methods = useForm<IReportsFilters>({
        shouldUnregister: false,
        mode: 'onChange',
    })

    const filterModal = () => {
        setFilterPopup(true)
    }

    const onSubmit = async (data: IReportsFilters) => {
        // if (establishmentId > 0) {
        //     setFilterLoading(true)
        //     const filterData = {
        //         start_date: data.date_range?.[0],
        //         end_date: data.date_range?.[1],
        //         establishment_id: establishmentId,
        //     }
        //     fetchData(filterData)
        // }
    }

    // Menu Table Data
    const columns: ColumnsType<DataType> = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Net Sales',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Quantity Remaining',
            dataIndex: 'qty',
            key: 'qty',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            category:'Food',
            item_name:'Item 1',
            qty:55,
        },
        {
            key: '2',
            category:'Food 1',
            item_name:'Item 3',
            qty:55,
        },
        {
            key: '3',
            category:'Food 2',
            item_name:'Item 2',
            qty:55,
        },
    ];

    return(
        <>
            <div className={"sales-breakdown"}>
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Row>
                            <div className={'d-block d-md-none'}>
                                <div className={'filter-sec'}>
                                    <ThemeButton
                                        onClick={() => {
                                            filterModal()
                                        }}
                                        className={'filter-popup-btn'}
                                        text={'Apply Filter'}
                                        type={'submit'}
                                        suffixIcon={<FaFilter />}
                                    />
                                </div>
                            </div>
                            <div className={'d-none d-md-block'}>
                                <ESReportFilters loading={filterLoading} />
                            </div>
                        </Row>
                        <Row>
                            <Col className={'mt-3'} md={12}>
                                <Heading>
                                    <h2 className={"d-flex"} style={{paddingBottom:0}}>
                                        <span>86 Report</span>
                                    </h2>
                                </Heading>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    className={'main-table'}
                                    // rowKey={(record) => record.key}
                                    // pagination={pagination}
                                    loading={loading}
                                    scroll={{ x:'calc(600px + 50%)' }}

                                />
                            </Col>
                        </Row>
                    </Form>
                </FormProvider>
            </div>
        </>
    )
}