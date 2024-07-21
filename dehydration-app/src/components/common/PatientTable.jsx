import DropdownMenu from "./ActionsMenu.jsx";

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
        title: 'Waga przed chorobą',
        dataIndex: 'standardWeight',
        key: 'standardWeight',
    },
    {
        title: 'Akcje',
        key: 'action',
        render: (_, record) => (
            <DropdownMenu />
        ),
    },
];
export default PatientTable;