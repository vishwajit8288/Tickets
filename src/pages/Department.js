import React, { useEffect, useState } from 'react';
import { getDeptList, addDepartment, updateDepartmant, onDeleteDepartment, getEmpList } from '../services/Api'
const Department = () => {
    let [deptData, setDeptData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [deptHead, setDeptHead] = useState([])
    let [formsubmited, setFormSubmited] = useState(false);


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
    },[]);

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



    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>


                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                            <strong className='text-white'> Department List</strong>
                                
                            </div>


                            <div className='card-body'>
                                <table className='table table-bordered'>
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


                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='card'>

                            <div className='card-header bg-success'>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>  Add  Department</strong>
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
                                            deptobj.deptId == 0 && <button className='btn btn-primary ' onClick={addDept}>Add Department</button>

                                        }
                                        {
                                            deptobj.deptId !== 0 && <button className='btn btn-sm btn-warning  p-2' onClick={updateAllDeptData}> Update Department</button>
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

export default Department;