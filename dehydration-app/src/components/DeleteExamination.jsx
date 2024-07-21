import {useState} from 'react';
import {Button, Divider, InputNumber, Typography} from "antd";
import {deleteExamination} from "../api/examinationApi.jsx";
const { Title, Text } = Typography;

const DeleteExamination = () => {
    const [examinationId, setExaminationId] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = await deleteExamination(examinationId);
            if (!data) {
                setErrorMessage('Badanie o podanym ID nie istnieje.');
                setMessage('');
                return;
            }
            setMessage(`Badanie o ID ${examinationId} zostało usunięte.`)
            setErrorMessage('');
        } catch (err) {
            console.error('Błąd podczas usuwania badania.', err);
            setErrorMessage('Badanie o podanym ID nie istnieje.');
            setMessage('');
        }
    };
    return (
        <div>
            <Title level={2}>Podaj ID badania do usunięcia</Title>
            <form onSubmit={handleClick} className="form">
                <InputNumber
                    placeholder="Wpisz ID"
                    min={1}
                    value={examinationId}
                    onChange={value => {setExaminationId(value)}}
                />
                <Button type="primary" htmlType="submit">Usuń</Button>
            </form>
            <Divider />
            {errorMessage && <Text type="danger">{errorMessage}</Text>}
            {message && <Text type="success">{message}</Text>}
        </div>
    );
};

export default DeleteExamination;
