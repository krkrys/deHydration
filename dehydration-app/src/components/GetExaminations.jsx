import React, {useEffect, useState} from 'react';
import {getExaminations} from "../api/examinationApi.jsx";
import Examination from "./common/Examination.jsx";

const GetExaminations = () => {
    const [examinations, setExaminations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExaminations();
                setExaminations(data);
            } catch (error) {
                console.error('Błąd podczas pobierania promocji: ', error);
            }
        };
        fetchData().finally(() => setIsLoading(false));
    }, []);

    return isLoading ? <p>loading...</p> : (<Examination props={examinations}/>);
};
export default GetExaminations;