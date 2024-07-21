import {useState} from "react";
import {addPatient} from "../api/patientApi.jsx";
import {Button, Divider, Form, Input, InputNumber, Typography} from "antd";
const { Title, Text } = Typography;

const AddPatient = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        try {
            const data = await addPatient(e);
            if (!data) {
                setErrorMessage('Nie udało się utworzyć pacjenta');
                return;
            }
            setMessage(`Pacjent o ID ${data.patientId} został utworzony.`)
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas dodawania pacjenta.', err);
            setMessage('')
            setErrorMessage('Błąd podczas dodawania pacjenta.');
        }
    };

    return (
        <>
            <Title level={2}>Podaj dane pacjenta</Title>
            <Form
                name="patient"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}

                onFinish={handleSubmit}
                autoComplete="on"
            >
                <Form.Item
                    label="Imię"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj imię',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Nazwisko"
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj nazwisko',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Numer telefonu"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj numer telefonu',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Waga przed chorobą"
                    name="standardWeight"
                    rules={[
                        {
                            required: true,
                            message: 'Podaj wagę przed chorobą',
                        },
                    ]}
                >
                    <InputNumber style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Dodaj pacjenta
                    </Button>
                </Form.Item>
            </Form>
            <Divider/>
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {message && <Text type="success">{message}</Text>}
        </>
    );
};

export default AddPatient;