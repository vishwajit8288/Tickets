import axios from 'axios';
import * as Constant from "./Constant"
const ApiUrl = process.env.REACT_APP_API_KEY;



const getLogin = async (obj) => {
    const result = await axios.post(ApiUrl + Constant.CHECK_LOGIN, obj);
    return result.data
}
const getDeptList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_DEPT);
    return result.data
}
// const getDepeHeadList = async (id) => {
//     const result = await axios.get(ApiUrl + Constant.GET_ALL_DEPT_HEAD + id);
//     return result.data
// }
const addDepartment = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_DEPARTMENT, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}
const updateDepartmant = async (obj) => {
    try {
        const result = await axios.put(ApiUrl + Constant.UPDATE_DEPARTMENT, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const onDeleteDepartment = async (id) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.delete(ApiUrl + Constant.DELETE_DEPARTMENT + id);
        return result.data
    }
}
const getEmpList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_EMP);
    return result.data
}
const addEmployee = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_EMPLOYEE, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const editEmpData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.EDIT_EMP + id)
    return result.data.data
}
const deleteEmpData = async (id) => {
    const isDelte = window.confirm('Are You Sure want to Delete');
    if (isDelte) {
        const result = await axios.delete(ApiUrl + Constant.DELETE_EMP + id);
        return result.data
    }

}
const updateEmployee = async (obj) => {
    try {
        const result = await axios.put(ApiUrl + Constant.UPDATE_EMPLOYEE, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}
///for super admin
const getLeaveData = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_LEAVE_DATA);
    return result.data
}
// const getEmpList = async () => {
//     const result = await axios.get(ApiUrl + Constant.GET_EMPLOYEE_LIST);
//     return result.data
// }

const addLeave = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_LEAVE, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const editLeaveData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.EDIT_LEAVE + id)
    return result.data.data
}
const addTicket = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_TICKET, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}
const getTicket = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_TICKET);
    return result.data
}

// const editTicketData = async(id)=>{
//     const result = await axios.get(ApiUrl + Constant.EDIT_TICKET+id)
//     return result.data.data
// }
// const deleteTicketData = async (id)=>{
//     const isDelte = window.confirm('Are You Sure want to Delete');
//     if(isDelte){
//         const result = await axios.delete(ApiUrl + Constant.DELETE_TICKET + id);
//         return result.data
//     }

// }

const getRoleList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_ROLE);
    return result.data
}





const getTicketById = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_TICKET_CREATED_BY_EMI_ID + id);
    return result.data
}
const getNewTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_NEW_TICKET_BY_EMP + id);
    return result.data
}

//if admin employee logdin
const getAssignedTickets = async (id) => {
    const result = await axios.get(ApiUrl + Constant.SHOW_ASSIGN_TICKET_BY_EMP_ID + id);
    return result.data
}
const GetEmployeesByDeptId = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMP_BY_DEPT_ID + id);
    return result.data
}



const getAssignRequest = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.GET_ASSIGN_REQUEST, obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }

}
// *****************emp dashboard
const getSuperAdmin = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_SUPER_ADMIN);
    return result.data
}
const getEmpDashboard = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_EMP_DASH + id);
    return result.data
}
const getDeptHeadDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_DEPT_HEAD_DASH + id);
    return result.data
}
const getAdminEmpDashData = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ADMIN_EMP_DASH + id);
    return result.data
}


const startTicket = async (id) => {
    try {
        const result = await axios.post(ApiUrl + Constant.START_TICKET + id);
        return result.data.data
    } catch (error) {
        alert(error.code)
    }

}
const closeTicket = async (id) => {
    try {
        const result = await axios.post(ApiUrl + Constant.CLOSE_TICKET + id);
        return result.data
    } catch (error) {
        alert(error.code)
    }
}

const getLeaveForApprovel = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_LEAVE_FOR_APPROVEL + id);
    return result.data
}
const approvelLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.FOR_APPROVEL_LEAVE + id);
    return result.data
}
const rejectLeave = async (id) => {
    const result = await axios.get(ApiUrl + Constant.FOR_REJECT_LEAVE + id);
    return result.data
}
const getAllLeaveByEmp = async (id) => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_LEAVE_BY_EMP + id);
    return result.data
}
export {
    getEmpDashboard, getDeptHeadDashData, getAdminEmpDashData, getLogin, getDeptList, addDepartment, updateDepartmant, onDeleteDepartment, getRoleList,
    addEmployee, editEmpData, deleteEmpData, updateEmployee, getEmpList,
    getLeaveData, addLeave, editLeaveData, addTicket, getTicket, getSuperAdmin,
    getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId,
    getAssignRequest, startTicket, closeTicket, getLeaveForApprovel, approvelLeave,
    rejectLeave, getAllLeaveByEmp
}


