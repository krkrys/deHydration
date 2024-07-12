import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/pages/Main.jsx";
import './App.css';
import Header from "./components/common/Header.jsx";
import GetPatients from "./components/GetPatients.jsx";
import GetPatient from "./components/GetPatient.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/patients' element={<GetPatients />} />
                    <Route path='/getpatient' element={<GetPatient />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App