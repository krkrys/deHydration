import {useState} from 'react';
import {deletePatient} from "../api";
import {Button, Divider, InputNumber, Typography} from "antd";
const { Title, Text } = Typography;

const DeletePatient = () => {
    const [patientId, setPatientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = await deletePatient(patientId);
            if (!data) {
                setErrorMessage('Pacjent o podanym ID nie istniejeeeeeee.');
                return;
            }
            setMessage(`Pacjent o ID ${patientId} został usunięty.`)
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas usuwania pacjenta.', err);
            setErrorMessage('Pacjent o podanym ID nie istnieje.');
        }
    };
    return (
        <div>
            <Title level={2}>Podaj ID pacjenta do usunięcia</Title>
            <form onSubmit={handleClick} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={patientId}
                    onChange={value => {setPatientId(value)}}
                />
                <Button type="primary" htmlType="submit">Usuń</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {message && <Text type="success">{message}</Text>}
        </div>
    );
};

export default DeletePatient;
