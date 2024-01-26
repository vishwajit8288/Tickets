import React, { useState, useEffect } from 'react';
import { getSuperAdmin } from '../services/Api';

const Dashboard = () => {
    const [superAdmin, setSuperAdmin] = useState([]);

    const showSuperAdmin = () => {
        getSuperAdmin().then((data) => {
            console.log(data);
            // Convert the object into an array of key-value pairs
            const dataArray = Object.entries(data.data);
            setSuperAdmin(dataArray);
        });
    };

    useEffect(() => {
        showSuperAdmin();
    },[]);



    const fieldIcons = {
        totalDepartments: 'fa fa-building fa-2x',
        totalEmployees: 'fa fa-users fa-2x',
        totalTickets: 'fa fa-ticket fa-2x',
        totalUnAssignedTickets: 'fa fa-exclamation-circle fa-2x',
        totalAssignedTickets: 'fa fa-envelope fa-2x',
        totalInProgressTickets: 'fa fa-hourglass-half fa-2x',
        totalClosedTickets: 'fa fa-check-circle fa-2x',
        // Add more fields and icons as needed
    };




    return (
        <div>
            {/* <div className='container-fluid'>
                <div className='row'>
                    {superAdmin.map(([totalDepartments, value], index) => (
                        <div key={index} className='col-lg-4 col-md-6'>
                            <div className='card mb-4'>
                                <div className='card-header bg-info'>
                                    <strong className='text-white'>{totalDepartments}</strong>
                                </div>
                                <div className='card-body'>
                                    <p className='card-text'>{value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            {/* <div className='container'>
                <div className='row mt-4'>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body p-5">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="row">
                                            <div class="col-12">
                                                <h4><b></b></h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                               <span><b></b></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <i class="fa fa-user fa-3x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                    <h3>Welcome Admin !!</h3>
                    </div>
               
                </div>
           
                <div className='row mt-4'>
                    {superAdmin.map(([item, value], index) => (
                        <div key={index} className='col-lg-4 col-md-6 mb-4'>
                            <div className='card  shadow height-100-p widged-style 3 bg-info' style={{backgroundColor:""}}>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <h4><b>{item.charAt(0).toUpperCase() + item.slice(1)}</b></h4>
                                                </div>
                                            </div>
                                            <div className='row mt-1'>
                                                <div className='col-12'>
                                                    <span className='rounded-circle bg-light p-2'>{value}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 text-end'>
                                            <i className={fieldIcons[item] || 'fa fa-question'}></i>
                                            {/* If fieldName doesn't match any icon, use a default icon */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
