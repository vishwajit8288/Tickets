import React, { useEffect, useState } from 'react';
import { getDeptList, addDepartment, updateDepartmant, onDeleteDepartment, getEmpList } from '../services/Api'
const Department = () => {
    let [deptData, setDeptData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [deptHead, setDeptHead] = useState([])
    let [formsubmited, setFormSubmited] = useState(false);
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);

    let [deptobj, setDeptObj] = useState({
        "deptId": 0,
        "deptName": "",
        "deptHeadEmpId": '',
        "createdDate": new Date()
    })
    const changeFormValue = (event, key) => {
        setDeptObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    useEffect(() => {
        showAllDeptData();
        showAllDeptHead();
    }, []);

    const showAllDeptData = () => {
        getDeptList().then((data) => {
            setDeptData(data.data)
            setIsLoader(false);
        })
    }
    const showAllDeptHead = () => {
        getEmpList().then((data) => {
            setDeptHead(data.data)

        })
    }
    const addDept = () => {
        try {
            setFormSubmited(true)
            if (deptobj.deptName != '' && deptobj.deptHeadEmpId != '' && deptobj.createdDate != '') {
                addDepartment(deptobj).then((data) => {
                    if (data.result) {
                        debugger;
                        alert("Department Added Successfully");
                        showAllDeptData();
                    } else {
                        alert(data.message);
                    }
                })
            }

        } catch (error) {
            alert(error.code)
        }


    }
    const onEdit = (item) => {
        setisShowForm(true);

        try {

            setDeptObj(prevObj => ({
                ...prevObj,
                deptId: item.deptId,
                deptName: item.deptName,
                deptHeadEmpId: item.deptHeadEmpId,
                createdDate: item.createdDate
            }))
        } catch (error) {
            alert('Error Occuored');
        }
    }
    //update
    const updateAllDeptData = () => {
        if (deptobj.deptName != '' && deptobj.deptHeadEmpId != '' && deptobj.createdDate != '') {
            updateDepartmant(deptobj).then((data) => {
                debugger;
                if (data.result) {
                    debugger;
                    alert("Department Update Successfully");
                    showAllDeptData();
                } else {
                    alert(data.message);
                }
            })
        }
    }


    const deleteAllDeptData = (deptId) => {
        onDeleteDepartment(deptId).then((data) => {
            debugger;
            if (data.result) {
                alert("Department Deleted Successfully");
                showAllDeptData();
            } else {
                alert(data.message);
            }
        })
    }

    const reset = () => {
        setFormSubmited(false);
        setDeptObj({
            "deptId": 0,
            "deptName": "",
            "deptHeadEmpId": '',
            "createdDate": ""
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
                        <button className='btn btn-danger mb-2' onClick={showForm}>Add Data</button>
                    </div> */}

                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>Department List</strong>
                                    </div>
                                    <div className='col-4 text-end ps-0'>
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
                                        <button className='btn btn-danger border-0  ' style={{ outline: 'none' }}  onClick={showForm}>Add Data</button>
                                    </div>

                                </div>
                            </div>
                            {
                                !isShowCard && <div className='card-body'>
                                    <table className='table table-bordered  table-striped'>
                                        <thead>
                                            <tr>
                                                <th>Sr No</th>
                                                <th>Dept Name</th>
                                                <th>Dept Head Name</th>

                                                <th>Edit</th>
                                                <th>Delete</th>

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
                                        {!isLoader && <tbody>
                                            {
                                                deptData.map((item, index) => {
                                                    return (<tr>
                                                        <td>{index + 1} </td>
                                                        <td> {item.deptName} </td>
                                                        <td> {item.deptHeadName}</td>

                                                        <td><button className='btn btn-success btn-sm' onClick={() => { onEdit(item) }}> <i className='fa fa-pencil'></i></button> </td>
                                                        <td> <button className='btn btn-sm btn-danger btn-sm' onClick={() => deleteAllDeptData(item.deptId)}> <i className='fa fa-trash-o'></i></button></td>
                                                    </tr>)
                                                })
                                            }

                                        </tbody>
                                        }
                                    </table>
                                </div>
                            }
                            {
                                isShowCard && <div className='card-body'>
                                    <div className='row'>
                                        {
                                            deptData.map((item, index) => {
                                                return (
                                                    <div className='col-md-4'>
                                                        <div className='card  mb-3 bg-body-tertiary'>
                                                            <div className='card-header bg-info'>
                                                                <div className='row'>

                                                                    <div className='col-12 text-center'>
                                                                        <strong>Department Name</strong> - {item.deptName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='card-body'>
                                                                <div className='row'>
                                                                    <div className='col-4'>
                                                                        <div class="circle bg-info text-dark rounded-pill p-1"><strong>{index + 1}</strong></div>
                                                                    </div>
                                                                    <div className='col-8 text-center' style={{ fontSize: '16px' }}>
                                                                        <strong>Created Date</strong> - {item.createdDate}
                                                                    </div>
                                                                </div>
                                                                <div className='row mt-3'>
                                                                    <div className={`col-2 text-start ${isShowForm ? 'offset-6' : 'offset-1'}`}>
                                                                        <button className='btn btn-sm btn-primary btn-block' onClick={() => { onEdit(item) }}><i class='fa fa-pencil'></i></button>
                                                                    </div>
                                                                    <div className='col-md-2 col-12 mt-md-0 mt-2'>
                                                                        <button className='btn btn-sm btn-danger btn-block' onClick={() => { deleteAllDeptData(item.deptId) }}><i class='fa fa-trash-o'></i></button>
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
                    <div className='col-4'>
                        {
                            isShowForm &&
                            <div className='card'>

                                <div className='card-header' style={{ backgroundColor: '#03748A' }}>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <strong className='text-white'>  Add  Department</strong>
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
                                            <label>Department Name</label>
                                            <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'deptName') }} value={deptobj.deptName} placeholder='Enter Dept Name' />

                                            {
                                                //false/empty
                                                formsubmited && deptobj.deptName == '' && <span className='text-danger'>Department Name Is Required </span>
                                            }

                                        </div>
                                        <div className='col-6'>
                                            <label>Department Head</label>
                                            <select className='form-select' value={deptobj.deptHeadEmpId} onChange={(event) => { changeFormValue(event, 'deptHeadEmpId') }}>
                                                <option value=''>Select Head</option>
                                                {
                                                    deptHead.map((item) => {
                                                        return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                    })
                                                }

                                            </select>
                                            {
                                                //false/empty
                                                formsubmited && deptobj.deptHeadEmpId == '' && <span className='text-danger'>Department Head Is Required </span>
                                            }


                                            <div className='text-danger'>
                                                {

                                                    formsubmited && deptobj.deptHead == '' && <span>Department Head Is Required </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label>Creater Date</label>
                                            <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'createdDate') }} value={deptobj.createdDate} />

                                            {

                                                formsubmited && deptobj.createdDate == '' && <span className='text-danger'>Creater Date Is Required </span>
                                            }

                                        </div>
                                    </div>



                                    <div className='row mt-2'>
                                        <div className='col-6 text-start'>
                                            <button className='btn btn-secondary' onClick={reset}>Reset</button>
                                        </div>
                                        <div className='col-6 text-end'>

                                            {
                                                deptobj.deptId == 0 && <button className='btn btn-success ' onClick={addDept}>Add Department</button>

                                            }
                                            {
                                                deptobj.deptId !== 0 && <button className='btn btn-sm btn-warning  p-2' onClick={updateAllDeptData}> Update Department</button>
                                            }
                                        </div>
                                    </div>
                                </div>


                            </div>

                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Department;