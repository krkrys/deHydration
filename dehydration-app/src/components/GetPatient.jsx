import {useState} from 'react';
import {getPatient} from "../api";
import PatientTable from "./common/PatientTable.jsx";
import {Button, Form, Input, InputNumber, Table} from "antd";

const GetPatient = () => {
    const [patient, setPatient] = useState();
    const [patientId, setPatientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getPatient(patientId);
            if (!data) {
                setErrorMessage('Promocja o podanym Id nie istnieje.');
                setPatient(null);
                return;
            }
            setPatient(data);
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas pobierania promocji:', err);
            setErrorMessage('Promocja o podanym Id nie istnieje.');
            setPatient(null);
        }
    };
    const datasrc = [];
    datasrc.push(patient);
    return (
        <div>
            <h1>Pobierz promocję po jej Id</h1>
            <form onSubmit={handleSubmit} className="form">
                <InputNumber
                    min={1}
                    value={patientId}
                    onChange={value => {setPatientId(value)}}
                />
                <Button type="primary" htmlType="submit">Pobierz pacjenta</Button>
            </form>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            {patient && (
                <Table columns={PatientTable} dataSource={datasrc} pagination={false}/>
            )}
        </div>
    );
};

export default GetPatient;
