import React, { useEffect, useState } from 'react';
import { getDeptList,addDepartment } from '../services/Api'
const Department = () => {
    let [deptData, setDeptData] = useState([]);
    let [isLoader, setIsLoader] = useState(true);

    let [deptobj, setDeptObj] = useState({
        "deptId":0,
        "deptName": "",
        "deptHead": 0,
        "createdDate":""
    })
    const changeFormValue = (event, key) => {
        setDeptObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    useEffect(() => {
        showAllDeptData();
    }, []);

    const showAllDeptData = () => {
        getDeptList().then((data) => {
            setDeptData(data.data)
            setIsLoader(false);
        })
    }
    const addDept = () => {
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
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='card'>
                            <div className='card-header bg-success'>
                                Department List
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>DeptHeadName</th>
                                            <th>DeptHead</th>
                                            <th>DeptName</th>
                                            <th>Created Date</th>
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
                                                    <td> {item.deptHeadName}</td>
                                                    <td> {item.deptHead} </td>
                                                    <td> {item.deptName} </td>
                                                    <td> {item.createdDate} </td>
                                                    <td><button className='btn btn-sm btn-primary'> Edit</button> </td>
                                                    <td> <button className='btn btn-sm btn-danger'> Delete</button></td>
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
                                Add  Department
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Department Name</label>
                                        <input type='text' className='form-control' onChange={(event) => { changeFormValue(event, 'deptName') }} value={deptobj.deptName} placeholder='Enter Department Name' />
                                        {/* <div className='text-danger'>
                                            {
                                                //false/empty
                                                formsubmited && deptobj.statusFor == '' && <span>Status For Is Required </span>
                                            }
                                        </div> */}
                                    </div>
                                    <div className='col-6'>
                                        <label>Department Head</label>
                                        <input type='text' className='form-control ' onChange={(event) => { changeFormValue(event, 'deptHead') }} value={deptobj.deptHead} placeholder='Enter Department Head' />
                                        {/* <div className='text-danger'>
                                            {
                                               
                                                formsubmited && deptobj.status == '' && <span>Status Is Required </span>
                                            }
                                        </div> */}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Creater Date</label>
                                        <input type='date' className='form-control' onChange={(event) => { changeFormValue(event, 'createdDate') }} value={deptobj.createdDate} placeholder='Enter Creater Date' />
                                    </div>
                                </div>



                                <div className='row mt-2'>
                                    <div className='col-6 text-start'>
                                        <button className='btn btn-secondary'>Reset</button>
                                    </div>
                                    <div className='col-6 text-end'>

                                        {
                                            deptobj.deptId == 0 && <button className='btn btn-primary ' onClick={addDept}>AddMaster</button>

                                        }
                                        {
                                            deptobj.deptId !== 0 && <button className='btn btn-sm btn-warning  p-2'> Update Master</button>
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