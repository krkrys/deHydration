import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/pages/Main.jsx";
import './App.css';
import Header from "./components/common/Header.jsx";
import GetPatients from "./components/GetPatients.jsx";
import GetPatient from "./components/GetPatient.jsx";
import DeletePatient from "./components/DeletePatient.jsx";
import AddPatient from "./components/AddPatient.jsx";
import UpdatePatient from "./components/UpdatePatient.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import {useEffect, useState} from "react";
import GetExaminations from "./components/GetExaminations.jsx";
import AddExamination from "./components/AddExamination.jsx";
import GetExamination from "./components/GetExamination.jsx";
import GetPatientExaminations from "./components/GetPatientExaminations.jsx";
import UpdateExamination from "./components/UpdateExamination.jsx";
import DeleteExamination from "./components/DeleteExamination.jsx";

function emptyFunction() {}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            setIsAuthenticated(true);
        }
    }, [])

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    {isAuthenticated ? (
                        <>
                            <Route path='/main' element={<Main/>}/>
                            <Route path='/patients' element={<GetPatients/>}/>
                            <Route path='/getpatient' element={<GetPatient sendDataToParent={emptyFunction}/>}/>
                            <Route path='/deletepatient' element={<DeletePatient/>}/>
                            <Route path='/addpatient' element={<AddPatient/>}/>
                            <Route path='/updatepatient' element={<UpdatePatient/>}/>
                            <Route path='/getexaminations' element={<GetExaminations/>}/>
                            <Route path='/addexamination' element={<AddExamination/>}/>
                            <Route path='/getexamination' element={<GetExamination/>}/>
                            <Route path='/patientexaminations' element={<GetPatientExaminations/>}/>
                            <Route path='/updateexamination' element={<UpdateExamination/>}/>
                            <Route path='/deleteexamination' element={<DeleteExamination/>}/>
                        </>
                    ) : (
                        <Route path="*" element={<LoginPage/>}/>
                    )}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App