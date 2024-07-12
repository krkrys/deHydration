import {Space} from "antd";

const PatientTable = [
    {
        title: 'ID pacjenta',
        dataIndex: 'patientId',
        key: 'patientId',
    },
    {
        title: 'Imię',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Nazwisko',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'Numer telefonu',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Akcje',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Dodaj wyniki</a>
                <a>Pokaż wyniki</a>
                <a>Usuń</a>
            </Space>
        ),
    },
];
export default PatientTable;