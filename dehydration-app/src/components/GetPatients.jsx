import {useEffect, useState} from 'react';
import {getPatients} from "../api";
import {Table} from "antd";
import PatientTable from "./common/PatientTable.jsx";

const GetPatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPatients();
                setPatients(data);
            } catch (error) {
                console.error('Błąd podczas pobierania promocji: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        //console.log(patients)
        <Table columns={PatientTable} dataSource={patients} pagination={false}/>
    );
};
export default GetPatients;