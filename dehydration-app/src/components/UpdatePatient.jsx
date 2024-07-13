import {useState} from 'react';
import {editPatient, getPatient} from "../api";
import PatientTable from "./common/PatientTable.jsx";
import {Button, Divider, Form, Input, InputNumber, Table, Typography} from "antd";
import GetPatient from "./GetPatient.jsx";

const {Title, Text} = Typography;

const UpdatePatient = () => {
    const [message, setMessage] = useState('');
    const [updateErrorMessage, setUpdateErrorMessage] = useState('');
    const [dataFromChild, setDataFromChild] = useState("");

    function handleDataFromChild(data) {
        setDataFromChild(data);
    }

    const handleEdit = async (e) => {
        try {
            const patientId=dataFromChild.patientId;
            const data = await editPatient(patientId, e);
            if (!data) {
                setUpdateErrorMessage('Nie udało się zmienić danych pacjenta');
                return;
            }
            setMessage(`Pacjent o ID ${patientId} został zmodyfikowany.`)
            setUpdateErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas dodawania pacjenta.', err);
            setMessage('')
            setUpdateErrorMessage('Błąd podczas edycji danych pacjenta.');
        }
    };
    return (
        <>
            <GetPatient sendDataToParent={handleDataFromChild}/>
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
            {updateErrorMessage && <Text type="danger">{updateErrorMessage}</Text>}
            {message && <Text type="success">{message}</Text>}
        </>
    );
};

export default UpdatePatient;
