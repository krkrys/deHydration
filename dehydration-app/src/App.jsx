import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/pages/Main.jsx";
import './App.css';
import Header from "./components/common/Header.jsx";
import GetPatients from "./components/GetPatients.jsx";
import GetPatient from "./components/GetPatient.jsx";
import DeletePatient from "./components/DeletePatient.jsx";
import AddPatient from "./components/AddPatient.jsx";
import UpdatePatient from "./components/UpdatePatient.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/patients' element={<GetPatients />} />
                    <Route path='/getpatient' element={<GetPatient />} />
                    <Route path='/deletepatient' element={<DeletePatient />} />
                    <Route path='/addpatient' element={<AddPatient />} />
                    <Route path='/updatepatient' element={<UpdatePatient />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App