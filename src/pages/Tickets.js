import React, { useState, useEffect } from 'react';
import { getTicket, addTicket, getDeptList, getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId, getAssignRequest, startTicket, closeTicket } from '../services/Api'
const Tickets = () => {

    const isLoggedIn = localStorage.getItem('loginObj');
    const userInfo = JSON.parse(isLoggedIn)
    const id = userInfo.employeeId;


    //  ///////////////////////////////
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;
    let [TicketData, setTicketDataList] = useState([]);
    let [deptlist, setDeptList] = useState([])
    let [empData, setEmpData] = useState([]);
    // const ticketstatuslist = ['Un-Assigned', 'Assigned', 'In-Progress', 'Closed'];
    /////////////////////////////////////////////////////


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

    //to send emp id when emp dropdown selected
    const getTicketRequest = (event, ticketId) => {
        const ticketobj = {
            "ticketId": ticketId,
            "assignedTo": event.target.value
        }
        getAssignRequest(ticketobj).then((data) => {
            if (data.result) {
                alert("Ticket Assign Successfully")
            } else {
                alert(data.message)
            }
        });

    };



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


    //show ticket created by emp if emp logdin
    const showTicketCreatedByEmpId = (employeeId) => {
        getTicketById(employeeId).then((data) => {
            setTicketDataList(data.data);
        })
    }

    // show ticket created by emp if dept head login
    const showNewTicketByEmpId = () => {
        getNewTickets(id).then((data) => {
            setTicketDataList(data.data);
        })
    }

    //dropdown for dept emp if dept head login
    const GetAllEmployeesByDeptId = () => {
        GetEmployeesByDeptId(depId).then((data) => {
            setEmpData(data.data);
        })
    }

    //for dept dropdown if dept head login
    const showAllDept = () => {
        getDeptList().then((data) => {
            setDeptList(data.data)
        })
    }

    //show ticket created by emp if admin emp login
    const showAssignedTicketByEmpId = () => {
        getAssignedTickets(id).then((data) => {
            debugger;
            setTicketDataList(data.data);
        })
    }

    //get all tickets when super admin logdin
    const showAllTicket = (employeeId) => {
        getTicket(employeeId).then((data) => {
            setTicketDataList(data.data)

        })
    }


    const addAllTicket = () => {
        try {
            setFormSubmited(true)
            if (ticketobj.severity != '' &&
                ticketobj.deptId != '' &&
                ticketobj.requestDetails != '') {
                addTicket(ticketobj).then((data) => {
                    if (data.result) {
                        alert('Ticket Added Successfully');
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
                    }
                    else {
                        alert(data.message);
                    }
                })
            }
        } catch (error) {
            alert(error.code)
        }
    }



    //start Ticket
    const onStartTicket = (id) => {
        debugger;
        startTicket(id).then((data) => {
            debugger;
            if (data.result) {
                debugger;
                alert("Ticket Started");
                debugger;
                showNewTicketByEmpId();
            }
            else {
                alert(data.message);
            }
        })
    }

    //End Ticket
    const onCloseTicket = (id) => {
        closeTicket(id).then((data) => {
            if (data.result) {
                alert("Ticket Closed");
            }
            else {
                alert(data.message);
            }
        })
    }






    // const onEditEmp = (ticketId) => {
    //     editTicketData(ticketId).then((data) => {
    //         setTicketObj(data)
    //     })

    // }
    // //Delate
    // const onDeleteTicket = (ticketId) => {
    //     deleteTicketData(ticketId).then((data) => {
    //         debugger;
    //         console.log('Delete response:', data);
    //         if (data.result) {
    //             debugger;
    //             alert('Ticket Deleted Successfully')
    //             showAllTicket();
    //         } else {
    //             alert(data.message)
    //         }
    //     })
    // }

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
                    <div className='col-lg-12 col-md-12'>

                        {/*  */}

                        <div className="card">
                            <div className="card-header  text-white" style={{ backgroundColor: '#03748A' }}>
                                <div className="row">
                                    <div className="col-md-6 text-start">
                                        <strong>Ticket List</strong>
                                    </div>
                                    <div className="col-md-6 text-end">
                                        <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">Add Data</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                {EmpRole === 'Employee' && (<div className="row">
                                    {TicketData.map((item) => (
                                        <div className="col-md-4" >
                                            <div className="card mb-4 bg-light">
                                                <div className="card-header bg-info">
                                                    <i className="fa fa-ticket me-2"></i>
                                                    <strong>{item.ticketNo}</strong>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6 text-start">
                                                            <strong>Dept Name</strong> - {item.deptName}
                                                        </div>

                                                        <div className="col-md-6">
                                                            <strong>Created Date</strong> - {item.createdDate}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 text-start">
                                                            <strong>Contact</strong> - {item.contactNo}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <strong>Expected End Date</strong> - {item.expectedEndDate}
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-6">
                                                            <span className="text-danger text-start">{item.state}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}

                                {EmpRole === 'Department Head' && (<div className="row">
                                    {TicketData.map((item, index) => (
                                        <div className="col-md-4" key={index}>
                                            <div className="card mb-4 bg-light">
                                                <div className="card-header px-3 bg-info">
                                                    <i className="fa fa-ticket me-2"></i>
                                                    <strong>{item.ticketNo}</strong>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        {/* <div className="col-md-3 d-flex align-items-center p-1">
                                                                <div className="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>}
                                                            </div> */}
                                                        <div className="col-md-6 text-start">
                                                            <i className='fa fa-user fa-lg'></i> - {item.employeeName}
                                                        </div>
                                                        <div className="col-md-6 text-start">
                                                            <strong>Created Date</strong> - {item.createdDate}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-6 text-start"><i className='fa fa-exclamation-triangle fa-lg'></i> - {item.severity}
                                                        </div>
                                                        <div className="col-md-6 text-start">
                                                            <strong>Expected End Date</strong> - {item.expectedEndDate}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-6 text-start">
                                                            <strong>Severity</strong> - {item.severity}
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <strong>Employee</strong>
                                                            <select className="form-select" aria-label="Default select example" onChange={(event) => getTicketRequest(event, item.ticketId)}>
                                                                <option value="">Select Employee</option>
                                                                {empData.map((item) => (
                                                                    <option value={item.employeeId}>{item.employeeName}</option>
                                                                ))}
                                                            </select>
                                                            {formsubmited && ticketobj.ticketId === '' && <span className="text-danger">Employee Is Required </span>}
                                                        </div>
                                                        <div className="col-md-6 mt-4">
                                                            <span className=" text-danger mx-1"><b>{item.state}</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}

                                {EmpRole === 'Admin Department Employee' && (<div className="row">
                                    {TicketData.map((item, index) => (
                                        <div className="col-md-4" key={index}>
                                            <div className="card mb-4 bg-light">
                                                <div className="card-header px-3 bg-info">
                                                    <i className="fa fa-ticket me-2"></i>
                                                    <strong>{item.ticketNo}</strong>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        {/* <div className="col-md-3 d-flex align-items-center p-1">
                                                                <div className="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>}
                                                            </div> */}
                                                        <div className="col-md-6 text-start">
                                                            <i className='fa fa-user fa-lg'></i> - {item.employeeName}
                                                        </div>
                                                        <div className="col-md-6 text-start">
                                                            <strong>Created Date</strong> - {item.createdDate}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-md-6 text-start"><i className='fa fa-exclamation-triangle fa-lg'></i> - {item.severity}
                                                        </div>
                                                        <div className="col-md-6 text-start">
                                                            <strong>Expected End Date</strong> - {item.expectedEndDate}
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6  text-start">

                                                            {
                                                                item.state == 'Assigned' && <button className='btn btn-warning btn-sm mx-1' onClick={() => onStartTicket(item.ticketId)} >Start Ticket</button>
                                                            }


                                                            {
                                                                item.state == 'In-Progress' && <button className='btn btn-danger btn-sm mx-1' onClick={() => onCloseTicket(item.ticketId)}>Close Ticket</button>
                                                            }

                                                        </div>
                                                        <div className='col-6'>
                                                            <span className=" text-danger mx-1"><b>{item.state}</b></span>
                                                        </div>
                                                    </div>


                                                    {/* <div class="row">
                                                            <div class="col-12 d-flex flex-row">
                                                                <div class="progress w-100">
                                                                    <ol class="ProgressBar">
                                                                        {ticketstatuslist.map((status, index) => (
                                                                            <li class="ProgressBar-step" style={{ width: `${100 / ticketstatuslist.length}%` }}>
                                                                                <div class="step">
                                                                                    <div class="step-circle" style={{ backgroundColor: status === 'Closed' ? 'red' : 'black' }}>{index + 1}</div>
                                                                                    <span class="step-label">{status}</span>
                                                                                </div>
                                                                                {index !== ticketstatuslist.length - 1 && <div class="progress-bar"></div>}
                                                                            </li>
                                                                        ))}
                                                                    </ol>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                    <div class="row d-flex flex-row">
                                                        {/* <div class="col-md-12">
                                                                <ul class="stepper stepper-horizontal d-flex flex-row">
                                                                    {ticketstatuslist.map((status, index) => (
                                                                        <li class="ProgressBar-step" style={{ width: `${100 / ticketstatuslist.length}%` }}>
                                                                            <div class="step">
                                                                                <div class="step-circle" style={{ backgroundColor: status === 'Closed' ? 'red' : 'black' }}>{index + 1}</div>
                                                                                <span class="step-label">{status}</span>
                                                                            </div>
                                                                            {index !== ticketstatuslist.length - 1 && <div class="progress-bar"></div>}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div> */}
                                                        <div className='col-12'>
                                                            <div class="md-stepper-horizontal orange">
                                                                <div class="row">
                                                                    <div class="col md-step">
                                                                        <div class="md-step-circle" style={{ backgroundColor: item.state === 'Un-Assigned' ? 'orange' : 'gray' }}><span></span></div>
                                                                        <div class="md-step-title" style={{ color: item.state === 'Un-Assigned' ? 'orange' : 'gray' }}>Un-Assigned</div>
                                                                        <div class="md-step-bar-right"></div>
                                                                    </div>
                                                                    <div class="col md-step active">
                                                                        <div class="md-step-circle" style={{ backgroundColor: item.state == 'Assigned' ? 'orange' : 'gray' }}><span></span></div>
                                                                        <div class="md-step-title" style={{ color: item.state === 'Assigned' ? 'orange' : 'gray' }}>Assigned</div>
                                                                        <div class="md-step-bar-left"></div>
                                                                        <div class="md-step-bar-right"></div>
                                                                    </div>
                                                                    <div class="col md-step">
                                                                        <div class="md-step-circle" style={{ backgroundColor: item.state == 'In-Progress' ? 'orange' : 'gray' }}><span></span></div>
                                                                        <div class="md-step-title" style={{ color: item.state === 'In-Progress' ? 'orange' : 'gray' }}>In-Progress</div>
                                                                        <div class="md-step-bar-left"></div>
                                                                        <div class="md-step-bar-right"></div>
                                                                    </div>
                                                                    <div class="col md-step">
                                                                        <div class="md-step-circle" style={{ backgroundColor: item.state == 'Closed' ? 'orange' : 'gray' }}><span></span></div>
                                                                        <div class="md-step-title" style={{ color: item.state === 'Closed' ? 'orange' : 'gray' }}>Closed</div>
                                                                        <div class="md-step-bar-left"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>





                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                                )}



                                 



                            </div>
                        </div>


                        {/*  */}
                    </div>



                    <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className='modal-header text-white' style={{ backgroundColor: '#03748A' }}>
                                    <h5 className='modal-title'>Add Ticket</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className='modal-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label className='form-label'>Severity</label>
                                            <select className='form-select' value={ticketobj.severity} onChange={(event) => { changeFormValue(event, 'severity') }}>
                                                <option>Select Severity</option>
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                            </select>
                                            {formsubmited && ticketobj.severity === '' && <span className='text-danger'>Severity is required</span>}
                                        </div>
                                        <div className='col-md-6'>
                                            <label className='form-label'>Department</label>
                                            <select className='form-select' value={ticketobj.deptId} onChange={(event) => { changeFormValue(event, 'deptId') }}>
                                                <option value=''>Select Department</option>
                                                {deptlist.map((item) => (
                                                    <option key={item.deptId} value={item.deptId}>{item.deptName}</option>
                                                ))}
                                            </select>
                                            {formsubmited && ticketobj.deptId === '' && <span className='text-danger'>Department is required</span>}
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12'>
                                            <label className='form-label'>Request Details</label>
                                            <textarea className='form-control' rows="3" onChange={(event) => { changeFormValue(event, 'requestDetails') }} value={ticketobj.requestDetails} placeholder='Enter Request Details'></textarea>
                                            {formsubmited && ticketobj.requestDetails === '' && <span className='text-danger'>Request Details is required</span>}
                                        </div>
                                    </div>
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-2'>
                                            <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                        </div>
                                        <div className='col-6'>
                                            <button className='btn btn-success btn-primary' onClick={addAllTicket}>Add Ticket</button>
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

export default Tickets;