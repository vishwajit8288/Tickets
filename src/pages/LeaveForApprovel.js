import React, { useState, useEffect } from 'react';
// import { getLeaveForApprovel, approvelLeave, rejectLeave } from '../services/Api'

const LeaveForApprovel = () => {


    // let [leaveData, setLeaveData] = useState([]);
    // const isLoggedIn = localStorage.getItem('loginObj');
    // const userInfo = JSON.parse(isLoggedIn);
    // const id = userInfo.employeeId;
    // const EmpRole = userInfo.role;
    // let [isLoader, setIsLoader] = useState(true);



    // useEffect(() => {
    //     if (EmpRole === 'Department Head') {
    //         getAllLeaveData();
    //     }
    // }, []);

    // //get all leave
    // const getAllLeaveData = () => {
    //     getLeaveForApprovel(id).then((data) => {
    //         setLeaveData(data.data);
    //         setIsLoader(false);
    //     })
    // }

    // //approve leave
    // const getApproveLeave = (leaveId) => {
    //     approvelLeave(leaveId).then((data) => {
    //         if (data.result) {
    //             alert('Leave Approved');
    //         }

    //         else {
    //             alert(data.message);
    //         }
    //     })
    // }
    // //reject leave
    // const getRejectLeave = (leaveId) => {
    //     rejectLeave(leaveId).then((data) => {
    //         if (data.result) {
    //             alert('Leave Rejected');
    //         }
    //         else {
    //             alert(data.message);
    //         }
    //     })
    // }


    return (
        <div>
            {/* <div className='container'>
                <div className='row mt-3'>
                    <div className='col-8'>

                    </div>
                    <div className='card'>
                        <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                            <div className='row'>
                                <div className='col-6 text-start'>
                                    <h4>Leave List</h4>
                                </div>
                            </div>

                        </div>
                        <div className='card-body'>
                            {
                                EmpRole === 'Department Head' && <div className='row'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Emp Name</th>
                                                <th>From Date</th>
                                                <th>To Date</th>
                                                <th>No Of Days</th>
                                                <th>Details</th>
                                                <th>Request</th>
                                                <th>Approve</th>
                                                <th>Reject</th>
                                            </tr>
                                        </thead>
                                        {
                                            isLoader && <tbody>
                                                <tr>
                                                    <td colSpan={9} className='text-center'>
                                                        <div class="spinner-border text-muted"></div>
                                                        <div class="spinner-border text-primary"></div>
                                                        <div class="spinner-border text-success"></div>
                                                        <div class="spinner-border text-info"></div>
                                                        <div class="spinner-border text-warning"></div>
                                                        <div class="spinner-border text-danger"></div>
                                                        <div class="spinner-border text-secondary"></div>
                                                        <div class="spinner-border text-dark"></div>
                                                        <div class="spinner-border text-light"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                        {
                                            !isLoader && <tbody>
                                                {
                                                    leaveData.map((item, index) => {
                                                        return (<tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.employeeName}</td>
                                                            <td>{item.fromDate}</td>
                                                            <td>{item.toDate}</td>
                                                            <td>{item.noOfDays}</td>
                                                            <td>{item.details}</td>
                                                            <td><strong>{item.isApproved == true ? 'Approved' : (item.isApproved == false ? 'Reject' : 'Pending')}</strong></td>
                                                            <td><button className='btn btn-warning btn-sm' onClick={() => { getApproveLeave(item.leaveId) }}>Approve</button></td>
                                                            <td><button className='btn btn-danger btn-sm' onClick={() => { getRejectLeave(item.leaveId) }}>Reject</button></td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div> */}
        </div>
    );
};

export default LeaveForApprovel;