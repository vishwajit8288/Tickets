import React, { useState, useEffect } from 'react';
import { getSuperAdmin, getEmpDashboard, getDeptHeadDashData, getAdminEmpDashData } from '../services/Api';

const Dashboard = () => {
    const isLoggedIn = localStorage.getItem('loginObj');

    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;
    const [superAdminDash, setSuperAdminDash] = useState([]);
    let [employeeDash, setEmpDash] = useState([]);
    let [deptHeadDas, setHeadDash] = useState([]);



    let [empAdminDash, setEmpAdminDash] = useState([]);
    console.log(EmpRole)
    useEffect(() => {
        if (EmpRole === 'Employee') {
            getAllEmpDashData();
        }
        else if (EmpRole === 'Department Head') {
            getAllDeptHeadDashData();
        }
        else if (EmpRole === 'Admin Department Employee') {
            getAllAdminEmpDashData();
        }
        else {
            showSuperAdmin();
        }
    }, []);

    // //employee dash
    const getAllEmpDashData = () => {
        getEmpDashboard(id).then((data) => {
            setEmpDash([data.data])

        })
    }


    //super admin
    const showSuperAdmin = () => {
        getSuperAdmin().then((data) => {
            setSuperAdminDash([data.data])
        })
    }

    const getAllDeptHeadDashData = () => {
        getDeptHeadDashData(id).then((data) => {
            setHeadDash([data.data])
        })
    }

    const getAllAdminEmpDashData = () => {
        getAdminEmpDashData(id).then((data) => {
            setEmpAdminDash([data.data])
        })
    }





    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mt-4'>
                        <div className="row">
                            
                                <div className="boxes col-12">
                                    <div className='col-12'>
                                        {
                                            EmpRole === 'Employee' && employeeDash.map((item) => {

                                                return (
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <div className='card bg-info  p-3'>
                                                                <div className='row'>
                                                                    <h4>Total Tickets</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-server fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='card  bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>Unassigned</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalAssignedTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-line-chart fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='card  bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>Assigned</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalAssignedTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-envelope fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='card  bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>In-Progress</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalInProgressTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-globe fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3 mt-4'>
                                                            <div className='card  bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>Closed</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalClosedTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-times fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    {
                                        EmpRole === 'Department Head' && deptHeadDas.map((item) => {
                                            return (

                                                <div className='row'>
                                                    <div className='col-3'>
                                                        <div className='card bg-info p-3'>
                                                            <div className='row'>
                                                                <h4>Total Employees</h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-6 text-start'>
                                                                    <h2>{item.totalEmployees}</h2>
                                                                </div>
                                                                <div className='col-6 text-end'>
                                                                    <i class="fa fa-user fs-1 text-white"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-3'>
                                                        <div className='card bg-info p-3'>
                                                            <div className='row'>
                                                                <h4>Total Tickets</h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-6 text-start'>
                                                                    <h2>{item.totalTickets}</h2>
                                                                </div>
                                                                <div className='col-6 text-end'>
                                                                    <i class="fa fa-server fs-1 text-white"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-3'>
                                                        <div className='card bg-info p-3'>
                                                            <div className='row'>
                                                                <h4>Un-Assigned</h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-6 text-start'>
                                                                    <h2>{item.totalUnAssignedTickets}</h2>
                                                                </div>
                                                                <div className='col-6 text-end'>
                                                                    <i class="fa fa-line-chart fs-1 text-white"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-3'>
                                                        <div className='card bg-info p-3'>
                                                            <div className='row'>
                                                                <h4>Assigned    </h4>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-6 text-start'>
                                                                    <h2>{item.totalAssignedTickets}</h2>
                                                                </div>
                                                                <div className='col-6 text-end'>
                                                                    <i class="fa fa-envelope fs-1 text-white"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-12 mt-4'>
                                                        <div className='row'>
                                                            <div className='col-3'>
                                                                <div className='card bg-info p-3'>
                                                                    <div className='row'>
                                                                        <h4>In-Progress</h4>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-6 text-start'>
                                                                            <h2>{item.totalInProgressTickets}</h2>
                                                                        </div>
                                                                        <div className='col-6 text-end'>
                                                                            <i class="fa fa-globe fs-1 text-white"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-3'>
                                                                <div className='card bg-info p-3'>
                                                                    <div className='row'>
                                                                        <h4>Closed</h4>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-6 text-start'>
                                                                            <h2>{item.totalClosedTickets}</h2>
                                                                        </div>
                                                                        <div className='col-6 text-end'>
                                                                            <i className="fa fa-times fs-1 text-white"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })
                                    }

                                    {
                                        EmpRole === 'Admin Department Employee' && empAdminDash.map((item) => {
                                            return (<div className='row'>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Total Tickets</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-server fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Assigned</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalAssignedTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-envelope fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>In-Progress</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalInProgressTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-globe fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Closed</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalClosedTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i className="fa fa-times fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>)
                                        })

                                    }

                                    {
                                        EmpRole === 'Super Admin' && superAdminDash.map((item) => {
                                            return (<div className='row'>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Total Employees</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalEmployees}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-user fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Total Departments</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalDepartments}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-id-card fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Total Tickets</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-server fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className='card bg-info p-3'>
                                                        <div className='row'>
                                                            <h4>Un-Assigned</h4>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-6 text-start'>
                                                                <h2>{item.totalUnAssignedTickets}</h2>
                                                            </div>
                                                            <div className='col-6 text-end'>
                                                                <i class="fa fa-line-chart fs-1 text-white"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12 mt-4'>
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <div className='card bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>Assigned</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalAssignedTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-envelope fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='card bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>In-Progress</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalInProgressTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-globe fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='card bg-info p-3'>
                                                                <div className='row'>
                                                                    <h4>Closed</h4>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-6 text-start'>
                                                                        <h2>{item.totalClosedTickets}</h2>
                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <i className="fa fa-times fs-1 text-white"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>)
                                        })
                                    }
                                </div>

                         
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
