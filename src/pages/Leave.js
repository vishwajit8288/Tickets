import React, { useState, useEffect } from 'react';
import { getLeaveData, getEmpList, addLeave, editLeaveData, approvelLeave, rejectLeave, getAllLeaveByEmp,getLeaveForApprovel } from '../services/Api'
const Leave = () => {
    let [leaveData, setLeaveData] = useState([]); //get data into table
    let [empData, setEmpData] = useState([]); //for emp dropdown
    let [formsubmited, setFormSubmited] = useState(false); //for validation
    // ************************************************

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;

    // const depId = userInfo.deptId;
    // ********************************************

    let [isLoader, setIsLoader] = useState(true);
    let [leaveobj, setleaveobj] = useState({
        "leaveId":0,
        "employeeId":id,
        "fromDate": new Date(),
        "toDate": new Date(),
        "noOfDays": 0,
        "leaveType": "",
        "details": "",
        "isApproved": null,
        "approvedDate": null
    })

    // useEffect(() => {
    //     showAllLeaveData();
    //     showAllEmpList();
    //     showAllLeaveByEmp();
    //     // showLeaveList();
    // }, []);
    // useEffect(() => {
    //     if (EmpRole === 'Employee') {
    //         showAllLeaveByEmp();
    //     }
    //     else if (EmpRole === 'Department Head') {
    //         getAllApproveSuperwiser();
    //     }
    //     else {
    //         showAllLeaveData();
    //     }
    // }, []);

    useEffect(() => {
        if (EmpRole === 'Employee') {
            showAllLeaveByEmp();
        }
        else if (EmpRole === 'Department Head') {
            getAllApproveSuperwiser();     //deparmentHead
        }
        else {
            showAllLeaveData();
        }
    }, []);

///when head logdin
    const getAllApproveSuperwiser = () => {
        getLeaveForApprovel(id).then((data) => {
            setLeaveData(data.data);
            setIsLoader(false);
        })
    }







    //show data into table when super admin logdin
    const showAllLeaveData = () => {
        getLeaveData().then((data) => {
            setLeaveData(data.data)
            setIsLoader(false);
        })
    }

    // show all leave by emp when employee logdin
    const showAllLeaveByEmp = () => {
        getAllLeaveByEmp(id).then((data) => {
            setLeaveData(data.data)
            setIsLoader(false);
        })
    }


    //for Employee dropdown
    // const showAllEmpList = () => {
    //     getEmpList().then((data) => {
    //         setEmpData(data.data)
    //         setIsLoader(false);
    //     })
    // }

    // read value
    const changeFormValue = (event, key) => {
        setleaveobj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    // read check box value
    // const changeCheckBoxValue = (event, key) => {
    //     setleaveobj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    // }

    //Add Leave
    const addAllLeave = () => {
        try {
            setFormSubmited(true)
            addLeave(leaveobj).then((data) => {
                if (data.result) {
                    alert("Leave Added Successfully");
                    showAllLeaveByEmp();
                } else {
                    alert(data.message);
                }
            })
        } catch (error) {
            alert(error.code)
        }

    }

    //edit
    // const onEditLeave = (employeeId) => {
    //     editLeaveData(employeeId).then((data) => {
    //         setLeaveData(data)
    //     })

    // }



    //approve leave
    const getApproveLeave = (leaveId) => {
        approvelLeave(leaveId).then((data) => {
            if (data.result) {
                alert('Leave Approved');
            }

            else {
                alert(data.message);
            }
        })
    }

    //reject leave
    const getRejectLeave = (leaveId) => {
        rejectLeave(leaveId).then((data) => {
            if (data.result) {
                alert('Leave Rejected');
            }
            else {
                alert(data.message);
            }
        })
    }


    const reset = () => {
         setFormSubmited(false);
        setleaveobj({
            "leaveId": 0,
            "employeeId": 0,
            "fromDate": new Date(),
            "toDate": new Date(),
            "noOfDays": 0,
            "leaveType": "",
            "details": "",
            "isApproved": null,
            "approvedDate": null
        })
    }



    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>

                    {/* for employee */}
                    {
                        EmpRole === 'Employee' && <div className='row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                        <div className="row">
                                            <div className="col-md-6 text-start">
                                                <strong>Leave List</strong>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Add Data</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='card-body'>
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
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }

                    {/* for Department Head */}
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



                    {/* for superadmin */}
                    {
                        EmpRole === 'Super Admin' && <div className='col-12'>
                            <div className='card'>
                                <div className='row'>
                                    <div className='col-12 text-start'>
                                        <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                            <div className="row">
                                                <div className="col-md-6 text-start">
                                                    <strong className='text-white'>Leave List</strong>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Add Data</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>Approved Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Request</th>
                                                    <th>Details</th>

                                                </tr>
                                            </thead>
                                            {
                                                isLoader && <tbody>
                                                    <tr>
                                                        <td colSpan={7} className='text-center'>
                                                            <div className="spinner-border text-primary"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            }
                                            {!isLoader && <tbody>
                                                {
                                                    leaveData.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.employeeName}</td>
                                                            <td>{item.fromDate}</td>
                                                            <td>{item.toDate}</td>
                                                            <td>{item.approvedDate}</td>
                                                            <td>{item.noOfDays}</td>
                                                            <td><strong>{item.isApproved == true ? 'Approved' : 'Pending' || item.isApproved == false ? 'Reject' : 'Pending'}</strong></td>
                                                            <td>{item.details}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>



                        </div>
                    }




                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ backgroundColor: '#03748A' }} >
                                    <h4 className="modal-title text-white">Leave Form</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>From Date</label>
                                            <input type='date' className='form-control' onChange={(event) => { changeFormValue(event,'fromDate')}}></input>
                                            <div className='text-danger'>
                                                {
                                                    formsubmited && leaveobj.fromDate == '' && <span>From Date is required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>To Date</label>
                                            <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'toDate') }}></input>
                                            <div className='text-danger'>
                                                {
                                                    formsubmited && leaveobj.toDate == '' && <span>To Date is required.</span>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>No Of Days</label>
                                            <input type='text' className='form-control' onChange={(event) => {
                                                changeFormValue(event,
                                                    'noOfDays')
                                            }}></input>
                                            <div className='text-danger'>
                                                {
                                                    formsubmited && leaveobj.noOfDays == '' && <span>No Of Days is
                                                        required.</span>
                                                }
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <label>Leave Type</label>
                                            <input type='text' className='form-control' onChange={(event) => {
                                                changeFormValue(event,
                                                    'leaveType')
                                            }}></input>
                                            <div className='text-danger'>
                                                {
                                                    formsubmited && leaveobj.leaveType == '' && <span>Leave Type is
                                                        required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <label>Details</label>
                                            <input type='text' className='form-control' onChange={(event) => {
                                                changeFormValue(event,
                                                    'details')
                                            }}></input>
                                            <div className='text-danger'>
                                                {
                                                    formsubmited && leaveobj.details == '' && <span>Details is required.</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-secondary btn-sm' onClick={reset}>Reset</button>
                                        </div>
                                        <div className='col-6 mt-3 text-center'>
                                            <button className='btn btn-success btn-sm' onClick={addAllLeave}>Save
                                                Data</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leave;