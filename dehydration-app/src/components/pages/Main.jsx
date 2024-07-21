import GetPatient from "../GetPatient";

const Main = () => {
    function emptyFunction() {}

    return (
        <>
            <GetPatient sendDataToParent={emptyFunction}/>
        </>
    );
};

export default Main;
