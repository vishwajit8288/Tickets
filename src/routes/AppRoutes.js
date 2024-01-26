import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import Login from '../pages/Login';
import Department from '../pages/Department';
import Employee from '../pages/Employee';
import Leave from '../pages/Leave';
import Dashboard from '../pages/Dashboard';
import Tickets from '../pages/Tickets';
const AppRoutes = () => {
    return (
        <div>
            <div className='row'>
                <BrowserRouter>
                        <Navbar></Navbar>
                        <Routes>

                            {/* <Route path='/' element={<Login></Login>}></Route> */}
                            <Route path='/' element={<Login></Login>}></Route>
                            <Route path='department' element={<Department></Department>}></Route>
                            <Route path='employee' element={<Employee></Employee>}></Route>
                            <Route path='leave' element={<Leave></Leave>}></Route>
                            <Route path='ticket' element={<Tickets></Tickets>}></Route>
                            <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>

                        </Routes>
                    




                </BrowserRouter>
            </div>
        </div>
    );
};

export default AppRoutes;