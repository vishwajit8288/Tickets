import React, { useState, useEffect } from 'react';
import { getLeaveData, getEmpList, addLeave,editLeaveData } from '../services/Api'
const Leave = () => {
    let [leaveData, setLeaveData] = useState([]); //get data into table
    let [empData, setEmpData] = useState([]); //for emp dropdown
    let [formsubmited, setFormSubmited] = useState(false); //for validation


    let [isLoader, setIsLoader] = useState(true);
    let [leaveobj, setLeaveObj] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "fromDate": new Date(),
        "toDate": new Date(),
        "noOfDays": 0,
        "leaveType": "",
        "details": "",
        "isApproved": "",
        "approvedDate": new Date()
    })

    useEffect(() => {
        showAllLeaveData();
        showAllEmpList();
        // showLeaveList();
    }, []);

    //show data into table
    const showAllLeaveData = () => {
        getLeaveData().then((data) => {
            setLeaveData(data.data)
            setIsLoader(false);
        })
    }


    //for Employee dropdown
    const showAllEmpList = () => {
        getEmpList().then((data) => {
            setEmpData(data.data)
            setIsLoader(false);
        })
    }
   
    // read value
    const changeFormValue = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    // read check box value
    const changeCheckBoxValue = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }

    //Add Leave
    const addAllLeave = () => {
        try {
            setFormSubmited(true)
            addLeave(leaveobj).then((data) => {
                if (data.result) {
                    alert("Leave Added Successfully");
                    showAllLeaveData();
                } else {
                    alert(data.message);
                }
            })
        } catch (error) {
            alert(error.code)
        }

    }

//edit
const onEditLeave = (employeeId) => {
    editLeaveData(employeeId).then((data) => {
        setLeaveData(data)
    })

}










    const reset = () => {
        // setFormSubmited(false);
        setLeaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "fromDate": new Date(),
            "toDate": new Date(),
            "noOfDays": 0,
            "leaveType": "",
            "details": "",
            "isApproved": "",
            "approvedDate": new Date()
        })
    }



    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-8 col-md-12'>
                        <div className='card'>
                            <div className='card-header' style={{backgroundColor:'#03748A'}}>
                                <strong className='text-white'>  Leave List</strong>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Details</th>
                                                <th>Employee Name</th>
                                                <th>From Date</th>
                                                <th>Leave Type</th>
                                                <th>No Of Days</th>
                                                <th>To Date</th>
                                                
                                                <th>Edit</th>
                                                <th>Delete</th>
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
                                                        <td>{index + 1} </td>
                                                        <td> {item.details} </td>
                                                        <td> {item.employeeName} </td>
                                                        <td> {item.fromDate}</td>
                                                        <td> {item.leaveType} </td>
                                                        <td> {item.noOfDays} </td>
                                                        <td> {item.toDate} </td>
                                                       
                                                        <td><button className='btn btn-success btn-sm' onClick={() => { onEditLeave(item.leaveId) }}><i className='fa fa-pencil'></i> </button> </td>
                                                        <td> <button className='btn btn-sm btn-danger btn-sm'> <i className='fa fa-trash-o'></i></button></td>
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
                    <div className='col-lg-4 col-md-12'>
                        <div className='card'>
                            <div className='card-header' style={{backgroundColor:'#03748A'}}>
                                <strong className='text-white'>   Add Leave</strong>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Details</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'details') }} value={leaveobj.details} placeholder='Enter No.Of Days' />
                                    </div>
                                    <div className='col-6'>
                                        <label>Employee</label>
                                        <select className='form-select' value={leaveobj.employeeId} onChange={(event) => { changeFormValue(event, 'employeeId') }}>
                                            <option value=''>Select Employee</option>
                                            {
                                                empData.map((item) => {
                                                    return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                })
                                            }

                                        </select>
                                        {
                                            //false/empty
                                            formsubmited && leaveobj.deptName == '' && <span className='text-danger'>Employee Is Required </span>
                                        }
                                    </div>


                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <label>From Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'fromDate') }} value={leaveobj.fromDate} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Leave Type</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'leaveType') }} value={leaveobj.leaveType} placeholder='Enter Leave Type' />
                                    </div>



                                </div>
                                <div className='row'>


                                    <div className='col-6'>
                                        <label>No Of Days</label>
                                        <input type='number' className='form-control' onChange={(event) => { changeFormValue(event, 'noOfDays') }} value={leaveobj.noOfDays} placeholder='Enter No.Of Days' />
                                    </div>

                                    <div className='col-6'>
                                        <label>To Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'toDate') }} value={leaveobj.toDate} />
                                    </div>
                                </div>
                                <div className='row'>

                                    <div className='col-6 mt-4'>
                                        <label>Is Approved</label>
                                        <input className="form-check-input" type="checkbox" onChange={(event) => { changeCheckBoxValue(event, 'isApproved') }} value={leaveobj.isApproved} />
                                    </div>
                                    <div className='col-6'>
                                        <label>Approved Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'approvedDate') }} value={leaveobj.approvedDate} />
                                    </div>

                                </div>

                                <div className='row mt-3'>
                                    <div className='col-6 text-start'>
                                        <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                    </div>
                                    <div className='col-6 text-end'>
                                        {
                                            leaveobj.leaveId === 0 && <button className='btn btn-success ' onClick={addAllLeave}>Add Leave</button>
                                        }
                                        {
                                            leaveobj.leaveId !== 0 && <button className='btn btn-sm btn-warning p-2' > Update Leave</button>
                                        }
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