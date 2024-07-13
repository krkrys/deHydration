import {useState} from 'react';
import {getPatient} from "../api";
import PatientTable from "./common/PatientTable.jsx";
import {Button, Divider, InputNumber, Table, Typography} from "antd";
const { Title, Text } = Typography;

const GetPatient = () => {
    const [patient, setPatient] = useState();
    const [patientId, setPatientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

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
    return (
        <div>
            <Title level={2}>Pobierz dane pacjenta</Title>
            <form onSubmit={handleSubmit} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={patientId}
                    onChange={value => {setPatientId(value)}}
                />
                <Button type="primary" htmlType="submit">Pobierz dane</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {patient && (
                <Table columns={PatientTable} dataSource={datasrc} rowKey="patientId" pagination={false}/>
            )}
        </div>
    );
};

export default GetPatient;
