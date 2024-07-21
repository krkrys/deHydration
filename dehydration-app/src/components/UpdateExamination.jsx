import React, {useState} from 'react';
import {Button, Divider, Form, InputNumber, Select, Typography} from "antd";
import {editExamination, getExamination} from "../api/examinationApi.jsx";

const { Title, Text } = Typography;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const options = [
    { value: '1', label: 'Mild' },
    { value: '2', label: 'Moderate' },
    { value: '3', label: 'Severe' },
];

const UpdateExamination = () => {
    const [examination,setExamination] = useState();
    const [examinationId, setExaminationId] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const data = await getExamination(examinationId);
            if (!data) {
                setErrorMessage('Badanie o podanym ID nie istnieje.');
                setExamination(null);
                return;
            }
            setExamination(data);
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas pobierania danych badania.', err);
            setErrorMessage('Badanie o podanym ID nie istnieje.');
            setExamination(null);
        }
    };

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
            const data = await editExamination(examinationId, e);
            if (!data) {
                setUpdateErrorMessage('Nie udało się zmienić danych badania');
                return;
            }
            setMessage(`Badanie o ID ${examinationId} zostało zmodyfikowane.`)
            setUpdateErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas edycji badania.', err);
            setMessage('')
            setUpdateErrorMessage('Błąd podczas edycji danych badania.');
        }
    };
    return (
        <div>
            <Title level={2}>Pobierz dane badania</Title>
            <form onSubmit={handleSearch} className="form">
                <InputNumber
                    placeholder="Wpisz ID badania"
                    min={1}
                    value={examinationId}
                    onChange={value => {setExaminationId(value)}}
                />
                <Button type="primary" htmlType="submit">Pobierz dane</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {examination && (
                <>
                    <Form
                        {...formItemLayout}
                        variant="filled"
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={handleSubmit}
                        autoComplete="on"
                        //initialValues={examination}
                    >
                        <Title level={2}>Podaj wyniki badania</Title>
                        <Form.Item
                            label="ID pacjenta"
                            name="patientId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj ID pacjenta',
                                },
                            ]}
                            initialValue={examination.patientId}>
                            <InputNumber style={{width: '100%',}} disabled={true}/>
                        </Form.Item>

                        <Form.Item
                            label="Sód [mmol/l]"
                            name="natrium"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj ilość sodu we krwi',
                                },
                            ]}
                            initialValue={examination.natrium}>
                            <InputNumber style={{width: '100%',}}/>
                        </Form.Item>

                        <Form.Item
                            label="Aktualna waga"
                            name="currentWeight"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj aktualną wagę',
                                },
                            ]}
                            initialValue={examination.currentWeight}>
                            <InputNumber style={{width: '100%',}}/>
                        </Form.Item>

                        <Form.Item
                            label="Temperatura"
                            name="bodyTemperature"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj temperaturę ciała',
                                },
                            ]}
                            initialValue={examination.bodyTemperature}>
                            <InputNumber style={{width: '100%',}}/>
                        </Form.Item>

                        <Form.Item
                            label="Liczba wymiotów"
                            name="vomit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj liczbę wymiotów w ciągu ostatnich 24h',
                                },
                            ]}
                            initialValue={examination.vomit}>
                            <InputNumber style={{width: '100%',}}/>
                        </Form.Item>

                        <Form.Item
                            label="Stolec"
                            name="stool"
                            rules={[
                                {
                                    required: true,
                                    message: 'Podaj liczbę stolców w ciągu ostatnich 24h',
                                },
                            ]}
                            initialValue={examination.stool}>
                            <InputNumber style={{width: '100%',}}/>
                        </Form.Item>
                        <Divider/>
                        <Title level={4}>Objawy</Title>
                        <Divider/>
                        <Form.Item name={['symptoms', 'generalAppearance']} label="Stan ogólny" rules={[{required: true, message: 'Podaj stan ogólny'}]}
                                   initialValue={examination.symptoms.generalAppearance.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'radialPulse']} label="Tętno" rules={[{required: true, message: 'Podaj tętno'}]}
                                   initialValue={examination.symptoms.radialPulse.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'respirations']} label="Liczba oddechów" rules={[{required: true, message: 'Podaj liczbę oddechów'}]}
                                   initialValue={examination.symptoms.respirations.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'anteriorFontanelle']} label="Ciemiączko" rules={[{required: true, message: 'Podaj stan ciemiączka'}]}
                                   initialValue={examination.symptoms.anteriorFontanelle.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'systolicBloodPressure']} label="Ciśnienie krwi" rules={[{required: true, message: 'Podaj ciśnienie'}]}
                                   initialValue={examination.symptoms.systolicBloodPressure.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'skinElasticity']} label="Elastyczność skóry" rules={[{required: true, message: 'Podaj elastyczność skóry'}]}
                                   initialValue={examination.symptoms.skinElasticity.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'eyes']} label="Oczy" rules={[{required: true, message: 'Podaj stan oczu'}]}
                                   initialValue={examination.symptoms.eyes.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'tears']} label="Łzawienie" rules={[{required: true, message: 'Podaj intensywność łzawienia'}]}
                                   initialValue={examination.symptoms.tears.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item name={['symptoms', 'mucousMembranes']} label="Śluzówka" rules={[{required: true, message: 'Podaj stan śluzówki'}]}
                                   initialValue={examination.symptoms.mucousMembranes.toString()}>
                            <Select options={options}></Select>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 5,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Dodaj wyniki
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider/>
                    {updateErrorMessage && <Text type="danger">{updateErrorMessage}</Text>}
                    {message && <Text type="success">{message}</Text>}
                </>
            )}
        </div>
    );
};

export default UpdateExamination;