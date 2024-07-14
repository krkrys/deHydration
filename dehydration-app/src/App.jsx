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

function emptyFunction() {}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token);
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