import React, {useState} from 'react';
import {Button, Divider, InputNumber, Typography} from "antd";
import {getExamination, getPatientExaminations} from "../api/examinationApi.jsx";
import Examination from "./common/Examination.jsx";
const { Title, Text } = Typography;

const GetPatientExaminations = () => {
    const [examinations,setExaminations] = useState();
    const [patientId, setPatientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await getPatientExaminations(patientId);
            if (!data) {
                setErrorMessage('Pacjent o podanym ID nie istnieje.');
                examinations(null);
                return;
            }
            setExaminations(data);
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas pobierania danych badań.', err);
            setErrorMessage('Pacjent o podanym ID nie istnieje.');
            setExaminations(null);
        }
    };

    return (
        <div>
            <Title level={2}>Podaj ID pacjenta do pobrania badań</Title>
            <form onSubmit={handleSubmit} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={patientId}
                    onChange={value => {setPatientId(value)}}
                />
                <Button type="primary" htmlType="submit">Pobierz dane badań</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {examinations && (
                <Examination props={examinations}/>
            )}
        </div>
    );
};

export default GetPatientExaminations;
