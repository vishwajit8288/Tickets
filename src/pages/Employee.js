import React, { useState, useEffect } from 'react';
import { getEmpList, addEmployee, getDeptList, editEmpData, deleteEmpData, updateEmployee, getRoleList } from '../services/Api'

const Employee = () => {

    let [deptData, setDeptData] = useState([]);
    let [emplist, setEmpList] = useState([])
    let [isLoader, setIsLoader] = useState(true);
    let [formsubmited, setFormSubmited] = useState(false);
    let [employeeRole, setEmployeeRole] = useState([])
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);

    let [empobj, setEmpObj] = useState({
        "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "role": "",
        "gender": ""
    })

    useEffect(() => {
        showAllEmpData();
        showAllDeptList();
        showAllRole();
    }, []);

    //for table
    const showAllEmpData = () => {
        getEmpList().then((data) => {
            setEmpList(data.data)
            setIsLoader(false);
        })
    }

    //for dropdown
    const showAllDeptList = () => {
        getDeptList().then((data) => {
            setDeptData(data.data)
            setIsLoader(false);
        })
    }
    //for Role dropdown
    const showAllRole = () => {
        getRoleList().then((data) => {
            debugger;
            setEmployeeRole(data.data)

        })
    }

    const changeFormValue = (event, key) => {
        setEmpObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    const addEmp = () => {
        try {
            setFormSubmited(true)
            if (
                empobj.employeeName != '' &&
                empobj.contactNo != '' &&
                empobj.emailId != '' &&
                empobj.deptId != '' &&
                empobj.password != '' &&
                empobj.role != '' &&
                empobj.gender != '') {
                addEmployee(empobj).then((data) => {
                    if (data.result) {
                        alert("Employee Added Successfully");
                        showAllEmpData();
                    } else {
                        alert(data.message);
                    }
                })
            }
        } catch (error) {
            alert(error.code)
        }
    }

    //Edit
    const onEditEmp = (employeeId) => {
        setisShowForm(true);
        editEmpData(employeeId).then((data) => {
            setEmpObj(data)
        })

    }
    //Delate
    const onDeleteEmp = (employeeId) => {
        deleteEmpData(employeeId).then((data) => {
            debugger;
            console.log('Delete response:', data);
            if (data.result) {
                debugger;
                alert('Employee Deleted Successfully')
                showAllEmpData();

            } else {
                alert(data.message)
            }
        })
    }
    //update
    const updateAllEmpData = () => {
        // if (deptobj.deptName != '' && deptobj.deptHead != '' && deptobj.createdDate != '') {
        updateEmployee(empobj).then((data) => {
            debugger;
            if (data.result) {
                debugger;
                alert("Employee Update Successfully");
                showAllEmpData();
            } else {
                alert(data.message);
            }
        })
        // }
    }

    const reset = () => {
        setFormSubmited(false);
        setEmpObj({
            "employeeId": 0,
            "employeeName": "",
            "contactNo": "",
            "deptId": 0,
            "emailId": "",
            "password": "",
            "role": "",
            "gender": ""

        })
    }
    const showForm = () => {
        setisShowForm(true);
    }
    const showCard = () => {
        setisShowCard(true);
    }

    const closeForm = () => {
        setisShowForm(false);
    }

    const showTable = () => {
        setisShowCard(false);
    }
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-12 mb-2 text-end'>
                        <button className='btn btn-success mb-2' onClick={showForm}>Add Data</button>
                    </div> */}


                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Employee List</strong>
                                    </div>
                                    
                                    <div className='col-4 text-end ps-0 '>
                                        {
                                            !isShowCard && <button className='btn btn-body p-0 outline' onClick={showCard}>
                                                <i class="fa fa-th fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }
                                        {
                                            isShowCard && <button className='btn btn-body p-0 outline' onClick={showTable}>
                                                <i class="fa fa-table fa-lg text-white" aria-hidden="true"></i>
                                            </button>
                                        }

                                    </div>
                                    <div className='col-2 text-end'>
                                        <button className='btn btn-danger border-0' style={{ outline: 'none' }} onClick={showForm}>Add Data</button>
                                    </div>
                                </div>
                            </div>

                            {
                                !isShowCard && <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered  table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Employee Name</th>
                                                    <th>Dept Name</th>
                                                    <th>Contact No</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
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
                                                    emplist.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td>{index + 1} </td>
                                                            <td> {item.employeeName} </td>
                                                            <td> {item.deptName}</td>
                                                            <td> {item.contactNo} </td>
                                                            <td> {item.emailId} </td>
                                                            <td> {item.role} </td>
                                                            <td><button className='btn btn-success btn-sm' onClick={() => { onEditEmp(item.employeeId) }}><i className='fa fa-pencil'></i> </button> </td>
                                                            <td> <button className='btn btn-sm btn-danger btn-sm' onClick={() => { onDeleteEmp(item.employeeId) }}> <i className='fa fa-trash-o'></i></button></td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                            }
                                        </table>
                                    </div>
                                </div>
                            }

                            {

                                isShowCard && <div className='card-body'>
                                    <div className='row'>
                                        {
                                            emplist.map((item, index) => {
                                                return (
                                                    <div className='col-4'>
                                                        <div className='card card-margin mb-4 bg-body-tertiary'>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-3 d-flex align-items-center p-1'>
                                                                        <div class="circle bg-info-subtle text-black"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-9'>
                                                                        <strong>Employee Name</strong> - {item.employeeName}
                                                                        <br></br>

                                                                        <strong>Department Name</strong> - {item.deptName}
                                                                        <br></br>
                                                                        <strong>Contact No</strong> - {item.contactNo}
                                                                        <br></br>
                                                                        <strong>Role</strong> - {item.role}
                                                                        <br></br>
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-end ${isShowForm ? 'offset-6' : 'offset-7'}`}>
                                                                        <td><button className='btn btn-sm btn-primary' onClick={() => { onEditEmp(item.employeeId) }} ><i className='fa fa-pencil'></i></button> </td>

                                                                    </div>
                                                                    <div className='col-2 text-end'>
                                                                        <td> <button className='btn btn-sm btn-danger' onClick={() => { onDeleteEmp(item.employeeId) }}><i className='fa fa-trash-o'></i></button></td>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>

                            }


                        </div>
                    </div>

                    <div className='col-lg-4 col-md-12'>
                        {
                            isShowForm && <div className='card'>
                                <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'>  Add Employee</strong>
                                        </div>


                                        <div className='col-6 text-end'>
                                            <button className='btn p-0 btn-body' onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>




                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Employee Name</label>
                                            <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'employeeName') }} value={empobj.employeeName} placeholder='Enter Emp Name' />
                                            {

                                                formsubmited && empobj.employeeName == '' && <span className='text-danger'>Employee Name Required </span>
                                            }
                                        </div>
                                        <div className='col-6'>
                                            <label>Contact No</label>
                                            <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'contactNo') }} value={empobj.contactNo} placeholder='Enter Contact No' />
                                            {

                                                formsubmited && empobj.contactNo == '' && <span className='text-danger'>Contact No Required </span>
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Email</label>
                                            <input type='email' className='form-control' onChange={(event) => { changeFormValue(event, 'emailId') }} value={empobj.emailId} placeholder='Enter Email' />
                                            {

                                                formsubmited && empobj.emailId == '' && <span className='text-danger'>Email Is Required </span>
                                            }
                                        </div>
                                        <div className='col-6'>
                                            <label>Department</label>
                                            <select className='form-select' value={empobj.deptId} onChange={(event) => { changeFormValue(event, 'deptId') }}>
                                                <option value=''>Select Department</option>
                                                {
                                                    deptData.map((item) => {
                                                        return (<option key={item.deptId} value={item.deptId}>{item.deptName}</option>)
                                                    })

                                                }
                                            </select>
                                            {

                                                formsubmited && empobj.deptId == '' && <span className='text-danger'>Department Is Required </span>
                                            }

                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Password</label>
                                            <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'password') }} value={empobj.password} />
                                            {

                                                formsubmited && empobj.password == '' && <span className='text-danger'>Password Is Required </span>
                                            }
                                        </div>
                                        <div className='col-6'>
                                            <label>Role</label>
                                            <select className="form-select" aria-label="Default select example" value={empobj.role} onChange={(event) => changeFormValue(event, 'role')}>
                                                <option value=''>Select Role</option>
                                                {
                                                    employeeRole.map((item) => {
                                                        return (<option key={item} value={item}>{item}</option>)
                                                    })
                                                }
                                            </select>
                                            {
                                                formsubmited && empobj.role == '' && <span className='text-danger'>Role Is Required </span>
                                            }
                                        </div>

                                    </div>
                                    <div className='row mt-2 mb-2'>
                                        <div className='col-12 text-start'>
                                            <div className='row mt-2 mb-2'>
                                                <div className='col-12 text-start'>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" onChange={(event) => { changeFormValue(event, 'gender') }} value="Male" checked={empobj.gender === 'Male'} />
                                                        <label className="form-check-label">Male</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" onChange={(event) => { changeFormValue(event, 'gender') }} value="Female" checked={empobj.gender === 'Female'} />
                                                        <label className="form-check-label">Female</label>
                                                    </div>
                                                    {formsubmited && empobj.gender === '' && <span className='text-danger'>Gender Required </span>}
                                                </div>
                                            </div>

                                            {

                                                formsubmited && empobj.gender == '' && <span className='text-danger'>Gender Required </span>
                                            }
                                        </div>
                                    </div>

                                    <div className='row mt-4'>
                                        <div className='col-6 text-start'>
                                            <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                        </div>
                                        <div className='col-6 text-end'>
                                            {
                                                empobj.employeeId == 0 && <button className='btn btn-success' onClick={addEmp}>Add Employee</button>
                                            }
                                            {
                                                empobj.employeeId !== 0 && <button className='btn btn-sm btn-warning p-2' onClick={updateAllEmpData} > Update Department</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        }

                    </div>

                </div>
            </div>

        </div >

    );
};

export default Employee;