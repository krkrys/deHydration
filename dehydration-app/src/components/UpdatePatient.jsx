import {useState} from 'react';
import {editPatient, getPatient} from "../api";
import PatientTable from "./common/PatientTable.jsx";
import {Button, Divider, Form, Input, InputNumber, Table, Typography} from "antd";

const {Title, Text} = Typography;

const UpdatePatient = () => {
    const [patient, setPatient] = useState();
    const [patientId, setPatientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getPatient(patientId);
            if (!data) {
                setErrorMessage('Pacjent o podanym ID nie istnieje.');
                setPatient(null);
                return;
            }
            setPatient(data);
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas pobierania danych pacjenta.', err);
            setErrorMessage('Pacjent o podanym ID nie istnieje.');
            setPatient(null);
        }
    };
    const datasrc = [];
    datasrc.push(patient);

    const handleEdit = async (e) => {
        try {
            const data = await editPatient(patientId, e);
            if (!data) {
                setErrorMessage('Nie udało się zmienić danych pacjenta');
                return;
            }
            setMessage(`Pacjent o ID ${patientId} został zmodyfikowany.`)
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas dodawania pacjenta.', err);
            setMessage('')
            setErrorMessage('Błąd podczas edycji danych pacjenta.');
        }
    };
    return (
        <>
            <Title level={2}>Wybierz pacjenta do edycji</Title>
            <form onSubmit={handleSubmit} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={patientId}
                    onChange={value => {
                        setPatientId(value)
                    }}
                />
                <Button type="primary" htmlType="submit">Pobierz dane</Button>
            </form>
            <Divider/>
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {patient && (
                <Table columns={PatientTable.filter(col => col.key !== 'action')} dataSource={datasrc}
                       rowKey="patientId"
                       pagination={false}/>
            )}
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

                onFinish={handleEdit}
                autoComplete="on"
            >
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
                        Edytuj
                    </Button>
                </Form.Item>
            </Form>
            <Divider/>
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {message && <Text type="success">{message}</Text>}
        </>
    );
};

export default UpdatePatient;
