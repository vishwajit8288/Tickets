import React, { useState, useEffect } from 'react';
import { getTicket, addTicket, getDeptList, editTicketData, deleteTicketData, getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId } from '../services/Api'
const Tickets = () => {

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn)
    const id = userInfo.employeeId;


    //  ///////////////////////////////
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;

    let [TicketData, setTicketDataList] = useState([]);
    let [empData, setEmpData] = useState([]);

    let [deptlist, setDeptList] = useState([])


    /////////////////////////////////////////////////////

    let [ticketlist, setTicketList] = useState([])
    let [Ticketdata, setTicketData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [formsubmited, setFormSubmited] = useState(false);
    let [ticketobj, setTicketObj] = useState({
        "employeeId": id,
        "severity": "",
        "deptId": 0,
        "state": "",
        "requestDetails": ""
    })


    const changeFormValue = (event, key) => {
        setTicketObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    // useEffect(() => {
    //     showAllTicket();
    //     showAllDeptHead();
    //     if (userInfo.role === "employee") {
    //     }
    // }, []);


    // ////////////////////////////////////////////////////////
    useEffect(() => {
        if (EmpRole === 'Employee') {
            showTicketCreatedByEmpId(id);
        }
        else if (EmpRole === 'Department Head') {
            showNewTicketByEmpId();
        }
        else if (EmpRole === 'Admin Department Employee') {
            showAssignedTicketByEmpId();
        }
        else {
            showAllTicket();
        }
        showAllDept();
        GetAllEmployeesByDeptId();
    }, []);


    ////////////////////////////
    //dropdown
    const GetAllEmployeesByDeptId = () => {
        GetEmployeesByDeptId(depId).then((data) => {
            setEmpData(data.data);
        })
    }


    const showNewTicketByEmpId = () => {
        getNewTickets(id).then((data) => {
            setTicketDataList(data.data);
        })
    }



    const showTicketCreatedByEmpId = (employeeId) => {
        getTicketById(employeeId).then((data) => {
            setTicketDataList(data.data);
        })
    }





    // const showNewTicketByEmpId = () => {
    //     getNewTickets(id).then((data) => {
    //         if (data && data.data) {
    //             setTicketDataList(data.data);
    //         } else {
    //             // Handle the case where data is null or undefined
    //             setTicketDataList([]);
    //         }
    //     })
    // }




    const showAssignedTicketByEmpId = () => {
        getAssignedTickets(id).then((data) => {
            setTicketDataList(data.data);
        })
    }






    // /////////////////////////////////////////////////////////////////////////////////
    //for table
    const showAllTicket = (employeeId) => {
        getTicket(employeeId).then((data) => {
            setTicketList(data.data)
            setIsLoader(false);
        })
    }

    //for dropdown
    const showAllDept = () => {
        getDeptList().then((data) => {
            setDeptList(data.data)
        })
    }

    const addAllTicket = () => {
        try {
            setFormSubmited(true)
            if (ticketobj.severity != '' &&
                ticketobj.deptId != '' &&
                ticketobj.requestDetails != '') {
                addTicket(ticketobj).then((data) => {
                    debugger;
                    if (data.result) {
                        alert("Ticket Added Successfully");
                        showAllTicket();
                        debugger;
                    } else {
                        alert(data.message);
                    }
                })
            }
        } catch (error) {
            alert(error.code)
        }
    }

    const onEditEmp = (ticketId) => {
        editTicketData(ticketId).then((data) => {
            setTicketObj(data)
        })

    }
    //Delate
    const onDeleteTicket = (ticketId) => {
        deleteTicketData(ticketId).then((data) => {
            debugger;
            console.log('Delete response:', data);
            if (data.result) {
                debugger;
                alert('Ticket Deleted Successfully')
                showAllTicket();
            } else {
                alert(data.message)
            }
        })
    }

    const reset = () => {
        setFormSubmited(false);
        setTicketObj({
            "employeeId": 0,
            "severity": "",
            "deptId": 0,
            "state": "",
            "requestDetails": ""
        })
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-8 col-md-12'>
                        {/* <div className='card'>
                            <div className='card-header bg-success'>
                                <strong className='text-white'> Ticket List</strong>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>

                                                <th>state</th>
                                                <th>Ticket No</th>
                                                <th>Severity</th>
                                                <th>Contact No</th>
                                                <th>Created By employeeId</th>
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
                                                ticketlist.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1} </td>

                                                        <td> {item.state}</td>
                                                        <td> {item.ticketNo} </td>
                                                        <td> {item.severity} </td>
                                                        <td> {item.contactNo} </td>
                                                        <td> {item.createdByEmployee} </td>
                                                        <td><button className='btn btn-success btn-sm' onClick={() => { onEditEmp(item.ticketId) }}><i className='fa fa-pencil'></i> </button> </td>
                                                        <td> <button className='btn btn-sm btn-danger btn-sm' onClick={() => { onDeleteTicket(item.ticketId) }}> <i className='fa fa-trash-o'></i></button></td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div> */}


                        {/*  */}

                        <div class="card">
                            <div class="card-header bg-primary" >
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Ticket List</strong>
                                    </div>
                                    {/* <div className='col-6 text-end'>
                                        <button className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#myModal" >Add Data</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className='card-body'>
                                {
                                    EmpRole === 'Employee' && <div className='row'>
                                        {
                                            TicketData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'>
                                                                <i class="fa fa-ticket me-2"></i>
                                                                <strong>{item.ticketNo}</strong>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Created Date</strong> - {item.createdDate}
                                                                        <br></br>
                                                                        <strong>Expected End Date</strong> - {item.expectedEndDate}
                                                                        <br></br>
                                                                        <strong>Dept Name</strong> - {item.deptName}
                                                                        <br></br>
                                                                        <strong>Contact No</strong> - {item.contactNo}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className='col-6 offset-6 text-end'>
                                                                        <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    EmpRole === 'Department Head' && <div className='row'>
                                        {
                                            TicketData.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-title px-3 pt-3'>
                                                                <i class="fa fa-ticket me-2"></i>
                                                                <strong>{item.ticketNo}</strong>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Employee Name</strong> - {item.employeeName}
                                                                        <br></br>
                                                                        <strong>Created Date</strong> - {item.createdDate}
                                                                        <br></br>
                                                                        <strong>Expected End Date</strong> - {item.expectedEndDate}
                                                                        <br></br>
                                                                        <strong>Severity</strong> - {item.severity}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className='col-6'>
                                                                        <label>Employee</label>
                                                                        <select className='form-select'>
                                                                            <option value=''>Select Employee</option>
                                                                            {
                                                                                empData.map((item) => {
                                                                                    return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                                                })

                                                                            }
                                                                        </select>
                                                                        {

                                                                            formsubmited && ticketobj.ticketId == '' && <span className='text-danger'>Employee Is Required </span>
                                                                        }

                                                                    </div>
                                                                    <div className='col-6 text-end'>
                                                                        <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        {/*  */}
                    </div>



                    <div className='col-lg-4 col-md-12'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                <strong className='text-white'>  Add Ticket</strong>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Severity</label>
                                        <select className='form-select' value={ticketobj.severity} onChange={(event) => { changeFormValue(event, 'severity') }}>
                                            <option>Select Severity</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>

                                        </select>
                                        {

                                            formsubmited && ticketobj.severity == '' && <span className='text-danger'>severity Is Required </span>
                                        }
                                    </div>
                                    <div className='col-6'>
                                        <label>Department</label>
                                        <select className='form-select' value={ticketobj.deptId} onChange={(event) => { changeFormValue(event, 'deptId') }}>
                                            <option value=''>Select Department</option>
                                            {
                                                deptlist.map((item) => {
                                                    return (<option key={item.deptId} value={item.deptId}>{item.deptName}</option>)
                                                })

                                            }
                                        </select>
                                        {

                                            formsubmited && ticketobj.deptId == '' && <span className='text-danger'>Department Is Required </span>
                                        }

                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <label>Request Details</label>
                                        <textarea className='form-control' rows="3" onChange={(event) => { changeFormValue(event, 'requestDetails') }} value={ticketobj.requestDetails} placeholder='Enter Request Details'></textarea>
                                        {

                                            formsubmited && ticketobj.requestDetails == '' && <span className='text-danger'>Request Details Is Required </span>
                                        }
                                    </div>

                                </div>


                                <div className='row mt-2 mb-2'>
                                    <div className='col-2'>
                                        <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                    </div>
                                    <div className='col-6'>
                                        <button className='btn btn-success btn-primary' onClick={addAllTicket} >Add Ticket</button>
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

export default Tickets;