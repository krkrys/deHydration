import React, {useEffect, useState} from 'react';
import {getPatients} from "../api/patientApi.jsx";
import {Table} from "antd";
import PatientTable from "./common/PatientTable.jsx";

const GetPatients = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPatients();
                setPatients(data);
            } catch (error) {
                console.error('Błąd podczas pobierania pacjentów: ', error);
            }
        };
        fetchData().finally(() => setIsLoading(false));
        ;
    }, []);

    return isLoading ? <p>loading...</p> : (
        <Table columns={PatientTable} dataSource={patients} rowKey="patientId" pagination={false}/>);
};
export default GetPatients;