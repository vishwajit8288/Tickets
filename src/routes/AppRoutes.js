import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/UI/Navbar'
import Login from '../pages/Login';
import Department from '../pages/Department';
import Employee from '../pages/Employee';
import Leave from '../pages/Leave';
import Tickets from '../pages/Tickets';
const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='login' element={<Login></Login>}></Route>
                    <Route path='department' element={<Department></Department>}></Route>
                    <Route path='employee' element={<Employee></Employee>}></Route>
                    <Route path='leave' element={<Leave></Leave>}></Route>
                    <Route path='ticket' element={<Tickets></Tickets>}></Route>
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;