import {useState} from "react";
import GetPatient from "../GetPatient";

const Main = () => {
    const [data, setData] = useState();
    return (
        <>
            {/*<GetPatients setList={setList} />
            <Patients list={list} />*/}
            <GetPatient />
           {/* <Patient />*/}
        </>
    );
};

export default Main;
