import React, {useState} from 'react';
import {Button, Divider, InputNumber, Typography} from "antd";
import {getExamination} from "../api/examinationApi.jsx";
import Examination from "./common/Examination.jsx";
const { Title, Text } = Typography;

const GetExamination = () => {
    const [examination,setExamination] = useState();
    const [examinationId, setExaminationId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setErrorMessage('Pacjent o podanym ID nie istnieje.');
            setExamination(null);
        }
    };
    const examinationProps = [];
    examinationProps.push(examination);
    return (
        <div>
            <Title level={2}>Pobierz dane badania</Title>
            <form onSubmit={handleSubmit} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={examinationId}
                    onChange={value => {setExaminationId(value)}}
                />
                <Button type="primary" htmlType="submit">Pobierz dane</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {examination && (
                <Examination props={examinationProps}/>
            )}
        </div>
    );
};

export default GetExamination;
