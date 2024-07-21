import {Button, Table} from "antd";
import React, {useState} from "react";
import Calculation from "./Calculation.jsx";

const Examination = ({props}) => {
    const [examinationId, setExaminationId] = useState();
    const [key, setKey] = useState(0)

    const handleClick = (e) => {
        setExaminationId(e);
    };

    const expandedRowRender = record => {
        const columns = [
            {
                title: 'Samopoczucie',
                dataIndex: 'generalAppearance',
                key: 'generalAppearance',
            },
            {
                title: 'Tętno',
                dataIndex: 'radialPulse',
                key: 'radialPulse',
            },
            {
                title: 'Oddech',
                dataIndex: 'respirations',
                key: 'respirations',
            },
            {
                title: 'Ciemiączko',
                dataIndex: 'anteriorFontanelle',
                key: 'anteriorFontanelle',
            },
            {
                title: 'Ciśnienie krwi',
                dataIndex: 'systolicBloodPressure',
                key: 'systolicBloodPressure',
            },
            {
                title: 'Elastyczność skóry',
                dataIndex: 'skinElasticity',
                key: 'skinElasticity',
            },
            {
                title: 'Oczy',
                dataIndex: 'eyes',
                key: 'eyes',
            },
            {
                title: 'Łzawienie',
                dataIndex: 'tears',
                key: 'tears',
            },
            {
                title: 'Śluzówka',
                dataIndex: 'mucousMembranes',
                key: 'mucousMembranes',
            },
        ];
        return <Table rowKey={(record) => record.examinationId} columns={columns} dataSource={[record.symptoms]}
                      pagination={false}/>
    };
    const columns = [
        {
            title: 'ID badania',
            dataIndex: 'examinationId',
            key: 'examinationId',
        },
        {
            title: 'ID pacjenta',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Sód [mmol/l]',
            dataIndex: 'natrium',
            key: 'natrium',
        },
        {
            title: 'Aktualna waga',
            dataIndex: 'currentWeight',
            key: 'currentWeight',
        },
        {
            title: 'Temperatura ciała',
            dataIndex: 'bodyTemperature',
            key: 'bodyTemperature',
        },
        {
            title: 'Liczba stolców',
            dataIndex: 'stool',
            key: 'stool',
        },
        {
            title: 'Liczba wymiotów',
            dataIndex: 'vomit',
            key: 'vomit',
        },
        {
            title: 'Akcje',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => {handleClick(record.examinationId); setKey(currentKey => currentKey+1)}}>
                    <a>Oblicz</a>
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey={(record) => record.examinationId}
                columns={columns}
                expandable={{
                    expandedRowRender,
                }}
                dataSource={props}
                pagination={false}
            />
            {examinationId && <Calculation key={key} id={examinationId}/>}
        </>
    );
};
export default Examination;