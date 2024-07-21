import React, {useState} from "react";
import {Button, Divider, Form, InputNumber, Select, Typography} from "antd";
import {addExamination} from "../api/examinationApi.jsx";

const {Title, Text} = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        }, sm: {
            span: 6,
        },
    }, wrapperCol: {
        xs: {
            span: 24,
        }, sm: {
            span: 14,
        },
    },
};

const options = [{value: '1', label: 'Mild'}, {value: '2', label: 'Moderate'}, {value: '3', label: 'Severe'},];

const AddExamination = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.symptoms.generalAppearance = parseInt(e.symptoms.generalAppearance, 10);
        e.symptoms.radialPulse = parseInt(e.symptoms.radialPulse, 10);
        e.symptoms.respirations = parseInt(e.symptoms.respirations, 10);
        e.symptoms.anteriorFontanelle = parseInt(e.symptoms.anteriorFontanelle, 10);
        e.symptoms.systolicBloodPressure = parseInt(e.symptoms.systolicBloodPressure, 10);
        e.symptoms.skinElasticity = parseInt(e.symptoms.skinElasticity, 10);
        e.symptoms.eyes = parseInt(e.symptoms.eyes, 10);
        e.symptoms.tears = parseInt(e.symptoms.tears, 10);
        e.symptoms.mucousMembranes = parseInt(e.symptoms.mucousMembranes, 10);
        try {
            const data = await addExamination(e);
            if (!data) {
                setErrorMessage('Nie udało się utworzyć badania');
                return;
            }
            setMessage(`Badanie o ID ${data.examinationId} zostało utworzon.`)
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas dodawania badania.', err);
            setMessage('')
            setErrorMessage('Błąd podczas dodawania badania.');
        }
    };

    return (<>
        <Form
            {...formItemLayout}
            variant="filled"
            style={{
                maxWidth: 600,
            }}

            onFinish={handleSubmit}
            autoComplete="on"
        >
            <Title level={2}>Podaj wyniki badania</Title>
            <Form.Item
                label="ID pacjenta"
                name="patientId"
                rules={[{
                    required: true, message: 'Podaj ID pacjenta',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item
                label="Sód [mmol/l]"
                name="natrium"
                rules={[{
                    required: true, message: 'Podaj ilość sodu we krwi',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item
                label="Aktualna waga"
                name="currentWeight"
                rules={[{
                    required: true, message: 'Podaj aktualną wagę',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item
                label="Temperatura"
                name="bodyTemperature"
                rules={[{
                    required: true, message: 'Podaj temperaturę ciała',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item
                label="Liczba wymiotów"
                name="vomit"
                rules={[{
                    required: true, message: 'Podaj liczbę wymiotów w ciągu ostatnich 24h',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>

            <Form.Item
                label="Stolec"
                name="stool"
                rules={[{
                    required: true, message: 'Podaj liczbę stolców w ciągu ostatnich 24h',
                },]}>
                <InputNumber style={{width: '100%',}}/>
            </Form.Item>
            <Divider/>
            <Title level={4}>Objawy</Title>
            <Divider/>
            <Form.Item name={['symptoms', 'generalAppearance']} label="Stan ogólny"
                       rules={[{required: true, message: 'Podaj stan ogólny'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'radialPulse']} label="Tętno"
                       rules={[{required: true, message: 'Podaj tętno'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'respirations']} label="Liczba oddechów"
                       rules={[{required: true, message: 'Podaj liczbę oddechów'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'anteriorFontanelle']} label="Ciemiączko"
                       rules={[{required: true, message: 'Podaj stan ciemiączka'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'systolicBloodPressure']} label="Ciśnienie krwi"
                       rules={[{required: true, message: 'Podaj ciśnienie'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'skinElasticity']} label="Elastyczność skóry"
                       rules={[{required: true, message: 'Podaj elastyczność skóry'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'eyes']} label="Oczy"
                       rules={[{required: true, message: 'Podaj stan oczu'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'tears']} label="Łzawienie"
                       rules={[{required: true, message: 'Podaj intensywność łzawienia'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item name={['symptoms', 'mucousMembranes']} label="Śluzówka"
                       rules={[{required: true, message: 'Podaj stan śluzówki'}]}>
                <Select options={options}></Select>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5, span: 16,
                }}>
                <Button type="primary" htmlType="submit">
                    Dodaj wyniki
                </Button>
            </Form.Item>
        </Form>
        <Divider/>
        {errorMessage && <Text type="danger">{errorMessage}</Text>}
        {message && <Text type="success">{message}</Text>}
    </>);
};

export default AddExamination;