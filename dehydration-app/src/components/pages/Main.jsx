import {useState} from "react";
import GetPatient from "../GetPatient";

const Main = () => {
    const [data, setData] = useState();

    function emptyFunction() {}

    return (
        <>
            {/*<GetPatients setList={setList} />
            <Patients list={list} />*/}
            <GetPatient sendDataToParent={emptyFunction}/>
           {/* <Patient />*/}
        </>
    );
};

export default Main;
